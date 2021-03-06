"""snakecase

Revision ID: 223b2c6777c1
Revises: 31788d0adbf5
Create Date: 2021-03-03 11:12:11.882379

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '223b2c6777c1'
down_revision = '31788d0adbf5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('entries', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.add_column('entries', sa.Column('updated_at', sa.DateTime(), nullable=False))
    op.drop_column('entries', 'updatedAt')
    op.drop_column('entries', 'createdAt')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('entries', sa.Column('createdAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.add_column('entries', sa.Column('updatedAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.drop_column('entries', 'updated_at')
    op.drop_column('entries', 'created_at')
    # ### end Alembic commands ###
