import api from '../api/apiClient';
import { CHECK_USERNAME } from '../api/endpoints';

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await api.post(CHECK_USERNAME, { username });
    console.log("response: ",response.data.success)
    return response.data.success;
  } catch (error) {
    console.error('Error checking username availability:', error);
    return false;
  }
};
