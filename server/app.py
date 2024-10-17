from flask_socketio import SocketIO, emit
from models import User, Friendship, BlockedUser, Message, ChatRoom, ChatRoomMember, FileAttachment
from file import file_blueprint
from auth import auth_blueprint
from freinds import friends_blueprint
from message import message_blueprint
from chatrooms import chat_room_blueprint
from chatroommember import chat_room_member_blueprint
from block import block_blueprint
from user import user_blueprint
from config import app

# Initialize Flask-SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Register Blueprints
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(file_blueprint, url_prefix='/file')
app.register_blueprint(friends_blueprint, url_prefix='/friends')
app.register_blueprint(message_blueprint, url_prefix='/message')
app.register_blueprint(chat_room_blueprint, url_prefix='/chatroom')
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(chat_room_member_blueprint,
                       url_prefix='/chatroommember')
app.register_blueprint(block_blueprint, url_prefix='/block')

# socket handler for sending messages


@socketio.on('send_message')
def handle_send_message(data):
    recipient_id = data['recipient_id']
    message_content = data['message']

    # Emit the message to the recipient
    emit('receive_message', {
        'recipient_id': recipient_id,
        'message': message_content
    }, room=recipient_id)


# Run the app with Flask-SocketIO support
if __name__ == '__main__':
    socketio.run(app, debug=True, port=5555)
