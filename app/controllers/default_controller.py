from flask import render_template

class DefaultController:

    @staticmethod
    def index():
        return render_template("pages/index.html")
    
    @staticmethod
    def contact():
        return render_template("pages/contact.html")
    
    @staticmethod
    def blog():
        return render_template("pages/blog.html")
    
    @staticmethod
    def episode():
        return render_template("pages/episodes.html")
