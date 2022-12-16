import { exec } from "child_process";

export const execute = (command) => {
    console.log(`Executing command: ${command}`);
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

// Get vehicle VIN
export const getVin = () => {
    execute('0901').then((result) => {
        return result;
    }).catch((error) => {
        console.log(`Failed to get VIN: ${error}`);
    });
};