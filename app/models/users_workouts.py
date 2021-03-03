from .db import db
# from .user import User
# from .workout import Workout


users_workouts = db.Table(
    'users_workouts',
    db.metadata,
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
