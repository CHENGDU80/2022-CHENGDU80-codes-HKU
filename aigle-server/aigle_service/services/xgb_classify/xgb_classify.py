import pandas as pd
from xgboost import XGBClassifier
from xgboost import plot_importance
from aigle_service.services.train.data_instance import DataInstance
from sklearn.metrics import roc_curve


def xgb_inner_classify(trainx, trainy, testx):
    t = XGBClassifier(learning_rate=0.01,
                      n_estimators=200,
                      max_depth=4,
                      min_child_weight=0.85,
                      gamma=0,
                      subsample=0.7,
                      eval_metric='auc')
    t.fit(trainx, trainy)
    y_pre = t.predict(testx)
    probas = t.predict_proba(testx)[:, 1]
    return y_pre, probas


def xgb_classify():
    data_instance = DataInstance()

    print("xgb_classify start")

    y_labeltest = data_instance.get_y_labeltest()

    data_train = data_instance.get_data_train()

    y_train = data_instance.get_y_train()

    data_test = data_instance.get_data_test()

    y_pre = []
    probas = []
    y_pre, probas = xgb_inner_classify(data_train, y_train, data_test)

    data_instance.set_probas(probas)

    print("xgb_classify done")

#
    # ROC
    fpr, tpr, _ = roc_curve(y_labeltest, probas)
    # Roc_curve = {}
    # Roc_curve = {'fpr': fpr, 'tpr': tpr}
    # df_roc = pd.DataFrame(Roc_curve)

    print("xgb_classify 2 start")

    t = XGBClassifier(learning_rate=0.01,
                      n_estimators=200,
                      max_depth=4,
                      min_child_weight=0.85,
                      gamma=0,
                      subsample=0.7,
                      eval_metric='auc').fit(data_train, y_train)

    print("xgb_classify 2 done")

    data_instance.set_t(t)

    # model = SelectFromModel(t, prefit=True, threshold=0.003)
    # feature_idx = model.get_support()
    # feature_name = data_train.columns[feature_idx]
    # feature_name = feature_name.tolist()

    # Histogram
    col = list(data_train.columns)
    lis = list(t.feature_importances_)
    f_importance = {}
    f_importance = {'col': col, 'lis': lis}
    f_importance = pd.DataFrame(f_importance)
    f_importance = f_importance.sort_values(by='lis', ascending=False)
    f_plot = f_importance.iloc[0:15, :]

    return {
        'ROC': {
            'fpHorizontalAxis': list(fpr),
            'tpVerticalAxis': list(tpr)
        },
        'histogram': {
            'horizontalAxis': list(f_plot['col']),
            'verticalAxis': list(f_plot['lis']),
        }
    }
