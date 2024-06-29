"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CgAddR } from "react-icons/cg";
import { getAuth } from "firebase/auth";
import { app } from "@/app/firebase/config";
import createPost, { createBlogPost } from "@/app/firebase/post/blog/create";

const PostModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const auth = getAuth(app);

  const userId = auth.currentUser?.uid;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBlogPost(userId, post, title);
    setPost("");
    setTitle("");

    onClose();

    // console.log(post);
  };

  const handlePostChange = (e) => {
    const value = e.target.value;
    setPost(value.slice(0, 250));
  };
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value.slice(0, 50));
  };
  return (
    <div className="  grid place-content-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg", transition: { duration: 0.3 } }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-600 to-gray-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <CgAddR className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-blue-600 grid place-items-center mx-auto">
                <CgAddR />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Create Post
              </h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="title-input" className="block mb-2">
                  Title
                  <input
                    id="title-input"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                    className="block w-full border border-zinc-700 rounded-md bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-white"
                  />
                </label>
                <label htmlFor="post-input" className="block mb-2">
                  Post
                  <textarea
                    id="post-input"
                    placeholder="Write something..."
                    rows={4}
                    name="post"
                    value={post}
                    onChange={handlePostChange}
                    required
                    className="block w-full border border-zinc-700 rounded-md bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-white"
                  />
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-white hover:opacity-90 transition-opacity text-blue-600 font-semibold w-full py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PostModal;
