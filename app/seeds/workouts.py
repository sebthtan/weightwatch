# from app.models import db, Workout
# import random
# from faker import Faker


# fake = Faker()


# def seed_workouts(n):
#     for _ in range(n):
#         entry = Workout(
#             workout_name=fake.word(),
#             created_by=random()
#         )
#         db.session.add(entry)
#     db.session.commit()


# def undo_workouts():
#     db.session.execute('TRUNCATE workouts CASCADE;')
#     db.session.execute("ALTER SEQUENCE workouts_id_seq RESTART WITH 1")
#     db.session.commit()
