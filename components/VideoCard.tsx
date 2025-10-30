"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";



import { cn } from "@/lib/utils";
import { createVideoFeedback } from "@/lib/actions/gemini.action";

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
    name: "Ab";
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
    $createdAt: string;
    $updatedAt: string;
    name: string;
    registration: string;
    status: true;
    labels: [];
    passwordUpdate: string;
    email: string;
    phone: string;
    emailVerification: false;
    phoneVerification: false;
    mfa: false;
    prefs: object;

    targets: [
      {
        $id: string;
        $createdAt: string;
        $updatedAt: string;
        name: string;
        userId: string;
        providerId: null;
        providerType: string;
        identifier: string;
        expired: false;
      }
    ];
    accessedAt: string;
  };
}) => {
  console.log(user);
  return (
    <div>
      <div
        className={cn(
          "bg-white rounded-2xl shadow overflow-hidden flex flex-col dark:bg-black",
          video.userId != user.targets[0].userId && "w-[299px] h-[297px]"
        )}
        key={video.$id}
      >
        {/* Video Player */}
        <video
          src={`/api/video?url=${encodeURIComponent(
            `https://fra.cloud.appwrite.io/v1/storage/buckets/${
              process.env.NEXT_PUBLIC_BUCKET_ID || "68b3f64c003898913ac8"
            }/files/${video.storageId}/view?project=${
              process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
              "68c447580000ec4685da"
            }`
          )}`}
          className="lg:w-[299px] lg:max-h-48 md:w-[250px] md:max-h-48"
          controls
        />
        {/* Text */}
        <div className="flex flex-col px-4 py-4 flex-1">
          <h2 className="font-sans text-lg font-medium light:text-black mb-1 capitalize">
            {video.title}
          </h2>
          <div className="text-gray-300 font-semibold text-base leading-none">
            <Link href={`/profile/${video.userId}`}>{video.name}</Link>
          </div>
          <p className="text-gray-300 font-semibold">
            Category - {video.category}
          </p>
        </div>
        {/* Feedback */}
        {video.userId == user.targets[0].userId && (
          <>
            {video.feedback ? (
              <Button>
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
          </>
        )}
        {/* {user.targets[0].userId && (
          <Button>
            {video.feedback ? (
              <Button>
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
          </Button>
        )} */}
      </div>
    </div>
  );
};

export default VideoCard;
