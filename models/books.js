import mongoose, { Schema } from "mongoose";
const bookSchema = new Schema(
  {
    title: { type: String },
    authors: { type: [String] },
    aboutAuthor: { type: String },
    aboutBook: { type: String },
    imageUrl: { type: String },
    pdfUrl: {type: String},
    contentText: { type: String },
    category: { type: String },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    isPurchased: { type: Boolean, default: false },
    numberOfPages: { type: String },
    releaseYear: { type: String },
    edition: { type: String },
    isAvailable: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
