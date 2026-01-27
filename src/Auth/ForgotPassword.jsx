import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient/supabaseClient";
import { TbLoader } from "react-icons/tb";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const nav = useNavigate();

  const videos = [
    {
      src: "/assets/video/League Of Legends.webm",
      position: "object-[60%]",
      poster: "/assets/video/lol.webp",
    },
    {
      src: "/assets/video/Valorant.webm",
      position: "object-[40%] scale-115",
      poster: "/assets/video/valorent.webp",
    },
    {
      src: "/assets/video/Sekiro.webm",
      position: "object-[46%] scale-100",
      poster: "/assets/video/sekiro.webp",
    },
  ];

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetPassword`,
      });

      toast.success(
        "If this email is registered, you'll receive a password reset link shortly."
      );

      if (error) {
        console.error(error.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw]">
      <video
        src="/assets/video/League Of Legends.webm"
        autoPlay
        muted
        playsInline
        className="hidden md:block absolute inset-0 w-[95.1%] h-[95%] object-cover scale-110 blur-xl opacity-100 transition-all duration-700"
      />
      <img
        src="/assets/video/lol.webp"
        effect="blur"
        className="block md:hidden absolute inset-0 w-[95.1%] h-[95%] object-cover scale-110 blur-xl opacity-100 transition-all duration-700"
        alt=""
      />
      <div className="absolute inset-0 bg-black/30 h-screen w-screen" />
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="w-[85%] md:w-[70%] lg:h-[80%] flex rounded-xl justify-between  overflow-hidden bg-white">
          <div className="hidden lg:flex w-[50%] h-full overflow-hidden relative">
            <video
              src="/assets/video/League Of Legends.webm"
              poster="/assets/video/lol.webp"
              autoPlay
              muted
              playsInline
              className={`absolute w-full rounded-l-xl h-full object-cover object-[60%]`}
            />
          </div>

          <div className="w-full lg:w-[50%] h-full px-5 lg:px-17 py-10 flex flex-col lg:gap-10 justify-center text-center text-black">
            <div>
              <form
                onSubmit={(e) => formSubmit(e)}
                action=""
                className="text-start my-4 flex flex-col gap-4"
              >
                <div className="text-start flex flex-col gap-4">
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-center text-[1.85rem] md:text-4xl">
                      Reset Your Password
                    </span>
                    <p className="mt-2 text-center">
                      Forgot your password? Please enter your email and we'll
                      send you a confirmation email.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      className="p-2 px-4 w-full outline-none border-none text-[18px] rounded bg-[#e6e3e6c4] focus:bg-[#e6e3e6c4] placeholder:text-gray-500"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="p-2 flex items-center justify-center text-[18px] font-bold rounded bg-[#1D232A] text-white cursor-pointer hover:bg-[#1D232A]/90"
                  >{loading ?
                    <TbLoader className="animate-[spin_2s_linear_infinite] text-4xl " />
                    :
                    <span>Get Confirmation Email</span>}
                  </button>
                </div>
              </form>
            </div>

            <div>
              <p className="text-gray-500 mt-1">
                Don't have an account?{" "}
                <button
                  onClick={() => nav("/signup")}
                  className="text-black underline font-semibold cursor-pointer hover:text-black/60"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
