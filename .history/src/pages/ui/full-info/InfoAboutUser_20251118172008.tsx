import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

export const InfoAboutUser = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Authentication"
      >
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
};
