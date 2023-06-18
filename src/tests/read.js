import { serialport } from './connect.js';

serialport.open((err) => {
    if (err) console.log(err.message);
    serialport.write('Hello world');
});

serialport.on('data', (data) => {
    console.log(data.toString());
});
