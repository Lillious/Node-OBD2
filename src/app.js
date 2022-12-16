import * as Service from './Service.js';
const arg = process.argv.slice(2)[0];

const getMac = () => {
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

const macAddress = getMac();
if (macAddress) {
    Service.execute("sudo bluetoothctl").then((result) => {
        console.log(result);
        Service.execute("power on").then((result) => {
            console.log(result);
            Service.execute("pairable on").then((result) => {
                console.log(result);
                Service.execute("agent on").then((result) => {
                    console.log(result);
                    Service.execute("default-agent").then((result) => {
                        console.log(result);
                        Service.execute("scan on").then((result) => {
                            console.log(result);
                            // Pair with device
                            Service.execute(`pair ${macAddress}`).then((result) => {
                                console.log(result);
                                // Trust device
                                Service.execute(`trust ${macAddress}`).then((result) => {
                                    console.log(result);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
} else {
    console.log('MAC address is not valid');
}
