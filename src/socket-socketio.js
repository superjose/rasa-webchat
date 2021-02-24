import io from 'socket.io-client';

export default function(socketUrl, customData, path) {
    // Custom added. Oh Jesus, yes
    const options = {
        reconnectionDelay: 2500,
        reconnectionAttempts: 10,
        ...(path && { path }),
    };
    const socket = io(socketUrl, options);
    socket.on('connect', () => {
        console.log(`connect:${socket.id}`);
        socket.customData = customData;
    });

    socket.on('connect_error', error => {
        console.log(error);
    });

    socket.on('error', error => {
        console.log(error);
    });

    socket.on('disconnect', reason => {
        console.log(reason);
    });

    return socket;
}
