import CompanyBgForm from "@/app/admin/Components/CreateNew/CompanyBGForm/CompanyBgForm";
import PartnersForm from "@/app/admin/Components/CreateNew/Partner/partnerForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditCertifates = async ({ params }: Props) => {
  const companyBg = await prisma.companyBackground.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!companyBg) notFound();
  return <CompanyBgForm companyBackground={companyBg}></CompanyBgForm>;
};

export default EditCertifates;
