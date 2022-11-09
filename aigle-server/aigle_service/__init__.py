from flask import Flask
from .config import config
from . import routes


def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    routes.init_app(app)

    return app
