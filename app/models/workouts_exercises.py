from .db import db
import datetime


class Workouts_Exercises(db.Model):
    __tablename__ = 'workouts_exercises'

    workout_id = db.Column(db.Integer, db.ForeignKey(
        'workouts.id'), primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey(
        'exercises.id'), primary_key=True)
    sets = db.Column(db.Integer, nullable=False)
    repetitions = db.Column(db.Integer, nullable=False)
    created_at = db.Column(
        db.Date, default=datetime.date.today(), nullable=False)
    updated_at = db.Column(
        db.Date, default=datetime.date.today(), nullable=False)

    exercise = db.relationship('Exercise', back_populates='workouts')
    workout = db.relationship(
        'Workout', back_populates='exercises')

    def to_dict(self):
        return {
            "workout_id": self.workout_id,
            "exercise_id": self.exercise_id,
            "sets": self.sets,
            "repetitions": self.repetitions,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
