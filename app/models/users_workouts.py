from .db import db


users_workouts = db.Table(
    'users_workouts',
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True
    ),
    db.Column(
        'workout_id',
        db.Integer,
        db.ForeignKey('workouts.id'),
        primary_key=True
    )
)
