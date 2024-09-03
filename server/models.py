from config import bcrypt,db
from sqlalchemy.orm import validates
from datetime import datetime

class User(db.Model):
    __tablename__='users'
    id = db.Column(db.Integer,primary_key = True)
    username = db.Column(db.String(120),nullable=False, unique=True)
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String,nullable= False)
    password_hash = db.Column(db.String(30), nullabale=False)
    bio = db.Column(db.String(50),nullable=False)

    @validates('username')
    def validate_username(self,key,value):
        if User.query.filter_by(username=value).first():
            raise ValueError('username already exists')
        return value
    
    @property
    def password(self):
        return self.password_hash
    
    @password.setter
    def password(self,plain_password):
        self.password_hash = bcrypt.generate_password_hash(
            plain_password).decode('utf-8')
        
    def check_password(self,password):
        return bcrypt.check_password_hash(self.password_hash,password)


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Interger, primary_key=True)
    sender_id = db.Column(db.Interger, db.ForeignKey('users.id'),nullable=False)
    recivers_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    content = db.Column(db.Text,nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow())
    is_seen = db.Column(db.Boolean,default=False)
    is_deleted = db.Column(db.Boolean,default=False)





    






