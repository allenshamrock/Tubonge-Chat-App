from flask import Blueprint
from .routes import Messages,MessageId
from flask_restful import Api

# Defineing the blueprint
message_blueprint = Blueprint('message',__name__)
api = Api(message_blueprint)

# Resources to the blueprint
api.add_resource(Messages,'/messages')
api.add_resource(MessageId,'/messages/<int:id>')

# Exposing the blueprint for use
__all__ =['message_blueprint']