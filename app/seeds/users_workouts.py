from app.models import db, Workout, User, Exercise
import random
from faker import Faker
from werkzeug.security import generate_password_hash


fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users_workouts(n):
    for i in range(n):
        user = User(
            username=fake.user_name(),
            email=fake.ascii_email(),
            password=f'password{i+1}',
        )
        workout = Workout(
            workout_name=fake.word(),
            created_by=random.randint(1, n)
        )
        db.session.add(user)
        db.session.add(workout)
        workout.users.append(user)
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password'
    )
    db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()


def undo_workouts():
    db.session.execute('TRUNCATE workouts CASCADE;')
    db.session.execute("ALTER SEQUENCE workouts_id_seq RESTART WITH 1")
    db.session.commit()
