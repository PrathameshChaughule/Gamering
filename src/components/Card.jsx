import React from "react";

function Card({ name, com, img }) {
  return (
    <div className="flex flex-col items-center w-fit cursor-pointer hover:bg-white/10 p-3 rounded-xl">
      <img src={img} className="w-50 h-40 rounded-3xl" alt="" />
      <span className="mt-1.5 font-semibold">{name}</span>
      <span className="text-sm text-gray-500 font-semibold">{com}</span>
    </div>
  );
}

export default Card;
