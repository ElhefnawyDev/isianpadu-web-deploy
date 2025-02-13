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

const HomeGeneralInfoTable = ({ children }: PropsWithChildren) => {
  const route = useRouter();

  return (
    <div>
      <TableContainer borderRadius={0}>
        <Table size="lg">
          <Thead>
            <Tr bg={"#2D3748"}>
              <Th color={"white"}>id</Th>
              <Th color={"white"}>name</Th>
              <Th color={"white"}>title</Th>
              <Th color={"white"}>description</Th>
              <Th color={"white"}>width</Th>
              <Th color={"white"}>height</Th>
              <Th color={"white"}>Image1</Th>
              <Th color={"white"}>created At</Th>
              <Th color={"white"}>updated At</Th>
              <Th color={"white"} isNumeric>
                {/* <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => route.push("/admin/homeGeneralInfo/new")}
                >
                  Create
                </Button>{" "} */}
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"#CBD5E0"}>{children}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomeGeneralInfoTable;
