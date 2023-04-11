import mongoose, {Document} from 'mongoose';

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
