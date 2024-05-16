"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";
import { useForm } from "react-hook-form";

interface Props {
  type?: string;
  mongoUserId: string;
  questionDetails?: string;
}

export default function Question({
  type,
  mongoUserId,
  questionDetails,
}: Props) {
  const { mode } = useTheme();
  const editorRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parsedQuestionDetails =
    questionDetails && JSON.parse(questionDetails || "");
  const groupedTags = parsedQuestionDetails?.tags.map((el: any) => el.name);

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || "",
      explanation: parsedQuestionDetails?.content || "",
      tags: groupedTags || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);

    try {
      if (type === "Edit") {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });

        router.push(`/question/${parsedQuestionDetails._id}`);
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less then 15 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }: any) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Naslov <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Budite precizni i zamislite da postavljate pitanje drugoj osobi.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }: any) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detaljno objašnjenje tvog problema.{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedQuestionDetails?.content || ""}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "light",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Predstavite problem i proširite ono što ste naveli u naslovu.
                Minimum 50 karaktera.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }: any) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tagovi <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "Edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeydown(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((el: any) => (
                        <Badge
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          key={el}
                          onClick={() =>
                            type !== "Edit"
                              ? handleTagRemove(el, field)
                              : () => {}
                          }
                        >
                          {el}
                          {type !== "Edit" && (
                            <Image
                              src="/assets/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Dodajte do 3 taga kako biste opisali o čemu je vaše pitanje.
                Morate pritisnuti enter da biste dodali oznaku.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "Izmeni" ? "Izmena..." : "Postavljanje..."}</>
          ) : (
            <>{type === "Izmeni" ? "Izmeni Pitanje" : "Postavi Pitanje"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
