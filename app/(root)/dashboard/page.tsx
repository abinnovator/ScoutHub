import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="px-8 flex flex-col">
      <div className=" gap-7 flex flex-col">
        <h1>Agility Videos</h1>
        <div className="grid grid-cols-4 ">
          <div className="bg-[#D9D9D9] rounded-[20px] max-w-[324.61px] h-[225] justify-center items-center flex">
            <Link href="/videos/upload">
              <p className="text-white text-center text-[48px]">+</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
