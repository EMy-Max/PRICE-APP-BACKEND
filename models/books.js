import mongoose, {Schema} from "mongoose";
const bookSchema = new Schema ({
    title: {type: String, required: true},
    authors: {type: [String], required: true},
    aboutAuthor: {type: String},
    aboutBook: {type: String},
    imageUrl: {type: String},
    contentText: {type: String},
    category: {type: String},
    price: {type: Number, min: 0},
    isFree: {type: Boolean, default: false},
    isPurchased: {type: Boolean, default: false},
    numberOfPages: {type: Number, min: 1},
    releaseYear: {type: Number},
    edition: {type: Number},
    isAvailable:{type: Boolean}
},
{
    timestamps: true,
}
);

const Book = mongoose.models.Book ||mongoose.model("Book", bookSchema);

export default Book;