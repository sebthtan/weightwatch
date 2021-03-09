from flask_wtf import FlaskForm
from wtforms import Form
from wtforms.validators import DataRequired
from wtforms import StringField, IntegerField, FormField, FieldList
from app.models import Workout


class WorkoutsExercisesForm(Form):
    # workout_id = IntegerField('workout_id')
    exercise_id = IntegerField('exercise_id')
    sets = IntegerField('sets')
    repetitions = IntegerField('repetitions')


class WorkoutForm(FlaskForm):
    workout_name = StringField('workout_name', validators=[DataRequired()])
    exercises = FieldList(FormField(WorkoutsExercisesForm),
                          min_entries=1, max_entries=10)
    # created_by = IntegerField('created_by', validators=[DataRequired()])

# if fieldlist doesnt work, jsonify the fields, convert in backend back to a list
