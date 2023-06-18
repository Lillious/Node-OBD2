import { SerialPortStream } from '@serialport/stream';
import { MockBinding } from '@serialport/binding-mock';

MockBinding.createPort('/dev/ROBOT', { echo: true, record: true })
export const serialport = new SerialPortStream({ binding: MockBinding, path: '/dev/ROBOT', baudRate: 14400 });