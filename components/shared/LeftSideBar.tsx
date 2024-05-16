"use client";

import { sidebarLinks } from "@/constants";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function LeftSideBar() {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((el) => {
          const isActive =
            (pathname.includes(el.route) && el.route.length > 1) ||
            pathname === el.route;

          if (el.route === "/profile") {
            if (userId) {
              el.route = `${el.route}/${userId}`;
            }
          }

          return (
            <Link
              key={el.route}
              href={el.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={el.imgURL}
                alt={el.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {el.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden "
              />
              <span className="primary-text-gradient max-lg:hidden">
                Prijava
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium btn-tertiary light-border-2  text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="signup"
                width={20}
                height={20}
                className="invert-colors lg:hidden "
              />
              <span className="primary-text-gradient max-lg:hidden">
                Registracija
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
}
