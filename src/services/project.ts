import api from '../api/apiClient';
import * as Keychain from 'react-native-keychain';
import {store} from '../storeReduxToolkit/store';
import {
  setAccessToken,
  removeAccessToken,
} from '../storeReduxToolkit/authorizationSlice';
import {POST_CREATE_PROJECT,GET_PROJECTS} from '../api/endpoints';
import {
  ProjectData,
  Credentials,
  SignupDataStudent,
  SignupDataSupporter,
} from '@/types';
import axios from 'axios';

export const createProject = async (projectData: ProjectData) => {
  try {
    const response = await api.post(POST_CREATE_PROJECT, projectData);
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      // Handle token refresh logic is managed by interceptor
      console.log("access token error")
    }
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get(GET_PROJECTS);
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      // Handle token refresh logic is managed by interceptor
      console.log("access token error")
    }
    throw error;
  }
};

