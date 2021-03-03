from flask.cli import AppGroup
from .users_workouts import seed_users_workouts, \
    undo_users, undo_workouts
from .workouts_exercises import seed_workouts_exercises, undo_workouts_exercises
from .entries import seed_entries, undo_entries
from .exercises import seed_exercises, undo_exercises
# from .users import seed_users, undo_users
# from .workouts import seed_workouts, undo_workouts


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users_workouts(20)
    seed_exercises(34)
    seed_entries(200)
    seed_workouts_exercises(40)
# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_entries()
    undo_exercises()
    undo_workouts()
    # Add other undo functions here
