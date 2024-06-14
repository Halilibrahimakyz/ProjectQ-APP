import api from '../api/apiClient';
import * as Keychain from 'react-native-keychain';
import { store } from '../storeReduxToolkit/store';
import { setAccessToken, removeAccessToken } from '../storeReduxToolkit/authorizationSlice';
import { LOGIN_STUDENT, LOGIN_SUPPORTER, SIGNUP_STUDENT, SIGNUP_SUPPORTER, LOGOUT, REFRESH_TOKEN } from '../api/endpoints';
import {Credentials,SignupDataStudent,SignupDataSupporter} from '@/types'

export const loginStudent = async (credentials: Credentials) => {
  try {
    const response = await api.post(LOGIN_STUDENT, credentials);
    const { accessToken, refreshToken } = response.data;

    await Keychain.setGenericPassword('refreshToken', refreshToken, { service: 'refreshToken' });
    store.dispatch(setAccessToken(accessToken));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginSupporter = async (credentials: Credentials) => {
  try {
    const response = await api.post(LOGIN_SUPPORTER, credentials);
    const { accessToken, refreshToken } = response.data;

    await Keychain.setGenericPassword('refreshToken', refreshToken, { service: 'refreshToken' });
    store.dispatch(setAccessToken(accessToken));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupStudent = async (signupData: SignupDataStudent) => {
  try {
    // console.log("signup Student",signupData)
    const response = await api.post(SIGNUP_STUDENT, signupData);
    // console.log("response: ",response)
    const { accessToken, refreshToken } = response.data;
    console.log("response.data;: ",response.data)
    console.log("accessToken: ",accessToken)
    console.log("refreshToken: ",refreshToken)
    await Keychain.setGenericPassword('refreshToken', refreshToken, { service: 'refreshToken' });
    store.dispatch(setAccessToken(accessToken));

    return response.data;
  } catch (error) {
    console.log("error: ",error)
    throw error;
  }
};

export const signupSupporter = async (signupData: SignupDataSupporter) => {
  try {
    const response = await api.post(SIGNUP_SUPPORTER, signupData);
    const { accessToken, refreshToken } = response.data;

    await Keychain.setGenericPassword('refreshToken', refreshToken, { service: 'refreshToken' });
    store.dispatch(setAccessToken(accessToken));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: 'refreshToken' });
    const refreshToken = credentials ? credentials.password : null;
    if (!refreshToken) throw new Error('No refresh token available');

    await api.post(LOGOUT, { refreshToken });
    await Keychain.resetGenericPassword({ service: 'refreshToken' });
    store.dispatch(removeAccessToken());
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    console.log("refresh token isteği atılıyor");
    const credentials = await Keychain.getGenericPassword({ service: 'refreshToken' });
    const refreshToken = credentials ? credentials.password : null;
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await api.post(REFRESH_TOKEN, { refreshToken });
    const { accessToken } = response.data;

    store.dispatch(setAccessToken(accessToken));

    return response.data;
  } catch (error) {
    console.error("Error refreshing token: ", error);
    throw error;
  }
};
