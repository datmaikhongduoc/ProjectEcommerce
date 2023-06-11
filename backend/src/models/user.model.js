const bcrypt = require("bcrypt");
const { model, Schema } = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "User";
const crypto = require("crypto");
// Declare the Schema of the Mongo model
const UserSchema = new Schema(
  {
    user_firstName: {
      type: String,
      required: [true, "Please provide user firstName"],
      maxlength: 50,
    },
    user_lastName: {
      type: String,
      required: [true, "Please provide user lastName"],
      maxlength: 50,
    },
    user_userName: {
      type: String,
      required: [true, "Please provide user Name"],
      unique: [true, "Name has exist, please enter other name"],
      maxlength: 100,
    },
    user_email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "Please provide valid email",
      ],
      unique: true,
      required: [true, "Please provide email"],
      maxlength: 50,
    },
    user_password: {
      type: String,
      required: [true, "Please provide user password"],
    },
    user_role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    user_phoneNumber: {
      type: String,
      // unique: [true, "Phone number has exist"],
      maxlength: 20,
    },
    user_address: {
      type: [Schema.Types.ObjectId],
      ref: "Address",
    },
    user_wishList: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
    },
    user_isBlocking: {
      type: Boolean,
      default: false,
    },
    user_ratingPoint: {
      type: Number,
      default: 4,
      min: [1, "Rating must be getter than 1"],
      max: [5, "Rating must be less then 5"],
      set: (val) => Math.round((val * 10) / 10),
    },
    user_passwordResetSecretKey: {
      type: String,
      select: false,
    },
    user_passwordResetExpires: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ user_email: "text", user_userName: "text" });

UserSchema.pre("save", async function (next) {
  this.user_password = await bcrypt.hash(this.user_password, 10);
  next();
});

UserSchema.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.user_password);
  },

  createPasswordChanged: function () {
    const resetSecretKey = crypto.randomBytes(64).toString("hex");
    this.user_passwordResetSecretKey = crypto
      .createHash("sha256")
      .update(resetSecretKey)
      .digest("hex");
    this.user_passwordResetExpires = Date.now() + 5 * 60 * 1000; // Time expires is 5minute
    return resetSecretKey;
  },
};

//Export the model
module.exports = model(COLLECTION_NAME, UserSchema);
