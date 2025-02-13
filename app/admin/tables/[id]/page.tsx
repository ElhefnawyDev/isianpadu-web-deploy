import React from "react";

import {
  Box,
  ChakraProvider,
  Grid,
  GridItem,
  IconButton,
  Show,
  Td,
  Tr,
} from "@chakra-ui/react";
import NavBar from "../../Components/NavBar/NavBar";
import EventAndNewsTable from "../../Components/TableMain/EventAndeNews/EventAndeNewsTable";
import { PrismaClient } from "@prisma/client";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import PartnersDeleteButton from "../../partners/DeleteButton";
import DeleteButton from "../../eventsnews/DeleteButton";

import PartnersTable from "@/app/admin/Components/TableMain/Partners/PartnersTable";
import ExperienceTable from "@/app/admin/Components/TableMain/Experience/ExperienceTable";
import ExperiencesDeleteButton from "../../experiences/DeleteButton";
import CertificatesDeleteButton from "../../certificates/DeleteButton";
import CertificatesTable from "@/app/admin/Components/TableMain/Certificatee/CertificateeTable";
import ServicesTable from "@/app/admin/Components/TableMain/Services/ServiceTable";
import ServicesDeleteButton from "../../services/DeleteButton";
import DirectorsTable from "@/app/admin/Components/TableMain/TeamAndDirectores/DirectoresTable";
import TeamsDeleteButton from "../../teamsdirectors/DeleteButton";
import CompanyBgTable from "../../Components/TableMain/companyBG/CompanyBg";
import VisionMissionTable from "../../Components/TableMain/VisionMission/ServiceTable";
import ServicesOneTable from "../../Components/TableMain/servicesone/ServiceOneTable";
import ServicesTwoTable from "../../Components/TableMain/servicestwo/ServiceTwoTable";
import ServicesTwoDeleteButton from "../../servicetwo/DeleteButton";
import ServicesOneDeleteButton from "../../serviceone/DeleteButton";
import ProgressBarTable from "../../Components/TableMain/progressBar/ProgressBarTable";
import ProgressBarDeleteButton from "../../progressbar/DeleteButton";
import ContactTable from "../../Components/TableMain/footer/ContactTable";
import ExperiencesGenralInfoTable from "../../Components/TableMain/ExperiencesGenralInfo/ExperiencesGenralInfoTable";
import HomeGeneralInfoTable from "../../Components/TableMain/HomeGeneralInfo/HomeGeneralInfoTable";
import ExperiencesGIDeleteButton from "../../experiencesGenralInfo/DeleteButton";
import HomeGIDeleteButton from "../../homeGeneralInfo/DeleteButton";
import ContactDeleteButton from "../../footer/DeleteButton";
import FontTable from "../../Components/TableMain/font/FontTable";
import FontDeleteButton from "../../font/DeleteButton";
import HomeHeaderTable from "../../Components/TableMain/homeheader/HomeHeaderTable";
import CoreValueTable from "../../Components/TableMain/coreValue/CoreValueTable";
import CoreValueDeleteButton from "../../corevalue/DeleteButton";
import PageHeaderTable from "../../Components/TableMain/pageheader/HomeHeaderTable";
import { getServerSession } from "next-auth"; // Import getServerSession from next-auth
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/auth";
import LogoutButton from "../../Components/SignOutButton";
import SignupForm from "../../Components/form/signupForm";
import UsersTable from "../../Components/TableMain/users/users";
import UsersDeleteButton from "../../users/DeleteButton";
import { Image } from "@chakra-ui/react";
import InHouseProjectsTb from "../../Components/TableMain/InHouseProjects/InHouseProjects";
import InHouseProjectsDeleteButton from "../../inhouseprojects/DeleteButton";
import Clients from "../../Components/TableMain/Clients/Clients";
import ClientsDeleteButton from "../../clients/DeleteButton";
import FaqDeleteButton from "../../faq/DeleteButton";
import FaqTable from "../../Components/TableMain/Faq/FaqTable";

