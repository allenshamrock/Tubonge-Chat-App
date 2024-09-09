from models import Friendship
from flask import session,make_response,request,jsonify
from flask_restful import Resource
from config import db


class FriendshipRequest(Resource):
    def get(self):
        friends = [friend.to_dict() for friend in Friendship.query.all()]
        return jsonify(friends)
    
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        friend_id = data.get('friend_id')

        if user_id == friend_id:
            return jsonify({'message':'You cannot send a freind request to yourself'})
        
        existing_request = Friendship.query.filter_by(user_id=user_id,friend_id=friend_id)

        if existing_request:
            return jsonify({'message':'Freind request already sent '})
        
        new_request = Friendship(user_id= user_id, friend_id=friend_id)
        db.session.add(new_request)
        db.session.commit()

        return make_response(jsonify({"message":'Friend request sent successfully'}),201)

class FrienshipRequestId(Resource):
    def get(self,id):
        friend = Friendship.query.get_or_404(id)
        return jsonify(friend.to_dict())
    
    def patch(self,id):
        data = request.get_json()
        action = data.get('action')
        friend_request = Friendship.query.get_or_404(id)


        if action not in ['accept','decline']:
            return jsonify({'message':'Invalid action'})
        
        if action == 'accept':
            friend_request.status = 'accepted'
        
        else:
            friend_request.status = 'declined'

        db.session.commit()
        return jsonify({'message':f'Friend request has been {friend_request.status}'})
