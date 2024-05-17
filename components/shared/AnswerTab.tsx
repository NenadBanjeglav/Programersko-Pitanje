import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";

import AnswerCard from "../cards/AnswerCard";
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
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {result.answers.map((el) => (
        <AnswerCard
          key={el._id}
          clerkId={clerkId}
          _id={el._id}
          question={el.question}
          author={el.author}
          upvotes={el.upvotes.length}
          createdAt={el.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </>
  );
}
