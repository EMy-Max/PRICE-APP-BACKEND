import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";



export async function GET () {
    connectMongoDB();
    const userId = searchParams.get("userId");
    console.log (userId);
    try {
        const user = User.findById(userId);
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
          }
    } catch (error) {
        return Response.json({ error: "Error retrieving user profile"}, { status: 500 });
    }

}