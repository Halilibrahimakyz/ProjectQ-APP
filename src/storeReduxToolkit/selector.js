import { createSelector } from 'reselect';

const selectUserSupporter = (state) => state.userSupporter;
const selectUserStudent = (state) => state.userStudent;

export const makeSelectIsSupporterLoggedIn = createSelector(
  [selectUserSupporter],
  (userSupporter) => userSupporter.isAuthenticated
);

export const makeSelectIsStudentLoggedIn = createSelector(
  [selectUserStudent],
  (userStudent) => userStudent.isAuthenticated
);
