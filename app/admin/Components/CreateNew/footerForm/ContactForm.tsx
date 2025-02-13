"use client";
import { Box, Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createFooterGISchema } from "./ValidationSchema";
import { Footer } from "@prisma/client";

type footerFormData = z.infer<typeof createFooterGISchema>;

const FooterForm = ({ footer }: { footer?: Footer }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<footerFormData>({
    resolver: zodResolver(createFooterGISchema),
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
            formData.append("address", data.address);
            formData.append("location", data.location);
            formData.append("description", data.description);
            formData.append("copyright", data.copyright);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("workingHourse", data.workingHourse);

            // Send data to the API
            if (footer)
              await axios.patch(`/api/footer/${footer.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/footer", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/footer");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Description</FormLabel>
          <Input
            placeholder="contact address "
            defaultValue={footer?.description!}
            fontSize="lg"
            {...register("description")}
          />
          <ErrorsMessage>{errors.description?.message}</ErrorsMessage>
          <FormLabel fontSize="25px">Copyright</FormLabel>
          <Input
            placeholder="contact copyright "
            defaultValue={footer?.copyright!}
            fontSize="lg"
            {...register("copyright")}
          />
          <ErrorsMessage>{errors.copyright?.message}</ErrorsMessage>
          <FormLabel fontSize="25px">address</FormLabel>
          <Input
            placeholder="contact address "
            defaultValue={footer?.address}
            fontSize="lg"
            {...register("address")}
          />
          <ErrorsMessage>{errors.address?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">location</FormLabel>
          <Input
            placeholder="contact location "
            defaultValue={footer?.location}
            fontSize="lg"
            {...register("location")}
          />
          <ErrorsMessage>{errors.location?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">email</FormLabel>
          <Input
            placeholder="contact email "
            defaultValue={footer?.email}
            fontSize="lg"
            {...register("email")}
          />
          <ErrorsMessage>{errors.email?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">phone</FormLabel>
          <Input
            placeholder="contact phone "
            defaultValue={footer?.phone!}
            fontSize="lg"
            {...register("phone")}
          />
          <ErrorsMessage>{errors.phone?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">workingHourse</FormLabel>
          <Input
            placeholder="contact workingHourse "
            defaultValue={footer?.workingHourse}
            fontSize="lg"
            {...register("workingHourse")}
          />
          <ErrorsMessage>{errors.workingHourse?.message}</ErrorsMessage>

          <Button type="submit" colorScheme="teal">
            {footer ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default FooterForm;
