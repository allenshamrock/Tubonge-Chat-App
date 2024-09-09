from flask import Blueprint
from .routes import BlockedUsers
from flask_restful import Api

# Defining the blueprint
block_blueprint = Blueprint('block', __name__)
api = Api(block_blueprint)

# Adding resource to the blueprint
api.add_resource(BlockedUsers, '/block')

# Exposing the blueprint
__all__ = ['block_blueprint']
