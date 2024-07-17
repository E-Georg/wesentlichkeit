import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './components/Pages/LoginPages/LoginPages';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage';
import MatrixPage from './components/Pages/MatrixPages/MatrixPage';
import { tokenLoader } from './utils/auth';
import StakeholderList from './components/StakeholderList/StakeholderList';
import RootLayout from './components/Root/RootLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // error: <ErrorPage/>
    loader: tokenLoader,
    children: [
      {
        path: '/',
        element: <MatrixPage />,
        // loader: checkAuthLoader
      },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/stakeholderlist', element: <StakeholderList /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;