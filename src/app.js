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

// Socket.io server
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);

app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))

server.listen(port, () => {
    console.log(`Express listening on port ${port}`)
});

app.get('/restart', function (req, res, next) {
    res.redirect('/');
    process.exit(1);
});

const OpenSerialPort = () => {
    return new Promise((resolve, reject) => {
        Binding.list().then((ports) => {
            Object.keys(ports).forEach((key) => {
                console.log(`Found serial device: ${ports[key].path}`)
                resolve(ports[key].path);
            });
        });
    });
};

const options = {
    baudRate: 115200,
    autoOpen: false,
    dataBits: 8,
    path: await OpenSerialPort(),
    parity: 'none',
    flowControl: false,
};

class Serial {
    constructor (options) {
        this.options = options;
        this.serialport = new SerialPort(this.options);
        this.parser = this.serialport.pipe(new ReadlineParser());
    }
    connect() {
        this.serialport.open();

        this.serialport.on('open', () => {
            // Connection opened
        });

        this.serialport.on('close', () => {
            // Disconnect
            console.log('Connection terminated')
        });

        this.serialport.on('error', (err) => {
            console.log(`Error: ${err.message}`);
        });

        this.parser.on('data', (data) => {
            console.log(`Data received: ${data}`);
            io.emit('data', data);
        });
    }
    disconnect() {
        this.serialport.close();
    }
}

let serial = new Serial(options);

io.on('connection', async (socket) => {
    // Check if serial port is open every 5 seconds
    setInterval(() => {
        if (serial.serialport.isOpen) {       
            socket.emit('serialport', { status: 'open', path: options.path });
        } else {
            socket.emit('serialport', { status: 'closed' });
        }
    }, 50);

    socket.on('_connect', () => {
        serial.connect();

        socket.on('command', (data) => {
            serial.serialport.write('010D\r\n', (err) => {
                if (err) {
                    console.log(`Error on write: ${err.message}`);
                    io.emit('data', 'An error occurred while writing to the serial port');
                } else {
                    console.log(`Command received: ${data}`);
                }
            });
        });
    });

    socket.on('_disconnect', () => {
        serial.disconnect();
    });
});
