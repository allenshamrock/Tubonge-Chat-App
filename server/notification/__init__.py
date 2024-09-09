from flask import Blueprint
from flask_restful import Api
from .routes import Notification
from . import socketio
from config import app

notification_blueprint = Blueprint('notification_blueprint',__name__)
api = Api(notification_blueprint)

api.add_resource(Notification, '/notification')
socketio.init_app(app)
__all__ = ['notification_blueprint']

