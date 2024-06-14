import { registerAuthScreens } from './authScreens';
import { registerStudentScreens } from './studentScreens';
import { registerSupportScreens } from './supporterScreens';
import { registerOtherScreens } from './otherScreens';
import { registerSettingsScreens } from './settingsScreens';

const registerScreens = () => {
    registerAuthScreens();
    registerStudentScreens();
    registerSupportScreens();
    registerOtherScreens();
    registerSettingsScreens();
};

export default registerScreens;