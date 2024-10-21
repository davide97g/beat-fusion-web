from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from src.engine import getInfo

app = Flask(__name__)
CORS(app)

PORT = int(os.environ.get('PORT', 5000))


@app.route('/', methods=['GET'])
def hello():
    return 'Beat Flow Engine'

@app.route('/analyze', methods=['POST'])
def process_audio():

    audio_file = request.files.get('song')

    if not audio_file:
        return jsonify({'error': 'No audio file provided'}), 400

    info = getInfo(audio_file)

    response = jsonify(info)

    return response, 200,  {
        'Content-Type': 'application/json',
    }


if __name__ == '__main__':
    app.run(debug=True, port=PORT)
