import React from "react";

function Hero() {
  return (
    <div className="w-full h-90 flex items-end justify-center relative">
      <img
        src="/src/assets/Images/Cyberpunk.png"
        className="w-[350px] absolute right-30 -top-13 z-20 drop-shadow-2xl"
        alt=""
      />

      <div
        className="max-w-[1062px] flex justify-between w-full h-80 relative 
                  rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 
                  overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-yellow-600 blur-3xl opacity-40 rounded-full"></div>
        <div className="absolute top-20 -right-10 w-60 h-60 bg-yellow-500 blur-[90px] opacity-30 rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-yellow-700 blur-[100px] opacity-20 rounded-full"></div>

        <div className="flex flex-col p-18 pt-7 relative z-10">
          <span className="px-3 py-1 text-black font-semibold rounded bg-yellow-400 w-fit mt-4">
            New
          </span>

          <span className="text-5xl mt-10 font-bold">Cyberpunk 2077</span>

          <span className="text-yellow-400 text-xl mt-4">$69.99</span>

          <div className="p-2 px-3 w-fit mt-4 rounded-md bg-white/10 flex gap-2">
            <span className="p-2.5 px-4 bg-yellow-400 text-black rounded font-bold cursor-pointer">
              Purchase
            </span>
            <span className="p-2.5 px-3 rounded text-yellow-400 font-bold cursor-pointer hover:bg-white/20">
              Add To Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
