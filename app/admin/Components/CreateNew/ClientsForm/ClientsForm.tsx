"use client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
  HStack,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { Clients } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createClientsSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type createClientsData = z.infer<typeof createClientsSchema> & {
  projects: Array<{
    id?: string;
    title: string;
    date: string;
    description: string;
  }>;
};

const ClientsForm = ({ clients }: { clients?: Clients }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<createClientsData>({
    resolver: zodResolver(createClientsSchema),
    defaultValues: {
      name: clients?.name || "",
      category: clients?.category || "",
      projectNumber: clients?.projects?.length?.toString() || "0", // Initialize with project count
      date: clients?.date || "",
      projects:
        clients?.projects?.map((p) => ({
          id: p.id, // Include existing project IDs
          title: p.title,
          date: p.date,
          description: p.description,
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  // Watch projects array and update projectNumber automatically
  const projects = watch("projects");
  useEffect(() => {
    const projectCount = projects?.length || 0;
    setValue("projectNumber", projectCount.toString());
  }, [projects, setValue]);

  const router = useRouter();
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // For new uploads
  const [existingImage, setExistingImage] = useState<string | null>(
    clients?.logo || null
  ); // Track existing image
  const [deletedImage, setDeletedImage] = useState<string | null>(null); // Track deleted image

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
      {error && <Text color="red.500">{error}</Text>}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            // Auto-calculate project number from projects array
            const projectNumber = data.projects.length.toString();

            if (!existingImage && !selectedFile) {
              setError("An image is required.");
              return;
            }
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("date", data.date);
            formData.append("projectNumber", projectNumber);
            formData.append("category", data.category);
            formData.append("existingImage", existingImage || "");
            formData.append("deletedImage", deletedImage || "");

            // Add projects as a JSON string
            if (data.projects && data.projects.length > 0) {
              formData.append("projects", JSON.stringify(data.projects));
            }

            if (selectedFile) {
              formData.append("logo", selectedFile);
            }

            console.log("FormData prepared, sending request..."); // ✅ Debug Log
            let response;
            if (clients) {
              response = await axios.patch(
                `/api/clients/${clients.id}`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
            } else {
              response = await axios.post("/api/clients", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            }
            console.log("Response received:", response); // ✅ Debug Log

            if (response.status !== 200 && response.status !== 201) {
              throw new Error(`Unexpected response: ${response.statusText}`);
            }

            setError("");
            router.push("/admin/tables/clients");
            router.refresh();
          } catch (error: any) {
            console.error("Error submitting form:", error); // ✅ Debug Log
            setError(
              error.response?.data?.error || "An unexpected error occurred."
            );
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          {/* Client Name */}
          <FormLabel fontSize="25px">Client Name</FormLabel>
          <Input placeholder="name" fontSize="lg" {...register("name")} />
          <ErrorsMessage>{errors.name?.message}</ErrorsMessage>

          {/* Logo */}
          <FormLabel fontSize="25px">Logo</FormLabel>
          {existingImage && (
            <Box position="relative" display="inline-block">
              <img src={existingImage} alt="Client Logo" width="100" />
              <Button
                size="xs"
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                onClick={() => {
                  setExistingImage(null); // Remove from UI
                  setDeletedImage(existingImage); // Mark for deletion
                }}
              >
                X
              </Button>
            </Box>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {/* Client Category */}
          <FormLabel fontSize="25px">Experience Category</FormLabel>
          <Select defaultValue={clients?.category} {...register("category")}>
            <option value="Government Ministry">Government Ministry</option>
            <option value="GLC">GLC</option>
            <option value="Private">Private</option>
            <option value="FSIs">Financial Service Institutions (FSIs)</option>
          </Select>
          {errors.category && (
            <Text color="red.500">{errors.category.message}</Text>
          )}

          {/* Project Number Display (Read-only) */}
          <FormLabel fontSize="25px">Project Count</FormLabel>
          <Input value={projects?.length || 0} isReadOnly fontWeight="bold" />

          {/* Date */}
          <FormLabel fontSize="25px">Date</FormLabel>
          <Input type="date" {...register("date")} />
          <ErrorsMessage>{errors.date?.message}</ErrorsMessage>

          {/* Projects Section */}
          <FormLabel fontSize="25px">Projects</FormLabel>
          {fields.map((field, index) => (
            <Box key={field.id} borderWidth="1px" borderRadius="md" p={4}>
              {/* Hidden input for project ID */}
              {field.id && (
                <input type="hidden" {...register(`projects.${index}.id`)} />
              )}

              <HStack spacing={4} align="flex-end">
                <Box flex={1}>
                  <FormLabel>Project Title</FormLabel>
                  <Input
                    {...register(`projects.${index}.title`)}
                    defaultValue={field.title} // Add defaultValue
                  />
                  <ErrorsMessage>
                    {errors.projects?.[index]?.title?.message}
                  </ErrorsMessage>
                </Box>
                <Box flex={1}>
                  <FormLabel>Project Date</FormLabel>
                  <Input type="date" {...register(`projects.${index}.date`)} />
                  <ErrorsMessage>
                    {errors.projects?.[index]?.date?.message}
                  </ErrorsMessage>
                </Box>
                <Box flex={2}>
                  <FormLabel>Project Description</FormLabel>
                  <Controller
                    name={`projects.${index}.description`}
                    control={control}
                    defaultValue={field.description}
                    render={({ field }) => (
                      <SimpleMDE placeholder="Description" {...field} />
                    )}
                  />
                  <ErrorsMessage>
                    {errors.projects?.[index]?.description?.message}
                  </ErrorsMessage>
                </Box>
                <IconButton
                  aria-label="Remove Project"
                  icon={<CloseIcon />}
                  onClick={() => remove(index)}
                  colorScheme="red"
                />
              </HStack>
            </Box>
          ))}
          <Button
            leftIcon={<AddIcon />}
            onClick={() => append({ title: "", date: "", description: "" })}
          >
            Add Project
          </Button>

          {/* Submit Button */}
          <Button type="submit" colorScheme="teal">
            {clients ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ClientsForm;
