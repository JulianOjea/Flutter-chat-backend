const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/socket');
const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');

//Mensajes de sockets
io.on('connection', (client) => { // client: cliente que se acaba de conectar al socket server
    console.log('Cliente conectado');
    
    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);
    console.log(valid, uid);
    
    //Verificar autenticación
    if ( !valid ){
        return client.disconnect();
    }

    //Cliente autenticado
    //console.log('Cliente autenticado');
    connectedUser(uid);

    // Ingresar al usuario a una sala concreta
    //sala global -> todos los dispositivos conectados aqui (io.emit)
    //con el client.id se puede mandar un mensaje a un cliente, 
    //unir al cliente a la sala con el uid
    client.join(uid);
    //es necesario guardar el mensaje en la bd para tenerlo cacheados

    //escuchar el mensaje personal del cliente
    client.on('personal-message', async (payload) => {
        //TODO : SAVE MESSAGE
        await saveMessage(payload);
        //emitir mensaje al cliente
        //envia el mensaje al destinatario con el id en to
        io.to(payload.to).emit('personal-message', payload);
    })

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        disconnectedUser(uid);
    }); //se lanzará cuando el cliente se desconecte

    // client.on('mensaje', (payload) => {
    //     console.log('esto es un mensajee!', payload);

    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });
    // })

});

