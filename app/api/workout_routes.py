from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Workout, Exercise, db, Workouts_Exercises
from app.forms.workout_form import WorkoutForm, WorkoutsExercisesForm
from app.helpers import validation_errors_to_error_messages
from sqlalchemy.orm import joinedload


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
    form = WorkoutForm()
    user = User.query.get(current_user.id)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        workout = Workout(
            workout_name=form.data['workout_name'],
            created_by=current_user.id,
        )
        db.session.add(workout)
        db.session.flush()
        new_workout_id = workout.id

        workout_exercise = Workouts_Exercises(
            workout_id=new_workout_id,
            exercise_id=form.data['exercise_id'],
            sets=workout_exercise_form.data['sets'],
            repetitions=workout_exercise_form.data['repetitions'],
        )
        db.session.add(workout_exercise)
        db.session.commit()
        return {workout.to_dict(), workout_exercise.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}
