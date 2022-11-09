from .data import data

def init_app(app):
    app.register_blueprint(data)
