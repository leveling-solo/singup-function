"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerfiyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEamil = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEamil();
    }
  }, [token]);

  return (
    <div className="flex flex-col  justify-start  min-h-screen py-2">
      {verified && (
        <div className=" h-[30vw]  ">
          <h1 className="p-2  bg-[green] mb-10  text-center text-2xl">Email Verified </h1>
          <div className="flex justify-center">
          <Link href="/login" className=" bg-[#9b20f8] text-white p-2  rounded-md hover:text-[#a8cd03]">Go to the Login page</Link>
          </div>
        </div>
      )}
      {error && (
        <div>
          <h1 className="p-2 mb-3 bg-[red] mt-2 rounded-md text-center">Email Not Verified </h1>
        </div>
      )}
    </div>
  );
}
