import FooterForm from "@/app/admin/Components/CreateNew/footerForm/ContactForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditeContact = async ({ params }: Props) => {
  const Contact = await prisma.footer.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!Contact) notFound();
  return <FooterForm footer={Contact}></FooterForm>;
};

export default EditeContact;
