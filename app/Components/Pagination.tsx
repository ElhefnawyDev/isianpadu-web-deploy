import { Button, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <HStack>
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="gray"
        aria-label="Search database"
        fontSize="20px"
        isDisabled={currentPage === 1}
        icon={<FaAngleDoubleLeft />}
      />
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="gray"
        aria-label="Search database"
        fontSize="20px"
        isDisabled={currentPage === 1}
        icon={<FaAngleLeft />}
      />
            <IconButton
        isRound={true}
        variant="solid"
        colorScheme="gray"
        aria-label="Search database"
        fontSize="20px"
        isDisabled={currentPage === pageCount}
        icon={<FaAngleRight />}
      />
            <IconButton
        isRound={true}
        variant="solid"
        colorScheme="gray"
        aria-label="Search database"
        fontSize="20px"
        isDisabled={currentPage === pageCount}
        icon={<FaAngleDoubleRight />}
      />
    </HStack>
  );
};

export default Pagination;
