"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPassword() {
  let route = useRouter();
  const [user, setUser] = useState({
    newPassword: "",
    confirmPassword: "",
    token: "",
  });

  


  async function submit() {
    try {
      // frontend validation
      if (user.newPassword !== user.confirmPassword) {
        alert("passowrd don't match");
      }

      const res = await axios.post("/api/users/resetPassword", user);
      console.log("password reset Successfully");
      toast.success("Password reset successfully");
      route.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  }
  function change(event: any) {
    const { name, value } = event.target;
    setUser((prevUser: any) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setUser((prevUser): any => {
      return {
        ...prevUser,
        token: urlToken,
      };
    });
  }, []);
  return (
    <div>
      <h1 className="text-center text-2xl bg-[#5c1f5c]">Reset Your Password</h1>
      <div className="flex flex-col h-[80vh] justify-center">
        <div className=" m-1 p-2 ">
          <label htmlFor="newPassword" className="mr-7 text-xl">
            Enter New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="please enter the new Password"
            value={user.newPassword}
            onChange={change}
            className="text-black p-2 w-[35vw] rounded-md border-none outline-none placeholder-slate-600"
          />
        </div>
        <div className=" m-1 p-2 ">
          <label htmlFor="confirmPassword" className="mr-5 text-xl">
            Enter password again
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="please enter the  Password again"
            value={user.confirmPassword}
            onChange={change}
            className="text-black p-2 w-[35vw] rounded-md border-none outline-none placeholder-slate-600"
          />
        </div>
        <button
          className="mt-5 bg-[blue] w-[15vw] ml-[30vw] p-3 text-xl rounded-md hover:bg-[#63d5fb] hover:text-black"
          onClick={submit}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
