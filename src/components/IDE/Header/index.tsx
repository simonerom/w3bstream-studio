import React from 'react';
import { Button, Flex, Icon, Image, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { MdHome, MdLogout } from 'react-icons/md';
import { useStore } from '@/store/index';
import Link from 'next/link';

const Header = observer(() => {
  return (
    <Flex
      as="header"
      position="fixed"
      top="0px"
      left="350px"
      zIndex="999"
      alignItems="center"
      px="30px"
      w="calc(100vw - 350px)"
      h="60px"
      boxShadow="sm"
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      }}
    >
      <Flex flex={{ base: 1, md: 'auto' }} justify="flex-end" alignItems="center">
        <Icon as={MdHome} mr="20px" w="22px" h="21px" cursor="pointer" />
        <Profile />
      </Flex>
    </Flex>
  );
});

const Profile = observer(() => {
  const { w3s } = useStore();
  const { accountID } = w3s.config.formData;

  if (accountID) {
    return (
      <>
        <Popover isLazy matchWidth={true}>
          <PopoverTrigger>
            <Button bg="rgba(0, 0, 0, 0.03)">accountID: {accountID}</Button>
          </PopoverTrigger>
          <PopoverContent bg="white">
            <PopoverArrow />
            <PopoverBody>
              <Button
                w="full"
                bg="rgba(0, 0, 0, 0.03)"
                onClick={() => {
                  w3s.updatePassword.extraValue.set({ modal: { show: true } });
                }}
              >
                Update password
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Icon
          as={MdLogout}
          ml="20px"
          w="22px"
          h="21px"
          cursor="pointer"
          onClick={() => {
            w3s.config.logout();
          }}
        />
      </>
    );
  }

  return <Link href="/login">Login</Link>;
});

export default Header;
