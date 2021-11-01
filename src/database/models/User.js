import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    discordID: { type: String },
    telegramID: { type: Number, sparse: true },
  },
  { versionKey: false, timestamps: true },
);

export default model('users', UserSchema);
