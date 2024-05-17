import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

export default async function QuestionTab({
  searchParams,
  userId,
  clerkId,
}: Props) {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.questions.map((el) => (
        <QuestionCard
          key={el._id}
          _id={el._id}
          clerkId={clerkId}
          title={el.title}
          tags={el.tags}
          author={el.author}
          upvotes={el.upvotes}
          views={el.views}
          answers={el.answers}
          createdAt={el.createdAt}
        />
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextQuestion}
        />
      </div>
    </>
  );
}
