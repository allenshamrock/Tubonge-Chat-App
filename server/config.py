from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import MetaData
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_bcrypt import Bcrypt

# import secrets

# secret_key = secrets.token_hex(32)
# print(secret_key)

app=Flask(__name__)
app.config['SECRET_KEY'] = '4d6538529ce578e5c735134bfe7325c852133093554608b465c132eab8efa50a'
app.config['SQLALCHEMY_DATABASE_URI'] ='sqllite///tubongedb'
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'f024b7b20d71dc8d51c7b482f3260bd3f416f848e11972eea83f5d4a8fac573f'
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=MetaData)
migrate = Migrate(app,db)
CORS(app)
bcrypt = Bcrypt()
api = Api(app)
jwt = JWTManager(app)
db.init_app(app)
