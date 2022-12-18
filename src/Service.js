import { EventEmitter } from 'node:events';
const eventEmitter = new EventEmitter();
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

// Connect to serial port
serialport.on('open', async () => {

    // Emit connected event
    eventEmitter.emit('connected');

    const run = async (command) => {
        // Do not attempt to write to serial port if it is not open
        if (!serialport.Connected) return;
        serialport.write(command, (error) => {
            console.log(`${command}`);
            if (error) {
                console.log(`${error}`);
            }
        });
    };

    await run('ATZ');
    // Disable echo
    await run('ATE0');
    // Disable linefeeds and carriage returns
    await run('ATL0');
    // Disable spaces in responses
    await run('ATS0');
    // Disable headers in responses
    await run('ATH0');
    // Set protocol to automatic
    await run('ATSP0');

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