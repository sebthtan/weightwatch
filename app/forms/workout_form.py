from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField, IntegerField
from app.models import Workout


class WorkoutForm(FlaskForm):
    workout_name = StringField('workout_name', validators=[DataRequired()])
    # created_by = IntegerField('created_by', validators=[DataRequired()])
    sets = IntegerField('sets', validators=[DataRequired()])
    repetitions = IntegerField('repetitions', validators=[DataRequired()])
    exercise_id = IntegerField('exercise_id', validators=[DataRequired()])
