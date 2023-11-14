import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";

import sendEmail from "@/app/utilities/sendEmail";
import { generatePasswordResetToken } from "@/app/utilities/token";

export const POST = async (request: NextRequest) => {
  const { email } = await request.json();

  try {
    const user = await User.find({ email });
    if(!user.length) {
      return new NextResponse("Invalid Email address.", {
        status: 500,
      });
    }
    const user_id = user[0]?._id;
    const token = await generatePasswordResetToken(user_id);
    const link = `${process.env.NEXTAUTH_URL}/reset-password/${token}/${user_id}`;

    const mailData = { 
      identifier: email, 
      from: process.env.EMAIL_FROM, 
      subject: "Password reset link", 
      text: `Password reset link: ${link}`, 
      html: html({ link })
    }
    await sendEmail(mailData);

    return new NextResponse("Created a link for Reset password.", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};


/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { link: string; }) {
  const { link } = params

  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Here is your Password Reset Link for Nervatrade
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${link}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                Go to the Reset Password page
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}
