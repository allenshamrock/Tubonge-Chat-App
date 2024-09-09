from flask import Blueprint
from flask_restful import Api
from .routes import ChatRoomMembers,ChatRoomMembersId

chat_room_member_blueprint = Blueprint('chat_room_member', __name__)
api = Api(chat_room_member_blueprint)

api.add_resource(ChatRoomMembers,'/chatroommember')
api.add_resource(ChatRoomMembersId,'/chatroommember/<int:id>')

__all__ = ['chat_room_member_blueprint']