import HeaderHomeDeleteButton from "../../headerhome/DeleteButton";
interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  // If no session exists (user not logged in), redirect to the login page
  if (!session) {
    redirect("/sign-in");
  }
  const prisma = new PrismaClient();
  const newsAndEvents = await prisma.newsEvents.findMany();
  const clients = await prisma.clients.findMany();
  const faq = await prisma.faq.findMany();
  const partners = await prisma.partners.findMany();
  const experiences = await prisma.experiences.findMany();
  const certificates = await prisma.certificates.findMany();
  const services = await prisma.services.findMany();
  const teamsDirectors = await prisma.teamOrDirectors.findMany();
  const inhouseProjects = await prisma.inHouseProjects.findMany();
  const visionMission = await prisma.visionMission.findMany();
  const servicesOne = await prisma.servicesOne.findMany();
  const servicesTwo = await prisma.servicesTwo.findMany();
  const progressBar = await prisma.progressBar.findMany();
  const homeGI = await prisma.homeGeneralInfo.findMany();
  const experiencesGI = await prisma.experiencesGenralInfo.findMany();
  const User = await prisma.user.findMany();
  const footer = await prisma.footer.findUnique({
    where: {
      id: 1,
    },
  });
  const Font = await prisma.font.findMany();
  const corevalue = await prisma.coreValue.findMany();
  const headerHome = await prisma.headerHome.findMany({});
  const headerPage = await prisma.headerPages.findUnique({
    where: {
      id: 1,
    },
  });
  const companyBg = await prisma.companyBackground.findUnique({
    where: {
      id: 1,
    },
  });

  if (!companyBg) {
    await prisma.companyBackground.create({
      data: {
        title: "Company Background",
        description:
          "Isianpadu Systems first started its endeavor as a private limited corporation in 2003. With more than 20 years of experience in providing services, Isianpadu Systems is definitely on the top of its class in this field. Isianpadu Systems have also completed many projects in the past 20 years. Some of our main and long-service clients are SSM, JPJ, UiTM, KKM, and many more. Isianpadu Systems' mission is to strive in providing our clients with the most practical and efficient IT solutions to lead future projects to success and create long-term business partnerships with our clients. Our vision is to be at the top and become the leading system integrator.",
        Image: "Image2.png",
      },
    });
  }

  const vision = await prisma.visionMission.findUnique({
    where: {
      id: 1,
    },
  });

  if (!vision) {
    await prisma.visionMission.create({
      data: {
        title: "Vision",
        description:
          "OUR VISION ISIANPADU strives to be at the top and become the leading system integrator.",
      },
    });
  }

  const objectives = await prisma.visionMission.findUnique({
    where: {
      id: 2,
    },
  });

  if (!objectives) {
    await prisma.visionMission.create({
      data: {
        title: "Objectives",
        description:
          "ISIANPADU is committed to delivering comprehensive, cost-effective IT solutions. Our team of experienced professionals provides expert technical support and high-value services, ensuring success in all project proposals and implementations. We strive to be a leading system integrator and IT solutions provider in Malaysia.",
      },
    });
  }

  const mission = await prisma.visionMission.findUnique({
    where: {
      id: 3,
    },
  });

  if (!mission) {
    await prisma.visionMission.create({
      data: {
        title: "Mission",
        description:
          "OUR MISSION Strive to provide clients with the most practical and efficient IT solutions with the help of our highly sophisticated employees, in order to lead future and upcoming projects to success and create a long-term business partnership with our clients.",
      },
    });
  }

  return (
    <Grid
      templateAreas={{
        lg: `"header header"
                  "nav main"
                  "footer footer"`,
        base: `"header header""main main""footer footer"`,
      }}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="white" area={"header"}>
        <Box display="flex" justifyContent="flex-end" paddingEnd={20}>
          <LogoutButton />
        </Box>
      </GridItem>

      <Show above={"lg"}>
        <GridItem pl="2" bg="#2D3748" area={"nav"}>
          <NavBar />
        </GridItem>
      </Show>

      <GridItem bg="#E2E8F0" area={"main"}>
        {/*PartinerTable */}
        {params.id === "partners" && (
          <PartnersTable>
            {partners.map((partner) => (
              <Tr key={partner.id}>
                <Td> {partner.name}</Td>
                <Td>
                  <Image
                    src={partner.logo!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {partner.createdAt.toDateString()}</Td>
                <Td> {partner.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <PartnersDeleteButton
                    partnerId={partner.id}
                  ></PartnersDeleteButton>

                  <Link href={`/admin/partners/${partner.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </PartnersTable>
        )}
        {/*PartinerTable */}
        {params.id === "ExperienceandProjects" && (
          <ExperienceTable>
            {partners.map((partner) => (
              <Tr key={partner.id}>
                <Td> {partner.name}</Td>
                <Td>
                  <Image
                    src={partner.logo!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {partner.createdAt.toDateString()}</Td>
                <Td> {partner.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <PartnersDeleteButton
                    partnerId={partner.id}
                  ></PartnersDeleteButton>

                  <Link href={`/admin/experiences-/${partner.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </ExperienceTable>
        )}

        {/*experienceTable */}
        {params.id === "experience" && (
          <ExperienceTable>
            {experiences.map((experience) => (
              <Tr key={experience.id}>
                <Td> {experience.title}</Td>
                <Td>
                  {experience.description.length > 60
                    ? `${experience.description.slice(0, 60)}...`
                    : experience.description}
                </Td>{" "}
                <Td> {experience.date}</Td>
                <Td>
                  <Image
                    src={experience.logo!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {experience.createdAt.toDateString()}</Td>
                <Td> {experience.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <ExperiencesDeleteButton
                    partnerId={experience.id}
                  ></ExperiencesDeleteButton>

                  <Link href={`/admin/experiences/${experience.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </ExperienceTable>
        )}

        {/*CertificatesTable */}
        {params.id === "certificates" && (
          <CertificatesTable>
            {certificates.map((certificate) => (
              <Tr key={certificate.id}>
                <Td>
                  {" "}
                  {certificate.title.length > 30
                    ? `${certificate.title.slice(0, 30)}...`
                    : certificate.title}
                </Td>
                <Td>
                  {certificate.description.length > 60
                    ? `${certificate.description.slice(0, 60)}...`
                    : certificate.description}
                </Td>{" "}
                <Td>
                  <Image
                    src={certificate.image!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {certificate.createdAt.toDateString()}</Td>
                <Td> {certificate.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <CertificatesDeleteButton
                    certificatesId={certificate.id}
                  ></CertificatesDeleteButton>

                  <Link href={`/admin/certificates/${certificate.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </CertificatesTable>
        )}

        {/* EventAndNewsTable */}
        {params.id === "eventnews" && (
          <EventAndNewsTable>
            {newsAndEvents.map((event) => (
              <Tr key={event.id}>
                <Td>
                  {" "}
                  {event.title.length > 30
                    ? `${event.title.slice(0, 30)}...`
                    : event.title}
                </Td>
                <Td>
                  {event.description.length > 30
                    ? `${event.description.slice(0, 30)}...`
                    : event.description}
                </Td>
                <Td>
                  {" "}
                  {event.short_description.length > 30
                    ? `${event.short_description.slice(0, 30)}...`
                    : event.short_description}
                </Td>
                <Td> {event.date}</Td>
                <Td>
                  <Image
                    src={event.image!}
                    alt="huih"
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {event.createdAt.toDateString()}</Td>
                <Td> {event.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <DeleteButton newsEventsId={event.id}></DeleteButton>
                  <Link href={`/admin/eventsnews/${event.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </EventAndNewsTable>
        )}

        {/* EventAndNewsTable */}
        {params.id === "user" && (
          <UsersTable>
            {User.map((user) => (
              <Tr key={user.id}>
                <Td> {user.username}</Td>
                <Td>{user.email}</Td>
                <Td> {user.password}</Td>
                <Td> {user.createdAt.toDateString()}</Td>
                <Td> {user.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <UsersDeleteButton servicesId={user.id}></UsersDeleteButton>
                </Td>
              </Tr>
            ))}
          </UsersTable>
        )}

        {/* ServicesTable */}
        {params.id === "services" && (
          <ServicesTable>
            {services.map((service) => (
              <Tr key={service.id}>
                <Td> {service.title}</Td>
                <Td>
                  {service.hsDescription!.length > 30
                    ? `${service.hsDescription!.slice(0, 30)}...`
                    : service.hsDescription!}
                </Td>
                <Td>
                  {service.description!.length > 30
                    ? `${service.description!.slice(0, 30)}...`
                    : service.description!}
                </Td>
                <Td>
                  {service.lDescription!.length > 30
                    ? `${service.lDescription!.slice(0, 30)}...`
                    : service.lDescription!}
                </Td>
                <Td>
                  <Image
                    src={service.image!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td>
                  <Image
                    src={service.image2!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td>
                  <Image
                    src={service.image3!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {service.createdAt.toDateString()}</Td>
                <Td> {service.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <ServicesDeleteButton
                    servicesId={service.id}
                  ></ServicesDeleteButton>

                  <Link href={`/admin/services/${service.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </ServicesTable>
        )}

        {/* TeamsDirectors Table */}
        {params.id === "teamsdirectors" && (
          <DirectorsTable>
            {teamsDirectors.map((team) => (
              <Tr key={team.id}>
                <Td> {team.name}</Td>
                <Td> {team.position}</Td>
                <Td>
                  {team.bio.length > 60
                    ? `${team.bio.slice(0, 60)}...`
                    : team.bio}
                </Td>{" "}
                <Td>
                  <Image
                    src={team.image}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {team.createdAt.toDateString()}</Td>
                <Td> {team.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <TeamsDeleteButton
                    teamsdirectorsId={team.id}
                  ></TeamsDeleteButton>

                  <Link href={`/admin/teamsdirectors/${team.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </DirectorsTable>
        )}

        {/* In House Projects Table */}
        {params.id === "inhouseprojects" && (
          <InHouseProjectsTb>
            {inhouseProjects.map((team) => (
              <Tr key={team.id}>
                <Td> {team.title}</Td>
                <Td> {team.description}</Td>
                <Td>
                  {team.ldescription.length > 60
                    ? `${team.ldescription.slice(0, 60)}...`
                    : team.ldescription}
                </Td>{" "}
                <Td>
                  <Image
                    src={team.image}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {team.date}</Td>
                <Td> {team.createdAt.toDateString()}</Td>
                <Td> {team.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <InHouseProjectsDeleteButton
                    inHouseProjectsId={team.id}
                  ></InHouseProjectsDeleteButton>

                  <Link href={`/admin/inhouseprojects/${team.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </InHouseProjectsTb>
        )}
        {/* In House Projects Table */}
        {params.id === "clients" && (
          <Clients>
            {clients.map((team) => (
              <Tr key={team.id}>
                <Td> {team.id}</Td>
                <Td> {team.name}</Td>
                <Td>
                  <Image
                    src={team.logo!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td>{team.category}</Td>
                <Td> {team.projectNumber}</Td>
                <Td> {team.date}</Td>
                <Td> {team.createdAt.toDateString()}</Td>
                <Td> {team.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <ClientsDeleteButton
                    clientsId={team.id}
                  ></ClientsDeleteButton>

                  <Link href={`/admin/clients/${team.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </Clients>
        )}

        {/* CompanyBG */}
        {params.id === "companybg" && (
          <CompanyBgTable>
            <Tr key={companyBg?.id}>
              <Td> {companyBg?.title}</Td>
              <Td>
                {companyBg!.description.length > 80
                  ? `${companyBg?.description.slice(0, 80)}...`
                  : companyBg?.description}
              </Td>{" "}
              <Td>
                <Image
                  src={companyBg?.Image}
                  alt=""
                  style={{ maxWidth: "100px" }}
                ></Image>
              </Td>
              <Td> {companyBg?.createdAt.toDateString()}</Td>
              <Td> {companyBg?.updatedAt.toDateString()}</Td>
              <Td isNumeric>
                <Link href={`/admin/companybg/${companyBg?.id}/edit`}>
                  <IconButton
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Edit event"
                    marginLeft={2}
                    icon={<MdModeEdit />}
                  />
                </Link>
              </Td>
            </Tr>
          </CompanyBgTable>
        )}

        {params.id === "progressbar" && (
          <ProgressBarTable>
            {progressBar.map((progress) => (
              <Tr key={progress.id}>
                <Td> {progress.title}</Td>
                <Td> {progress.present}</Td>
                <Td> {progress.createdAt.toDateString()}</Td>
                <Td> {progress.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  {/* <ProgressBarDeleteButton
                    servicesId={progress.id}
                  ></ProgressBarDeleteButton> */}

                  <Link href={`/admin/progressbar/${progress.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </ProgressBarTable>
        )}

        {params.id === "corevalue" && (
          <CoreValueTable>
            {corevalue.map((corevalue) => (
              <Tr key={corevalue.id}>
                <Td> {corevalue.title}</Td>
                <Td> {corevalue.present}</Td>
                <Td> {corevalue.createdAt.toDateString()}</Td>
                <Td> {corevalue.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <CoreValueDeleteButton
                    servicesId={corevalue.id}
                  ></CoreValueDeleteButton>

                  <Link href={`/admin/corevalue/${corevalue.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </CoreValueTable>
        )}

        {params.id === "faq" && (
          <FaqTable>
            {faq.map((corevalue) => (
              <Tr key={corevalue.id}>
                <Td> {corevalue.question}</Td>
                <Td> {corevalue.answers}</Td>
                <Td> {corevalue.createdAt.toDateString()}</Td>
                <Td> {corevalue.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <FaqDeleteButton faqId={corevalue.id}></FaqDeleteButton>

                  <Link href={`/admin/faq/${corevalue.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </FaqTable>
        )}

        {/* VisionMission Table */}
        {params.id === "visionmission" && (
          <VisionMissionTable>
            {visionMission.map((visionMission) => (
              <Tr key={visionMission.id}>
                <Td> {visionMission.title}</Td>
                <Td>
                  {visionMission.description.length > 80
                    ? `${visionMission.description.slice(0, 80)}...`
                    : visionMission.description}
                </Td>{" "}
                <Td> {visionMission.createdAt.toDateString()}</Td>
                <Td> {visionMission.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <Link href={`/admin/vmo/${visionMission.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </VisionMissionTable>
        )}

        {/* Service One Table */}
        {params.id === "serviceone" && (
          <ServicesOneTable>
            {servicesOne.map((service) => (
              <Tr key={service.id}>
                <Td> {service.title}</Td>
                <Td>
                  {service.description.length > 80
                    ? `${service.description.slice(0, 80)}...`
                    : service.description}
                </Td>{" "}
                <Td>
                  <Image
                    src={service.icon}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {service.createdAt.toDateString()}</Td>
                <Td> {service.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <ServicesOneDeleteButton
                    servicesId={service.id}
                  ></ServicesOneDeleteButton>

                  <Link href={`/admin/serviceone/${service.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </ServicesOneTable>
        )}

        {/* Service One Table */}
        {params.id === "servicetwo" && (
          <ServicesTwoTable>
            {servicesTwo.map((service) => (
              <Tr key={service.id}>
                <Td> {service.title}</Td>
                <Td>
                  {service.description.length > 60
                    ? `${service.description.slice(0, 60)}...`
                    : service.description}
                </Td>{" "}
                <Td> {service.reference}</Td>
                <Td>
                  <Image
                    src={service.icon}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {service.createdAt.toDateString()}</Td>
                <Td> {service.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <ServicesTwoDeleteButton
                    servicesId={service.id}
                  ></ServicesTwoDeleteButton>

                  <Link href={`/admin/servicetwo/${service.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </ServicesTwoTable>
        )}

        {/* homeGeneralInfoTable */}
        {params.id === "HomeGeneralInfo" && (
          <HomeGeneralInfoTable>
            {homeGI.map((homeGI) => (
              <Tr key={homeGI.id}>
                <Td>{homeGI.id}</Td>
                <Td>
                  {homeGI.title1.length > 20
                    ? `${homeGI.title1.slice(0, 20)}...`
                    : homeGI.title1}
                </Td>{" "}
                <Td>
                  {homeGI.title2.length > 18
                    ? `${homeGI.title2.slice(0, 18)}...`
                    : homeGI.title2}
                </Td>{" "}
                <Td>
                  {homeGI.content.length > 18
                    ? `${homeGI.content.slice(0, 18)}...`
                    : homeGI.content}
                </Td>{" "}
                <Td>{homeGI.width}</Td> <Td>{homeGI.height}</Td>{" "}
                <Td>
                  <Image
                    src={homeGI.image1}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {homeGI.createdAt.toDateString()}</Td>
                <Td> {homeGI.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <Link href={`/admin/homeGeneralInfo/${homeGI.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </HomeGeneralInfoTable>
        )}

        {/* ExperiencesGenralInfoTable */}
        {params.id === "experiencesGenralInfo" && (
          <ExperiencesGenralInfoTable>
            {experiencesGI.map((experiencesGI) => (
              <Tr key={experiencesGI.id}>
                <Td> {experiencesGI.title}</Td>
                <Td>
                  {" "}
                  {experiencesGI!.description.length > 60
                    ? `${experiencesGI?.description.slice(0, 60)}...`
                    : experiencesGI?.description}
                </Td>

                <Td> {experiencesGI.createdAt.toDateString()}</Td>
                <Td> {experiencesGI.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <ExperiencesGIDeleteButton
                    experiencesGI={experiencesGI.id}
                  ></ExperiencesGIDeleteButton>

                  <Link
                    href={`/admin/experiencesGenralInfo/${experiencesGI.id}/edit`}
                  >
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </ExperiencesGenralInfoTable>
        )}

        {/* conatctTable */}
        {params.id === "footer" && (
          <ContactTable>
            <Tr key={footer!.id}>
              <Td>
                {" "}
                {footer!.description!.length > 30
                  ? `${footer?.description!.slice(0, 30)}...`
                  : footer?.description!}
              </Td>
              <Td>
                {" "}
                {footer!.copyright!.length > 30
                  ? `${footer?.copyright!.slice(0, 30)}...`
                  : footer?.copyright!}
              </Td>
              <Td>
                {" "}
                {footer!.address!.length > 30
                  ? `${footer?.address!.slice(0, 30)}...`
                  : footer?.address!}
              </Td>
              <Td>
                {" "}
                {footer!.location!.length > 30
                  ? `${footer?.location!.slice(0, 30)}...`
                  : footer?.location!}
              </Td>
              <Td> {footer!.email}</Td>
              <Td>
                {" "}
                {footer!.phone!.length > 30
                  ? `${footer?.phone!.slice(0, 30)}...`
                  : footer?.phone!}
              </Td>
              <Td>
                {" "}
                {footer!.workingHourse!.length > 30
                  ? `${footer?.workingHourse!.slice(0, 30)}...`
                  : footer?.workingHourse!}
              </Td>

              <Td> {footer!.createdAt.toDateString()}</Td>
              <Td> {footer!.updatedAt.toDateString()}</Td>
              <Td isNumeric>
                <Link href={`/admin/footer/${footer!.id}/edit`}>
                  <IconButton
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Edit event"
                    marginLeft={2}
                    icon={<MdModeEdit />}
                  />
                </Link>
              </Td>
            </Tr>
          </ContactTable>
        )}

        {/* fontTable */}
        {params.id === "font" && (
          <FontTable>
            {Font.map((font) => (
              <Tr key={font.id}>
                <Td> {font.title}</Td>
                <Td> {font.font}</Td>
                <Td> {font.createdAt.toDateString()}</Td>
                <Td> {font.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <FontDeleteButton fontId={font.id}></FontDeleteButton>

                  <Link href={`/admin/font/${font.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </FontTable>
        )}

        {/* CompanyBG */}
        {params.id === "headerhome" && (
          <HomeHeaderTable>
            {headerHome.map((font) => (
              <Tr key={font?.id}>
                <Td>
                  {font!.title.length > 30
                    ? `${font?.title.slice(0, 30)}...`
                    : font?.title}
                </Td>{" "}
                <Td>
                  {font!.description.length > 60
                    ? `${font?.description.slice(0, 60)}...`
                    : font?.description}
                </Td>{" "}
                <Td>
                  <Image
                    src={font?.image}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></Image>
                </Td>
                <Td> {font?.opacity}</Td>
                <Td> {font?.createdAt.toDateString()}</Td>
                <Td> {font?.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  {/* {font?.id && (
                    <HeaderHomeDeleteButton headerhomeId={font.id} />
                  )} */}

                  <Link href={`/admin/headerhome/${font?.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </HomeHeaderTable>
        )}

        {/* CompanyBG */}
        {params.id === "headerpage" && (
          <PageHeaderTable>
            <Tr key={headerPage?.id}>
              <Td>
                {headerPage?.title!.length! > 30
                  ? `${headerPage?.title!.slice(0, 30)}...`
                  : headerPage?.title}
              </Td>{" "}
              <Td>
                <Image
                  src={headerPage?.image}
                  alt=""
                  style={{ maxWidth: "100px" }}
                ></Image>
              </Td>
              <Td> {headerPage?.opacity}</Td>
              <Td> {headerPage?.createdAt.toDateString()}</Td>
              <Td> {headerPage?.updatedAt.toDateString()}</Td>
              <Td isNumeric>
                <Link href={`/admin/headerpage/${headerPage?.id}/edit`}>
                  <IconButton
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Edit event"
                    marginLeft={2}
                    icon={<MdModeEdit />}
                  />
                </Link>
              </Td>
            </Tr>
          </PageHeaderTable>
        )}

        {/* CompanyBG */}
        {params.id === "sign-up" && (
          <div className="flex flex-col items-center justify-center pt-10">
            <SignupForm />
          </div>
        )}
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default page;
