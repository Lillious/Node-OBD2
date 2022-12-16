import * as Service from './Service.js';
const arg = process.argv.slice(2)[0];

const getMac = async () => {
    if (!arg) return;
    if (arg.toString() === '-mac') {
        var mac = process.argv.slice(2)[1];
        mac = mac.replace(/-/g, ':').toUpperCase();
        const addMacReg = "^[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}$";
        const regex = new RegExp(addMacReg);
        if (regex.test(mac)) {
            return mac;
        } else {
            console.log('MAC address is not valid');
            return undefined;
        }
    }
};



const pairMode = async () => {
    const macAddress = await getMac();
    Service.execute("sudo bluetoothctl").then((result) => {
        Service.execute("power on").then((result) => {
            Service.execute("pairable on").then((result) => {
                Service.execute("agent on").then((result) => {
                    Service.execute("default-agent").then((result) => {
                        Service.execute("scan on").then((result) => {
                            // Pair with device
                            Service.execute(`pair ${macAddress}`).then((result) => {
                                // Trust device
                                Service.execute(`trust ${macAddress}`).then((result) => {
                                });
                            });
                        });
                    });
                });
            });
        });
    }).catch((error) => {
        console.log(error);
    });
};

