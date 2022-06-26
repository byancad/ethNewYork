import { Box, Link } from "@chakra-ui/react";

export const LogoLeft = () => {
  return (
    <Box>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "bold",
        }}
        _focus={{ boxShadow: "none" }}
      >
        8trac
      </Link>
    </Box>
  );
};
