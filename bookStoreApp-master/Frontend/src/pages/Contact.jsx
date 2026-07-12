import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post("https://bookstoreapp-fixed-3.onrender.com/contact", data)
      .then((res) => {
        console.log(res.data);
        toast.success("Message sent successfully!");
        reset();
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        } else {
          toast.error("Error: could not reach the server");
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            Contact <span className="text-pink-500">Us</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto">
            Have a question or feedback? Fill out the form below and we'll
            get back to you as soon as possible.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto mt-12 space-y-4 mb-16"
        >
          <div>
            <span>Name</span>
            <br />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div>
            <span>Email</span>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div>
            <span>Message</span>
            <br />
            <textarea
              rows="5"
              placeholder="Enter your message"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
              {...register("message", { required: true })}
            ></textarea>
            {errors.message && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
