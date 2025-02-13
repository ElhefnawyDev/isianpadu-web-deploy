import HomeGIForm from "@/app/admin/Components/CreateNew/HomeGeneralInfo/homeGIForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditHomeGI = async ({ params }: Props) => {
  const HomeGI = await prisma.homeGeneralInfo.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!HomeGI) notFound();
  return <HomeGIForm experiencesGI={HomeGI}></HomeGIForm>;
};

export default EditHomeGI;
