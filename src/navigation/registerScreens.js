import { registerAuthScreens } from './authScreens';
import { registerStudentScreens } from './studentScreens';
import { registerSupportScreens } from './supporterScreens';
import { registerOtherScreens } from './otherScreens';

const registerScreens = () => {
    registerAuthScreens();
    registerStudentScreens();
    registerSupportScreens();
    registerOtherScreens();
};

export default registerScreens;