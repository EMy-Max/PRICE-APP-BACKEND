import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";



connectMongoDB();
//login user
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    // check if user exists
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log (isPasswordValid)
    if (!isPasswordValid) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    //Generate JWToken or session token
    const token = jwt.sign({ userId: user._id, role:user.role, username:`${user.firstName} ${user.lastName}`}, process.env.JWT_SECRET, {});
    console.log(token);
    return NextResponse.json({ message: "Login successful",  data: user, token: token}, { status: 200 }, {cookies: token});
  } catch (error) {
    console.error("Error logging in:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}