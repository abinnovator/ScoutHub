"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="md:grid md:grid-cols-12 gap-2 flex flex-col">
      {/* Video Upload */}
      <div className="col-start-4 col-span-3 border-2 border-black flex justify-center items-center rounded-[20px] py-5">
        <div className="gap-[46px] justify-center items-center flex flex-col border-2 border-dashed px-6 py-32">
          <div className="flex flex-col gap-2.5 justify-center items-center">
            <p className="text-center">Drag and drop your video here</p>
            <p className="text-[#737373] text-[12px] text-center">
              or click to browse files
            </p>
          </div>
          <Input
            type="file"
            onChange={(event) =>
              onChange(event.target.files ? event.target.files[0] : null)
            }
            className=""
          />
        </div>
      </div>
      {/* Details form */}
      <div className="col-span-3 rounded-[20px] border-2 border-black flex">
        <div className="flex flex-col gap-4 px-4 py-4 items-center justify-center text-center">
          <p>Video Info</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <p>Title</p>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <p>Description</p>
                    <FormControl>
                      <Textarea
                        placeholder="shadcn"
                        className="max-w-[900px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
      <div></div>
    </div>
  );
}

const page = () => {
  return (
    <div className="md:grid md:grid-cols-12 gap-2 flex flex-col">
      {/* Video Upload */}
      <div className="col-start-4 col-span-3 border-2 border-black flex justify-center items-center rounded-[20px] py-5">
        <div className="gap-[46px] justify-center items-center flex flex-col border-2 border-dashed px-6 py-32">
          <div className="flex flex-col gap-2.5 justify-center items-center">
            <p className="text-center">Drag and drop your video here</p>
            <p className="text-[#737373] text-[12px] text-center">
              or click to browse files
            </p>
          </div>
          <Input
            type="file"
            onChange={(event) =>
              onChange(event.target.files ? event.target.files[0] : null)
            }
            className=""
          />
          <Button>Choose file</Button>
        </div>
      </div>
      {/* Details form */}
      <div className="col-span-3 rounded-[20px] border-2 border-black flex">
        <ProfileForm />
      </div>
      <div></div>
    </div>
  );
};

export default page;
