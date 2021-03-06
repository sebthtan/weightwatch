from flask_wtf import FlaskForm
from wtforms.validators import Optional, DataRequired
from wtforms import IntegerField, DateField
from app.models import Entry


class EntryForm(FlaskForm):
    body_weight = IntegerField('body_weight', validators=[Optional()])
    bench_press = IntegerField('bench_press', validators=[Optional()])
    squat = IntegerField('squat', validators=[Optional()])
    deadlift = IntegerField('deadlift', validators=[Optional()])
    created_at = DateField('created_at', validators=[
                           Optional()], format='%Y-%m-%d')
