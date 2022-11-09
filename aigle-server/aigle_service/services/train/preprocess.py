
import pandas as pd
from aigle_service.services.train.data_instance import DataInstance


def preprocess():

    data_instance = DataInstance()

    if data_instance.has_done_preprocess:
        print('Preprocess has been done')
        return

    data = data_instance.get_data()

    data_test = data_instance.get_data_test()

    y = data_instance.get_y()

    print("data APPLICATION_ID and DEFAULT_LABEL dropped")

    # 差值填补
    for col in data.columns.values.tolist():
        data[col] = data[col].interpolate()
    for col in data.columns.values.tolist():
        data[col] = data[col].fillna(-99)
    data.isnull().any()

    print("data interpolated")

    # 差值填补
    for col in data_test.columns.values.tolist():
        data_test[col] = data_test[col].interpolate()
    for col in data_test.columns.values.tolist():
        data_test[col] = data_test[col].fillna(-99)
    data.isnull().any()

    print("data_test interpolated")

    # prepare training dataset and testing dataset
    data['label'] = y['DEFAULT_LABEL']
    data_true = data[data['label'] == 1]
    data_false = data[data['label'] == 0]
    data = data.drop(['label'], axis=1)

    print("data_true and data_false prepared")

    # sampling the imbalanced dataset
    data_true_sample = data_true.sample(n=30000, replace=True, axis=0)
    data_false_sample = data_false.sample(n=30000, replace=True, axis=0)
    data_train = pd.concat([data_true_sample, data_false_sample], axis=0)
    y_train = data_train['label']
    data_train = data_train.drop(['label'], axis=1)

    print("sample the imbalanced dataset done")

    data_instance.set_data(data)
    data_instance.set_data_true(data_true)
    data_instance.set_data_false(data_false)
    data_instance.set_data_true_sample(data_true_sample)
    data_instance.set_data_false_sample(data_false_sample)
    data_instance.set_data_train(data_train)
    data_instance.set_y_train(y_train)
    data_instance.set_y(y)

    data_instance.set_has_done_preprocess(True)
