"use client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Font } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createFontSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type FontFormData = z.infer<typeof createFontSchema>;

const FontForm = ({ font }: { font?: Font }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FontFormData>({
    resolver: zodResolver(createFontSchema),
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
            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("font", selectedFile);
            }

            // Send data to the API
            if (font)
              await axios.patch(`/api/font/${font.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/font", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/font");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Name</FormLabel>
          <Input
            placeholder="Font Name "
            defaultValue={font?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Font</FormLabel>
          {/* File input for Font File */}
          <input type="file" accept="file/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            {font ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default FontForm;
