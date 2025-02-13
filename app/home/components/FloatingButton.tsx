"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import Modal from "./Modal"
import ContactForm from "./ContactForm"
import { ChevronRight } from "lucide-react"

const COLLAPSE_DELAY = 5000 // 5 seconds

const FloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 640 })

  const collapseButton = useCallback(() => {
    if (isMobile && !isModalOpen) {
      console.log("Collapsing button") // Debug log
      setIsExpanded(false)
    }
  }, [isMobile, isModalOpen])

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }
  }, [isMobile])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isExpanded && isMobile && !isModalOpen) {
      console.log("Starting collapse timer") // Debug log
      timer = setTimeout(collapseButton, COLLAPSE_DELAY)
    }
    return () => {
      if (timer) {
        console.log("Clearing collapse timer") // Debug log
        clearTimeout(timer)
      }
    }
  }, [isExpanded, isMobile, isModalOpen, collapseButton])

  const handleExpandClick = () => {
    console.log("Expanding button") // Debug log
    setIsExpanded(true)
  }

  const handleButtonClick = () => {
    if (isMobile) {
      if (isExpanded) {
        setIsModalOpen(true)
      } else {
        setIsExpanded(true)
      }
    } else {
      setIsModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {(isExpanded || !isMobile) && (
          <motion.button
            onClick={handleButtonClick}
            className="fixed bottom-8 right-8 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 z-50 text-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ width: isMobile ? 0 : "auto", opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="px-6 py-3 block">Get In Touch</span>
          </motion.button>
        )}
      </AnimatePresence>

      {isMobile && !isExpanded && (
        <motion.button
          onClick={handleExpandClick}
          className="fixed bottom-8 right-2 bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Expand contact button"
        >
          <ChevronRight size={28} />
        </motion.button>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ContactForm />
      </Modal>
    </>
  )
}

export default FloatingButton

