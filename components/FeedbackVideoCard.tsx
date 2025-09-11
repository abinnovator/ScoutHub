"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Player from "next-video/player";
import { cn } from "@/lib/utils";
import { createVideoFeedback } from "@/lib/actions/gemini.action";
import video from "next-video";
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
  return (
    <div>
      <div
        className={cn(
          "bg-white rounded-2xl shadow overflow-hidden flex flex-col"
        )}
        key={video.$id}
      >
        {/* Video Player */}
        <Player
          src={`https://fra.cloud.appwrite.io/v1/storage/buckets/68b3f64c003898913ac8/files/${video.storageId}/view?project=68b2aa3a0033c99238f3`}
          className="lg:w-[873px] lg:max-h-[674px] md:w-[250px] md:max-h-48"
        />
        {/* Text */}
        <div className="flex flex-col px-4 py-4 flex-1">
          <h2 className="font-sans text-lg font-medium text-black mb-1">
            {video.title}
          </h2>
          <div className="text-gray-300 font-semibold text-base leading-none">
            <Link href={`/profile/${video.userId}`}>{video.name}</Link>
          </div>
          <p className="text-gray-300 font-semibold">
            Category - {video.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
