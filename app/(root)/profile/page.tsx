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
      <div className=" border-black row-span-1 border-2 col-span-10 rounded-[20px] col-start-2 py-[46px] px-[22px] flex  flex-col">
        <div className="flex flex-row gap-32">
          {databaseUser.data.profilePic ? (
            <Image
              src={databaseUser.data.profilePic}
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
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl text-center">{databaseUser.data.username}</h1>
          <p>Sport:{databaseUser.data.sport}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
