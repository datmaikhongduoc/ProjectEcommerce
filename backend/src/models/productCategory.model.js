const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "ProductCategory";
const ProductCategorySchema = new Schema(
  {
    productCategory_type: {
      type: String,
      required: [true, "Please provide product category name"],
    },
    productCategory_name: {
      type: String,
      required: [true, "Please provide product category name"],
      unique: true,
    },
    productCategory_image: {
      type: String,
      required: [true, "Please provide product category image"],
    },
    productCategory_demand: {
      type: [Schema.Types.ObjectId],
      ref: "Demand",
    },
  },
  {
    timestamps: true,
  }
);
//Export the model
module.exports = model(COLLECTION_NAME, ProductCategorySchema);
