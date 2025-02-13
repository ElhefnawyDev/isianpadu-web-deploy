"use client";
import { Button, StackDivider, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonNav from "./ButtonNav";

const NavBar = () => {
  return (
    <div>
      <VStack spacing={4} align="stretch" marginTop={12}>
        <Text color="red">Headers</Text>
        <ButtonNav link="headerhome" text="Headers"></ButtonNav>
        <ButtonNav
          link="headerpage"
          text="EventNews Child"
        ></ButtonNav>
        <Text color="red">Home</Text>
        <ButtonNav link="partners" text="     Partners"></ButtonNav>
        <ButtonNav link="experience" text="     Experience"></ButtonNav>
        <ButtonNav link="certificates" text="     Certificates"></ButtonNav>
        <ButtonNav link="HomeGeneralInfo" text="     General Info"></ButtonNav>
        <ButtonNav link="faq" text="     FAQ"></ButtonNav>
        {/* <ButtonNav
          link="experiencesGenralInfo"
          text="Experiences Info"
        ></ButtonNav> */}
        <Text color="red">Services</Text>
        <ButtonNav link="services" text="     Services"></ButtonNav>

        <Text color="red">Experience </Text>
        <ButtonNav
          link="inhouseprojects"
          text="In House Projects"
          // text="     ExperienceandProjects"
        ></ButtonNav>
        <ButtonNav
          link="clients"
          text="Clients"
          // text="     ExperienceandProjects"
        ></ButtonNav>

        <Text color="red">About US</Text>
        <ButtonNav link="companybg" text="     Company BG"></ButtonNav>
        <ButtonNav
          link="visionmission"
          text="     Vision & Mission"
        ></ButtonNav>

        <ButtonNav link="progressbar" text="     Progress Bar"></ButtonNav>
        {/* <ButtonNav link="corevalue" text="     Core Value"></ButtonNav> */}
        <ButtonNav link="teamsdirectors" text="     Team&Directors"></ButtonNav>

        <Text color="red">Event&New</Text>
        <ButtonNav link="eventnews" text="     News & Events"></ButtonNav>
        <Text color="red">Footer</Text>
        <ButtonNav link="footer" text="     Footer"></ButtonNav>
        <Text color="red">Register New User</Text>
        <ButtonNav link="sign-up" text="Register User"></ButtonNav>
        <ButtonNav link="user" text="Users List"></ButtonNav>
      </VStack>
    </div>
  );
};

export default NavBar;
