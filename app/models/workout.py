import datetime
from .db import db
from .users_workouts import users_workouts


class Workout(db.Model):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    workout_name = db.Column(db.String(40), nullable=False)
    created_by = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    users = db.relationship('User', secondary=users_workouts,
                            back_populates='workouts')
    exercises = db.relationship(
        'Workouts_Exercises', back_populates='workout')
