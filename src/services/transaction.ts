import api from '../api/apiClient';
import {POST_DONATE_TO_PROJECT} from '../api/endpoints';

import axios from 'axios';

export const DonateToProject = async (projectId: number, amount: number) => {
    try {
      const response = await api.post(POST_DONATE_TO_PROJECT, {
        projectId,
        amount,
      });
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