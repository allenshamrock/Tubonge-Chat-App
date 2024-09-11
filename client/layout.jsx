import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, useColorMode } from "@chakra-ui/react";

const AppLayout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className=" h-screen">
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Box>{children}</Box>
    </div>
  );
};

export default AppLayout;
