from app.models import db, Entry
from faker import Faker
import random


fake = Faker()


def seed_entries(n):
    for _ in range(n):
        entry = Entry(
            user_id=random.randint(1, 21),
            body_weight=random.randint(120, 400),
            bench_press=random.randint(45, 600),
            squat=random.randint(45, 700),
            deadlift=random.randint(45, 900),
            created_at=fake.date_between(start_date='-2y', end_date='today')
        )
        db.session.add(entry)
    db.session.commit()


def undo_entries():
    db.session.execute('TRUNCATE entries CASCADE;')
    db.session.execute('ALTER SEQUENCE entries_id_seq RESTART WITH 1')
    db.session.commit()
