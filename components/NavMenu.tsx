import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton } from "./buttons";
import AuthCheck from "./AuthCheck";

const NavMenu = () => {
  return (
    <nav className="">
      <Link href={"/"} className="p-4">
        {/* <Image
          src="/logo.svg" // Route of the image file
          width={216}
          height={30}
          alt="NextSpace Logo"
        /> */}
        Home
      </Link>
      <ul className="p-4 border border-white">
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/blog"}>Blog</Link>
        </li>
        <li>
          <Link href={"/users"}>Users</Link>
        </li>
        <li>
          <SignInButton />
        </li>
        <li>
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
