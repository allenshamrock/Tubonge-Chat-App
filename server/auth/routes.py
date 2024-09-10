from flask import session,request,make_response,jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token,create_refresh_token,get_jwt_identity,unset_jwt_cookies,jwt_required
from config import app
from models import User


class Login(Resource):
    def post(self):
        if request.content_type != 'application/json':
            return jsonify({"error":"Content-Type must be application/json"}),415
        
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        app.logger.info(f"Recieved data:username={username} password={password}")
        user= User.query.filter_by(username=username).first()

        try:
            if user and user.check_password(password):
                access_token = create_access_token(identity={'user':user.id})
                refresh_token = create_refresh_token(identity={'user':user.id})

                data={
                    "access_token":access_token,
                    "refresh_token":refresh_token
                }

                if data:
                    return data
                
                else:
                    return jsonify({"error":"User not found"}),404
                
            return jsonify({'error':'Invalid username or password'}),401 
        except Exception as e:
            print({'error': str(e)})
            return jsonify({'error':'An error occurred while processing your data'}),500
        
class UserToken(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return jsonify({'token':current_user})


class Logout(Resource):
    @jwt_required()
    def post(self):
        unset_jwt_cookies()
        return jsonify({'message':'User logged out successfully'})

