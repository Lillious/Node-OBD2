import { EventEmitter } from 'node:events';
const eventEmitter = new EventEmitter();
import { ReadlineParser } from '@serialport/parser-readline';
import { autoDetect } from '@serialport/bindings-cpp';
const Binding = autoDetect();
import { SerialPort } from 'serialport';
import { Buffer } from 'node:buffer';

const Settings = {
    ConnectionAttempts: 0,
    Connected: false,
};

// Serial port options
const options = {
    baudRate: 115200,
    autoOpen: true,
    dataBits: 8,
    path: '',
    parity: 'none',
    flowControl: false,
};

// Automatic serial port detection
// Works on any platform that supports serialport

// Scan device for serial ports
const OpenSerialPorts = await Binding.list();

Object.keys(OpenSerialPorts).forEach((key) => {
    // Return first serial port found
    console.log(`Found serial device: ${OpenSerialPorts[key].path}`)
    return options.path = OpenSerialPorts[key].path;
});

// Check if a serial port was found
if (options.path === '') {
    throw new Error(`No serial devices found. Please connect a device and try again.`);
}

// Create serial port instance with options
const serialport = new SerialPort(options)
const parser = serialport.pipe(new ReadlineParser());

// Connect to serial port
serialport.on('open', async () => {

    // Emit connected event
    eventEmitter.emit('connected');

    const run = (command) => {
        return new Promise((resolve, reject) => {
            // Write to serial port as a buffer
            serialport.write(Buffer.from(command) + "\r\n", (error) => {
                if (error) {
                    reject(error);
                }
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
    // Get vehicle information
    run('010D').catch((error) => {
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
    if (error.toString().includes(`Error: Opening ${options.path}`) || error.toString().includes("No such file or directory")) {
        console.log(`[#${[Settings.ConnectionAttempts+1]}] Attempting to connect to ${options.path}`);
        setTimeout(() => {
            // Timeout after 5 attempts
            if (Settings.ConnectionAttempts >= 4) return console.log(`Unable to connect to ${options.path}`);
            Settings.ConnectionAttempts++;
            serialport.open();
        }, 5000);
    }
});

parser.on('data', (data) => {
    console.log(`Data: ${data}`);
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