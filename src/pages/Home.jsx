import React from "react";
import Hero from "../components/Hero";
import { BsFillGridFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaAngleUp } from "react-icons/fa";
import Card from "../components/Card";
import { pcGames } from "../data/data";

function Home() {
  return (
    <div className="w-[79vw] m-auto py-7">
      <div>
        <Hero />
        <div className="flex flex-col items-start gap-4 my-10 w-fit m-auto">
          <span className="text-2xl">Coming Soon</span>
          <div className="flex gap-3">
            <img
              src="src/assets/Images/up1.jpg"
              className="w-40 h-25 rounded-2xl"
              alt=""
            />
            <img
              src="src/assets/Images/up2.jpg"
              className="w-40 h-25 rounded-2xl"
              alt=""
            />
            <img
              src="src/assets/Images/up3.jpg"
              className="w-40 h-25 rounded-2xl"
              alt=""
            />
            <img
              src="src/assets/Images/up4.jpg"
              className="w-40 h-25 rounded-2xl"
              alt=""
            />
            <img
              src="src/assets/Images/up5.jpg"
              className="w-40 h-25 rounded-2xl"
              alt=""
            />
            <div className="flex flex-col bg-white/5 items-center w-40 h-25 rounded-2xl border-dotted border-3 border-gray-700 cursor-pointer text-gray-400/50 ">
              <span className="text-3xl">+</span>
              <span className="text-center font-semibold">
                Propose
                <br />
                Your Game
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold">Available for acceleration</span>
          <div className="flex gap-4 items-center">
            <div>
              <span className="flex items-center gap-2 text-[18px] cursor-pointer text-white/85">
                <BsFillGridFill /> By Date Added <FaAngleUp />
              </span>
            </div>

            <div className="flex items-center gap-2 text-[18px] bg-white/15 py-1 px-4 rounded mr-3">
              <IoSearch />
              <input
                type="text"
                className="outline-none border-none"
                placeholder="Search by game"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center justify-center flex-wrap">
          {pcGames.map((val) => (
            <Card
              key={val.id}
              name={val.title}
              com={val.company}
              img={val.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
