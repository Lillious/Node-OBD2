import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 8080;
import { ReadlineParser } from '@serialport/parser-readline';
import { autoDetect } from '@serialport/bindings-cpp';
const Binding = autoDetect();
import { SerialPort } from 'serialport';
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))

const OpenSerialPort = () => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            Binding.list().then((ports) => {
                if (ports.length > 0) clearImmediate(interval);
                Object.keys(ports).forEach((key) => {
                    resolve(ports[key].path);
                });
            }).catch((err) => {
                reject(err);
            });
        }, 1000);
    });
};

io.on('connection', async (socket) => {
    const options = {
        baudRate: 115200,
        autoOpen: false,
        dataBits: 8,
        path: await OpenSerialPort(),
        parity: 'none',
        flowControl: false,
    };
    
    const serialport = new SerialPort(options);

    // Check if the serial port is already open before opening it
    if (serialport.isOpen) {
        console.log(`Serial port ${options.path} is already open`);
        socket.emit('connected', { path: options.path });
    } else {
        // Open the serial port
        serialport.open((err) => {
            if (err) console.log(err.message);
        });
    }

    // Create a parser object
    const parser = serialport.pipe(new ReadlineParser());

    serialport.on('open', () => {
        console.log(`Serial port opened at ${options.path}`);
        socket.emit('connected', { path: options.path });
    });
    
    // Handle closed connection events
    serialport.on('close', () => {
        console.log('Serial port closed');
        socket.emit('disconnected');
    });

    let busy = 0;
    // Handle data sent from the client to the serial port
    socket.on('data', (data) => {
        serialport.write(data, (err) => {
            busy = 1;
            console.log(`Sent data: ${data}`);
            if (err) console.log(err.message);
            // Send timeout error if the serial port did not respond within 5 seconds
            setTimeout(() => {
                if (busy == 1) {
                    console.log('Serial port timed out');
                    socket.emit('message', 'Serial port timed out');
                }
            }, 5000);
        });
    });
        
    // Handle incoming data from the serial port
    parser.on('data', (data) => {
        busy = 0;
        console.log(`Received data: ${data}`);
    });

    // Handle unexpected disconnections
    socket.on('disconnect', () => {
        // Make sure the serial port is open before closing it
        if (serialport.isOpen) serialport.close((err) => {
            if (err) console.log(err.message);
        });
    });

    // Handle errors
    serialport.on('error', (err) => {
        console.log(err.message);
    });
    
});

server.listen(port, () => {
    console.log(`Express listening on port ${port}`)
});