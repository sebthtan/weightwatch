from app.models import db, Workouts_Exercises
import random


def seed_workouts_exercises(n):
    for _ in range(n):
        workout_exercise = Workouts_Exercises(
            workout_id=random.randint(1, 20),
            exercise_id=random.randint(1, 34),
            sets=random.randint(3, 5),
            repetitions=random.randint(5, 12),
        )
        db.session.add(workout_exercise)
    db.session.commit()


def undo_workouts_exercises():
    db.session.execute('TRUNCATE workouts_exercises CASCADE;')
    db.session.commit()
