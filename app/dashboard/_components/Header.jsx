"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();

  return (
    <div className="flex items-center justify-between p-4 bg-secondary shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={160} height={100} />
      <ul className="hidden md:flex gap-6">
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard" && "text-primary font-bold"
            }`}
          >
            Dashboard
          </li>
        </Link>
        <Link href={"/dashboard/questions"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/questions" && "text-primary font-bold"
            }`}
          >
            Questions
          </li>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/upgrade" && "text-primary font-bold"
            }`}
          >
            Upgrade
          </li>
        </Link>
        <Link href={"/dashboard/how-it-works"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/how-it-works" && "text-primary font-bold"
            }`}
          >
            How it Works?
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
