import ExperiencesForm from "@/app/admin/Components/CreateNew/Experience/ExperienceForm";
import HeaderHomeForm from "@/app/admin/Components/CreateNew/HeaderHomeForm/HeaderHomeForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditHeaderHome = async ({ params }: Props) => {
  const headerHome = await prisma.headerHome.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!headerHome) notFound();
  return <HeaderHomeForm headerHome={headerHome}></HeaderHomeForm>;
};

export default EditHeaderHome;
