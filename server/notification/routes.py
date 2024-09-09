from flask_restful import Resource, reqparse
from flask import jsonify
from models import Notification
from . import socketio
from config import db


class Notifications(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'user_id', type=int, required=True, help='User ID is required')
        self.parser.add_argument(
            'message', type=str, required=True, help='Message content is required')
        self.parser.add_argument(
            'type', type=str, required=True, help='Type is required')

    def post(self):
        args = self.parser.parse_args()
        new_notification = Notification(
            user_id=args['user_id'],
            message=args['message'],
            type=args['type']
        )
        db.session.add(new_notification)
        db.session.commit()

        # Optionally, you can emit real-time notifications here
        socketio.emit('new_notification', {
            'user_id': args['user_id'],
            'message': args['message']
        }, room=args['user_id'])

        return jsonify({"message": "Notification created"}), 201

    def get(self, user_id):
        notifications = Notification.query.filter_by(user_id=user_id).all()
        return jsonify([{
            "id": n.id,
            "message": n.message,
            "created_at": n.created_at.isoformat(),
            "is_seen": n.is_seen,
            "type": n.type
        } for n in notifications])
