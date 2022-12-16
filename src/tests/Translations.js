import * as translations from '../Translations.js';

const getMode = (hex) => {
    hex = hex.toUpperCase();
    const mode = hex.slice(0, 2);
    if (translations.ServiceModes[mode]) {
        return translations.ServiceModes[mode].Name;
    } else {
        console.log('Unknown Mode');
    }
}

// Returns an array with the mode name and the PID description
const getPID = (hex) => {
    hex = hex.toUpperCase();
    const mode = hex.slice(0, 2);
    const pid = hex.slice(2, 4);
    if (translations.ServiceModes[mode]) {
        return [translations.ServiceModes[mode].Name, translations.ServiceModes[mode].PIDs[pid].Description];
    } else {
        console.log('Unknown Mode');
    }
}

const mode = getPID('0901');
console.log(mode);