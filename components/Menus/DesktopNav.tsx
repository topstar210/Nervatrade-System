"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { BsPersonFill } from "react-icons/bs";

const DesktopNav = () => {
  const { data: session } = useSession();

  return (
    <nav
      className={`mx-auto max-w-5xl px-6 flex justify-between items-center py-6`}
    >
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold">
          <Link href="/">neryatrade</Link>
        </h1>
      </div>
      <div className="flex items-center cursor-pointer">
        {session ? (
          <>
            <p className="my-4 ">
              Signed in as {session.user?.email}
            </p>
            <p
              onClick={() => signOut()}
              className="bg-green-700 ml-6 my-4 rounded-md p-2 px-4 mx-2 text-white"
            >
              <BsPersonFill /> Logout
            </p>
          </>
        ) : (
          <>
            {" "}

            <Link href="/login" className="mx-4">
              <p className="border-[1px] min-w-[168px] w-full text-center py-[10px] px-8 text-sm font-medium  border-solid rounded-[24px] border-green-700">Log in</p>
            </Link>
            <Link href="/register" className="mx-4">
              <p className="rounded-[24px] hover:bg-white hover:border-2 hover:text-green-700 hover:border-green-700 text-white font-medium text-sm shadow-button py-[10px] min-w-[168px] w-full text-center bg-green-700 ">Register</p>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;