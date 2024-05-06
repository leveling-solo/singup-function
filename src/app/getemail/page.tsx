"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function GetEmail() {
  const route = useRouter();

  const [user, setUser] = useState({
    email :"" 
  });

  async function submit() {
    try {
      const res = await axios.post("/api/users/getemail", user);
      console.log("Check your Eamil ", res.data);
      route.push("/login");
    } catch (error: any) {
      console.log("Email id is not found", error.message);
    }
  }
  function users(event: any) {
    const {name , value} = event.target ; 

    setUser((prevUser:{email : string})=>{ 
      return {
        ...prevUser , 
        [name] : value
      }
    });
  }
  return (
    <div className="flex flex-col h-[100vh] w-full justify-center items-center">
      <div>
        <label htmlFor="email" className="text-2xl ">
          Email :
        </label>
        <input
          type="email"
          name="email"
          placeholder="please enter your email Id "
          value={user.email}
          onChange={users}
          className="ml-2 p-2 rounded-md text-xl placeholder-slate-600 text-black outline-none"
        />
      </div>
      <button
        className="mt-4 ml-3 p-3 w-[15vw] rounded-md bg-[#cb540b] hover:text-black hover:bg-[#e6b354]"
        onClick={submit}
      >
        {" "}
        submit
      </button>
    </div>
  );
}
