import { Schema, model } from 'mongoose';

const SubscriptionSchema = new Schema(
  {
    // Currently only Telegram and Discord. In future it's able to add more types
    from: {
      type: { type: Number, required: true },
      ids: [{ type: Number }],
    },
    to: {
      type: { type: Number, required: true },
      ids: [{ type: Number }],
    },
    filter: [
      {
        type: { type: Number },
        values: { type: Array },
      },
    ],
    redirectMessage: {
      type: { type: Number },
      values: { type: Array },
    },
  },
  { versionKey: false, timestamps: true },
);

export default model('subscriptions', SubscriptionSchema);
