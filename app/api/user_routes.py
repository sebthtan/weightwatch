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
        'workouts').joinedload('exercises').joinedload('exercise'),
        joinedload('workouts').joinedload('users')).get(id)
    res = []

    for workout in user.workouts:
        obj = workout.to_dict()
        exercises = []
        obj['exercises'] = exercises
        res.append(obj)
        creator = User.query.get(workout.created_by)
        obj['creator_username'] = creator.username

        for w_e in workout.exercises:
            exercise = w_e.exercise
            exercise_dict = exercise.to_dict()
            w_e_dict = w_e.to_dict()

            exercise_dict['sets'] = w_e_dict['sets']
            exercise_dict['repetitions'] = w_e_dict['repetitions']

            exercises.append(exercise_dict)

    return jsonify(res)


@user_routes.route('/<int:id>/workouts/created', methods=['GET'])
@login_required
def get_created_workouts(id):
    created = Workout.query.options(
        joinedload('exercises').joinedload('exercise'),
    ).filter(Workout.created_by == id).all()

    res = []
    for workout in created:
        obj = workout.to_dict()
        exercises = []
        obj['exercises'] = exercises
        res.append(obj)
        creator = User.query.get(workout.created_by)
        obj['creator_username'] = creator.username

        for w_e in workout.exercises:
            exercise = w_e.exercise
            exercise_dict = exercise.to_dict()
            w_e_dict = w_e.to_dict()

            exercise_dict['sets'] = w_e_dict['sets']
            exercise_dict['repetitions'] = w_e_dict['repetitions']

            exercises.append(exercise_dict)

    return jsonify(res)


@user_routes.route('/workouts/<int:workout_id>/bookmark',
                   methods=['POST', 'DELETE'])
@login_required
def update_user_bookmark(workout_id):
    user = User.query.get(current_user.id)
    if request.method == 'DELETE':
        workout = Workout.query.get(workout_id)
        user.workouts.remove(workout)

        db.session.commit()
        return workout.to_dict()

    if request.method == 'POST':
        workout = Workout.query.get(workout_id)
        user.workouts.append(workout)

        db.session.commit()

        obj = workout.to_dict()
        print('OBJECT!@#$!@#$', obj)
        exercises = []
        obj['exercises'] = exercises
        creator = User.query.get(workout.created_by)
        obj['creator_username'] = creator.username

        for w_e in workout.exercises:
            exercise = w_e.exercise
            exercise_dict = exercise.to_dict()
            w_e_dict = w_e.to_dict()

            exercise_dict['sets'] = w_e_dict['sets']
            exercise_dict['repetitions'] = w_e_dict['repetitions']

            exercises.append(exercise_dict)
        print('OBJ!#$@!@#$@#!$', obj)
        return jsonify(obj)
