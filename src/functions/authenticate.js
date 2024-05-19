import { useSelector } from 'react-redux';

export const useAuth = () => {
  const isSupporterLoggedIn = useSelector((state) => state.userSupporter.isAuthenticated);
  const isStudentLoggedIn = useSelector((state) => state.userStudent.isAuthenticated);

  let userType = null;
  let isLoggedIn = false;

  if (isSupporterLoggedIn) {
    userType = 'supporter';
    isLoggedIn = true;
  } else if (isStudentLoggedIn) {
    userType = 'student';
    isLoggedIn = true;
  }

  console.log('userType:', userType, 'isLoggedIn:', isLoggedIn); // Debug log

  return { userType, isLoggedIn };
};
