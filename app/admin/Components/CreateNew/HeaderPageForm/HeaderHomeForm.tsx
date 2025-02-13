"use client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HeaderPages } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createHeaderPageSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type HeaderPageFormData = z.infer<typeof createHeaderPageSchema>;

const HeaderPageForm = ({ headerHome }: { headerHome: HeaderPages }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HeaderPageFormData>({
    resolver: zodResolver(createHeaderPageSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // File state

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <Box
      border="3px solid"
      borderColor="black.300"
      padding={0}
      borderRadius="md"
      marginTop={10}
      marginLeft={10}
      marginRight={10}
    >
      {error && <Text>{error}</Text>}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const formData = new FormData(); // Create FormData object

            // Append text fields to FormData
            formData.append("title", data.title);
            formData.append("opacity", data.opacity);
            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
            }

            // Send data to the API
            await axios.patch(`/api/headerpages/${headerHome.id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            router.push("/admin/tables/headerpage");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Name</FormLabel>
          <Input
            placeholder="Experience Title "
            defaultValue={headerHome?.title!}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Logo</FormLabel>
          {/* File input for image */}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <FormLabel fontSize="25px">Image BG Opacity</FormLabel>
          <Input
            type="number"
            defaultValue={headerHome?.opacity!}
            {...register("opacity")}
          />
          <ErrorsMessage>{errors.opacity?.message}</ErrorsMessage>

          <Button type="submit" colorScheme="teal">
            {"Update"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default HeaderPageForm;
