from .db import db
import datetime


class Exercise(db.Model):
    __tablename__ = 'exercises'

    id = db.Column(db.Integer, primary_key=True)
    exercise_name = db.Column(db.String, nullable=False)
    picture_url = db.Column(db.String)
    created_at = db.Column(
        db.Date, default=datetime.date.today(), nullable=False)
    updated_at = db.Column(
        db.Date, default=datetime.date.today(), nullable=False)

    workouts = db.relationship('Workouts_Exercises', back_populates='exercise')

    def to_dict(self):
        return {
            "id": self.id,
            "exercise_name": self.exercise_name,
            "picture_url": self.picture_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
