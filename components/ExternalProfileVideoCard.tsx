"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Video from "next-video";
import { cn } from "@/lib/utils";
import { createTrainingFeedback } from "@/lib/actions/appwrite.action";

const VideoCard = ({
  video,
  user,
}: {
  video: {
    userId: string;
    description: string;
    category: string;
    storageId: string;
    title: string;
    name: string;
    feedback: null | string;
    $id: string;
    $sequence: number;
    $createdAt: string;
    $updatedAt: string;
    $permissions: [];
    $databaseId: string;
    $tableId: "videos";
  };
  user: {
    $id: string;
    email: string;
    username: string;
    sport: string;
    profilePic: string | null;
    coach: boolean;
    $createdAt: string;
    $updatedAt: string;
  };
}) => {
  return (
    <div>
      <div
        className={cn(
          "bg-white rounded-2xl shadow overflow-hidden flex flex-col",
          video.userId !== user.$id && "w-[299px] h-[297px]"
        )}
        key={video.$id}
      >
        {/* Video Player */}
        <Video
          src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${video.storageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
          className="lg:w-[299px] lg:max-h-48 md:w-[250px] md:max-h-48"
        />

        {/* Text */}
        <div className="flex flex-col px-4 py-4 flex-1">
          <h2 className="font-sans text-lg font-medium text-black mb-1 capitalize">
            {video.title}
          </h2>
          <div className="text-gray-300 font-semibold text-base leading-none">
            <Link href={`/profile/${video.userId}`}>{video.name}</Link>
          </div>
          <p className="text-gray-300 font-semibold">
            Category - {video.category}
          </p>
        </div>

        {/* Feedback button (only for owner) */}
        {video.userId === user.$id && (
          <div className="px-4 pb-4">
            {video.feedback ? (
              <Button asChild>
                <Link href={`/videos/${video.$id}`}>View Feedback</Link>
              </Button>
            ) : (
              <Button
                onClick={() =>
                  createTrainingFeedback({
                    storageId: video.storageId,
                    databaseId: video.$id,
                  })
                }
              >
                Generate Feedback
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
