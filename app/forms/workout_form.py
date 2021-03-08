from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField, IntegerField, FormField, FieldList
from app.models import Workout


class WorkoutsExercisesForm(FlaskForm):
    workout_id = IntegerField('workout_id', validators=[DataRequired()])
    exercise_id = IntegerField('exercise_id', validators=[DataRequired()])
    sets = IntegerField('sets', validators=[DataRequired()])
    repetitions = IntegerField('repetitions', validators=[DataRequired()])


class WorkoutForm(FlaskForm):
    workout_name = StringField('workout_name', validators=[DataRequired()])
    exercises = FieldList(FormField(WorkoutsExercisesForm), min_entries=1)
    # created_by = IntegerField('created_by', validators=[DataRequired()])
