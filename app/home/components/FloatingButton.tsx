"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import ContactForm from "./ContactForm";

const FloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Get In Touch
      </motion.button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm />
      </Modal>
    </>
  );
};

export default FloatingButton;
