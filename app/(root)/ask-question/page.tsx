import Question from "@/components/forms/Question";
import type { Metadata } from "next";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Postavi Pitanje | ProgramerskoPitanje",
};

export default async function Page() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">Postavi Pitanje</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </main>
  );
}
