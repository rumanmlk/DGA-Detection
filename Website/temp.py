from gensim.models import Word2Vec, KeyedVectors

# Load the original model
word2vec_model = Word2Vec.load('D:/Bscs/Sem7/IS/Project/model/DGA-Detection/Word2V_model.bin')

# Save only the KeyedVectors
word2vec_model.wv.save('D:/Bscs/Sem7/IS/Project/model/DGA-Detection/Word2Vec.kv')