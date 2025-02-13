'use client'
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Menu = ({ setMenuBar }: {setMenuBar: (bool: boolean) => void}) => {
  const handleClose = () => setMenuBar(false);

  const wait = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    handleClose();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#111111] flex items-center justify-center z-50 space-x-32">
      <button onClick={handleClose} className="absolute top-5 right-15 text-black">Close</button>
      <Link onClick={wait} href="/home" className="flex text-black text-2xl">Home</Link>
      <Link onClick={wait} href="/services" className="flex text-black text-2xl">Services</Link>
      <Link onClick={wait} href="/news&events" className="flex text-black text-2xl">News & Events</Link>
      <Link onClick={wait} href="/about" className="flex text-black text-2xl">About Us</Link>
      <Link onClick={wait} href="/contact" className="flex text-black text-2xl">Contact Us</Link>
    </div>
  );
};

export default Menu;
