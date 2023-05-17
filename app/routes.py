from flask import Blueprint
from app.controllers.default_controller import DefaultController
import traceback

default_bp = Blueprint('default', __name__)

@default_bp.route('/home')
@default_bp.route('/')
def index():
    try:
        return DefaultController.index()
    except Exception as e:
        traceback.print_exc()
        return "Error: An internal server error occurred."

@default_bp.route('/blog')
def blog():
    return DefaultController.blog()

@default_bp.route('/episode')
def episode():
    return DefaultController.episode()

@default_bp.route('/contato')
def contact():
    return DefaultController.contact()