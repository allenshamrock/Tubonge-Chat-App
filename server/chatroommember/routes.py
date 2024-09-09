from models import ChatRoomMember, ChatRoom
from flask_restful import Resource
from flask import make_response, request, jsonify
from config import db
# from datetime import datetime


class ChatRoomMembers(Resource):
    def get(self, chatroom_id):
        chatroom = ChatRoom.query.get(chatroom_id)

        if not chatroom:
            return make_response(jsonify({'error': 'Chatroom not found'}), 404)

        members = ChatRoomMember.query.filter_by(
            chat_room_id=chatroom_id).all()
        member_list = [{
            'user_id': member.user_id,
            'role': getattr(member, 'role', 'Member'),
            'joined_at': member.joined_at.isoformat()  
        } for member in members]

        return make_response(jsonify({'members': member_list}), 200)
    

class ChatRoomMembersId(Resource):
    def post(self,chatroom_id):
        data = request.get_json()
        user_id =data.get('user_id')

        chatroom = ChatRoom.query.get(chatroom_id)

        if not chatroom:
            return jsonify({'error':'Chatroom not found'})
        
        # Check if requester is an admin
        requesting_user_id =chatroom.created_by_id
        if requesting_user_id !=chatroom.created_by_id:
            return jsonify({'error':'Only an  admin can add users '})
        
        # Add new member
        new_member = ChatRoomMembers(user_id=user_id,chatroom_id=chatroom_id,role='member')

        db.session.add(new_member)
        db.session.commit()
        return jsonify({"message":"A new memeber has been added successfully"})
    
    def patch(self,chatroom_id,user_id):
        data = request.get_json()
        new_role = data.get('new_role')

        chatroom = ChatRoom.query.get(chatroom_id)

        if not chatroom:
            return jsonify({"error":"chatroom not found"})
        
        requesting_user_id = chatroom.created_by_id

        if requesting_user_id != chatroom.created_by_id:
            return jsonify({"error":"Only an admin can make this change"})
        
        member = ChatRoomMember.query.filter_by(user_id=user_id,chatroom_id=chatroom_id).first()
        if not member:
            jsonify({"error":"Member not found"})
        
        member.role = new_role

        db.session.commit()
        return jsonify({"message":f"Member role updated to {new_role} successfully"})
    

    def delete(self,user_id,chatroom_id):
        chatroom = ChatRoom.query.get(chatroom_id)
        if not chatroom:
            return jsonify({"error":"Chatroom not found"})
        
        requesting_user_id = chatroom.created_by_id
        if requesting_user_id != chatroom.created_by_id:
            return jsonify({"error":"Only an admin can delete a user"})
        
        member = ChatRoomMember.query.filter_by(user_id=user_id,chatroom_id=chatroom_id).first()
        if not member:
            return jsonify({"error":"Member ot found"})
        
        db.session.delete(member)
        db.session.commit()

        return jsonify({"message":"A member has been deleted successfully"})
        

        

        
    # def get(self):
    #     # Get the 'chatroom_id' from the request arguments
    #     # Assuming it's passed as a query parameter
    #     chatroom_id = request.args.get('chatroom_id')

    #     if not chatroom_id:
    #         return make_response(jsonify({'error': 'Chatroom ID is required'}), 400)

    #     chatroom = ChatRoom.query.get(chatroom_id)
    #     if not chatroom:
    #         return make_response(jsonify({'error': 'Chatroom not found'}), 404)

    #     # Query all members of the specified chatroom
    #     members = ChatRoomMember.query.filter_by(
    #         chat_room_id=chatroom_id).all()

    #     # Construct the list of members
    #     member_list = [{
    #         'user_id': member.user_id,
    #         'role': getattr(member, 'role', 'Member'),
    #         'joined_at': member.joined_at.isoformat()
    #     } for member in members]

    #     return make_response(jsonify({'members': member_list}), 200)
    
 
    
  
