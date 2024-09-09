from flask_restful import Resource
from flask import jsonify, make_response, session, request
import cloudinary
from cloudinary import uploader
from config import app,db
from models import User
import cloudinary.api
from dotenv import load_dotenv
import os

load_dotenv()

CLOUD_NAME = os.getenv('CLOUD_NAME')
API_KEY = os.getenv('API_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')

# Cloudinary configs
cloudinary.config(
    cloud_name = os.getenv('CLOUD_NAME'),
    api_key = os.getenv('API_KEY'),
    secret_key = os.getenv('SECRET_KEY')
)

if not all ([cloudinary.config().cloud_name,cloudinary.config().api_key,cloudinary.config().secret_key]):
    raise ValueError(
        "No cloudinary configurations done.Ensure CLOUD_NAME,API_KEY,SECRET_KEY are set"
    )

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return jsonify(users)


    def post(self):
        data = request.form
        username = data.get('username')
        name = data.get('name')
        image_url = data.get('image_url')
        bio = data.get('bio')
        is_online = data.get('is_online',False)
        password = data.get('password')
        file_to_upload = request.files.get('file')
        app.logger.info(
            f"Recived data : username = {username},name={name},image_url={image_url},bio={bio},is_online={is_online} password={password}"
        )

        if User.query.filter_by(username=username):
            return make_response(jsonify({'error': 'Username already exists,please try another one'}), 400)
        
        try:
            if image_url == 'image':
                result = uploader.upload(file_to_upload,resource_type='image')
            
            else:
                return make_response(jsonify({'error':'Upload a proper profile type'}),400)
        
        except Exception as e:
            app.logger.error(f"Upload failed: {e}")
            return make_response(jsonify({'error':"An error occurred while uploading"}), 400)
        
        file_url =result.get('url') 

        new_user = User(
            username = username,
            name = name,
            password = password,
            is_online =is_online,
            bio = bio,
            image_url = file_url 
        )

        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify({"message":"User is created successfully"}),201)
    
class UserId(Resource):
    def get (self,id):
        user = User.query.get_or_404(id)
        return jsonify(user.to_dict())
    
    def patch(self,id):
        user = User.query.get_or_404(id)
        data = request.get_json()
        for key,value in data.items():
            setattr(user,key,value)
        
        db.session.commit()
        return jsonify(user.to_dict())
    
    def delete(self,id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return make_response(jsonify({'message':'User deleted usccessfully'}), 200)

            
        

