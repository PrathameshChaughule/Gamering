import { BsThreeDots } from "react-icons/bs";
import { FaCrown, FaWindows } from "react-icons/fa";

function Navbar() {
  return (
    <div className="bg-[#181A1E] py-4">
      <div className="flex items-center justify-around w-[85vw] m-auto">
        <img src="/src/assets/Images/logo.png" className="w-37" alt="" />
        <ul className="flex items-center justify-around w-100">
          <li className="cursor-pointer hover:text-gray-400">PC</li>
          <li className="cursor-pointer hover:text-gray-400">PS5</li>
          <li className="cursor-pointer hover:text-gray-400">PS4</li>
          <li className="cursor-pointer hover:text-gray-400">XBOX</li>
        </ul>
        <div className="flex items-center gap-4.5">
          <div className="flex items-center gap-2 p-2 px-4 font-semibold bg-[#0190FF] rounded cursor-pointer hover:bg-blue-700">
            <FaWindows />
            <span>Download</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-700 p-1 rounded">
            <img src="/src/assets/Images/us.svg" className="w-4.5" alt="" />
            <span className="text-[13.5px]">EN</span>
          </div>
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/Images/user.jpg"
              className="w-11 cursor-pointer h-11 border-4 shadow hover:shadow-md shadow-blue-500 border-blue-500 rounded-full"
              alt=""
            />
            <div className="">
              <span className="font-bold cursor-pointer">pratham07</span>
              <span className="flex cursor-pointer items-center gap-2 text-[14px] text-yellow-500">
                <FaCrown /> Subscription
              </span>
            </div>

            <BsThreeDots className="text-3xl px-1 text-gray-400 cursor-pointer rounded hover:bg-gray-800 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
