import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from '@/routes';
import { Toaster } from '@/components/ui/sonner';
import { env } from '@/lib/env';

// Admin console is served at /operation/ in production. The router basename
// must match the Vite `base` config so all routes resolve correctly.
const router = createBrowserRouter(routes, { basename: env.basePath });

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default App;
