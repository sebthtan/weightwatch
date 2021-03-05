from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Entry

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


# @user_routes.route('/entries/new')
# @login_required
# def post_entry():
