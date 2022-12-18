import { EventEmitter } from 'node:events';
const eventEmitter = new EventEmitter();
import * as Service from './Service.js';
import { SerialPort } from 'serialport'
const arg = process.argv.slice(2)[0];

const Settings = {
    ConnectionAttempts: 0,
    Connected: false,
};

// const getMac = () => {
//     if (!arg) return;
//     if (arg.toString() === '-mac') {
//         var mac = process.argv.slice(2)[1];
//         mac = mac.replace(/-/g, ':').toUpperCase();
//         const addMacReg = "^[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}$";
//         const regex = new RegExp(addMacReg);
//         if (regex.test(mac)) {
//             return mac;
//         } else {
//             console.log('MAC address is not valid');
//             return undefined;
//         }
//     }
// };

// Serial port options
const options = {
    baudRate: 115200,
    path: '/dev/ttyUSB0',
    autoOpen: true,
};

// Create serial port instance with options
const serialport = new SerialPort(options)

// Connect to serial port
serialport.on('open', () => {
    // Emit connected event
    eventEmitter.emit('connected');

    // Write to serial port
    serialport.write('ATZ', (error) => {
        console.log(`ATZ`);
        if (error) {
            console.log(`${error}`);
        }
    });

    // Disable echo
    serialport.write('ATE0', (error) => {
        if (error) {
            console.log(`${error}`);
        }
    });

    // Disable linefeeds and carriage returns
    serialport.write('ATL0', (error) => {
        if (error) {
            console.log(`${error}`);
        }
    });

    // Disable spaces in responses
    serialport.write('ATS0', (error) => {
        if (error) {
            console.log(`${error}`);
        }
    });

    // Disable headers in responses
    serialport.write('ATH0', (error) => {
        if (error) {
            console.log(`${error}`);
        }
    });

    // Set protocol to automatic
    serialport.write('ATSP0', (error) => {
        if (error) {
            console.log(`${error}`);
        }
    });
});

// Catch serial port permission errors
serialport.on('permissionError', (error) => {
    console.log(`${error}`);
});

// Catch serial port errors
serialport.on('error', (error) => {
    console.log(`${error}`);
    if (error.toString().includes("Error: Opening /dev/ttyUSB0") || error.toString().includes("No such file or directory")) {
        console.log(`[#${[Settings.ConnectionAttempts+1]}] Attempting to reconnect...`);
        setTimeout(() => {
            // Timeout after 5 attempts
            if (Settings.ConnectionAttempts >= 4) return console.log(`Unable to reconnect to ${options.path}`);
            Settings.ConnectionAttempts++;
            serialport.open();
        }, 5000);
    }
});

// Catch serial port data
serialport.on('data', (data) => {
    console.log(`${data}`);
});

// Catch serial port disconnect
serialport.on('disconnect', () => {
    // Emit disconnected event
    eventEmitter.emit('disconnected');
});

eventEmitter.on('connected', () => {
    console.log(`Connected to ${options.path}`);
});

eventEmitter.on('disconnected', () => {
    console.log(`Disconnected from ${options.path}`);
});

process.on('uncaughtException', function(error) {
    serialport.open();
});