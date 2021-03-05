from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Entry, db
from app.forms import EntryForm
from app.helpers import validation_errors_to_error_messages

entry_routes = Blueprint('entries', __name__)


@entry_routes.route('/new', methods=['POST'])
@login_required
def create_entry():
    user = User.query.get(current_user.id)
    form = EntryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        entry = Entry(
            user_id=user.id,
            body_weight=form.data['body_weight'],
            bench_press=form.data['bench_press'],
            squat=form.data['squat'],
            deadlift=form.data['deadlift']
        )
        db.session.add(entry)
        db.session.commit()

        return entry.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@entry_routes.route('/<int:entry_id>', methods=['DELETE'])
@login_required
def delete_entry(entry_id):
    entry = Entry.query.get(entry_id)
    if entry.user_id == current_user.id:
        db.session.delete(entry)
        db.session.commit()
        return 'Deleted Entry'
    else:
        return 'Error: could not delete'


# @entry_routes.route('/<int:entry_id>', methods=['PUT'])
# @login_required
# def update_entry(entry_id):
#     entry = Entry.query.get(entry_id)
#     if entry.user_id == current_user.id:
