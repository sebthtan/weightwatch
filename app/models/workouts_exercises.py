from .db import db


class Workouts_Exercises(db.Model):
    __tablename__ = 'workouts_exercises'

    workout_id = db.Column(db.Integer, db.ForeignKey(
        'workouts.id'), primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey(
        'exercises.id'), primary_key=True)
    sets = db.Column(db.Integer, nullable=False)
    repetitions = db.Column(db.Integer, nullable=False)

    exercise = db.relationship('Exercise', back_populates='workouts')
    workout = db.relationship('Workout', back_populates='exercises')
