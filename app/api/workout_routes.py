from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Workout, Exercise, db, Workouts_Exercises
from app.forms.workout_form import WorkoutForm, WorkoutsExercisesForm
from app.helpers import validation_errors_to_error_messages
from sqlalchemy.orm import joinedload, join
from sqlalchemy import and_
import json
from collections import namedtuple


workout_routes = Blueprint('workouts', __name__)


@workout_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_workout_exercises(id):
    workout = Workout.query.get(id)
    details = workout.exercises
    res = []
    exercises = []
    obj = workout.to_dict()
    obj['exercises'] = exercises
    res.append(obj)
    for detail in details:
        exercises.append(detail.to_dict())
    return jsonify(res)


@workout_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
@login_required
def update_workout(id):
    workout = Workout.query.get(id)

    if request.method == 'DELETE':
        if workout.created_by == current_user.id:
            workout.users = []
            db.session.delete(workout)
            db.session.commit()
            return workout.to_dict()
        else:
            return 'Lacking permissions'

    # elif request.method == 'PUT':
    #     if workout.created_by == current_user.id:


# DRAFT POST
@workout_routes.route('/', methods=['POST'])
@login_required
def create_workout():
    fields = json.loads(request.form['exercises'])

    form = WorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    while len(form.exercises) > 0:
        form.exercises.pop_entry()

    for field in fields:
        w_e_form = WorkoutsExercisesForm()
        w_e_form.exercise_id = field['exercise_id']
        w_e_form.sets = field['sets']
        w_e_form.repetitions = field['repetitions']
        form.exercises.append_entry(w_e_form)

    if form.validate_on_submit():
        res = []
        workout = Workout(
            workout_name=form.data['workout_name'],
            created_by=current_user.id
        )
        db.session.add(workout)
        db.session.flush()
        res.append(workout.to_dict())
        for idx, field in enumerate(form.exercises):
            workout_exercise = Workouts_Exercises(
                workout_id=workout.id,
                exercise_id=field.exercise_id.data,
                sets=field.sets.data,
                repetitions=field.repetitions.data,
            )
            db.session.add(workout_exercise)
            res.append(workout_exercise.to_dict())
        db.session.commit()
        return jsonify(res)
    return {'errors': validation_errors_to_error_messages(form.errors)}


@workout_routes.route('/search/<term>')
@login_required
def search_workouts(term):
    res = []

    workouts = Workout.query.filter(
        Workout.workout_name.ilike(f"%{term}%"),
        # User.username.ilike(f'%{username}%'),
    ).all()

    for workout in workouts:
        res.append(workout.to_dict())
    return jsonify(res)
