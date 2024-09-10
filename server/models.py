from config import bcrypt, db
from sqlalchemy.orm import validates
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), nullable=False, unique=True)
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    bio = db.Column(db.String(50), nullable=False)
    is_online = db.Column(db.Boolean, default=False)

    @validates('username')
    def validate_username(self, key, value):
        if User.query.filter_by(username=value).first():
            raise ValueError('Username already exists')
        return value

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, plain_password):
        self.password_hash = bcrypt.generate_password_hash(
            plain_password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    # Relationships for messages
    messages_sent = db.relationship(
        'Message', backref='sender', lazy='dynamic', foreign_keys='Message.sender_id')
    messages_received = db.relationship(
        'Message', backref='receiver', lazy='dynamic', foreign_keys='Message.receiver_id')

    # Relationship for friends
    friends = db.relationship(
        'User',
        secondary='friendships',
        primaryjoin='User.id == Friendship.user_id',
        secondaryjoin='User.id == Friendship.friend_id',
        backref='friend_of',
        lazy='dynamic',
        overlaps="friend_of,user,friends,friend"
    )


class Friendship(db.Model):
    __tablename__ = 'friendships'

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(10), default='pending')

    # Define relationships to the User table
    user = db.relationship('User', foreign_keys=[
                           user_id], overlaps="friends,friend_of")
    friend = db.relationship('User', foreign_keys=[
                             friend_id], overlaps="friends,friend_of")

    __table_args__ = (
        db.UniqueConstraint('user_id', 'friend_id', name='unique_friendship'),
    )


class BlockedUser(db.Model):
    __tablename__ = 'blocked_users'

    id = db.Column(db.Integer, primary_key=True)
    blocker_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)  # User who blocks
    blocked_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)  # User who is blocked
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    blocker = db.relationship('User', foreign_keys=[
                              blocker_id], backref='blocked_users')
    blocked = db.relationship('User', foreign_keys=[
                              blocked_id], backref='blocked_by')

    __table_args__ = (
        db.UniqueConstraint('blocker_id', 'blocked_id', name='unique_block'),
    )


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    is_seen = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, default=False)
    chat_room_id = db.Column(db.Integer, db.ForeignKey(
        'chatrooms.id'))  # Add foreign key for chat room


class ChatRoom(db.Model):
    __tablename__ = 'chatrooms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    created_by_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    messages = db.relationship('Message', backref='chat_room', lazy='dynamic')
    members = db.relationship(
        'ChatRoomMember', backref='chat_room', lazy='dynamic')

    def __init__(self, name, description, created_by_id):
        self.name = name
        self.description = description
        self.created_by_id = created_by_id
        self.created_at = datetime.utcnow()

        # Automatically add the creator as an admin member
        admin_member = ChatRoomMember(
            user_id=created_by_id, chat_room=self, role='admin')
        db.session.add(admin_member)
        db.session.commit()


class ChatRoomMember(db.Model):
    __tablename__ = 'chat_room_members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chat_room_id = db.Column(db.Integer, db.ForeignKey(
        'chatrooms.id'), nullable=False)
    role = db.Column(db.String(10), default='member')
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)


class FileAttachment(db.Model):
    __tablename__ = 'file_attachments'

    id = db.Column(db.Integer, primary_key=True)
    file_type = db.Column(db.String)
    message_id = db.Column(db.Integer, db.ForeignKey(
        'messages.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
