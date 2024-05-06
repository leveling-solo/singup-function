"use client";

import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed ", error.message);
      toast.error(error.message);
    }
  };

  function change(event: any) {
    const { name, value } = event.target;
    setUser(
      (preSetUser: { email: string; password: string; username: string }) => {
        return {
          ...preSetUser,
          [name]: value,
        };
      }
    );
  }

  return (
    <div className="  flex flex-col h-[100vh] w-full justify-center items-center">
      <h1 className="text-3xl text-[red]">Signup</h1>
      <div className=" border-2 border-[blue] h-[25rem] w-[18rem] p-2 rounded-md mt-4">
        <div className="flex flex-col items-center">
          <label htmlFor="username" className=" text-start text-[3vw] ">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={user.username}
            onChange={change}
            className=" outline-none rounded-md p-2 mt-2 border-none  text-black"
          />
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="email" className="text-[3vw] mt-2 ">
            Email
          </label>
          <input
            type="email"
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
        <div className="mt-3 text-center ">
          <button
            className="mt-2 bg-[#4b077f] p-[4px_30px] text-2xl rounded-md"
            onClick={onSignup}
          >
            Sinup
          </button>
        </div>

        <div className="mt-5 text-center">
          <p>
            if you already signup?{" "}
            <Link
              href="/login"
              className=" cursor-pointer border-b-2 border-white"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
