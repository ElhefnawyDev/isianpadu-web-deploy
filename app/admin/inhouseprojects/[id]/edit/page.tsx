import InHouseProjectsForm from "@/app/admin/Components/CreateNew/InHouseProjects/InHouseProjectsForm";
import TeamsDirectorsForm from "@/app/admin/Components/CreateNew/TeamOrDirectors/TeamDirectorsForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditInHouseProjects = async ({ params }: Props) => {
  const inHouseProject = await prisma.inHouseProjects.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!inHouseProject) notFound();
  return (
    <InHouseProjectsForm inHouseProjects={inHouseProject}></InHouseProjectsForm>
  );
};

export default EditInHouseProjects;
