"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createVideo } from "@/lib/actions/appwrite.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: { target: { files: any[] } }) => {
    // Check if files were selected and get the first one
    const file = event.target.files ? event.target.files[0] : null;

    // Update the state with the selected file
    setSelectedFile(file);
    toast("File has been selected");

    // You can now access the file data here for further processing
    console.log(file);
  };
  async function onSubmit(values: {
    title: string;
    description: string;
    category: string;
  }) {
    console.log(values.title);
    const add = await createVideo({
      name: values.title,
      description: values.description,
      category: values.category,
      file: selectedFile,
    });
    console.log(add.sucess);
    if (add.sucess) {
      toast("Video has been created");
      redirect("/");
    }
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
          <Input type="file" onChange={handleFileChange} className="max-w-24" />
        </div>
      </div>
      {/* Details form */}
      <div className="col-span-3 rounded-[20px] border-2 border-black flex items-center justify-center">
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
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <p>Category</p>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dribbling">Dribbling</SelectItem>
                          <SelectItem value="speed">Speed</SelectItem>
                          <SelectItem value="keeping">Keeping</SelectItem>
                          <SelectItem value="agility">Agility</SelectItem>
                        </SelectContent>
                      </Select>
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
