import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

import LocalSearchBar from "@/components/shared/search/LocalSearchBar";

import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

import React from "react";

import type { Metadata } from "next";
import Pagination from "@/components/shared/Pagination";

export const metadata: Metadata = {
  title: "Tag detaljnije | Programersko Pitanje",
};

export default async function Page({ params, searchParams }: URLProps) {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11  w-full ">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((el: any) => (
            <QuestionCard
              key={el._id}
              _id={el._id}
              title={el.title}
              tags={el.tags}
              author={el.author}
              upvotes={el.upvotes}
              views={el.views}
              answers={el.answers}
              createdAt={el.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="Nema pitanja pod ovim tagom"
            description="Budi prvi koji će prekinuti tišinu! 🚀"
            link="/ask-question"
            linkTitle="Postavi Pitanje"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
