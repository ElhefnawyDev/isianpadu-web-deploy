'use client'
import React, { PropsWithChildren } from 'react'
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
import { useRouter } from 'next/navigation';


const FontTable = ({children}:PropsWithChildren) => {
    const route = useRouter();

  return (
    <div>
    <TableContainer borderRadius={0}>
      <Table size="lg">
        <Thead>
          <Tr bg={"#2D3748"}>
            <Th color={"white"}>Title</Th>
            <Th color={"white"}>Font</Th>
            <Th color={"white"}>created At</Th>
            <Th color={"white"}>updated At</Th>
            <Th color={"white"} isNumeric>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => route.push("/admin/font/new")}
              >
                Create
              </Button>{" "}
            </Th>
          </Tr>
        </Thead>
        <Tbody bg={"#CBD5E0"}>{children}</Tbody>
      </Table>
    </TableContainer>
  </div>
  )
}

export default FontTable