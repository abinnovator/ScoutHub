import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="px-8 flex flex-col items-center justify-center gap-[52px]">
      <div className="flex flex-row bg-[#F3F3F3] items-center  rounded-[30px] w-[766px] h-[40px]">
        <div className="gap-3.5 flex flex-row px-4">
          <Image src="/Group 19.png" alt="search icon" width={25} height={18} />
          <input></input>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 flex flex-col gap-3">
        <div className="w-[299px] h-[297px] bg-white rounded-2xl shadow overflow-hidden flex flex-col">
          <img
            src="/test-img.jpg"
            class="w-full h-[60%] object-cover rounded-t-2xl"
            alt="Soccer training"
          />
          <div className="flex flex-col px-4 py-4 flex-1">
            <h2 className="font-sans text-lg font-medium text-black mb-1">
              Keeping Training
            </h2>
            <div className="text-gray-300 font-semibold text-base leading-none">
              A B
            </div>
          </div>
        </div>
        <div className="w-[299px] h-[297px] bg-white rounded-2xl shadow overflow-hidden flex flex-col">
          <img
            src="/test-img.jpg"
            class="w-full h-[60%] object-cover rounded-t-2xl"
            alt="Soccer training"
          />
          <div className="flex flex-col px-4 py-4 flex-1">
            <h2 className="font-sans text-lg font-medium text-black mb-1">
              Keeping Training
            </h2>
            <div className="text-gray-300 font-semibold text-base leading-none">
              A B
            </div>
          </div>
        </div>
        <div className="w-[299px] h-[297px] bg-white rounded-2xl shadow overflow-hidden flex flex-col">
          <img
            src="/test-img.jpg"
            className="w-full h-[60%] object-cover rounded-t-2xl"
            alt="Soccer training"
          />
          <div className="flex flex-col px-4 py-4 flex-1">
            <h2 className="font-sans text-lg font-medium text-black mb-1">
              Keeping Training
            </h2>
            <div className="text-gray-300 font-semibold text-base leading-none">
              A B
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
