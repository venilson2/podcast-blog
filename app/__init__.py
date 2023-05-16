import os
import pymysql
from flask import Flask
from dotenv import load_dotenv
from app.extensions import db
from app.routes import default_bp
from flask_migrate import Migrate
from app.models.user import User
from app.models.address import Address
from app.models.product import Product

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.register_blueprint(default_bp)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    db.init_app(app)
    pymysql.install_as_MySQLdb()
    Migrate(app, db)

    with app.app_context():
        db.create_all()

    return app

