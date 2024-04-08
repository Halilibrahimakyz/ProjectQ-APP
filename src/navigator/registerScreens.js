import { registerAuthScreens } from './authScreens';
import { registerStudentScreens } from './studentScreens';
import { registerSupportScreens } from './supporterScreen';

const registerScreens = () => {
    registerAuthScreens();
    registerStudentScreens();
    registerSupportScreens();
};
export default registerScreens;