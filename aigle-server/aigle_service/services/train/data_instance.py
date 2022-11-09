import pandas as pd
from .tools import load_data
from threading import Lock, Thread


class SingletonMeta(type):
    """
    This is a thread-safe implementation of Singleton.
    """

    _instances = {}

    _lock: Lock = Lock()
    """
    We now have a lock object that will be used to synchronize threads during
    first access to the Singleton.
    """

    def __call__(cls, *args, **kwargs):
        """
        Possible changes to the value of the `__init__` argument do not affect
        the returned instance.
        """
        # Now, imagine that the program has just been launched. Since there's no
        # Singleton instance yet, multiple threads can simultaneously pass the
        # previous conditional and reach this point almost at the same time. The
        # first of them will acquire lock and will proceed further, while the
        # rest will wait here.
        with cls._lock:
            # The first thread to acquire the lock, reaches this conditional,
            # goes inside and creates the Singleton instance. Once it leaves the
            # lock block, a thread that might have been waiting for the lock
            # release may then enter this section. But since the Singleton field
            # is already initialized, the thread won't create a new object.
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
        return cls._instances[cls]


class DataInstance(metaclass=SingletonMeta):
    data = None
    y = None
    y_label = None
    data_test = None
    y_labeltest = None

    data_true = None

    data_false = None

    data_true_sample = None

    data_false_sample = None

    data_train = None

    y_train = None

    t = None

    probas = None

    has_done_preprocess = False

    def __init__(self):
        self.data, self.y, self.y_label, self.data_test, self.y_labeltest = self.load_data()

    def load_data(self):
        return load_data()

    """ Getter and Setter """

    def get_data(self):
        return self.data

    def get_y(self):
        return self.y

    def get_y_label(self):
        return self.y_label

    def get_data_test(self):
        return self.data_test

    def get_y_labeltest(self):
        return self.y_labeltest

    def get_data_true(self):
        return self.data_true

    def get_data_false(self):
        return self.data_false

    def get_data_true_sample(self):
        return self.data_true_sample

    def get_data_false_sample(self):
        return self.data_false_sample

    def get_data_train(self):
        return self.data_train

    def get_y_train(self):
        return self.y_train

    def get_t(self):
        return self.t

    def get_probas(self):
        return self.probas

    def set_data(self, data):
        self.data = data

    def set_y(self, y):
        self.y = y

    def set_y_label(self, y_label):
        self.y_label = y_label

    def set_data_test(self, data_test):
        self.data_test = data_test

    def set_y_labeltest(self, y_labeltest):
        self.y_labeltest = y_labeltest

    def set_data_true(self, data_true):
        self.data_true = data_true

    def set_data_false(self, data_false):
        self.data_false = data_false

    def set_data_true_sample(self, data_true_sample):
        self.data_true_sample = data_true_sample

    def set_data_false_sample(self, data_false_sample):
        self.data_false_sample = data_false_sample

    def set_data_train(self, data_train):
        self.data_train = data_train

    def set_y_train(self, y_train):
        self.y_train = y_train

    def set_has_done_preprocess(self, has_done_preprocess):
        self.has_done_preprocess = has_done_preprocess

    def set_t(self, t):
        self.t = t

    def set_probas(self, probas):
        self.probas = probas
