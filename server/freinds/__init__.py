from flask import Blueprint
from flask_restful import Api
from .routes import FreindshipRequest,FrienshipRequestId

# Defining the blueprint
friends_blueprint = Blueprint('freinds', __name__)
api = Api(friends_blueprint)

# Adding reasources to the blueprint
api.add_resource(FreindshipRequest,'/addfreinds')
api.add_resource(FrienshipRequestId ,'/freinds')

# Exposing the blueprint
__all__ = ['freinds_blueprint']