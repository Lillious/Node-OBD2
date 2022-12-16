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

var connected = false;

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
                                    // Bind device to serial port
                                    Service.execute(`sudo rfcomm bind rfcomm0 ${macAddress}`).then((result) => {
                                        connected = true;
                                    }).catch((error) => {
                                        console.log(`Failed to bind device to serial port: ${error}`);
                                    });
                                }).catch((error) => {
                                    console.log(`Failed to trust device: ${error}`);
                                });
                            }).catch((error) => {
                                console.log(`Failed to pair device: ${error}`);
                            });
                        }).catch((error) => {
                            console.log(`Failed to scan: ${error}`);
                        });
                    }).catch((error) => {
                        console.log(`Failed to set default agent: ${error}`);
                    });
                }).catch((error) => {
                    console.log(`Failed to set agent: ${error}`);
                });
            }).catch((error) => {
                console.log(`Failed to set pairable: ${error}`);
            });
        }).catch((error) => {
            console.log(`Failed to set power: ${error}`);
            console.log(`Attempting to start bluetoothd...`);
            Service.execute("sudo systemctl start bluetooth").then((result) => {
                console.log(`Bluetoothd started successfully`);
                // Restart function
                pairMode();
            }).catch((error) => {
                console.log(`Failed to start bluetoothd: ${error}`);
            });
        });
    }).catch((error) => {
        console.log(error);
    });
};

setInterval(() => {
    if (connected) {
        Service.execute("screen /dev/rfcomm0").then((result) => {
            Service.execute("ath0").then((result) => {
                // Automatic protocol detection
                Service.execute("atsp0").then((result) => {
                    Service.getVin().then((result) => {
                        console.log(`VIN: ${result}`);
                    }).catch((error) => {
                        console.log(`Failed to get VIN: ${error}`);
                    });
                }).catch((error) => {
                    console.log(`Failed to set protocol: ${error}`);
                });
            }).catch((error) => {
                console.log(`Failed to set header: ${error}`);
            });
        }).catch((error) => {
            console.log(`Failed to connect to device: ${error}`);
        });
    }
}, 1000);