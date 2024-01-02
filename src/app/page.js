"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { subject, message };
    createMessage(values);
  };

  const {
    mutate: createMessage,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: async (values) => {
      console.log(values);
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const dataRes = await res.json();

      console.log(dataRes);

      if (!res.ok) {
        throw new Error(dataRes.message);
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center"></div>
        </div>

        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Connect with us
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Send email via nodemailer{" "}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="email"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="5"
                  cols="10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  columns="3"
                  id="textarea"
                  name="textarea"
                  className="mt-1 p-2 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
