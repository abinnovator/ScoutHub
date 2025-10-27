import auth from "@/auth";
import VideoCard from "@/components/VideoCard";
import {
  getUserProfileByID,
  listVideosbyCategoryAndUser,
} from "@/lib/actions/appwrite.action";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await auth.getUser();

  const agilityVideos = await listVideosbyCategoryAndUser({
    category: "agility",
    userId: user.targets[0].userId,
  });
  const dribblingVideos = await listVideosbyCategoryAndUser({
    category: "dribbling",
    userId: user.targets[0].userId,
  });
  const speedVideos = await listVideosbyCategoryAndUser({
    category: "speed",
    userId: user.targets[0].userId,
  });
  const keepingVideos = await listVideosbyCategoryAndUser({
    category: "keeping",
    userId: user.targets[0].userId,
  });
  console.log(agilityVideos.data.rows);
  return (
    <div className="px-8 flex flex-col">
      {/* Agility Videos */}
      <div className=" gap-7 flex flex-col">
        <h1>Agility Videos</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#D9D9D9] rounded-[20px] max-w-[324.61px] h-[225] justify-center items-center flex">
            <Link href="/videos/upload">
              <p className="text-white text-center text-[48px]">+</p>
            </Link>
          </div>
          {agilityVideos.data?.rows.map((video) => (
            <div key={video.$id}>
              <VideoCard video={video} user={user} />
            </div>
          ))}
        </div>
      </div>
      {/* Speed Videos */}
      <div className=" gap-7 flex flex-col">
        <h1>Speed Videos</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#D9D9D9] rounded-[20px] max-w-[324.61px] h-[225] justify-center items-center flex">
            <Link href="/videos/upload">
              <p className="text-white text-center text-[48px]">+</p>
            </Link>
          </div>
          {speedVideos.data.rows.map((video) => (
            <div key={video.$id}>
              <VideoCard video={video} user={user} />
            </div>
          ))}
        </div>
      </div>
      {/* Dribbling Videos */}
      <div className=" gap-7 flex flex-col">
        <h1>Dribbling Videos</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#D9D9D9] rounded-[20px] max-w-[324.61px] h-[225] justify-center items-center flex">
            <Link href="/videos/upload">
              <p className="text-white text-center text-[48px]">+</p>
            </Link>
          </div>
          {dribblingVideos.data?.rows.map((video) => (
            <div key={video.$id}>
              <VideoCard video={video} user={user} />
            </div>
          ))}
        </div>
      </div>
      {/* Keeping Videos */}
      <div className=" gap-7 flex flex-col">
        <h1>Keeping Videos</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#D9D9D9] rounded-[20px] max-w-[324.61px] h-[225] justify-center items-center flex">
            <Link href="/videos/upload">
              <p className="text-white text-center text-[48px]">+</p>
            </Link>
          </div>
          {keepingVideos.data?.rows.map((video) => (
            <div key={video.$id}>
              <VideoCard video={video} user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
