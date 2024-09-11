from faker import Faker
from config import db, app
from models import User, Friendship, BlockedUser, Message, ChatRoom, ChatRoomMember, FileAttachment

fake = Faker()

with app.app_context():
    print('Dropping all tables')
    db.drop_all()
    print('Creating all tables')
    db.create_all()

    print("Add users")
    user1 = User(
        username='john_doe',
        name='John Doe',
        profile='http://example.com/john_doe.png',
        bio='Software Developer',
        is_online=True
    )
    user1.password = 'password123'

    user2 = User(
        username='jane_smith',
        name='Jane Smith',
        profile='http://example.com/jane_smith.png',
        bio='Data Scientist',
        is_online=False
    )
    user2.password = 'securepass'

    # Add users to the session
    db.session.add(user1)
    db.session.add(user2)

    # Commit to generate IDs
    db.session.commit()

    # Create some friendships
    friendship1 = Friendship(
        user_id=user1.id, friend_id=user2.id, status='accepted'
    )
    print('Add friendships')
    db.session.add(friendship1)

    # Create a blocked user
    blocked_user = BlockedUser(blocker_id=user1.id, blocked_id=user2.id)

    print('Block user')
    db.session.add(blocked_user)

    # Create a message
    message1 = Message(sender_id=user1.id, receiver_id=user2.id,
                       content='Hello, how are you?')
    print('Send message')
    db.session.add(message1)
    db.session.commit()

    # Create a chat room
    chatroom = ChatRoom(
        name='General', description='General discussion', created_by_id=user1.id
    )
    print('Create chatroom')
    db.session.add(chatroom)
    db.session.commit()

    # Add a chat room member
    chatroom_member = ChatRoomMember(
        user_id=user2.id, chat_room_id=chatroom.id
    )
    print('Add member to chatroom')
    db.session.add(chatroom_member)
    db.session.commit()

    # Create a file attachment associated with the message
    file_attachment = FileAttachment(
        file_type='image/png',
        message_id=message1.id
    )
    print('Attach file to message')
    db.session.add(file_attachment)

    db.session.commit()

    print('Database seeded successfully!')
