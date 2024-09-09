from models import FileAttchment
from config import db,app
from flask import request,session,make_response,jsonify
from flask_restful import Resource
import cloudinary
from cloudinary import uploader
import os
from dotenv import load_dotenv
import cloudinary.api
from datetime import datetime

load_dotenv()

CLOUD_NAME = os.getenv('CLOUD_NAME')
CLOUD_API_KEY = os.getenv('CLOUD_API_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')

cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    secret_key=os.getenv('SECRET_KEY')
)

if not all ([cloudinary.config().cloud_name,cloudinary.config().api_key,cloudinary.config().secret_key]):
    raise ValueError(
        'No cloudinary configurations done.Ensure CLOUD_NAME,API_KEY,SECRET_KEY are set')

class File(Resource):
    def get(self):
        files = [file.to_dict() for file in FileAttchment.query.all()]
        return jsonify(files)
    
    def post(self):
        if 'file' not in request.files:
            return jsonify({'error':'No file'})
        
        file = request.files['file']

        if file.filename == '':
            return jsonify({'error':'No selected file'})
        try:
            uplaod_result = uploader.upload(file,resource_type = 'image')
        
        except Exception as e:
            app.logger.error(f"upload failed:{e}")
            return make_response(jsonify({'error':'An error occurred while posting, str(e)'}),500)
        
        file_url = uplaod_result.get('url')

        new_file = FileAttchment(
            file_type = file_url,
            message_id = request.json.get('message_id'),
            created_at = datetime.datetime.utcnow()
        )

        db.session.add(new_file)
        db.session.commit()

        return jsonify({'message':'file uploaded successsfully'})


class FileId(Resource):
    def get(self,id):
        file = FileAttchment.query.get_or_404(id)
        return jsonify(file.to_dict())
    
    def patch(self,id):
        file = FileAttchment.query.get_or_404(id)
        data = request.get_json()

        for key,value in data.items():
            setattr(file,key,value)
        
        return jsonify(file.to_dict())
    

    def delete(self,id):
        file = FileAttchment.query.get_or_404(id)
        db.session.add(file)
        db.session.commit()

        return jsonify({"message":"File has been deleted successfully"})

