'use client'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchInput = () => {
  return (
<InputGroup>
  <InputLeftElement>
    <BsSearch />
  </InputLeftElement>
  <Input borderRadius={20} placeholder="Search..." variant="filled" />
</InputGroup>

  )
}

export default SearchInput