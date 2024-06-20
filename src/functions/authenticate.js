import { useSelector } from 'react-redux';
import { makeSelectIsSupporterLoggedIn, makeSelectIsStudentLoggedIn } from '@/storeReduxToolkit/selector';
import { useEffect, useMemo } from 'react';

export const useAuth = () => {
  const isSupporterLoggedIn = useSelector(makeSelectIsSupporterLoggedIn);
  const isStudentLoggedIn = useSelector(makeSelectIsStudentLoggedIn);

  const userType = useMemo(() => {
    return isSupporterLoggedIn ? 'supporter' : (isStudentLoggedIn ? 'student' : null);
  }, [isSupporterLoggedIn, isStudentLoggedIn]);

  const isLoggedIn = useMemo(() => {
    return isSupporterLoggedIn || isStudentLoggedIn;
  }, [isSupporterLoggedIn, isStudentLoggedIn]);

  useEffect(() => {
    console.log('useAuth userType:', userType, 'isLoggedIn:', isLoggedIn);
  }, [userType, isLoggedIn]);

  return { userType, isLoggedIn };
};
