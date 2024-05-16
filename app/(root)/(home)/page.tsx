// import QuestionCard from "@/components/cards/QuestionCard";
// import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
// import {
//   getQuestions,
//   getRecommendedQuestions,
// } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFIlters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

// import { auth } from "@clerk/nextjs/server";
// import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Pocetna | Programersko Pitanje",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  // const { userId } = auth();
  // let result;

  // if (searchParams?.filter === "recommended") {
  //   if (userId) {
  //     result = await getRecommendedQuestions({
  //       userId,
  //       searchQuery: searchParams.q,
  //       page: searchParams.page ? +searchParams.page : 1,
  //     });
  //   } else {
  //     result = {
  //       questions: [],
  //       isNext: false,
  //     };
  //   }
  // } else {
  //   result = await getQuestions({
  //     searchQuery: searchParams.q,
  //     filter: searchParams.filter,
  //     page: searchParams.page ? +searchParams.page : 1,
  //   });
  // }

  const result = {
    questions: [
      {
        title: "How to implement authentication in Node.js?",
        content:
          "I'm building a Node.js application and I need to implement user authentication. What are the best practices for doing this?",
        tags: [
          /* Array of ObjectIds referencing tags */
        ],
        views: 25,
        upvotes: [
          /* Array of ObjectIds referencing users who upvoted */
        ],
        downvotes: [
          /* Array of ObjectIds referencing users who downvoted */
        ],
        author: {
          /* ObjectId referencing the user who authored the question */
        },
        answers: [
          /* Array of ObjectIds referencing answers to this question */
        ],
        createdAt: new Date("2024-05-16"),
      },
      {
        title: "How to deploy a React app to production?",
        content:
          "I've finished building my React app and now I want to deploy it to production. What are the recommended ways to do this?",
        tags: [
          /* Array of ObjectIds referencing tags */
        ],
        views: 12,
        upvotes: [
          /* Array of ObjectIds referencing users who upvoted */
        ],
        downvotes: [
          /* Array of ObjectIds referencing users who downvoted */
        ],
        author: {
          /* ObjectId referencing the user who authored the question */
        },
        answers: [
          /* Array of ObjectIds referencing answers to this question */
        ],
        createdAt: new Date("2024-05-15"),
      },
      // Add more mock questions as needed
    ],
  };

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">Sva Pitanja</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Postavi Pitanje
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

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
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      {/* <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div> */}
    </>
  );
}
