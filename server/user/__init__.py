from flask import Blueprint
from .routes import Users,UserId
from flask_restful import Api

#Defineing the blueprint
user_blueprint = Blueprint('user',__name__)
api = Api(user_blueprint)

#Resources to the blueprint
api.add_resource(Users,'/users')
api.add_resource(UserId,'/users/<int:id>')

# Exposing the blueprint for use
__all__ = ['user_blueprint']
