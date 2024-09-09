from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import MetaData
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tubonge.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Corrected typo
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.json.compact = False


metadata = MetaData()


# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })
# Corrected initialization
db = SQLAlchemy(metadata=metadata)  # Pass the metadata object here
migrate = Migrate(app, db)
CORS(app)
bcrypt = Bcrypt(app)  # Initialize bcrypt with the app
api = Api(app)
jwt = JWTManager(app)

db.init_app(app)



