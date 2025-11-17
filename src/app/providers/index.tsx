import { MantineProvider } from './MantineProvider';

interface Props {
  children: React.ReactNode;
}

export function AppProviders({ children }: Props) {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
}
