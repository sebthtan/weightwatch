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
    createdAt = db.Column(
        db.DateTime, default=datetime.datetime.utcnow, nullable=False)
    updatedAt = db.Column(
        db.DateTime, default=datetime.datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='entries')
