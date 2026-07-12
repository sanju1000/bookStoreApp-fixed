import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const createBook = async(req, res) => {
    try {
        const { name, price, category, image, title } = req.body;
        const book = new Book({ name, price, category, image, title });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};