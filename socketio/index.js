const io = require('socket.io')(8080, {
    cors: {
        origin: "http://localhost:3000"
    },
});
let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
};

io.on('Connection', (socket) => {
    //when connect
    console.log('A user connected')

    //Take userId and socketId from user
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    //Send and get message
    socket.on('sendMessage', ({ senderId, receriverId, text }) => {
        const user = getUser(receriverId);
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
        })
    })

    //When disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected!')
        removeUser(socket.io)
        io.emit('getUsers', users)
    })
})