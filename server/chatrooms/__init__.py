from flask import Blueprint
from flask_restful import Api
from .routes import ChatRooms,ChatRoomsId

chat_room_blueprint = Blueprint('chat_room',__name__)
api = Api(chat_room_blueprint)

api.add_resource(ChatRooms,'/chat')
api.add_resource(ChatRoomsId,'/chat/<int:id>')


__all__ = ['chat_room_blueprint']