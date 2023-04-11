import mongoose, { Schema, Document } from 'mongoose';

interface UserModel extends Document {
  name: string;
  email: string;
  phone: string;
}

interface CardModel extends Document {
  name: string;
  message: string;
  user: UserModel;
}

export interface ICard {
  message: string;
  name: string;
  user: {
    name: string;
    email: string;
  };
}

export interface ICardInput {
  message: string;
  name: string;
  user: {
    name: string;
    email: string;
  };
}
export interface ICardDocument extends ICard, Document {}
export interface ICardOutput extends ICard {
  _id: string;
}

const CardSchema = new Schema<ICardDocument>(
  {
    message: { type: String, required: true },
    name: { type: String, required: true },
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);


export const CardModel = mongoose.model<ICardDocument>('Card', CardSchema);