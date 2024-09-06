from flask import request,session,jsonify,make_response
from config import db
from models import Message
from flask_restful import Resource
from datetime import datetime

class Messages(Resource):
    def get(self):
        messages = [message.to_dict() for message in Messages.query.all()]
        return jsonify(messages)
    
    def post(self):
        data = request.get_json()

        if not data or 'sender_id' not in data or 'recivers_id' not in data or 'content' not in data:
            return make_response(jsonify({"error": "Invalid data"}),400)
        
        sender_id = data.get('sender_id')
        recivers_id = data.get('recivers_id')
        content = data.get('content')

        new_message = Message(
            sender_id = sender_id,
            recivers_id = recivers_id,
            content = content,
            timestamp = datetime.utcnow(),
            is_seen = data.get('is_seen',False),
            is_deleted = data.get('is_deleted',False) 
        )

        db.session.add(new_message)
        db.session.commit()

        return make_response(jsonify({"message": "Message created successfully"}),201)

class MessagesId(Resource):
    def get(self,id):
        message = Message.query.get_or_404(id)
        return jsonify(message.to_dict())
    

    def patch(self,id):
        message = Message.query.get_or_404(id)
        data = request.get_json()
        for key,value in data.items():
            setattr(message,key,value)
        
        db.session.commit()
        return jsonify(message.to_dict())
    

    def delete(self,id):
        message = Message.query.get_or_404(id)
        db.session.delete(message)
        db.session.commit()

        return make_response(jsonify({"message":"Message deleted successfully"}), 200)