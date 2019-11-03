import keras as ks
from keras import layers

class KoAnalysor:
    def __init__(self,src=None):
        if src == None:
            self.model = ks.Sequential()
        else:
            self.model.load_weights(src)
if __name__ == "__main__":
    pass