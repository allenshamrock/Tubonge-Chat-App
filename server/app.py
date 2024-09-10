# from flask_socketio import emit
from models import User,Friendship,BlockedUser,Message,ChatRoom,ChatRoomMember,FileAttachment
from file import file_blueprint
from auth import auth_blueprint
from freinds import friends_blueprint
from message import message_blueprint
from chatrooms import chat_room_blueprint
from chatroommember import chat_room_member_blueprint
from block import block_blueprint
from user import user_blueprint

# from . import socketio
from config import app

app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(file_blueprint,url_prefix = '/file')
app.register_blueprint(friends_blueprint,url_prefix ='/friends')
app.register_blueprint(message_blueprint,url_prefix = '/message')
app.register_blueprint(chat_room_blueprint,url_prefix = '/chatroom')
app.register_blueprint(auth_blueprint,url_prefix = '/auth')
app.register_blueprint(chat_room_member_blueprint,url_prefix = '/chatroommember')
app.register_blueprint(block_blueprint,url_prefix='/block')

# @socketio.on('send_message')
# def handle_send_message(data):
#     recipient_id = data['recipient_id']
#     message_content = data['message']

#     # Create a notification
#     notification = Notification(
#         user_id=recipient_id,
#         message=message_content,
#         type='message'  # Example type
#     )
#     db.session.add(notification)
#     db.session.commit()

#     # Emit a notification to the recipient
#     emit('new_notification', {
#         'user_id': recipient_id,
#         'message': message_content
#     }, room=recipient_id)



if __name__ == '__main__':
    app.run(debug=True,port=5555)