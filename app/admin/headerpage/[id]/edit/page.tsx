import ExperiencesForm from "@/app/admin/Components/CreateNew/Experience/ExperienceForm";
import HeaderHomeForm from "@/app/admin/Components/CreateNew/HeaderHomeForm/HeaderHomeForm";
import HeaderPageForm from "@/app/admin/Components/CreateNew/HeaderPageForm/HeaderHomeForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditHeaderPage = async ({ params }: Props) => {
  const headerHome = await prisma.headerPages.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!headerHome) notFound();
  return <HeaderPageForm headerHome={headerHome}></HeaderPageForm>;
};

export default EditHeaderPage;
