"use client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ServicesOne } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createServicesOneSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type ServicesOneFormData = z.infer<typeof createServicesOneSchema>;

const ServicesOneForm = ({ servicesOne }: { servicesOne?: ServicesOne }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesOneFormData>({
    resolver: zodResolver(createServicesOneSchema),
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
            formData.append("description", data.description);
            if (selectedFile) {
              formData.append("icon", selectedFile);
            }

            // Send data to the API
            if (servicesOne)
              await axios.patch(`/api/serviceone/${servicesOne.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/serviceone", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/serviceone");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="services Title "
            defaultValue={servicesOne?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Input
            placeholder="services description "
            defaultValue={servicesOne?.description}
            fontSize="lg"
            {...register("description")}
          />
          <ErrorsMessage>{errors.description?.message}</ErrorsMessage>

          {/* File input for icon */}
          <FormLabel fontSize="25px">Icon</FormLabel>
          <input type="file" accept="image/*" onChange={handleFileChange} />


          <Button type="submit" colorScheme="teal">
            {servicesOne ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ServicesOneForm;
