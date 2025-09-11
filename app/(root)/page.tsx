import auth from "@/auth";
import { listVideos } from "@/lib/actions/appwrite.action";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Video from "next-video";
import Player from "next-video/player";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createVideoFeedback } from "@/lib/actions/gemini.action";
import VideoCard from "@/components/VideoCard";

const page = async () => {
  const user = await auth.getUser();

  const videosRaw = await listVideos();
  const videos = videosRaw.data?.rows;

  return (
    <div className="px-8 flex flex-col items-center justify-center gap-[52px]">
      {/* <div className="flex flex-row bg-[#F3F3F3] items-center  rounded-[30px] w-[766px] h-[40px]">
        <div className="gap-3.5 flex flex-row px-4">
          <Image src="/Group 19.png" alt="search icon" width={25} height={18} />
          <input></input>
        </div>
      </div> */}
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 flex flex-col gap-3 justify-center items-center">
        {videos?.map((video) => (
          // <div
          //   className={cn(
          //     "bg-white rounded-2xl shadow overflow-hidden flex flex-col",
          //     video.userId != user.targets[0].userId && "w-[299px] h-[297px]"
          //   )}
          //   key={video.$id}
          // >
          //   {/* Video Player */}
          //   <Player
          //     src={`https://fra.cloud.appwrite.io/v1/storage/buckets/68b3f64c003898913ac8/files/${video.storageId}/view?project=68b2aa3a0033c99238f3`}
          //     className="lg:w-[299px] lg:max-h-48 md:w-[250px] md:max-h-48"
          //   />
          //   {/* Text */}
          //   <div className="flex flex-col px-4 py-4 flex-1">
          //     <h2 className="font-sans text-lg font-medium text-black mb-1">
          //       {video.title}
          //     </h2>
          //     <div className="text-gray-300 font-semibold text-base leading-none">
          //       <Link href={`/profile/${video.userId}`}>{video.name}</Link>
          //     </div>
          //     <p className="text-gray-300 font-semibold">
          //       Category - {video.category}
          //     </p>
          //   </div>
          //   {/* Feedback */}
          //   {video.userId == user.targets[0].userId && (
          //     <Button
          //       onClick={createVideoFeedback({
          //         fileUrl: `https://fra.cloud.appwrite.io/v1/storage/buckets/68b3f64c003898913ac8/files/${video.storageId}/view?project=68b2aa3a0033c99238f3`,
          //       })}
          //     >
          //       Generate Feedback
          //     </Button>
          //   )}
          // </div>
          <VideoCard user={user} video={video} key={video.$id} />
        ))}
      </div>
    </div>
  );
};

export default page;
