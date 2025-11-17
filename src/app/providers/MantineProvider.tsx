import { MantineProvider as BaseMantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

interface Props {
  children: React.ReactNode;
}

export function MantineProvider({ children }: Props) {
  return (
    <BaseMantineProvider
      theme={{
        primaryColor: 'blue',
      }}
    >
      {children}
    </BaseMantineProvider>
  );
}
