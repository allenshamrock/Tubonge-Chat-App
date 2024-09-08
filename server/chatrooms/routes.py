from models import ChatRoom,User
from flask import session,request,jsonify,make_response
from config import db 
from flask_restful import Resource
from datetime import datetime

class ChatRooms(Resource):
    def get(self):
        chats = [chat.to_dict for chat in ChatRoom.query.all()]
        return jsonify(chats)
    
    def post(self):
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        created_by_id = data.get('created_by_id')
        
        # Verify wheather the creator(user) exists in the Users table
        creator = User.query.get(created_by_id)

        if not creator:
            return make_response(jsonify({"error":"User with the given ID doesn't exists "}),404)

        new_chat_room = ChatRoom(
            name = name,
            description = description,
            created_by_id = created_by_id,
            created_at = datetime.utc.now()
        )

        db.session.add(new_chat_room)
        db.session.commit()

        return make_response(jsonify({'message':'Chat room created successfully',
                             'chat_room':{
                                 'id':'new_chat_room.id',
                                 'name':'new_chat_room.name',
                                 'description':'new_chat_room.description',
                                 'created_by_id':'new_chat_room.created_by_id',
                                 'created_at':'new_chat_room.created_at'
                             }
                            }),201)

class ChatRoomId(Resource):
    def get(self,id):
        chatroom = ChatRooms.query.get_or_404(id)
        return jsonify(chatroom.to_dict())
    
    def patch(self,id):
        chatroom = ChatRoom.query.get_or_404(id)
        data = request.get_json()

        for key,value in data.items():
            setattr(chatroom,key,value)
        
        db.session.commit()
        return jsonify(chatroom.to_dict())
    
    def delete(self,id):
        chatroom = ChatRoom.query.get_or_404(id)
        db.session.delete(chatroom)
        db.session.commit()
        return make_response(jsonify({'message':'Chatroom deleted successfully'}),200)
