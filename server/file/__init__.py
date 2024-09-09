from flask import Blueprint
from flask_restful import Api
from .routes import File,FileId

file_blueprint = Blueprint('file_blueprint',__name__)
api = Api(file_blueprint)

api.add_resource(File,'/file')
api.add_resource(FileId,'/file/<int:id>')

__all__ =['file_blueprint']