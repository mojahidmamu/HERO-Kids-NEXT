"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiMapPin,
  FiPhone,
  FiClock,
} from "react-icons/fi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMessage(data.message || "Your message has been sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(
          data.error || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  //  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 py-6">
   
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/20 blur-3xl" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute left-[5%] top-[15%] text-3xl"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute right-[8%] top-[20%] text-2xl"
      >
        🌟
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-800 sm:text-5xl"
          >
            Get in Touch
            <span className="block text-pink-500">
              We'd Love to Hear From You
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500"
          >
            Have questions, feedback, or need help? Reach out to us anytime.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
         
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-1"
          >
            <div className="rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-slate-800">
                Contact Information
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                We're here to help! Reach out through any of the channels below.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-pink-50 p-4 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                    <FiMapPin size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Address
                    </p>
                    <p className="text-sm text-slate-500">
                      Illishia, Chakaria, Cox's Bazar, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                    <FiPhone size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Phone</p>
                    <p className="text-sm text-slate-500">+880 1844 797 780</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-purple-50 p-4 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-500">
                    <FiMail size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Email</p>
                    <p className="text-sm text-slate-500">
                     abdullahallmojahidstudent@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-green-50 p-4 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-500">
                    <FiClock size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Working Hours
                    </p>
                    <p className="text-sm text-slate-500">Sat–Wed: 8AM – 4PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form  */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-slate-800">
                Send Us a Message
              </h3>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700"
                >
                  <FiCheckCircle size={22} />
                  <span>{statusMessage}</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700"
                >
                  <FiAlertCircle size={22} />
                  <span>{statusMessage}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Your Name
                    </label>
                    <div className="relative mt-1">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 outline-none transition-all focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
                        placeholder="Give Your Full Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Email Address
                    </label>
                    <div className="relative mt-1">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 outline-none transition-all focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <div className="relative mt-1">
                    <FiMessageSquare className="absolute left-3 top-3 text-slate-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 outline-none transition-all focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
                      placeholder="Write your message here..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3.5 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={20} />
                        Send Message
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
