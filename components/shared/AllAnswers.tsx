import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import ParseHTML from "./ParseHTML";
import { getTimestamp } from "@/lib/utils";
import Votes from "./Votes";

// import Pagination from "./Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

export default async function AllAnswers({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers === 1
            ? `${totalAnswers} Answer`
            : `${totalAnswers} Answers`}
        </h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((el) => (
          <article key={el._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${el.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={el.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {el.author.name}
                  </p>

                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    <span className="max-sm:hidden">
                      {" "}
                      answered {getTimestamp(el.createdAt)}
                    </span>
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  itemId={JSON.stringify(el._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={el.upvotes.length}
                  downvotes={el.downvotes.length}
                  hasupVoted={el.upvotes.includes(userId)}
                  hasdownVoted={el.downvotes.includes(userId)}
                />
              </div>
            </div>

            <ParseHTML data={el.content} />
          </article>
        ))}
      </div>
      {/* <div className="mt-10 w-full">
        <Pagination
          pageNumber={page ? +page : 1}
          isNext={result.isNextAnswer}
        />
      </div> */}
    </div>
  );
}
