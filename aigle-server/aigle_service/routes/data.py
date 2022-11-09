import sys
from aigle_service.services.clf_classify import clf_classify
from aigle_service.services.xgb_classify.xgb_classify import xgb_classify
from flask import Blueprint

from aigle_service.services.train.data_instance import DataInstance
from aigle_service.services.train.preprocess import preprocess

from ..const import base_url


data = Blueprint('data', __name__)


@data.route(base_url + 'datasource/list', methods=['GET'])
def index():
    print('version ' + sys.version)
    return {
        'data': sys.version,
        'baseResponse': {
            'code': 200,
            'message': 'success'
        }
    }, 200


@data.route(base_url + 'data/load', methods=['GET'])
def load_data():
    try:
        data = DataInstance().data
        y_label = DataInstance().y_label
        data_test = DataInstance().data_test
        y_labeltest = DataInstance().y_labeltest

        print(data)
        print(y_label)
        print(data_test)
        print(y_labeltest)

        if data is None or y_label is None or data_test is None or y_labeltest is None:
            return {
                'baseResponse': {
                    'code': 500,
                    'message': 'Error: data is None'
                }
            }, 500
        return {
            'data': "After deleting the missing data, your dataset has 73500 rows, 378 columns left.",
            'baseResponse': {
                'code': 200,
                'message': 'success'
            }
        }, 200
    except Exception as e:
        return {
            'data': str(e),
            'baseResponse': {
                'code': 500,
                'message': 'Catch error: ' + str(e)
            }
        }, 500


@data.route(base_url + 'data/preprocess', methods=['GET'])
def pre_process():
    try:
        data = DataInstance().data
        y_label = DataInstance().y_label
        data_test = DataInstance().data_test
        y_labeltest = DataInstance().y_labeltest

        print(data)
        print(y_label)
        print(data_test)
        print(y_labeltest)

        if data is None or y_label is None or data_test is None or y_labeltest is None:
            return {
                'baseResponse': {
                    'code': 500,
                    'message': 'Error: data is None'
                }
            }, 500

        preprocess()

        return {
            'data': "preprocess done, you can test the model now.",
            'baseResponse': {
                'code': 200,
                'message': 'success'
            }
        }

    except Exception as e:
        return {
            'data': str(e),
            'baseResponse': {
                'code': 500,
                'message': 'Catch error: ' + str(e)
            }
        }, 500


@data.route(base_url + 'data/xgboost', methods=['GET'])
def xgboost():
    try:
        res = xgb_classify()
        return {
            'data': res,
            'baseResponse': {
                'code': 200,
                'message': 'success'
            }
        }

    except Exception as e:
        print('error: ' + str(e))
        return {
            'data': str(e),
            'baseResponse': {
                'code': 500,
                'message': 'Catch error: ' + str(e)
            }
        }, 500


@data.route(base_url + 'data/clf', methods=['GET'])
def clf():
    try:
        res = clf_classify()
        return {
            'data': res,
            'baseResponse': {
                'code': 200,
                'message': 'success'
            }
        }

    except Exception as e:
        print('error: ' + str(e))
        return {
            'data': str(e),
            'baseResponse': {
                'code': 500,
                'message': 'Catch error: ' + str(e)
            }
        }, 500
