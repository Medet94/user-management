import { AppShell, Container } from '@mantine/core';
import { AppProviders } from './providers';
import { UsersListPage } from '@pages/users-list';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { UserFormModal } from '@features/user-form';

const App = () => {
  return (
    <AppProviders>
      <UserFormModal />
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 60 }}
        padding="md"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Container size="xl" py="xl">
            <UsersListPage />
          </Container>
        </AppShell.Main>

        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </AppProviders>
  );
};

export default App;
