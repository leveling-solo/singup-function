import  {connect}  from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // check if email alreay exist
    const existingEmailId = await User.findOne({ email });
    if (existingEmailId) {
      return NextResponse.json(
        { error: " Eamil already exists" },
        { status: 400 }
      );
    }

    // check if user already exist
    const user = await User.findOne({ username });
    if (user) {
      console.log("User name is already exists")
      return NextResponse.json(
        {

          error: "User name is already exists",
        },
        { status: 400 }, 
      );
    }

    //  hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword:string = await bcryptjs.hash(password, salt);

    //  creating new user with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //  saving new user
    const savedUser :any= await newUser.save();


    // send verification email
    
    await sendEmail({email , emailType : "VERIFY", userId : savedUser._id})
 

    return NextResponse.json(
      {
        message: "User Created Successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
