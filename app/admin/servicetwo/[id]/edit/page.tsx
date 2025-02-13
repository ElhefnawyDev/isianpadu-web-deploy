import ServicesFormForm from "@/app/admin/Components/CreateNew/Services/ServicesForm";
import ServicesOneForm from "@/app/admin/Components/CreateNew/ServicesOne/ServicesForm";
import ServicesTwoForm from "@/app/admin/Components/CreateNew/ServicesTwo/ServicesForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditServices = async ({ params }: Props) => {
  const ServicesTwo = await prisma.servicesTwo.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ServicesTwo) notFound();
  return <ServicesTwoForm servicesTwo={ServicesTwo}></ServicesTwoForm>;
};

export default EditServices;
