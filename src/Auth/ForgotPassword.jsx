import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ForgotPassword() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmOtp, setConfirmOtp] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  const videos = [
    {
      src: "/assets/video/solo-leveling - Trim.mp4",
      position: "object-[54%]",
      poster: "/assets/images/solo-leveling.png",
    },
    {
      src: "/assets/video/League of Legends - Trim.mp4",
      position: "object-[60%]",
      poster: "/assets/images/lol.png",
    },
    {
      src: "/assets/video/mortal-kombat - Trim.mp4",
      position: "object-[50%] scale-120",
      poster: "/assets/images/mortal-kombat.png",
    },
    {
      src: "/assets/video/valorant - Trim.mp4",
      position: "object-[40%] scale-115",
      poster: "/assets/images/valorant.png",
    },
    {
      src: "/assets/video/sekiro - Trim.mp4",
      position: "object-[46%] scale-100",
      poster: "/assets/images/sekiro.png",
    },
  ];

  const handleEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const otpGenerate = () => {
    const otpGenerate = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    setOtp(otpGenerate);
    toast.info(`Your OTP is ${otpGenerate}`, {
      autoClose: 5000,
    });
  };

  const handleChange = (e) => {
    if (!/^\d$/.test(e.target.value)) return;

    const nextInput = e.target.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
  };

  const emailHandle = async () => {
    const response = await axios.get(
      `http://localhost:3000/users?email=${email}`
    );
    const res = response.data;
    if (res.length === 0) {
      toast.error("Email not registered. Please sign up first.");
      return;
    }
    setPage("otp");
    otpGenerate();
  };

  const otpHandle = () => {
    if (confirmOtp.join("") === otp) {
      setPage("password");
    } else {
      toast.error("Invalid OTP. Please try again");
    }
  };

  const passwordHandle = async () => {
    if (password !== ConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const response = await axios.get(
      `http://localhost:3000/users?email=${email}`
    );

    const res = response.data[0];

    await axios.patch(`http://localhost:3000/users/${res.id}`, { password });
    toast.success("Password reset successful");
    setTimeout(() => {
      nav("/login");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <video
        key={`bg-${currentIndex}`}
        src={videos[currentIndex].src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-[95.1%] h-[95%] object-cover scale-110 blur-xl opacity-100 transition-all duration-700"
      />

      <div className="absolute inset-0 bg-black/30 h-screen w-screen" />
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="w-[70%] h-[80%] flex rounded-xl justify-between  overflow-hidden bg-white">
          <div className="flex w-[50%] h-156 overflow-hidden relative">
            <video
              src={videos[currentIndex].src}
              poster={videos[currentIndex].poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onEnded={handleEnd}
              className={`absolute w-full rounded-l-xl h-full object-cover ${videos[currentIndex].position}`}
            />
          </div>

          <div className="w-[50%] h-full px-17 py-10 flex flex-col gap-10 justify-center text-center text-black">
            <div>
              <form
                onSubmit={(e) => formSubmit(e)}
                action=""
                className="text-start my-4 flex flex-col gap-4"
              >
                {page === "email" ? (
                  <div className="text-start flex flex-col gap-4">
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-semibold text-4xl">
                        Reset your password
                      </span>
                      <p className="mt-2 text-center">
                        Forgot your password? Please enter your email and we'll
                        send you a 4-digit code.
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
                        className="p-2 px-4 w-full outline-none border-none text-[18px] rounded bg-[#e6e3e6c4] placeholder:text-gray-500"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={() => emailHandle()}
                      className="p-2  text-[18px] font-bold rounded bg-[#1D232A] text-white cursor-pointer hover:bg-[#1D232A]/90"
                    >
                      <span>Get 4-digit code</span>
                    </button>
                  </div>
                ) : page === "otp" ? (
                  <div className="text-start flex flex-col gap-4">
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-semibold text-4xl">
                        Enter confirmation code
                      </span>
                      <p className="mt-2 text-center">
                        We sent a code to{" "}
                        <span className="font-bold">{email}</span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-3 justify-center">
                        {confirmOtp.map((value, index) => (
                          <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="1"
                            value={value}
                            onChange={(e) => {
                              if (!/^\d?$/.test(e.target.value)) return;
                              const newOtp = [...confirmOtp];
                              newOtp[index] = e.target.value;
                              setConfirmOtp(newOtp);
                              handleChange(e);
                            }}
                            className="w-14 h-14 text-center text-xl font-semibold border-2 rounded-lg outline-none focus:border-purple-500 transition"
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={() => {
                        otpHandle();
                      }}
                      className="p-2  text-[18px] font-bold rounded bg-[#1D232A] text-white cursor-pointer hover:bg-[#1D232A]/90"
                    >
                      <span>Continue</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-start flex flex-col gap-4">
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-semibold text-4xl">
                        Create a new password
                      </span>
                      <p className="mt-2 text-center">
                        Please choose a password that hasn't been used before.
                        Must be at least 8 characters..
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-medium">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          placeholder="Set new password"
                          onChange={(e) => setPassword(e.target.value)}
                          className="p-2 px-4 w-full outline-none border-none text-[18px] rounded bg-[#e6e3e6c4] placeholder:text-gray-500"
                          minLength={8}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-medium">
                          Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={ConfirmPassword}
                          placeholder="Confirm new password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="p-2 px-4 w-full outline-none border-none text-[18px] rounded bg-[#e6e3e6c4] placeholder:text-gray-500"
                          minLength={8}
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={() => passwordHandle()}
                      className="p-2  text-[18px] font-bold rounded bg-[#1D232A] text-white cursor-pointer hover:bg-[#1D232A]/90"
                    >
                      <span>Reset password</span>
                    </button>
                  </div>
                )}
              </form>
            </div>

            <div>
              {page === "email" ? (
                <p className="text-gray-500 mt-1">
                  Don't have an account?{" "}
                  <span
                    onClick={() => nav("/signup")}
                    className="text-black underline font-semibold cursor-pointer hover:text-black/60"
                  >
                    Sign Up
                  </span>
                </p>
              ) : page === "code" ? (
                <p className="text-gray-500 mt-1">
                  Don't receive the email?{" "}
                  <span
                    onClick={() => otpGenerate()}
                    className="text-black underline font-semibold cursor-pointer hover:text-black/60"
                  >
                    Click to resend
                  </span>
                </p>
              ) : (
                <p className="text-gray-500 mt-1">
                  Don't have an account?{" "}
                  <span
                    onClick={() => nav("/login")}
                    className="text-black underline font-semibold cursor-pointer hover:text-black/60"
                  >
                    Log In
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
