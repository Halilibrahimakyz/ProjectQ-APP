import { registerAuthScreens } from './authScreens';
import { registerStudentScreens } from './studentScreens';
import { registerSupportScreens } from './supporterScreens';

const registerScreens = () => {
    registerAuthScreens();
    registerStudentScreens();
    registerSupportScreens();
};
export default registerScreens;