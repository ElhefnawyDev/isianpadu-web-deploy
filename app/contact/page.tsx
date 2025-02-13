import React from "react";
import axios from "axios";
// import Header from "../Header";
import Footer from "../Components/Footer";
import Header from "../Header";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <div>
      <Header header={"Contact Us"}></Header>
      <ContactForm></ContactForm>
      <Footer></Footer>
    </div>
  );
};

export default ContactPage;
