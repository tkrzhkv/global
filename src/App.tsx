import { Providers } from './providers/Provider';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
