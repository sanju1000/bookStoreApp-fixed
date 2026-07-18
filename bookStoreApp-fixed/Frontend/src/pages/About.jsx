import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            About <span className="text-pink-500">bookStore</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto">
            bookStore is a learning platform where you can explore free and
            paid courses to build your skills. Our mission is to make quality
            education accessible to everyone, everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="card bg-base-100 shadow-xl p-6 dark:bg-slate-800">
            <h2 className="font-semibold text-xl mb-2">Our Mission</h2>
            <p>
              To help learners of all backgrounds gain practical, real-world
              skills through curated courses and resources.
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 dark:bg-slate-800">
            <h2 className="font-semibold text-xl mb-2">Our Vision</h2>
            <p>
              A world where anyone can access affordable, high-quality
              education from anywhere, at any time.
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 dark:bg-slate-800">
            <h2 className="font-semibold text-xl mb-2">Our Team</h2>
            <p>
              A small, passionate team of developers and educators building
              tools to make learning easier and more enjoyable.
            </p>
          </div>
        </div>

        <div className="text-center mt-16 mb-16">
          <Link to="/contact">
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
