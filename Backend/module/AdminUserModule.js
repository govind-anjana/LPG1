import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user:String,
    password:String,
    times:String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "useradmin",
    timestamps: true,
  }
);

const UserModel = mongoose.model("Useradmin", UserSchema);
export default UserModel;
