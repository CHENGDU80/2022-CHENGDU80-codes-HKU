from aigle_service import create_app
import os

env_dist = os.environ

config = env_dist.get('FLASK_APP', 'default')
app = create_app(config)
