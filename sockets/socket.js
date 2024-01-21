const { io } = require('../index');

//Mensajes de sockets
io.on('connection', client => { // client: cliente que se acaba de conectar al socket server
    console.log('Cliente conectado');
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    }); //se lanzará cuando el cliente se desconecte

    // client.on('mensaje', (payload) => {
    //     console.log('esto es un mensajee!', payload);

    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });
    // })

});

