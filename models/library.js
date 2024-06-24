import mongoose, { Schema } from "mongoose";

const librarySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  bookId: [{ type: Schema.Types.ObjectId, ref: "Book" }],
}, {
  timestamps: true,
});

const Library = mongoose.models.Library || mongoose.model("Library", librarySchema);

export default Library;
