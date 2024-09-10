# from flask_socketio import emit
from models import User,Friendship,BlockedUser,Message,ChatRoom,ChatRoomMember,FileAttachment
from file import file_blueprint
from freinds import friends_blueprint
from message import message_blueprint
from chatrooms import chat_room_blueprint
from chatroommember import chat_room_member_blueprint
from block import block_blueprint
from user import user_blueprint

# from . import socketio
from config import app

app.register_blueprint(user_blueprint, url_prefix='/user')

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