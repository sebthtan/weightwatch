from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Entry, Workout, Exercise, Workouts_Exercises, db
from sqlalchemy.orm import joinedload

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/entries')
@login_required
def get_user_entries():
    # user = User.query.get(id)
    entries = Entry.query.filter(Entry.user_id == current_user.id).order_by(
        Entry.created_at.asc()).all()
    user_entries = []
    for entry in entries:
        user_entries.append(entry.to_dict())
    return jsonify(user_entries)


@user_routes.route('/<int:id>/workouts', methods=['GET'])
@login_required
def get_workouts(id):
    user = User.query.options(joinedload(
        'workouts').joinedload('exercises').joinedload('exercise')).get(id)
    res = []
    exercises = []

    for workout in user.workouts:
        obj = workout.to_dict()
        obj['exercises'] = exercises
        res.append(obj)

        for w_e in workout.exercises:
            exercise = w_e.exercise
            exercise_dict = exercise.to_dict()
            w_e_dict = w_e.to_dict()

            exercise_dict['sets'] = w_e_dict['sets']
            exercise_dict['repetitions'] = w_e_dict['repetitions']

            exercises.append(exercise_dict)

    return jsonify(res)
