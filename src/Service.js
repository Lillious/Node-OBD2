import { EventEmitter } from 'node:events';
const eventEmitter = new EventEmitter();
import { ReadlineParser } from '@serialport/parser-readline'
import { SerialPort } from 'serialport'

const Settings = {
    ConnectionAttempts: 0,
    Connected: false,
};

// Serial port options
const options = {
    baudRate: 115200,
    path: '/dev/ttyUSB0',
    autoOpen: true,
};

// Create serial port instance with options
const serialport = new SerialPort(options)
const parser = serialport.pipe(new ReadlineParser());
// Connect to serial port
serialport.on('open', async () => {

    // Emit connected event
    eventEmitter.emit('connected');

    const run = (command) => {
        return new Promise((resolve, reject) => {
            serialport.write(command, (error) => {
                if (error) {
                    console.log(`${error}`);
                    reject(error);
                }
                console.log(`> ${command}`);
                resolve();
            });
        });
    };

    run('ATZ').catch((error) => {
        throw new Error(`${error}`);
    });
    // Disable echo
    run('ATE0').catch((error) => {
        throw new Error(`${error}`);
    });
    // Disable linefeeds and carriage returns
    run('ATL0').catch((error) => {
        throw new Error(`${error}`);
    });
    // Disable spaces in responses
    run('ATS0').catch((error) => {
        throw new Error(`${error}`);
    });
    // Disable headers in responses
    run('ATH0').catch((error) => {
        throw new Error(`${error}`);
    });
    // Set protocol to automatic
    run('ATSP0').catch((error) => {
        throw new Error(`${error}`);
    });
    // Get vehicle VIN number
    run('0901').catch((error) => {
        throw new Error(`${error}`);
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

// Parse serial port data
parser.on('data', (data) => {
    console.log(data);
});

// Catch serial port disconnect
serialport.on('disconnect', () => {
    // Emit disconnected event
    eventEmitter.emit('disconnected');
});

// Catch serial port close
serialport.on('close', () => {
    // Emit disconnected event
    eventEmitter.emit('disconnected');
});

eventEmitter.on('connected', () => {
    Settings.Connected = true;
    // Reset connection attempts
    Settings.ConnectionAttempts = 0;
    console.log(`Connected to ${options.path}`);
});

eventEmitter.on('disconnected', () => {
    // Set connected to false
    Settings.Connected = false;
    // Reset connection attempts
    Settings.ConnectionAttempts = 0;
    console.log(`Disconnected from ${options.path}`);
});

// Catch uncaught exceptions and attempt to reconnect
process.on('uncaughtException', function(error) {
    console.log(`${error}`);
    // Attempt to reconnect if not already connected
    if (Settings.Connected) return;
    serialport.open();
});
