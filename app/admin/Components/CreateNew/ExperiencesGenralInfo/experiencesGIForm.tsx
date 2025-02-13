"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { ExperiencesGenralInfo } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createexperiencesGISchema } from "./ValidationSchema";

type experiencesGIFormData = z.infer<typeof createexperiencesGISchema>;

const ExperiencesGIForm = ({
  experiencesGI,
}: {
  experiencesGI?: ExperiencesGenralInfo;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<experiencesGIFormData>({
    resolver: zodResolver(createexperiencesGISchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

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

            // Send data to the API
            if (experiencesGI)
              await axios.patch(
                `/api/experiencesGI/${experiencesGI.id}`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
            else
              await axios.post("/api/experiencesGI", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/experiencesGenralInfo");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="experiencesGI Title "
            defaultValue={experiencesGI?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Input
            placeholder="experiencesGI Description "
            defaultValue={experiencesGI?.description}
            fontSize="lg"
            {...register("description")}
          />
          <ErrorsMessage>{errors.description?.message}</ErrorsMessage>

          <Button type="submit" colorScheme="teal">
            {experiencesGI ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ExperiencesGIForm;
