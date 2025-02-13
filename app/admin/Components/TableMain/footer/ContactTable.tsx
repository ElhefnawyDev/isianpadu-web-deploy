"use client";
import { MdDelete, MdGroupWork, MdReceipt, MdSettings } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

const ContactTable = ({ children }: PropsWithChildren) => {
  const route = useRouter();

  return (
    <div>
      <TableContainer borderRadius={0}>
        <Table size="lg">
          <Thead>
            <Tr bg={"#2D3748"}>
              <Th color={"white"}>description</Th>
              <Th color={"white"}>copyright</Th>
              <Th color={"white"}>address</Th>
              <Th color={"white"}>location</Th>
              <Th color={"white"}>email</Th>
              <Th color={"white"}>phone</Th>
              <Th color={"white"}>workingHourse</Th>
              <Th color={"white"}>created At</Th>
              <Th color={"white"}>updated At</Th>
              <Th color={"white"} isNumeric>

              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"#CBD5E0"}>{children}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactTable;
