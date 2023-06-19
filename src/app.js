import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as translations from './translations.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 80;
import { autoDetect } from '@serialport/bindings-cpp';
const Binding = autoDetect();
import { SerialPort } from 'serialport';
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))
import * as Commands from './commands.js'

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
        baudRate: 9600,
        autoOpen: false,
        dataBits: 8,
        path: await OpenSerialPort(),
        parity: 'none',
        flowControl: false,
    };
    
    const serialport = new SerialPort(options);

    function write(data) {
        serialport.write(`${data}\r`, (err) => {
            if (err) {
                return socket.emit('message', err.message);
            }
            console.log('Sent data:', data);
        });
    }

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

    // Handle opened connection events
    serialport.on('open', () => {
        console.log(`Serial port opened at ${options.path}`);
        socket.emit('connected', { path: options.path });
        write('ATZ');
        write('ATL1');
        write('ATH0');
        write('ATSP0');
    });
    
    // Handle closed connection events
    serialport.on('close', () => {
        console.log('Serial port closed');
        socket.emit('disconnected');
    });

    // Handle data sent from the client to the serial port
    socket.on('data', (data) => {
        data = data.toLowerCase();
        const command = data;

        if (data.startsWith('get ')) {
            data = data.slice(4);
            // Returns an array with the mode name and the PID description
            const getPID = (hex) => {
                hex = hex.toUpperCase();
                const mode = hex.slice(0, 2);
                const pid = hex.slice(2, 6);
                if (translations.ServiceModes[mode]) {
                    if (!translations.ServiceModes[mode].PIDs[pid]) return false;
                    if (!translations.ServiceModes[mode].Name) return false;
                    if (!translations.ServiceModes[mode].PIDs[pid].Description) return false;
                    const bytesReturned = translations.ServiceModes[mode].PIDs[pid].BytesReturned || 0;
                    return [translations.ServiceModes[mode].Name, translations.ServiceModes[mode].PIDs[pid].Description, bytesReturned];
                }
            }

            const mode = getPID(data);

            var returnedBytes = [];
            if (mode[2] || mode[2] > 0) {
                Object.keys(mode[2]).forEach((key) => {
                    returnedBytes.push(mode[2][key]);
                });
            }

            returnedBytes = returnedBytes.join(', ') || 'None';
             
            if (!mode) return socket.emit('invalidInput');
            socket.emit('message', `> ${command}`);
            return socket.emit('message', `<b> [${data.toUpperCase().slice(0, 2)}] </b>${mode[0]}<br><b>[${data.toUpperCase().slice(2, 6)}]</b> ${mode[1]}<br>Bytes returned: ${returnedBytes}`);
        }

        if (data === 'clear') {
            return socket.emit('clearOutput');
        } else if (data === 'help') {
            socket.emit('message', `> ${command}`);
            return socket.emit('help', { Commands });
        } else {
            if (Commands.data[data]) {
                data = Commands.data[data];
            }
        }

        // Check if data is hex
        if (!/^[0-9a-fA-F]+$/.test(data.toString('hex'))) return socket.emit('invalidInput');

        socket.emit('message', `> ${command}`);

        // Write data to the serial port
        write(data);
    });

    serialport.read((err, data) => {
        if (err) {
            return socket.emit('message', err.message);
        }
        console.log('Received data:', data);
        socket.emit('message', data.toString());
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