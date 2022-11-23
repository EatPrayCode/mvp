import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import useAuth from './AuthContext'
import Loader from '../Shared/Loader';
import Login from '../components/Login';

function AuthCheck({ children }: any) {
  const { loading, user } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if (user && !loading && router.pathname === `/`) {
      // router.replace(`/home`);
    }
  }, [loading]);

  if (user && !loading && router.pathname !== `/`) {
    return children;
  }
  else if (!user && !loading) {
    return <Login />;
  }
  else {
    return <Loader color='red' />;
  }

}

export default AuthCheck;
