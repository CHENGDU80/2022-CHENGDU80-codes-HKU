from aigle_service.services.train.data_instance import DataInstance
from aigle_service.services.xgb_classify.xgb_classify import xgb_inner_classify
import lightgbm as lgb
from xgboost import XGBClassifier

from sklearn.feature_selection import SelectFromModel
from sklearn.preprocessing import StandardScaler
import pandas as pd
from sklearn.metrics import roc_curve


def clf_inner_classify(trainx, trainy, testx):
    clf = lgb.LGBMClassifier(
        max_depth=4, n_estimators=500, subsample_freq=2,
        subsample=0.6, colsample_bytree=0.5,
        learning_rate=0.02, min_child_weight=0.8, n_jobs=-1, min_data_in_leaf=500, scale_pos_weight=1, metric='auc'
    )
    clf.fit(trainx, trainy)
    y_pre = clf.predict(testx)
    probas = clf.predict_proba(testx)[:, 1]
    return y_pre, probas


def clf_classify():
    data_instance = DataInstance()

    data_train = data_instance.get_data_train()
    y_train = data_instance.get_y_train()

    data_test = data_instance.get_data_test()

    y_labeltest = data_instance.get_y_labeltest()

    t = None

    t = data_instance.get_t()

    probas = data_instance.get_probas()

    if t is None:
        t = XGBClassifier(learning_rate=0.01,
                          n_estimators=200,
                          max_depth=4,
                          min_child_weight=0.85,
                          gamma=0,
                          subsample=0.7,
                          eval_metric='auc').fit(data_train, y_train)

    if probas is None:
        y_pre = []
        probas = []
        y_pre, probas = xgb_inner_classify(data_train, y_train, data_test)

    model = SelectFromModel(t, prefit=True, threshold=0.003)
    feature_idx = model.get_support()
    feature_name = data_train.columns[feature_idx]
    feature_name = feature_name.tolist()

    names = []
    for i in feature_name:
        names.append(i)
    new_model = data_train.loc[:, names]
    transfer = StandardScaler()
    new_model = pd.DataFrame(transfer.fit_transform(new_model))
    new_model.columns = names

    names = []
    for i in feature_name:
        names.append(i)
    test_new_model = data_test.loc[:, names]
    transfer = StandardScaler()
    test_new_model = pd.DataFrame(transfer.fit_transform(test_new_model))
    test_new_model.columns = names

    y_pre_new = []
    probas_new = []

    y_pre_new, probas_new = clf_inner_classify(
        new_model, y_train, test_new_model)

    fpr, tpr, _ = roc_curve(y_labeltest, probas)
    # Roc_curve2 = {}
    # Roc_curve2 = {'fpr2': fpr2, 'tpr2': tpr2}
    # df_roc2 = pd.DataFrame(Roc_curve2)

    return {
        'ROC': {
            'horizontal': fpr.tolist(),
            'vertical': tpr.tolist()
        }
    }
