from config import db
from models import User, Friendship, BlockedUser, Message, ChatRoom, ChatRoomMember

# Drop all tables and recreate them
db.drop_all()
db.create_all()

# Create some initial users
user1 = User(
    username='john_doe',
    name='John Doe',
    image_url='http://example.com/john_doe.png',
    bio='Software Developer',
    is_online=True
)
user1.password = 'password123'  # Set password using the setter

user2 = User(
    username='jane_smith',
    name='Jane Smith',
    image_url='http://example.com/jane_smith.png',
    bio='Data Scientist',
    is_online=False
)
user2.password = 'securepass'

# Add users to the session
db.session.add(user1)
db.session.add(user2)

# Create some friendships
friendship1 = Friendship(
    user_id=user1.id, friend_id=user2.id, status='accepted')

db.session.add(friendship1)

# Create a blocked user
blocked_user = BlockedUser(blocker_id=user1.id, blocked_id=user2.id)

db.session.add(blocked_user)

# Create a message
message1 = Message(sender_id=user1.id, recivers_id=user2.id,
                   content='Hello, how are you?')

db.session.add(message1)

# Create a chat room
chatroom = ChatRoom(
    name='General', description='General discussion', created_by_id=user1.id)

db.session.add(chatroom)

# Add a chat room member
chatroom_member = ChatRoomMember(user_id=user2.id, chat_room_id=chatroom.id)

db.session.add(chatroom_member)

db.session.commit()

print('Database seeded successfully!')
