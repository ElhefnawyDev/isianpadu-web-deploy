"use client"
import axios from "axios";
import { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  
    const [responseMessage, setResponseMessage] = useState("");
    const [loading, setLoading] = useState(false); // New loading state
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true); // Disable button when form is being submitted
  
      try {
        const response = await axios.post("/api/send-email", formData);
        setResponseMessage("Your message has been sent successfully!");
      } catch (error) {
        setResponseMessage(
          "Failed to send your message. Please try again later."
        );
      } finally {
        setLoading(false); // Enable button again after request is done
      }
    };
  
    return (
      <div>
        {/* <Header header={"Contact Us"}></Header> */}
        <div className="flex justify-center items-center min-h-screen px-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-full md:max-w-4xl flex flex-col md:flex-row">
            {/* Left Side: Contact Form */}
            <div className="p-6 sm:p-8 bg-white flex-1 relative">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Get in <span className="text-red-500">Touch</span>
              </h2>
              <p className="mb-6 text-gray-600 text-sm sm:text-base">
                Give us a call or drop by anytime. We will be happy to answer your
                questions.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={loading} // Disable input while loading
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={loading} // Disable input while loading
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={loading} // Disable input while loading
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={loading} // Disable textarea while loading
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? "Sending..." : "SEND"}
                </button>
              </form>
              {responseMessage && (
                <p className="mt-4 text-center text-blue-500">{responseMessage}</p>
              )}
            </div>
            {/* Right Side: Map */}
            <div className="flex-1 h-[300px] md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d318.0060166437841!2d101.5445649!3d3.091839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4dbd8a653597%3A0xfc458d1ec475ab41!2sIsianpadu%20Systems%20Sdn.%20Bhd.!5e0!3m2!1sen!2smy!4v1694517856078!5m2!1sen!2smy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactForm;
  