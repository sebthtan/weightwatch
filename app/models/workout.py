import datetime
from .db import db
from .users_workouts import users_workouts


class Workout(db.Model):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    workout_name = db.Column(db.String(40), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    created_at = db.Column(
        db.Date, default=datetime.date.today(), nullable=False)
    updated_at = db.Column(
        db.Date, default=datetime.date.today(), nullable=False)

    users = db.relationship('User', secondary=users_workouts,
                            back_populates='workouts')
    exercises = db.relationship(
        'Workouts_Exercises', back_populates='workout')

    def to_dict(self):
        return {
            "id": self.id,
            "workout_name": self.workout_name,
            "created_by": self.created_by,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
