import mongoose, {Schema} from "mongoose";

const catSchema = new Schema({
    title: {type:String, required: true},
    description: String
},
{
    timestamps: true
},
)

const Category = mongoose.models.Category || mongoose.model("Category", catSchema);

export default Category;