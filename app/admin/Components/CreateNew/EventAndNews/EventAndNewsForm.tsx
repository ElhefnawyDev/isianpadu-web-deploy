"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { NewsEvents } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createNewsEventsSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import dynamic from 'next/dynamic';

// Lazy load react-simplemde-editor
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false, // This disables server-side rendering for this component
});
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type EventsAndNewsFormData = z.infer<typeof createNewsEventsSchema>;

const EventAndNewsForm = ({ newsEvents }: { newsEvents?: NewsEvents }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventsAndNewsFormData>({
    resolver: zodResolver(createNewsEventsSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [contentImages, setContentImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    newsEvents?.extra_images || []
  ); // Existing images
  const [deletedImages, setDeletedImages] = useState<string[]>([]); // Images marked for deletion

  // Handle file input change for the thumbnail
  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setThumbnailFile(file || null);
  };

  // Handle file input change for the content images
  const handleContentImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setContentImages(files);
  };

  // Handle deleting an existing image
  const handleDeleteImage = (url: string) => {
    setExistingImages(existingImages.filter((image) => image !== url));
    setDeletedImages([...deletedImages, url]);
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
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("date", data.date);
            formData.append("short_description", data.short_description);
            formData.append("description", data.description);

            if (thumbnailFile) {
              formData.append("image", thumbnailFile);
            } else if (newsEvents?.image) {
              formData.append("existingThumbnail", newsEvents.image);
            }

            if (contentImages.length > 0) {
              contentImages.forEach((file) => formData.append("images", file));
            }

            formData.append(
              "existingContentImages",
              JSON.stringify(existingImages)
            );
            formData.append("deletedImages", JSON.stringify(deletedImages));

            if (newsEvents)
              await axios.patch(
                `/api/eventandnews/${newsEvents.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
              );
            else
              await axios.post("/api/eventandnews", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/eventnews");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="Event Title"
            defaultValue={newsEvents?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Date</FormLabel>
          <Input
            type="date"
            defaultValue={newsEvents?.date}
            {...register("date")}
          />
          <ErrorsMessage>{errors.date?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Short Description</FormLabel>
          <Input
            placeholder="Short Description"
            defaultValue={newsEvents?.short_description}
            {...register("short_description")}
          />
          <ErrorsMessage>{errors.short_description?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Controller
            name="description"
            defaultValue={newsEvents?.description}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
            )}
          ></Controller>
          {errors.description && (
            <ErrorsMessage>{errors.description.message}</ErrorsMessage>
          )}

          <FormLabel fontSize="25px">Thumbnail Image</FormLabel>
          {newsEvents?.image && (
            <img
              src={newsEvents.image}
              alt="Thumbnail"
              style={{ width: "100px", marginBottom: "10px" }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />

          <FormLabel fontSize="25px">Content Images</FormLabel>
          {existingImages.map((url, index) => (
            <Box key={index} position="relative" display="inline-block">
              <img
                src={url}
                alt={`Content ${index}`}
                style={{ width: "100px", marginBottom: "10px" }}
              />
              <Button
                size="xs"
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                onClick={() => handleDeleteImage(url)}
              >
                X
              </Button>
            </Box>
          ))}
          <input
            type="file"
            accept="image/*"
            onChange={handleContentImagesChange}
            multiple
          />

          <Button type="submit" colorScheme="teal">
            {newsEvents ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EventAndNewsForm;
