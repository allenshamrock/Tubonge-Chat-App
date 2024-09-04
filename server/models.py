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


class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Interger,primary_key=True)
    created_at = db.Column(db.Datetime,default=datetime.utcnow())


class ConversationParticipants(db.Model):
    __tablename__='conversation_participants'

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    conversation_id = db.Column(db.Interger, db.ForeignKey('conversation.id'),nullable=False)
    joined_at = db.Column(db.Datetime, default=datetime.utcnow())

class ChatRoom(db.Model):
    __tablename__='chatrooms'

    id = db.Column(db.Interger,primary_key=True)
    name = db.Column(db.String(100),nullable=False)
    description = db.Column(db.String(255))
    created_by_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    created_at = db.Column(db.Datetime,default=False)


class ChatRoomMember(db.Model):
    __tablename__ = 'chat_room_members'

    id = db.Column(db.Interger,primary_key=True)
    user_id = db.Column(db.Interger,db.FoeignKey('users.id'),nullable=False)
    chat_room_id = db.Column(db.Integer,db.ForeignKey('chat_room.id'),nullable=False)
    joined_at =db.Column(db.Datetime, default=datetime.utcnow())


class FileAttchment(db.Model):
    __tablename__ = 'file_attachments'

    id = db.Column(db.Integer, primary_key=True)
    file_type = db.Column(db.String)
    message_id = db.Column(db.Integer, db.ForeignKey('message.id'),nullable=False)
    file_path = db.Column(db.String,nullable=False)
    created_at = db.Column(db.Datetime,default=datetime.utcnow())

class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    message = db.Column(db.Text,nullable=False)
    created_at = db.Column(db.Datetime,default=datetime.utcnow())
    is_seen = db.Column(db.Boolean,default=False)


class Friendship(db.Model):
    __tablename__ = 'friendships'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friend_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class TypingIndicator(db.Model):
    __tablename__ = 'typing_indicators'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey(
        'conversations.id'), nullable=False)
    is_typing = db.Column(db.Boolean, default=False)


    






