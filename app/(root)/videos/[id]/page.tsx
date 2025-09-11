import auth from "@/auth";
import VideoCard from "@/components/FeedbackVideoCard";
import { getVideoInfoById } from "@/lib/actions/appwrite.action";
import ReactMarkdown from "react-markdown";

import React from "react";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const video = await getVideoInfoById({ id: id });
  console.log(video);
  const user = await auth.getUser();
  return (
    <div className="lg;grid lg:grid-cols-12 md:grid-cols-6 md:grid m-5 gap-3 flex flex-col">
      {/* Video Player */}
      <div className="col-span-8">
        <VideoCard video={video.data} user={user} />
      </div>
      {/* Feedback */}

      <div className="col-span-4 border-black border-2 rounded-4xl">
        <h1 className="text-center">Ai Feedback</h1>
        <ReactMarkdown>{video.data.feedback}</ReactMarkdown>
      </div>
    </div>
  );
};

export default page;
