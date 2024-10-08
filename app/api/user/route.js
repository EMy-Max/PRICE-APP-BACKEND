import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
 connectMongoDB();
// show list of all users
export async function GET() {
  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching users" },
      { status: 500 }
    );
  }
}

//register user
export async function POST(request) {
  
  try {
    // Collecting user info from front end
    const reqBody = await request.json();
    // console.log (reqBody);
    const { email, password, firstName, lastName, phoneNumber } = reqBody;
    
    //check if user exist
    const findUser = await User.findOne({ email });
    if (!!findUser) {
      return Response.json(
        {
          error: "User Already Exists",
        },
        { status: 400 }
      );
    }
    // hash password before saving user
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashPassword,
      phoneNumber,
    });
    // console.log()
    const savedUser = await newUser.save();
// console.log(savedUser)
    return Response.json(
      { data: savedUser, message: "User created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}


