import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layouts/Layout';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/hoc/ProtectedRoutes';
import AddTodo from './pages/AddTodo';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check_token } from './reducers/signInReducer';
import EditTodo from './pages/EditTodo';


const publicRoutes = [
  {
    path: 'signUp',
    element: <SignUp />
  },
  {
    path: 'signIn',
    element: <SignIn />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const privateRoutes = [
  {
    path: 'todo',
    element: <Todos />
  },
  {
    path: 'addTodo',
    element: <AddTodo />
  },
  {
    path: 'editTodo/:id',
    element: <EditTodo />
  }
];

const routes = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    // Public routes
    ...publicRoutes.map(route => ({
      path: route.path,
      element: route.element
    })),
    // Private routes with ProtectedRoute logic
    ...privateRoutes.map(route => ({
      path: route.path,
      element: <ProtectedRoutes>{route.element}</ProtectedRoutes>
    }))
  ]
}]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(check_token());
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
