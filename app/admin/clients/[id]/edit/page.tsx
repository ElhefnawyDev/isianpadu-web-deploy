import ClientsForm from "@/app/admin/Components/CreateNew/ClientsForm/ClientsForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditClients = async ({ params }: Props) => {
  const client = await prisma.clients.findUnique({
    where: { id: parseInt(params.id) },
    include: { projects: true }, // Include related projects
  });

  if (!client) notFound();

  return <ClientsForm clients={client} />;
};

export default EditClients;
