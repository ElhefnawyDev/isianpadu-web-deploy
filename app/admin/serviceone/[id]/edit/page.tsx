import ServicesFormForm from "@/app/admin/Components/CreateNew/Services/ServicesForm";
import ServicesOneForm from "@/app/admin/Components/CreateNew/ServicesOne/ServicesForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditServices = async ({ params }: Props) => {
  const servicesOne = await prisma.servicesOne.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!servicesOne) notFound();
  return <ServicesOneForm servicesOne={servicesOne}></ServicesOneForm>;
};

export default EditServices;
