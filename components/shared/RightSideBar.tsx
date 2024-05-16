// import Image from "next/image";
// import Link from "next/link";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
// import { getHotQuestions } from "@/lib/actions/question.action";
// import { getTopPopularTags } from "@/lib/actions/tag.action";

export default async function RightSideBar() {
  //   const hotQuestions = await getHotQuestions();
  //   const popularTags = await getTopPopularTags();

  const hotQuestions = [
    {
      _id: "questionId1",
      title: "How do you structure a React application?",
      content:
        "I'm starting a new project with React and I want to know the best practices for structuring the application. Any recommendations?",
      tags: ["React", "JavaScript", "Frontend"],
      views: 32,
      upvotes: ["userId1", "userId2"],
      downvotes: ["userId3"],
      author: "userId4",
      answers: ["answerId1", "answerId2"],
      createdAt: new Date("2024-05-16"),
    },
    {
      _id: "questionId2",
      title: "What are the differences between REST and GraphQL?",
      content:
        "I've heard about REST and GraphQL but I'm not sure which one to use for my API. Can someone explain the differences and advantages of each?",
      tags: ["REST", "GraphQL", "API"],
      views: 45,
      upvotes: ["userId2", "userId5"],
      downvotes: ["userId1"],
      author: "userId3",
      answers: ["answerId3"],
      createdAt: new Date("2024-05-15"),
    },
    {
      _id: "questionId3",
      title: "How to optimize database queries in MongoDB?",
      content:
        "My MongoDB queries are becoming slow as the data grows. What are some strategies for optimizing database queries?",
      tags: ["MongoDB", "Database", "Performance"],
      views: 18,
      upvotes: ["userId4", "userId5"],
      downvotes: [],
      author: "userId1",
      answers: [],
      createdAt: new Date("2024-05-14"),
    },
  ];
  const popularTags = [
    {
      _id: "tagId1",
      name: "JavaScript",
      numberOfQuestions: 120,
      showCount: true,
    },
    {
      _id: "tagId2",
      name: "React",
      numberOfQuestions: 85,
      showCount: true,
    },
    {
      _id: "tagId3",
      name: "Node.js",
      numberOfQuestions: 70,
      showCount: true,
    },
    {
      _id: "tagId4",
      name: "MongoDB",
      numberOfQuestions: 50,
      showCount: false,
    },
    // Add more popular tags as needed
  ];

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">
          Najpopularnija Pitanja
        </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((el) => {
            return (
              <Link
                key={el._id}
                href={`/question/${el._id}`}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">{el.title}</p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popularni Tagovi</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((el) => {
            return (
              <RenderTag
                key={el._id}
                _id={el._id}
                name={el.name}
                totalQuestions={el.numberOfQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
