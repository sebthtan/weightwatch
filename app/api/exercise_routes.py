from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Exercise, db


exercise_routes = Blueprint('exercises', __name__)


@exercise_routes.route('/', methods=['GET'])
@login_required
def get_all_exercises():
    exercises = Exercise.query.order_by(
        Exercise.exercise_name.asc()).all()
    res = []
    for exercise in exercises:
        res.append(exercise.to_dict())
    return jsonify(res)
