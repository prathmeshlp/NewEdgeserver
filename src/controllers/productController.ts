import { Request, Response } from "express";
import Product from "../models/Product";
import { IProduct } from "../types";

export const generateProducts = async (req: Request, res: Response) => {
  try {
    await Product.deleteMany({}); // Clear existing products
    const products: IProduct[] = Array.from({ length: 50 }, (_, i) => ({
      productName: `Item${i + 1}`,
      stockOnHand: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
    }));
    await Product.insertMany(products);
    res.status(201).json({ message: "50 products generated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate products" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const sort = req.query.sort as string;
    const skip = (page - 1) * limit;

    let sortOption = {};
    if (sort === "productName:asc") {
      sortOption = { productName: 1 };
    } else if (sort === "stockOnHand:desc") {
      sortOption = { stockOnHand: -1 };
    }

    const products = await Product.find()
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments();

    res.json({ data: products, total });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const reduceStock = async (req: Request, res: Response) => {
  try {
    await Product.updateMany({}, { $inc: { stockOnHand: -2 } });
    await Product.updateMany(
      { stockOnHand: { $lt: 0 } },
      { $set: { stockOnHand: 0 } }
    );
    res.json({ message: "Stock reduced by 2" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reduce stock" });
  }
};

export const increaseEvenStock = async (req: Request, res: Response) => {
  try {
    await Product.updateMany(
      { productName: { $regex: "Item[0-9]*[02468]$" } },
      { $inc: { stockOnHand: 2 } }
    );
    res.json({ message: "Stock increased for even-numbered products" });
  } catch (error) {
    res.status(500).json({ error: "Failed to increase stock" });
  }
};
