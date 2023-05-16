from flask import Blueprint
from app.controllers.user_controller import UserController

default_bp = Blueprint('default', __name__)

@default_bp.route('/users')
def search_users():
    return UserController.search_users()
