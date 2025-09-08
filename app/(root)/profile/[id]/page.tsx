import {
  getUserProfileByID,
  listVideosbyCategoryAndUser,
} from "@/lib/actions/appwrite.action";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Player from "next-video/player";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getUserProfileByID({ id: id });
  // console.log(user);
  const agilityVideos = await listVideosbyCategoryAndUser({
    category: "agility",
    userId: id,
  });
  const dribblingVideos = await listVideosbyCategoryAndUser({
    category: "dribbling",
    userId: id,
  });
  const speedVideos = await listVideosbyCategoryAndUser({
    category: "speed",
    userId: id,
  });
  const keepingVideos = await listVideosbyCategoryAndUser({
    category: "keeping",
    userId: id,
  });

  return (
    <div className="md:grid md:grid-cols-12 gap-3 md:m-16 flex flex-col md:grid-rows-12">
      <div className=" border-black row-span-1 border-2 col-span-5 rounded-[20px] col-start-2 py-[46px] px-[22px] flex justify-center items-center flex-col">
        <div className="flex flex-col gap-7">
          {user.data.profilePic ? (
            <Image
              src={user.data.profilePic}
              width={422}
              height={422}
              alt=""
              className="rounded-4xl"
            />
          ) : (
            <Image
              src="/anonymous_user.png"
              width={422}
              height={422}
              alt=""
              className="rounded-4xl"
            />
          )}
          <h1 className="text-3xl text-center">{user.data.username}</h1>
        </div>
      </div>
      <div className="border-black border-2 col-span-6 rounded-[20px] px-7 py-7 flex flex-col gap-8">
        {/* Dribbling Videos */}
        <div className="gap-3 flex flex-col">
          <p>Dribbling Videos</p>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent>
              {dribblingVideos.data?.rows.map((video, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div
                    className="w-[299px] h-[297px] bg-white rounded-2xl shadow overflow-hidden flex flex-col"
                    key={video.$id}
                  >
                    <Player
                      src={`https://fra.cloud.appwrite.io/v1/storage/buckets/68b3f64c003898913ac8/files/${video.storageId}/view?project=68b2aa3a0033c99238f3`}
                    />
                    <div className="flex flex-col px-4 py-4 flex-1">
                      <h2 className="font-sans text-lg font-medium text-black mb-1">
                        {video.title}
                      </h2>
                      <div className="text-gray-300 font-semibold text-base leading-none">
                        <Link href={`/profile/${video.userId}`}>
                          {video.name}
                        </Link>
                      </div>
                      <p className="text-gray-300 font-semibold">
                        Category - {video.category}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* Agility */}
        <div>
          <p>Agility Videos</p>
          {agilityVideos.data?.rows.length == 0 ? (
            <p className="text-gray-600">No Agility videos</p>
          ) : (
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {agilityVideos.data?.rows.map((video, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className="w-[299px] h-[297px] bg-white rounded-2xl shadow overflow-hidden flex flex-col"
                      key={video.$id}
                    >
                      <Player
                        src={`https://fra.cloud.appwrite.io/v1/storage/buckets/68b3f64c003898913ac8/files/${video.storageId}/view?project=68b2aa3a0033c99238f3`}
                      />
                      <div className="flex flex-col px-4 py-4 flex-1">
                        <h2 className="font-sans text-lg font-medium text-black mb-1">
                          {video.title}
                        </h2>
                        <div className="text-gray-300 font-semibold text-base leading-none">
                          <Link href={`/profile/${video.userId}`}>
                            {video.name}
                          </Link>
                        </div>
                        <p className="text-gray-300 font-semibold">
                          Category - {video.category}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
        {/* Speed Videos */}
        <div>
          <p>Speed Videos</p>
          {speedVideos.data?.rows.length == 0 ? (
            <p className="text-gray-600">No Speed videos</p>
          ) : (
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {speedVideos.data?.rows.map((video, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className="w-[299px] h-[297px] bg-white rounded-2xl shadow overflow-hidden flex flex-col"
                      key={video.$id}
                    >
                      <Player
                        src={`https://fra.cloud.appwrite.io/v1/storage/buckets/68b3f64c003898913ac8/files/${video.storageId}/view?project=68b2aa3a0033c99238f3`}
                      />
                      <div className="flex flex-col px-4 py-4 flex-1">
                        <h2 className="font-sans text-lg font-medium text-black mb-1">
                          {video.title}
                        </h2>
                        <div className="text-gray-300 font-semibold text-base leading-none">
                          <Link href={`/profile/${video.userId}`}>
                            {video.name}
                          </Link>
                        </div>
                        <p className="text-gray-300 font-semibold">
                          Category - {video.category}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
        {/* Keeping Videos */}
        <div>
          <p>Keeping Videos</p>
          {keepingVideos.data?.rows.length == 0 ? (
            <p className="text-gray-600">No Keeping videos</p>
          ) : (
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {keepingVideos.data?.rows.map((video, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className="w-[299px] h-[297px] bg-white rounded-2xl shadow overflow-hidden flex flex-col"
                      key={video.$id}
                    >
                      <Player
                        src={`https://fra.cloud.appwrite.io/v1/storage/buckets/68b3f64c003898913ac8/files/${video.storageId}/view?project=68b2aa3a0033c99238f3`}
                      />
                      <div className="flex flex-col px-4 py-4 flex-1">
                        <h2 className="font-sans text-lg font-medium text-black mb-1">
                          {video.title}
                        </h2>
                        <div className="text-gray-300 font-semibold text-base leading-none">
                          <Link href={`/profile/${video.userId}`}>
                            {video.name}
                          </Link>
                        </div>
                        <p className="text-gray-300 font-semibold">
                          Category - {video.category}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
