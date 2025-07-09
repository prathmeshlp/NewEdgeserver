import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  stockOnHand: number;
}

const ProductSchema: Schema = new Schema({
  productName: { type: String, required: true, unique: true },
  stockOnHand: { type: Number, required: true, min: 0 },
});

export default mongoose.model<IProduct>('Product', ProductSchema);