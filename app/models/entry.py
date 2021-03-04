from .db import db
import datetime


class Entry(db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    body_weight = db.Column(db.Integer)
    bench_press = db.Column(db.Integer)
    squat = db.Column(db.Integer)
    deadlift = db.Column(db.Integer)
    created_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='entries')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body_weight': self.body_weight,
            'bench_press': self.bench_press,
            'squat': self.squat,
            'deadlift': self.deadlift,
            'created_at': self.created_at,
        }
