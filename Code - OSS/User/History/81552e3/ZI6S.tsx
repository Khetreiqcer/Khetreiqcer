import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';


const Profile: React.FC = () => {

  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null; 

  return (
    // eslint-disable-next-line react/no-children-prop
    <ProtectedRoute children={undefined}>

    </ProtectedRoute>
  );
};

export default Profile;
