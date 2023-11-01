const User = require("./userModel");
const ChatRoom = require("./chatRoomModel");
const Message = require("./messageModel");

User.belongsToMany(ChatRoom, { through: 'RoomUser' });
ChatRoom.belongsToMany(User, { through: 'RoomUser' });

module.exports = {
    User,
    ChatRoom,
    Message
}