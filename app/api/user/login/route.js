import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//login user
export async function POST(request) {
  try {
    await connectMongoDB();
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {});
    console.log(token);
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}