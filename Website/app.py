from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from gensim.models import Word2Vec
from gensim.models import KeyedVectors
import re
import math
from sklearn.feature_extraction.text import TfidfVectorizer
from jsonschema import validate, ValidationError
from flask_cors import CORS
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Initialize the Flask app
app = Flask(__name__)
CORS(app)
# Configure maximum payload size to prevent DoS attacks (e.g., 1 MB)
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024  # 1 MB

# Load the trained Word2Vec model and DeepD2V model
# word2vec_model = Word2Vec.load('D:/Bscs/Sem7/IS/Project/model/DGA-Detection/Word2Vec.kv')  # Replace with the path to your Word2Vec model
deepd2v_model = load_model('D:/Bscs/Sem7/IS/Project/model/DGA-Detection/DeepD2V_model.h5')  # Replace with the path to your DeepD2V model
word2vec_model = KeyedVectors.load('D:/Bscs/Sem7/IS/Project/model/DGA-Detection/Word2Vec.kv')


# Load word probabilities for probabilistic tokenization
def calculate_word_probabilities(dictionary_file):
    dictionary = {}
    with open(dictionary_file, 'r') as file:
        for line in file:
            word, freq = line.strip().split()
            dictionary[word] = int(freq)

    sorted_words = sorted(dictionary.items(), key=lambda x: x[1], reverse=True)
    total_words = len(sorted_words)
    word_probabilities = {}
    for rank, (word, freq) in enumerate(sorted_words, start=1):
        probability = 1 / (rank * math.log(total_words + 1))
        word_probabilities[word] = probability

    return word_probabilities

# Load dictionary probabilities
dictionary_file = 'D:/Bscs/Sem7/IS/Project/model/DGA-Detection/Data/count_1w.txt'
word_probabilities = calculate_word_probabilities(dictionary_file)

# Function to tokenize domain names
def dom2words(domain):
    tokens = re.findall(r'[a-zA-Z0-9]+', domain)
    result = []
    for token in tokens:
        n = len(token)
        dp = [-float('inf')] * (n + 1)
        split = [None] * (n + 1)
        dp[0] = 0

        for i in range(1, n + 1):
            for j in range(i):
                word = token[j:i]
                if word in word_probabilities:
                    prob = dp[j] + math.log(word_probabilities[word])
                    if prob > dp[i]:
                        dp[i] = prob
                        split[i] = j

        words = []
        idx = n
        while idx > 0:
            prev_idx = split[idx]
            if prev_idx is None:
                break
            words.append(token[prev_idx:idx])
            idx = prev_idx

        result.extend(reversed(words))
    return result

# Function to generate embeddings
def get_embeddings(sentences, model):
    tfidf_vectorizer = TfidfVectorizer(vocabulary=model.key_to_index)
    tfidf_matrix = tfidf_vectorizer.fit_transform([' '.join(sentence) for sentence in sentences])
    tfidf_weights = dict(zip(tfidf_vectorizer.get_feature_names_out(), tfidf_matrix.mean(axis=0).A1))

    embeddings = []
    for sentence in sentences:
        vectors = [model[word] for word in sentence if word in model]
        if vectors:
            vectors_array = np.array(vectors)
            min_vec = np.min(vectors_array, axis=0)
            mean_vec = np.mean(vectors_array, axis=0)
            max_vec = np.max(vectors_array, axis=0)
            sum_vec = np.sum(vectors_array, axis=0)

            tfidf_vec = np.zeros(vectors_array.shape[1])
            for word in sentence:
                if word in tfidf_weights:
                    tfidf_vec += model[word] * tfidf_weights[word]

            embeddings.append(np.concatenate([min_vec, mean_vec, max_vec, sum_vec, tfidf_vec]))
        else:
            embeddings.append(np.zeros(500))

    return np.array(embeddings)

# Input validation schema
input_schema = {
    "type": "object",
    "properties": {
        "domain": {"type": "string", "maxLength": 255, "pattern": "^[a-zA-Z0-9.-]+$"}
    },
    "required": ["domain"],
    "additionalProperties": False
}

# Endpoint for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse and validate JSON input
        data = request.get_json()
        validate(instance=data, schema=input_schema)
    except ValidationError as e:
        return jsonify({'error': f'Invalid input: {e.message}'}), 400
    except Exception:
        return jsonify({'error': 'Invalid JSON payload'}), 400

    # Extract and process domain
    domain = data['domain']
    tokenized_domain = dom2words(domain)
    embeddings = get_embeddings([tokenized_domain], word2vec_model)

    # Reshape embeddings to match CNN input shape
    embeddings_reshaped = np.expand_dims(embeddings, axis=2)

    # Predict class
    prediction = deepd2v_model.predict(embeddings_reshaped)
    predicted_class = np.argmax(prediction, axis=1)[0]

    # Return prediction result
    result = {'domain': domain, 'predicted_class': int(predicted_class)}
    return jsonify(result)

# Global error handlers
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad Request: Ensure the payload is correct'}), 400

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({'error': 'Payload too large'}), 413

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
