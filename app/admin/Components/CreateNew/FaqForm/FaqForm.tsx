"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Faq, ProgressBar } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createFaqSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type FaqFormData = z.infer<typeof createFaqSchema>;

const FaqForm = ({ faq }: { faq?: Faq }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqFormData>({
    resolver: zodResolver(createFaqSchema),
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
            formData.append("question", data.question);
            formData.append("answers", data.answer);

            // Send data to the API
            if (faq)
              await axios.patch(`/api/faq/${faq.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/faq", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/faq");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Question</FormLabel>
          <Input
            placeholder="Certificate Name"
            defaultValue={faq?.question}
            fontSize="lg"
            {...register("question")}
          />
          <ErrorsMessage>{errors.question?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Answer</FormLabel>
          <Input
            placeholder="Certificate Name"
            defaultValue={faq?.answers}
            fontSize="lg"
            {...register("answer")}
          />
          <ErrorsMessage>{errors.answer?.message}</ErrorsMessage>

          <Button type="submit" colorScheme="teal">
            {faq ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default FaqForm;
