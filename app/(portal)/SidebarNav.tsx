"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import menuItems from "./menuItems";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useToggle } from "@/context/SidebarContext";

type User = {
  _id: String;
  username: String;
  email: String;
  password: String;
  updatedAt: Date;
};

const SidebarNav = () => {
  const session = useSession();
  const [user, setUser] = useState<User | null>();
  const pathname = usePathname();
  // @ts-ignore
  const { sidebarPin, toggleSidebar } = useToggle();
  const [menuOver, setMunuOver] = useState("");

  const getProfile = () => {
    if (session.data) {
      // @ts-ignore
      axios.get(`api/profile/get?id=${session.data.user._id}`).then((res) => {
        setUser(res.data);
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  return (
    <aside
      className={`hidden md:block bg-black w-full border-r border-r-gray-border transition-all ${
        sidebarPin ? "md:w-[91px]" : "md:w-[328px] px-10"
      }`}
    >
      <nav className="h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="h-16 flex items-center px-[34px] border-b border-b-[#22262E]">
            <a href="/" className={`flex cursor-pointer relative z-10`}>
              {!sidebarPin ? (
                <img src="/images/logo-sm.png" className="h-6" alt="logo" />
              ) : (
                <img
                  src="/images/logo-white-1.png"
                  className="mx-auto h-6"
                  alt="logo"
                />
              )}
            </a>
          </div>
          <ul className="p-4">
            {menuItems.map(({ href, title, icon, iconHover }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="flex items-center w-full h-14 gap-2 px-4 rounded-lg cursor-pointer"
                  onMouseOver={() => setMunuOver(title)}
                  onMouseLeave={() => setMunuOver("")}
                >
                  <img
                    src={`/icons/${pathname === href ? iconHover : icon}.svg`}
                    alt={`${title}`}
                  />
                  {!sidebarPin && (
                    <span className="font-semibold text-sm text-[#626D7C]">
                      {title}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`flex flex-col items-center gap-10 pt-10 pb-[60px] border-t border-t-gray-border ${
            sidebarPin ? `` : `px-9`
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={`w-full flex items-center gap-2 rounded ${
              sidebarPin ? `justify-center` : ``
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src="/icons/arrow-right.png"
                className={`h-3 transition ${
                  !sidebarPin ? "rotate-180" : "rotate-0"
                }`}
                alt="arrow"
              />
            </div>
            <span
              className={`${
                sidebarPin ? `hidden` : `inline`
              } font-semibold text-base text-[#626D7C]`}
            >
              Collapse
            </span>
          </button>
          <Link
            href="/profile"
            className={`flex items-center w-full h-14 gap-4 rounded-lg cursor-pointer ${
              sidebarPin ? `justify-center` : ``
            }`}
          >
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full">
              <img src="/images/logo-white-1.png" alt="" />
            </div>
            {!sidebarPin && (
              <div className="flex flex-col font-medium">
                <span className="text-base">{user?.username}</span>
                <span className="text-sm text-[#626D7C]">{user?.email}</span>
              </div>
            )}
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarNav;
