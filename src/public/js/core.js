const socket = io();
const statusText = document.getElementById('status');
const connect = document.getElementById('connect');
const disconnect = document.getElementById('disconnect');
const retry = document.getElementById('retry');
const command = document.getElementById('command');
const send = document.getElementById('send');
const output = document.getElementById('output');

socket.on('serialport', (data) => {
    if (data.status == 'open') {
        statusText.innerHTML = `Status: Connected to ${data.path}`;
        statusText.style.color = '#238636';
        disable('connect')
        enable('disconnect')
        disable('retry')
        enable('send')
        enable('command')
    } else if (data.status == 'closed') {
        statusText.innerHTML = 'Status: Disconnected';
        statusText.style.color = '#d93025';
        enable('connect')
        disable('disconnect')
        enable('retry')
        disable('send')
        disable('command')
    } else if (data.status == 'error') {
        statusText.innerHTML = `Error: ${data.message}`;
        statusText.style.color = '#d93025';
        enable('connect')
        disable('disconnect')
        enable('retry')
        disable('send')
        disable('command')
    }
});

// Check if connection is stuck
setTimeout(() => {
    if (statusText.innerHTML == 'Connecting...' || statusText.innerHTML == 'Checking Connection...') {
        statusText.innerHTML = 'Error: Unable to locate a serial port';
        statusText.style.color = '#d93025';
        disable('connect')
        disable('disconnect')
        enable('retry')
        disable('send')
        disable('command')
    }
}, 1000);

socket.on('connect', () => {
    statusText.innerHTML = 'Checking Connection...';
    statusText.style.color = '#fc8c03';
    disable('connect')
    disable('disconnect')
    disable('retry')
    disable('send')
    disable('command')
    // Check if connection is stuck
    setTimeout(() => {
        if (statusText.innerHTML == 'Connecting...' || statusText.innerHTML == 'Checking Connection...') {
            statusText.innerHTML = 'Error: Unable to connect to serial port';
            statusText.style.color = '#d93025';
            disable('connect')
            disable('disconnect')
            enable('retry')
            disable('send')
            disable('command')
        }
    }, 1000);
});

// Lost connection
socket.on('disconnect', () => {
    statusText.innerHTML = 'Status: Disconnected';
    statusText.style.color = '#d93025';
    enable('connect')
    disable('disconnect')
    disable('retry')
    disable('send')
    disable('command')
});

if (connect) {
    connect.addEventListener('click', () => {
        socket.emit('_connect');
        disable('connect')
        disable('disconnect')
        disable('retry')
        disable('send')
        disable('command')
        statusText.style.color = '#fc8c03';
        statusText.innerHTML = 'Connecting...';
        // Check if connection is stuck
        setTimeout(() => {
            if (statusText.innerHTML == 'Connecting...') {
                statusText.innerHTML = 'Error: Unable to connect to serial port';
                statusText.style.color = '#d93025';
                disable('connect')
                disable('disconnect')
                enable('retry')
                disable('send')
                disable('command')
            }
        }, 1000);
    });
}

if (disconnect) {
    disconnect.addEventListener('click', () => {
        disable('connect')
        disable('disconnect')
        disable('retry')
        disable('send')
        disable('command')
        socket.emit('_disconnect');
        statusText.style.color = '#fc8c03';
        statusText.innerHTML = 'Disconnecting...';
        // Send request to restart server
        location.href = '/restart';
        restartWindow.close();
    });
}

if (retry) {
    retry.addEventListener('click', () => {
        // Send request to restart server
        location.href = '/restart';
        restartWindow.close();
        disable('connect')
        disable('disconnect')
        disable('retry')
        statusText.style.color = '#fc8c03';
        statusText.innerHTML = 'Connecting...';
        // Check if connection is stuck
        setTimeout(() => {
            if (statusText.innerHTML == 'Connecting...') {
                statusText.innerHTML = 'Error: Unable to locate a serial port';
                statusText.style.color = '#d93025';
                disable('connect')
                disable('disconnect')
                enable('retry')
            }
        }, 1000);
    });
}

if (command && send) {
    console.log('Command and send found');
    // Check if enter key is pressed
    command.addEventListener('keypress', (event) => {
        if (command.value == '') return;
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('send').click();
        }
    });
    send.addEventListener('click', () => {
        if (command.value == '') return;
        if (!command.value.match(/^[a-fA-F0-9_]+$/)) {
            // Invalid command
            command.classList.add('invalid');
            setTimeout(() => {
                command.classList.remove('invalid');
            }, 5000);
            return;
        }
        // Create p element
        let p = document.createElement('p');
        p.innerHTML = `> ${command.value.toString()}<br>`;
        output.appendChild(p);
        socket.emit('command', command.value);
        command.value = '';
    });
}

socket.on('data', (data) => {
    // Create p element
    let p = document.createElement('p');
    p.innerHTML = `${data}<br>`;
    output.appendChild(p);
});

function disable (item) {
    switch (item) {
        case 'connect':
            connect.disabled = true;
        break;
        case 'disconnect':
            disconnect.disabled = true;
        break;
        case 'retry':
            retry.disabled = true;
        break;
        case 'command':
            command.disabled = true;
        break;
        case 'send':
            send.disabled = true;
        break;
    }
}

function enable (item) {
    switch (item) {
        case 'connect':
            connect.disabled = false;
        break;
        case 'disconnect':
            disconnect.disabled = false;
        break;
        case 'retry':
            retry.disabled = false;
        break;
        case 'command':
            command.disabled = false;
        break;
        case 'send':
            send.disabled = false;
        break;
    }
}