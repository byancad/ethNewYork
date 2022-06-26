import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useClipboard,
  Link
} from "@chakra-ui/react";
import useUserContext from "hooks/useUserContext";

import { ellipsisString } from "utils/ui";

type MenuContainerProps = {
  address: string;
  disconnect: () => void;
};

export const DropDownMenu = ({ address, disconnect }: MenuContainerProps) => {
  const { hasCopied, onCopy } = useClipboard(address);
  const { wagmi } = useUserContext();
  const userAddress = wagmi?.address;

  return (
    <Menu>
      <MenuButton
        as={Avatar}
        aria-label="Options"
        icon={<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />}
        outline="none"
      />

      <MenuList>
        <MenuItem
          onClick={onCopy}
          _focus={{ boxShadow: "none" }}
          style={{ textDecoration: "none" }}
        >
          {ellipsisString(address)}
        </MenuItem>

        <MenuItem>
          <Link
            href={`https://app.superfluid.finance/dashboard/${userAddress}`}
            _focus={{ boxShadow: "none" }}
            style={{ textDecoration: "none" }}
          >
            Superfluid
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => disconnect()}
          _focus={{ boxShadow: "none" }}
          style={{ textDecoration: "none" }}
        >
          Disconnect
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
