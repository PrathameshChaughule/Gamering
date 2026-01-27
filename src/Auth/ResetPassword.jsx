import React, { useEffect, useState } from 'react'
import { TbLoader } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient/supabaseClient';
import { toast } from 'react-toastify';

function ResetPassword() {
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const nav = useNavigate()

    useEffect(() => {
        const handleReset = async () => {
            const { data, error } = await supabase.auth.getSessionFromUrl();
            if (error) {
                toast.error(
                    "This password reset link is invalid or has expired. Please request a new one."
                );
                nav("/forgot");
                return;
            }
            if (!data?.session) {
                toast.error("Invalid password reset access.");
                nav("/forgot");
                return;
            }
        };
        handleReset();
    }, [nav]);

    const formSubmit = async (e) => {
        e.preventDefault();

        if (password !== ConfirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Password updated successfully");

            setTimeout(() => {
                nav("/login");
            }, 1000);

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center h-[100vh] w-[100vw]">
            <video
                src="/assets/video/Valorant.webm"
                autoPlay
                muted
                playsInline
                className="hidden md:block absolute inset-0 w-[95.1%] h-[95%] object-cover scale-110 blur-xl opacity-100 transition-all duration-700"
            />
            <img
                src="/assets/video/valorent.webp"
                effect="blur"
                className="block md:hidden absolute inset-0 w-[95.1%] h-[95%] object-cover scale-110 blur-xl opacity-100 transition-all duration-700"
                alt=""
            />
            <div className="absolute inset-0 bg-black/30 h-screen w-screen" />
            <div className="relative z-10 flex items-center justify-center h-full w-full">
                <div className="w-[85%] md:w-[70%] lg:h-[80%] flex rounded-xl justify-between  overflow-hidden bg-white">
                    <div className="hidden lg:flex w-[50%] h-full overflow-hidden relative">
                        <video
                            src="/assets/video/Valorant.webm"
                            poster="/assets/video/valorent.webp"
                            autoPlay
                            muted
                            playsInline
                            className={`absolute w-full rounded-l-xl h-full object-cover object-[40%] scale-115`}
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
                                            Create a New Password
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
                                                className="p-2 px-4 w-full outline-none border-none text-[18px] rounded bg-[#e6e3e6c4] focus:bg-[#e6e3e6c4] placeholder:text-gray-500"
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
                                                className="p-2 px-4 w-full outline-none border-none text-[18px] rounded bg-[#e6e3e6c4] focus:bg-[#e6e3e6c4] placeholder:text-gray-500"
                                                minLength={8}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="p-2 flex items-center justify-center text-[18px] font-bold rounded bg-[#1D232A] text-white cursor-pointer hover:bg-[#1D232A]/90"
                                    >{loading ?
                                        <TbLoader className="animate-[spin_2s_linear_infinite] text-4xl " />
                                        :
                                        <span>Reset password</span>}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p className="text-gray-500 mt-1">
                            Don't receive the email?{" "}
                            <button
                                onClick={() => nav("/forgot")}
                                className="text-black underline font-semibold cursor-pointer hover:text-black/60"
                            >
                                Click to resend
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword