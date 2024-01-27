import mongoose from "mongoose";
import APIError from "../utils/apiError.js";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },

    lastName: {
      type: String,
      require: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      private: true,
    },

    wallets: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Wallet",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);


class UserClass {
  static async isUserNameAlreadyExists(userName, excludeUserId) {
    return !!(await this.findOne({ userName, _id: { $ne: excludeUserId } }));
  }

  static async isEmailAlreadyExists(email, excludeUserId) {
    return !!(await this.findOne({ email, _id: { $ne: excludeUserId } }));
  }

  static async getUserById(id) {
    return await this.findById(id);
  }

  static async getUserByUserName(userName) {
    return await this.findOne({ userName });
  }

  static async getUserByEmail(email) {
    return await this.findOne({ email });
  }


  static async createUser(body) {
    if (await this.isUserNameAlreadyExists(body.userName)) {
      throw new APIError("Username already exists", httpStatus.BAD_REQUEST);
    }

    if (await this.isEmailAlreadyExists(body.email)) {
      throw new APIError("Email already exists", httpStatus.BAD_REQUEST);
    }

    return await this.create(body);
  }


  async isPasswordMatch(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

userSchema.loadClass(UserClass);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const passwordGenSalt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, passwordGenSalt);
  }
  next();
});

const User = mongoose.model("users", userSchema);

export default User;
