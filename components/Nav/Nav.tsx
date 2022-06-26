import { Flex, Stack } from "@chakra-ui/react";
import ConnectWeb3 from "components/Modals/ConnectWallet";
import useUserContext from "hooks/useUserContext";
import { DropDownMenu } from "./DropDownMenu";
import { LogoLeft } from "./LogoLeft";

export const Nav = () => {
  const { wagmi } = useUserContext();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={4}
    >
      <LogoLeft />
      <Stack direction="row" spacing={4}>
        {wagmi?.address ? (
          <DropDownMenu
            address={wagmi?.address}
            disconnect={wagmi?.disconnect}
          />
        ) : (
          <ConnectWeb3 showButton={true} />
        )}
      </Stack>
    </Flex>
  );
};
