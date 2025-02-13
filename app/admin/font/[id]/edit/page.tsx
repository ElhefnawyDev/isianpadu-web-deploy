import ExperiencesForm from "@/app/admin/Components/CreateNew/Experience/ExperienceForm";
import FontForm from "@/app/admin/Components/CreateNew/Font/FontForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditFont = async ({ params }: Props) => {
  const font = await prisma.font.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!font) notFound();
  return <FontForm font={font}></FontForm>;
};

export default EditFont;
