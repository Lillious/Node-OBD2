const socket = io();
const statusText = document.getElementById('status');
const connect = document.getElementById('connect');
const disconnect = document.getElementById('disconnect');
socket.on('serialport', (data) => {
    if (data.status == 'open') {
        console.log(`Serial port ${data.path} opened`);
        console.log(statusText.innerHTML)
        statusText.innerHTML = `Status: Connected to ${data.path}`;
        statusText.style.color = '#238636';
        connect.disabled = true;
        disconnect.disabled = false;
    } else if (data.status == 'closed') {
        console.log('Serial port closed');
        statusText.innerHTML = 'Status: Disconnected';
        statusText.style.color = '#d93025';
        connect.disabled = false;
        disconnect.disabled = true;
    }
});

setTimeout(() => {
    if (statusText.innerHTML == 'Connecting...') {
        statusText.innerHTML = 'Error: Unable to connect to serial port';
        statusText.style.color = '#d93025';
        connect.disabled = false;
    }
}, 3000);

if (connect) {
    connect.addEventListener('click', () => {
        socket.emit('_connect');
        connect.disabled = true;
        disconnect.disabled = true;
        statusText.style.color = '#fc8c03';
        statusText.innerHTML = 'Connecting...';
    });
}

if (disconnect) {
    disconnect.addEventListener('click', () => {
        socket.emit('_disconnect');
        connect.disabled = true;
        disconnect.disabled = true;
        statusText.style.color = '#fc8c03';
        statusText.innerHTML = 'Disconnecting...';
    });
}