import CoreValueForm from "@/app/admin/Components/CreateNew/CoreValueForm/CoreValueForm";
import FaqForm from "@/app/admin/Components/CreateNew/FaqForm/FaqForm";
import ProgressBarForm from "@/app/admin/Components/CreateNew/ProgressBarForm/ProgressBar";
import ServicesFormForm from "@/app/admin/Components/CreateNew/Services/ServicesForm";
import ServicesOneForm from "@/app/admin/Components/CreateNew/ServicesOne/ServicesForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditServices = async ({ params }: Props) => {
  const faq = await prisma.faq.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!faq) notFound();
  return <FaqForm faq={faq}></FaqForm>;
};

export default EditServices;
