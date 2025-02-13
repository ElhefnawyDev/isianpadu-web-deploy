import HeroSection from "../experience/components/ui/HeroSection";
import RedLine from "../home/components/RedLine";
import Footer from "../home/components/footer";
import FloatingButton from "../home/components/FloatingButton";
import FAQAccordion from "./Components/FaqComponent";
import prisma from "@/prisma/client";

// Define the FAQ type for props
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqData: FAQItem[]; // Explicitly type faqData as an array of FAQItem objects
}

// Make FAQ a server-side component to fetch data from Prisma
const FAQ = async () => {
  const faqData = await prisma.faq.findMany({
    select: {
      question: true,
      answers: true, // Make sure it's 'answer' in your schema or adjust as needed
    },
  });

  return (
    <>
      <div className="font-montserrat">
        <HeroSection
          title="FAQ"
          description="Explore our FAQ section to find quick and helpful responses to common inquiries about our services, projects, and processes. If you need more details, feel free to contact us directly!"
          imageSrc={"/Question.png"}
        />
      </div>
      <div className="w-full py-12">
        <div className="w-[768px] max-w-full mx-auto px-4 py-32">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqData={faqData} /> {/* Pass the fetched data to FAQAccordion */}
        </div>
        <div className="mt-10">
          <RedLine />
          <Footer />
        </div>
        <FloatingButton />
      </div>
    </>
  );
};

export default FAQ;
