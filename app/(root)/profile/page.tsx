import auth from "@/auth";
import {
  getUserProfileByID,
  listVideosbyCategoryAndUser,
} from "@/lib/actions/appwrite.action";
import Image from "next/image";
import React from "react";

const page = async ({ params }: RouteParams) => {
  const user = await auth.getUser();
  const databaseUser = await getUserProfileByID({ id: user.targets[0].userId });
  console.log(databaseUser);

  return (
    <div className="md:grid md:grid-cols-12 gap-3 md:m-16 flex flex-col md:grid-rows-12">
      <div className="border-black border-2 rounded-[20px] py-[46px] px-[22px] flex flex-col md:justify-between col-span-12">
        <div className="flex flex-col md:flex-row gap-8 md:items-start">
          {databaseUser.data.profilePic ? (
            <img
              src={databaseUser.data.profilePic}
              width={422}
              height={422}
              alt="User profile picture"
              className="rounded-4xl"
            />
          ) : (
            <img
              src="https://placehold.co/422x422/F3F3F3/000000?text=Anonymous+User"
              width={422}
              height={422}
              alt="Anonymous user profile picture"
              className="rounded-4xl"
            />
          )}
          <div className="flex flex-col mt-4 md:mt-0">
            <h1 className="text-3xl text-center md:text-left font-bold">
              {databaseUser.data.username}
            </h1>
            <p className="mt-2 text-center md:text-left">
              Sport: {databaseUser.data.sport}
            </p>
            <p className="text-center md:text-left">
              Position: {databaseUser.data.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
