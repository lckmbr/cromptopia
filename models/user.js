import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{5,20}$)[a-zA-Z0-9.']+$/,
      "Username invalid, It should contain 5-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
