"use client";

import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    }
  };

  function change(event: any) {
    const { name, value } = event.target;
    setUser((preSetUser: { email: string; password: string }) => {
      return {
        ...preSetUser,
        [name]: value,
      };
    });
  }

  return (
    <div className="  flex flex-col h-[100vh] w-full justify-center items-center">
      <h1 className="text-3xl text-[red]">Login</h1>
      <div className=" border-2 border-[blue] h-auto w-[22rem] p-2 rounded-md mt-4">
        <form>
          <div className="flex flex-col items-center">
            <label htmlFor="email" className="text-[3vw] mt-2 ">
              Email
            </label>
            <input
              type="eamil"
              placeholder="Email"
              name="email"
              onChange={change}
              value={user.email}
              className=" outline-none rounded-md p-2 mt-2 border-none text-black "
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="password" className="text-[3vw] mt-2 ">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={user.password}
              onChange={change}
              className=" outline-none rounded-md p-2 mt-2 border-none text-black "
            />
          </div>
        </form>
        <div className="flex justify-end mt-3"> 
          <Link href="/getemail" className="border-b-2 border-white inline  text-xs ">forget password</Link>
        </div>
        <div className="mt-3 text-center ">
          <button
            className="mt-2 bg-[#4b077f] p-[4px_30px] text-2xl rounded-md"
            onClick={onLogin}
          >
            Login
          </button>
        </div>

        <div className="mt-5 text-center">
          <p>
            Create New Account{" "}
            <Link
              href="/signup"
              className=" cursor-pointer border-b-2 border-white"
            >
              signup Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
