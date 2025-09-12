import VideoCard from "@/components/ExternalProfileVideoCard";
import {
  getUserProfileByID,
  listVideosbyCategoryAndUser,
} from "@/lib/actions/appwrite.action";
import Image from "next/image";
import React from "react";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getUserProfileByID({ id });
  const categories = ["dribbling", "agility", "speed", "keeping"];

  // Fetch videos for each category
  const videosByCategory: Record<string, any[]> = {};
  for (const category of categories) {
    const res = await listVideosbyCategoryAndUser({ category, userId: id });
    videosByCategory[category] = res.data?.rows || [];
  }

  return (
    <div className="md:flex md:flex-col flex flex-col gap-8">
      {/* User header */}
      <div className="border-black border-2 rounded-[20px] py-[46px] px-[22px] flex flex-col">
        <div className="flex flex-row gap-7 items-center">
          <Image
            src={`https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(
              user?.data.username || "User"
            )}&width=192&height=192&project=console`}
            width={122}
            height={122}
            alt="profile avatar"
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-semibold">{user.data.username}</h1>
            <p className="text-gray-600 capitalize">{user.data.sport}</p>
          </div>
        </div>
      </div>

      {/* Video sections */}
      <div className="border-black border-2 rounded-[20px] px-7 py-7 flex flex-col gap-10">
        {categories.map((category) => (
          <div key={category}>
            <p className="text-xl font-medium mb-4 capitalize">
              {category} Videos
            </p>

            {videosByCategory[category].length === 0 ? (
              <p className="text-gray-600">No {category} videos</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videosByCategory[category].map((video) => (
                  <VideoCard key={video.$id} video={video} user={user.data} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
