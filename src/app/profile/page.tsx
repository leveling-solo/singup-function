"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  const logout = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetials = async () => {
    try {
      const res = await axios.get("/api/users/userinfo");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex  flex-col  justify-center items-center  h-[100vh] w-full ">
      <div className="border-2 border-[red] h-[25rem] flex flex-col items-center justify-between w-[18rem] rounded-md p-2">
        <h1 className="text-2xl text-[red]">Profile</h1>

        <h2 className="border-1 bg-[blue] p-2 rounded-md">
          {data === "Nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <button
          className="ml-2 bg-purple-500 p-[10px_30px] rounded-md text-xl text-black   hover:bg-[#7e074c] hover:text-white"
          onClick={logout}
        >
          Logout
        </button>

        <button
          className="ml-2 bg-[blue] p-[10px_30px] rounded-md text-xl text-white   hover:bg-[#7e074c] hover:text-white"
          onClick={getUserDetials}
        >
          User Infomation
        </button>
      </div>
    </div>
  );
}
