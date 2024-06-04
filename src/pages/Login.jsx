import { Container, Box, Heading, VStack, Button } from "@chakra-ui/react";
import { SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <Container maxW="container.sm" centerContent>
      <Box p={8} mt={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <Heading as="h1" size="lg">Login</Heading>
          <SupabaseAuthUI providers={['google', 'apple']} />
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;