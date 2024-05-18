import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";

import React from "react";

import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import Profile from "@/components/forms/Profile";

export const metadata: Metadata = {
  title: "Izmeni Profil | Programersko Pitanje",
};

export default async function Page({ params }: ParamsProps) {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
}
