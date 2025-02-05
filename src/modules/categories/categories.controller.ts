import { Request, Response } from "express";
import CategoryModel from "./categories.model";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCategory = new CategoryModel(req.body);
    const createdCategory = await newCategory.save();
    res.status(201).json(createdCategory);
  } catch (error) {    
    // Compureba si el error devuelve es una instancia de Error
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
    
  }
}

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }

}

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })  
    res.status(200).json(category); 
  } catch (error) { 
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const deleteAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    await CategoryModel.deleteMany();
    res.status(200).json({ message: "All categories deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const loadCategories = async (req: Request, res: Response, next: any): Promise<void> => {
  try {

    const insertedCategories = await CategoryModel.insertMany(req.body);

    if (insertedCategories) {
      res.status(201).json(insertedCategories);
    }
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default {createCategory, getAllCategories, updateCategory, deleteAllCategories, loadCategories};