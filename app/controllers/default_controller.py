from flask import render_template

class DefaultController:

    @staticmethod
    def index():
        return "Teste"
