import datetime
from .db import db


class Workout(db.Model):
    __tablename__ = 'workouts'


    id = db.Column(db.Integer, primary_key=True)
    workout_name = db.Column(db.String(40), nullable=False)
    created_by = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)


    users = db.relationship('User', secondary=users_workouts, back_populates='workouts', cascade='all, delete-orphan')
    exercises = db.relationship('Workouts_Exercises', back_populates='workout', cascade='all, delete-orphan')
