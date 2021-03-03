from app.models import db, Exercise
import random


exercises = [
    'Bench Press',
    'Incline Bench Press',
    'Dumbbell Bench Press',
    'Incline Dumbbell Bench Press',
    'Dumbbell Flyes',
    'Incline Dumbbell Flyes',
    'Dips',
    'Shoulder Press',
    'Dumbbell Shoulder Press',
    'Lateral Raises',
    'Bent Over Lateral Raises',
    'Pushdowns',
    'Bench Dips',
    'Barbell Extensions',
    'Pull-Ups',
    'Lat Pulldowns',
    'Bent-Over Rows',
    'Dumbbell Rows',
    'Dumbbell Curls',
    'Barbell Curls',
    'Hammer Curls',
    'Preacher Curls',
    'Incline Dumbbell Curls',
    'Squats',
    'Leg Extensions',
    'Leg Press',
    'Leg Curls',
    'Lunges',
    'Deadlifts',
    'Standing Calf Raise',
    'Seated Calf Raise',
    'Crunches',
    'Decline Crunches',
    'Hip Thrusts',
]


def seed_exercises(n):
    for i in range(n):
        entry = Exercise(
            exercise_name=exercises[i]
        )
        db.session.add(entry)
    db.session.commit()


def undo_exercises():
    db.session.execute('TRUNCATE exercises CASCADE;')
    db.session.execute("ALTER SEQUENCE exercises_id_seq RESTART WITH 1")
    db.session.commit()
