"use client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ServicesTwo } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createServicesTwoSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type ServicesTwoFormData = z.infer<typeof createServicesTwoSchema>;

const ServicesTwoForm = ({ servicesTwo }: { servicesTwo?: ServicesTwo }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesTwoFormData>({
    resolver: zodResolver(createServicesTwoSchema),
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
            formData.append("reference", data.reference);
            if (selectedFile) {
              formData.append("icon", selectedFile);
            }

            // Send data to the API
            if (servicesTwo)
              await axios.patch(`/api/servicetwo/${servicesTwo.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/servicetwo", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/servicetwo");
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
            defaultValue={servicesTwo?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Input
            placeholder="services description "
            defaultValue={servicesTwo?.description}
            fontSize="lg"
            {...register("description")}
          />
          <ErrorsMessage>{errors.description?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Reference</FormLabel>
          <Input
            placeholder="services Title "
            defaultValue={servicesTwo?.reference}
            fontSize="lg"
            {...register("reference")}
          />
          <ErrorsMessage>{errors.reference?.message}</ErrorsMessage>

          {/* File input for icon */}
          <FormLabel fontSize="25px">Icon</FormLabel>
          <input type="file" accept="image/*" onChange={handleFileChange} />


          <Button type="submit" colorScheme="teal">
            {servicesTwo ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ServicesTwoForm;
