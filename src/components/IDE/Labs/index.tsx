import React, {  useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FilesItem } from './filesItem';
import Editor from '../Editor';
import { useStore } from '@/store/index';

const Labs = () => {
  const { w3s } = useStore();
  useEffect(() => {
    w3s.projectManager.init();
  }, []);
  return (
    <Flex w="100%" h="calc(100vh - 120px)">
      <Box minW="300px" h="100%" p="20px 10px" bg="#fff" borderRadius="8px" overflowY="auto">
        <FilesItem />
      </Box>
      <Box ml="10px" w="100%" h="100%" p="10px 10px" bg="#fff" borderRadius="8px">
        <Editor />
      </Box>
    </Flex>
  );
};

export default observer(Labs);
