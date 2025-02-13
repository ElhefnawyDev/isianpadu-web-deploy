"use client";

import {
  Button,
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
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

const HomeHeaderTable = ({ children }: PropsWithChildren) => {
  const route = useRouter();

  return (
    <div>
      <TableContainer borderRadius={0}>
        <Table size="lg">
          <Thead>
            <Tr bg={"#2D3748"}>
              <Th color={"white"}>Title</Th>
              <Th color={"white"}>Description</Th>
              <Th color={"white"}>Image BG</Th>
              <Th color={"white"}>Index Number</Th>
              <Th color={"white"}>Created At</Th>
              <Th color={"white"}>Updated At</Th>
              <Th color={"white"} isNumeric></Th>
              {/* <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => route.push("/admin/headerhome/new")}
              >
                Create
              </Button>{" "} */}
            </Tr>
          </Thead>
          <Tbody bg={"#CBD5E0"}>{children}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomeHeaderTable;
