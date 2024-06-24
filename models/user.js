import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  userId: {type: Schema.Types.ObjectId},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  country: { type: String },
  state: { type: String },
  gender: { type: String },
  password: { type: String },
  role: { type: String, default: "user" }, // admin or user
  forgottenPasswordToken:{type :String},
  isVerifiedEmail: { type: Boolean},
  verifyToken: { type: String },
  forgottenPasswordOTP: { type: String },
  forgottenPasswordOTPExpires: { type: Date },
  // cart: {type: [{}]},
  // library: {type: [{}]}
},
{
    timestamps: true
},);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

