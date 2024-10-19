
import hashlib
from librosa.feature import mfcc
from librosa import load


def generate_fingerprint_from_file(audio_file):

    y, sr = load(audio_file)

    mfccs = mfcc(y=y, sr=sr)

    # Flatten the feature matrix
    mfccs_flat = mfccs.flatten()

    # Convert the feature matrix to a byte string
    data_bytes = mfccs_flat.tobytes()

    # Compute the SHA-256 hash of the byte string
    song_fingerprint = hashlib.sha256(data_bytes).hexdigest()

    return song_fingerprint


def generate_fingerprint(y, sr):
    mfccs = mfcc(y=y, sr=sr)

    # Flatten the feature matrix
    mfccs_flat = mfccs.flatten()

    # Convert the feature matrix to a byte string
    data_bytes = mfccs_flat.tobytes()

    # Compute the SHA-256 hash of the byte string
    song_fingerprint = hashlib.sha256(data_bytes).hexdigest()

    return song_fingerprint
