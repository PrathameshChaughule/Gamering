import React from "react";

function Card({ name, com, img }) {
  return (
    <div className="flex flex-col items-center w-35 h-40 lg:h-fit lg:w-fit cursor-pointer hover:bg-white/10 p-3 rounded-xl">
      <img
        src={img}
        className="w-50 h-40 rounded sm:rounded-2xl md:rounded-3xl"
        alt=""
      />
      <span className="mt-1.5 text-sm sm:text-xl font-semibold text-center">
        {name}
      </span>
      <span className="text-sm text-center text-gray-500 font-semibold">
        {com}
      </span>
    </div>
  );
}

export default Card;
