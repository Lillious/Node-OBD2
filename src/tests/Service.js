import { EventEmitter } from 'node:events';
const eventEmitter = new EventEmitter();
import { ReadlineParser } from '@serialport/parser-readline'
import { MockBinding } from '@serialport/binding-mock'
import { SerialPortStream } from '@serialport/stream'
import { Buffer } from 'node:buffer';

const Settings = {
    ConnectionAttempts: 0,
    Connected: false,
};

// Serial port options
const options = {
    baudRate: 115200,
    path: '/dev/test',
    autoOpen: true,
    binding: MockBinding,
    dataBits: 8,
    parity: 'none',
    flowControl: false,
};

MockBinding.createPort(options.path, { echo: true, record: true })

// Create serial port instance with options
const serialport = new SerialPortStream(options)
const parser = serialport.pipe(new ReadlineParser());
// Connect to serial port
serialport.on('open', async () => {

    // Emit connected event
    eventEmitter.emit('connected');

    const run = (command) => {
        return new Promise((resolve, reject) => {
            // Write to serial port as a buffer
            serialport.write(Buffer.from(command) + "\n", (error) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    };

    // Get vehicle VIN
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
    if (error.toString().includes(`Error: Opening ${options.path}`) || error.toString().includes("No such file or directory")) {
        console.log(`[#${[Settings.ConnectionAttempts+1]}] Attempting to reconnect...`);
        setTimeout(() => {
            // Timeout after 5 attempts
            if (Settings.ConnectionAttempts >= 4) return console.log(`Unable to reconnect to ${options.path}`);
            Settings.ConnectionAttempts++;
            serialport.open();
        }, 5000);
    }
});

parser.on('data', (data) => {
    if (data == '0901') {
        // Simulate proper data response from the 0901 AT command
        data = '57 42 41 56 43 39 33 35 37 37 4b 30 33 31 37 35 32'
        const simulatedVin = Buffer.from(data.replace(/\s/g, ''), 'hex').toString('utf8');
        console.log(`Vehicle VIN: ${simulatedVin}`);
        return;
    }
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