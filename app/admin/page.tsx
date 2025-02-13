import PartnersTable from "@/app/admin/Components/TableMain/Partners/PartnersTable";
import ServicesTable from "@/app/admin/Components/TableMain/Services/ServiceTable";
import { notFound } from "next/navigation";
import { Box, ChakraProvider, Grid, GridItem, Show } from "@chakra-ui/react";
import Example from "./Components/ChangeColorMode";
import NavBar from "./Components/NavBar/NavBar";
import { authOptions } from "@/app/api/auth/auth"; // Adjust the path to point to your auth.ts
import { getServerSession } from "next-auth"; // Import getServerSession from next-auth
import { redirect } from "next/navigation";
import LogoutButton from "./Components/SignOutButton";

const AdminPage = async() => {
  
    const session = await getServerSession(authOptions);

    // If no session exists (user not logged in), redirect to the login page
    if (!session) {
      redirect("/sign-in");
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
          <NavBar></NavBar>
        </GridItem>
      </Show>

      <GridItem bg="#E2E8F0" area={"main"}></GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default AdminPage;
