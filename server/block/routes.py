from flask import request,session,make_response,jsonify
from models import User,BlockedUser
from flask_restful import Resource
from config import db


class BlockedUsers(Resource):
    def post(self):
        data = request.get_json()

        blocker_id = data.get('blocker_id')
        blocked_id = data.get('blocked_id')

        blocker = User.query.get(blocker_id)
        blocked = User.query.get(blocked_id)

        if not blocker or blocked:
            return make_response(jsonify({"error":"Invalid  user IDS"}),400)
        
        # Check if already blocked

        existing_blocked = BlockedUser.query.filter_by(blocked_id = blocked_id, blocker_id=blocker_id).first()
        if existing_blocked:
            return make_response(jsonify({"error":"User is already blocked"}),400)
        
        new_block = BlockedUser(blocker_id = blocker_id,blocked_id=blocked_id)

        db.session.add(new_block)
        db.session.commit()
        return jsonify({f"User {blocked_id} has been blocked by {blocker_id}"})



    def patch(self):
        data = request.get_json()

        blocker_id = data.get('blocker_id')
        blocked_id = data.get('blocked_id')

        # Validate users exist
        blocker = User.query.get(blocker_id)
        blocked = User.query.get(blocked_id)

        if not blocker or not blocked:
            return make_response(jsonify({'error': 'Invalid user IDs provided'}), 400)

        # Find the existing block record
        block_record = BlockedUser.query.filter_by(
            blocker_id=blocker_id, blocked_id=blocked_id).first()

        if not block_record:
            return make_response(jsonify({'message': 'Block record not found, no action taken'}), 404)

        # Remove the block record
        db.session.delete(block_record)
        db.session.commit()

        return jsonify({'message': f'User {blocked_id} has been unblocked by {blocker_id}'}), 200
