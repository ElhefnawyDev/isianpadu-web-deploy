"use client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CoreValue } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createCoreValueSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type CoreValueFormData = z.infer<typeof createCoreValueSchema>;

const CoreValueForm = ({ coreValue }: { coreValue?: CoreValue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CoreValueFormData>({
    resolver: zodResolver(createCoreValueSchema),
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
            formData.append("present", data.present);

            // Send data to the API
            if (coreValue)
              await axios.patch(`/api/corevalue/${coreValue.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/corevalue", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/corevalue");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="Certificate Name"
            defaultValue={coreValue?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Present</FormLabel>
          <Input
            placeholder="Certificate Name"
            defaultValue={coreValue?.present}
            fontSize="lg"
            {...register("present")}
          />
          <ErrorsMessage>{errors.present?.message}</ErrorsMessage>

          <Button type="submit" colorScheme="teal">
            {coreValue ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CoreValueForm;
