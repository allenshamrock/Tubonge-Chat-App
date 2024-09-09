from flask_socketio import emit
from .models import Notification, db
from . import socketio

@socketio.on('send_message')
def handle_send_message(data):
    recipient_id = data['recipient_id']
    message_content = data['message']

    # Create a notification
    notification = Notification(
        user_id=recipient_id,
        message=message_content,
        type='message'  # Example type
    )
    db.session.add(notification)
    db.session.commit()

    # Emit a notification to the recipient
    emit('new_notification', {
        'user_id': recipient_id,
        'message': message_content
    }, room=recipient_id)
