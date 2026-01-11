import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const nav = useNavigate();

  const logOut = async () => {

    try {
      await axios.patch(`http://localhost:3000/users/${userData.userId}`, {
        status: "Inactive"
      })
      localStorage.removeItem("auth", "cart");
      nav("/");
    } catch (error) {
      console.log(error);
    }
    return;
  };

  return (
    <div className="z-100 flex flex-col gap-2 rounded-xl p-5 bg-[#1D1D1D] border border-white/10 w-fit h-fit">
      <p className="text-center text-xl">
        {userData.firstName} {userData.lastName}
      </p>
      <div className="text-lg flex flex-col gap-1 p-2 py-1">
        <p className="px-4 py-1 rounded hover:bg-[#111315] cursor-pointer">
          My Orders
        </p>
        <p className="px-4 py-1 rounded hover:bg-[#111315] cursor-pointer">
          Wishlist
        </p>
        <p onClick={() => nav("/library")} className="px-4 py-1 rounded hover:bg-[#111315] cursor-pointer">
          Library
        </p>
        {userData.role === "admin" && (
          <p
            onClick={() => nav("/admin")}
            className="px-4 py-1 rounded hover:bg-[#111315] cursor-pointer"
          >
            Admin Dashboard
          </p>
        )}

        <div
          onClick={logOut}
          className="text-center p-1 mt-2 bg-[#ff04043c]/60 hover:bg-[#ff04043c] font-bold cursor-pointer text-red-600 rounded-xl pb-1.5"
        >
          <span>LogOut</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
