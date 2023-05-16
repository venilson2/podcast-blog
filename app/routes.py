from flask import Blueprint
from app.controllers.default_controller import DefaultController

default_bp = Blueprint('default', __name__)

@default_bp.route('/')
def index():
    return DefaultController.index()
