import React from "react";
import { FaRegEye } from "react-icons/fa";
import { LuDot } from "react-icons/lu";

function News({ title, date, view, img, desc }) {
  return (
    <div>
      <div className="flex flex-col cursor-pointer md:w-80 rounded-2xl bg-gray-400/10">
        <img src={img} className="h-43 rounded-t-2xl" alt="" />
        <div className="px-4 py-2">
          <span>{title}</span>
          <div className="flex gap-3 text-md my-1.5 text-gray-400">
            <span className="flex items-center gap-2">
              {date}
              <LuDot />
            </span>
            <span className="flex items-center gap-2">
              <FaRegEye /> {view}
            </span>
          </div>
          <span className="text-sm text-gray-500">{desc}</span>
        </div>
      </div>
    </div>
  );
}

export default News;
