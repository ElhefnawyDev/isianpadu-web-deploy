"use client";
import { IconButton } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const InHouseProjectsDeleteButton = ({ inHouseProjectsId }: { inHouseProjectsId: number }) => {
  const router = useRouter();

  return (
    <IconButton
      variant="outline"
      colorScheme="teal"
      aria-label="Delete event"
      icon={<AiOutlineDelete />}
      onClick={async () => {
        await axios.delete(`/api/inhouseprojects/${inHouseProjectsId}`);
        router.refresh();
      }}
    />
  );
};

export default InHouseProjectsDeleteButton;
