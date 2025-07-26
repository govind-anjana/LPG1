import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
     itemGroupName:String,
    update_ty: String,
    date:String
  },
  {
    collection: "itemgroup",
    timestamps: true,
  }
);

const ItemModel = mongoose.model("Itemgroup", ItemSchema);
export default ItemModel;
