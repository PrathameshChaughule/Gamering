import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#0e0f11] text-white">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
