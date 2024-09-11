from flask import Blueprint
from flask_restful import Api 
from .routes import Login,Logout,UserToken

auth_blueprint = Blueprint('auth',__name__)
api=Api(auth_blueprint)

api.add_resource(Login,'/login')
api.add_resource(Logout,'/logout')
api.add_resource(UserToken,'/token')

__all__=['auth_blueprint']