import { Schema, model, Document, Types } from "mongoose";

interface IUser extends Document {
  id: string;
  name: string;
  age: number;
  hobbies: string[];
}

const UserSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
});

const User = model<IUser>("UserRecord", UserSchema);

export default User;
