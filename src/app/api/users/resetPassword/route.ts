import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { newPassword, token } = reqBody;
 console.log(newPassword , token)
  
 
 const user = await User.findOne({
       forgotPasswordToken: token,
       forgotPasswordExpiry: { $gt: Date.now() },
      });
      console.log(user)
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { forgotPasswordToken: token },
      { $set: { password: hashedPassword } }
    );
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    return NextResponse.json(
      {
        message: "Password changed Successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
