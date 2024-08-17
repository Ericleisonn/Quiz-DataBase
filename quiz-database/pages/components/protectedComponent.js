import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const ProtectedComponent = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const allCookies = document.cookie;
    const token = getCookie('token');
    if (!token) {
      router.push('/user/login/page');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedComponent;
