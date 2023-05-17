from flask import render_template

class DefaultController:

    @staticmethod
    def index():
        return render_template("pages/index.html")
