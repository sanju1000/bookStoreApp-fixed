import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

// Generates a self-contained placeholder cover image (no network request needed).
// This avoids relying on any external image host, which can be silently blocked
// by firewalls, corporate networks, or ad-blockers.
const wrapText = (text, width = 16) => {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length <= width) {
      current = (current + " " + word).trim();
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
};

const cover = (title, color) => {
  const lines = wrapText(title);
  const tspans = lines
    .map((line, i) => `<tspan x="200" dy="${i === 0 ? 0 : 28}">${line}</tspan>`)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="${color}"/><text x="200" y="140" font-size="22" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="600">${tspans}</text></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

const books = [
  { name: "The Pragmatic Coder", price: 0, category: "Free", color: "#ec4899", title: "A beginner-friendly guide to writing clean code." },
  { name: "JavaScript Essentials", price: 0, category: "Free", color: "#8b5cf6", title: "Master the fundamentals of modern JavaScript." },
  { name: "React for Beginners", price: 0, category: "Free", color: "#0ea5e9", title: "Build your first interactive UI with React." },
  { name: "Intro to Databases", price: 0, category: "Free", color: "#10b981", title: "Understand how relational and NoSQL databases work." },
  { name: "Advanced Node.js", price: 29, category: "Paid", color: "#f59e0b", title: "Deep dive into building scalable backend services." },
  { name: "Full-Stack MERN", price: 49, category: "Paid", color: "#ef4444", title: "Build and deploy complete MERN stack applications." },
  { name: "System Design Basics", price: 39, category: "Paid", color: "#6366f1", title: "Learn to design scalable, reliable systems." },
  { name: "UI/UX Foundations", price: 19, category: "Paid", color: "#14b8a6", title: "Design principles for building beautiful interfaces." },
].map((b) => ({
  name: b.name,
  price: b.price,
  category: b.category,
  title: b.title,
  image: cover(b.name, b.color),
}));

const seedDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");

    await Book.deleteMany({});
    console.log("Cleared existing books");

    await Book.insertMany(books);
    console.log(`Inserted ${books.length} books`);

    await mongoose.connection.close();
    console.log("Done. Connection closed.");
  } catch (error) {
    console.log("Seeding error: ", error);
    process.exit(1);
  }
};

seedDB();
