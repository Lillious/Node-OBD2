const socket = io();
const statusText = document.getElementById('status');
const disconnect = document.getElementById('disconnect');
const connect = document.getElementById('connect');
const command = document.getElementById('command');
const send = document.getElementById('send');
const output = document.getElementById('output');

socket.on('connected', (data) => {
    statusText.innerHTML = `Status: Connected to ${data.path}`;
    statusText.style.color = '#238636';
    enable('disconnect')
    disable('connect')
    enable('send')
    enable('command')
});

socket.on('disconnected', () => {
    statusText.innerHTML = 'Status: Disconnected';
    statusText.style.color = '#d93025';
    socket.disconnect();
    disable('disconnect')
    enable('connect')
    disable('send')
    disable('command')
});

socket.on('invalidInput', () => {
    command.classList.add('invalid');
    setTimeout(() => {
        command.classList.remove('invalid');
    }, 1000);
});

socket.on('clearOutput', () => {
    output.innerHTML = '';
});

socket.on('help', (data) => {
    let p = document.createElement('p');
    p.innerHTML = `> <b>Commands</b>:<br>
    <span class="command">clear</span> - Clear the output<br>
    <span class="command">help</span> - Display this help message<br>
    <span class="command">get <PID></span> - Gets information about the following PID code<br>`;
    Object.keys(data.Commands.data).forEach((key) => {
        p.innerHTML += `<span class="command">${key}</span> - ${data.Commands.data[key]}<br>`;
    });
    output.appendChild(p);
    output.scrollTo({top: output.scrollHeight, behavior: 'smooth'})
});

socket.on('message', (message) => {
    let p = document.createElement('p');
    p.innerHTML = `${message}<br>`;
    output.appendChild(p);
    output.scrollTo({top: output.scrollHeight, behavior: 'smooth'})
});

socket.on("connect_error", () => {
    statusText.innerHTML = 'Status: Connection error';
    statusText.style.color = '#d93025';
    disable('disconnect')
    enable('connect')
    disable('send')
    disable('command')
});

if (connect) {
    connect.addEventListener('click', () => {
        socket.connect();
        statusText.innerHTML = 'Status: Connecting...';
        statusText.style.color = '#fc8c03';
        disable('connect')
        disable('send')
        disable('command')
    });
}

if (disconnect) {
    disconnect.addEventListener('click', () => {
        socket.disconnect();
        statusText.innerHTML = 'Status: Disconnected';
        statusText.style.color = '#d93025';
        disable('disconnect')
        enable('connect')
        disable('send')
        disable('command')
    });
}

if (command && send) {

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
        command.value = command.value.trim();
        socket.emit('data', command.value);
        command.value = '';
    });
}

function disable (item) {
    switch (item) {
        case 'disconnect':
            disconnect.disabled = true;
        break;
        case 'connect':
            connect.disabled = true;
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
        case 'disconnect':
            disconnect.disabled = false;
        break;
        case 'connect':
            connect.disabled = false;
        break;
        case 'command':
            command.disabled = false;
        break;
        case 'send':
            send.disabled = false;
        break;
    }
}