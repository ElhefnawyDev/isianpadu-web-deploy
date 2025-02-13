import Link from "next/link";
import {
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Map,
  TimerIcon,
  Facebook,
} from "lucide-react";
import { Asap } from "next/font/google";
import prisma from "@/prisma/client";
import { BsTwitterX } from "react-icons/bs";
import SocialIcon from "./SocialIcon";
import { Image } from "@chakra-ui/react";

const asap = Asap({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default async function Footer() {
  const footer = await prisma.footer.findFirst({
    where: {
      id: 1,
    },
  });
  return (
    <footer className="relative w-full bg-background py-14 font-[Satoshi]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-[150px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-3">
            <Image src="/logo-removebg-preview.png" width={150}></Image>
            <p className="mb-8 font-normal leading-7 text-[#A7ABB6] font-satoshi text-justify py-5">
              {footer?.description}
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/isianpadu.cx/"
                className="text-[#000000] hover:opacity-80"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://x.com/isianpadu_sales"
                className="text-[#000000] hover:opacity-80 mt-1"
              >
                <Image key={1} src={"/media/x.svg"} boxSize={5} alt={""} />
                <span className="sr-only">X</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/isianpadu-systems"
                className="text-[#000000] hover:opacity-80"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.facebook.com/share/1X6AryWj1R/?mibextid=LQQJ4d"
                className="text-[#000000] hover:opacity-80"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:col-span-2 lg:block" />

          {/* Home Section */}
          <div className="lg:col-span-2">
            <h3 className={`mb-6 font-bold text-black ${asap.className}`}>
              Pages
            </h3>
            <nav className="flex flex-col space-y-4 font-satoshi text-base text-[#A7ABB6]">
              <Link href="home" className="hover:text-black">
                Home
              </Link>
              <Link href="services" className="hover:text-black">
                Services
              </Link>
              <Link href="experience" className="hover:text-black">
                Experience
              </Link>
              <Link href="news&events" className="hover:text-black">
                News & Events
              </Link>
              <Link href="/aboutus" className="hover:text-black">
                About Us
              </Link>
            </nav>
          </div>

          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className={`mb-6 font-bold text-black ${asap.className}`}>
              Services
            </h3>
            <nav className="flex flex-col space-y-4 font-satoshi text-base text-[#A7ABB6] ">
              <Link href="/services" className="hover:text-black">
                Project Management
              </Link>
              <Link href="/services" className="hover:text-black">
                Turnkey Development
              </Link>
              <Link href="/services" className="hover:text-black">
                System Integration
              </Link>
              <Link href="/services" className="hover:text-black">
                Systems Maintenance
              </Link>
              <Link href="/services" className="hover:text-black">
                IT Consultancy
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
            <h3 className={`mb-6 font-bold text-black ${asap.className}`}>
              Contact
            </h3>
            <div className="space-y-4 text-base font-satoshi">
              <div className="flex items-center gap-4 text-[#A7ABB6]">
                <Phone className="h-6 w-6 text-black" />
                <span>{footer?.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-[#A7ABB6]">
                <Mail className="h-6 w-6 text-black" />
                <span>{footer?.email}</span>
              </div>
              <div className="flex items-start gap-4 text-[#A7ABB6]">
                <div className="flex-shrink-0 h-6 w-6">
                  <TimerIcon className="h-full w-full text-black" />
                </div>
                <span className="leading-6">{footer?.workingHourse}</span>
              </div>
              <div className="flex items-start gap-4 text-[#A7ABB6]">
                <div className="flex-shrink-0 h-6 w-6">
                  <Map className="h-full w-full text-black" />
                </div>
                <span className="leading-6">{footer?.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 text-right font-['Plus_Jakarta_Sans'] text-sm text-[#A7ABB6]">
          © {footer?.copyright}
        </div>
      </div>
    </footer>
  );
}
