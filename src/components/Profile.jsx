import { useNavigate } from "react-router-dom";

function Profile() {
  const nav = useNavigate();
  return (
    <div className="absolute flex flex-col gap-2 right-25 rounded-xl p-5 bg-[#1D1D1D] border border-white/10 mt-5 w-fit h-fit">
      <p className="text-center text-xl">Prathamesh Chaughule</p>
      <div className="text-lg flex flex-col gap-2 p-3 py-1">
        <p className="px-1 rounded hover:bg-[#111315] cursor-pointer">
          My Orders
        </p>
        <p className="px-1 rounded hover:bg-[#111315] cursor-pointer">
          Wishlist
        </p>
        <p className="px-1 rounded hover:bg-[#111315] cursor-pointer">
          Library
        </p>
        <p
          onClick={() => nav("/admin")}
          className="px-1 rounded hover:bg-[#111315] cursor-pointer"
        >
          Admin Dashboard
        </p>
        <div className="text-center p-1 mt-1 bg-[#ff04043c]/60 hover:bg-[#ff04043c] font-bold cursor-pointer text-red-600 rounded-xl pb-1.5">
          <span>LogOut</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
