import pandas as pd


def load_data():
    # load data
    data = pd.read_csv(
        '/Users/biqingfan/PythonProjects/Que/data/train/feature.csv')
    y = pd.read_csv('/Users/biqingfan/PythonProjects/Que/data/train/label.csv')
    print('loaded data')
    data = pd.merge(y, data, on='APPLICATION_ID')
    y_label = y['DEFAULT_LABEL']

    # load test data
    data_test = pd.read_csv(
        '/Users/biqingfan/PythonProjects/Que/data/test/feature.csv')
    y_test = pd.read_csv(
        '/Users/biqingfan/PythonProjects/Que/data/test/label.csv')
    y_labeltest = y_test['DEFAULT_LABEL']
    data_test = pd.merge(y_test, data_test, on='APPLICATION_ID')

    print('loaded test data')

    # missing data
    X = data.copy()
    X_na = (X.isnull().sum() / len(X)) * 100
    X_na = X_na.drop(X_na[X_na <= 25].index).sort_values(ascending=False)
    missing_data = pd.DataFrame({'Missing Raio(%)': X_na})

    print('drop missing data')

    # delete data that missing ratio > 25%
    X_del = list()
    X_del = X_na.index.tolist()
    for i in X_del:
        data = data.drop(i, axis=1)
        data_test = data_test.drop(i, axis=1)

    print('delete data that missing ratio > 25%')

    try:
        # drop data with default label
        data = data.drop(['APPLICATION_ID', 'DEFAULT_LABEL'], axis=1)
        data_test = data_test.drop(
            ['APPLICATION_ID', 'DEFAULT_LABEL'], axis=1)
    except Exception as e:
        print('drop exception: ' + e)
        pass

    return data, y, y_label, data_test, y_labeltest
