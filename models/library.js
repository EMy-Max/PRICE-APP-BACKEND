import mongoose, {Schema} from "mongoose";

const librarySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

const Library = mongoose.models.Library || mongoose.model('Library', librarySchema);

export default Library;