import { isDev } from "@/lib/const";
import mongoose from "mongoose";

const mongoDbUri = isDev ? process.env.MONGO_URI : process.env.MONGODB_URI;

// If MongoDb uri is not provided we will throw an error
if (!mongoDbUri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// When we first connect to the db we will cache that connection in a variable named cached so that we don't have to connect to the database again and again on each and every request.
let cached = global.mongoose;
// If we don't have cached connection then first we will set conn: null, promise: null
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// creating an async function to connect to the db
async function connectMongoDB() {
  // If we have cached connection then we don't  have to make connection once again. we will return the old connection.
  if (cached.conn) {
    console.log("Cached Connection");
    return cached.conn;
  }

  // If we don't have cached connection then we will create one and return it.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    // console.log('Fresh Connection')////
    cached.promise = await mongoose.connect(mongoDbUri).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
// export

export default connectMongoDB;
