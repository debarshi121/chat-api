const User = require("./userModel");
const ChatRoom = require("./chatRoomModel");

User.belongsToMany(ChatRoom, { through: 'RoomUser' });
ChatRoom.belongsToMany(User, { through: 'RoomUser' });

module.exports = {
    User,
    ChatRoom
}