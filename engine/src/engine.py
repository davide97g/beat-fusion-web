
import librosa
# import soundfile as sf
from src.fingerprint import generate_fingerprint
from src.bounds import getBoundariesInfo
import numpy as np


def loadAudioFile(audioFile):
    return librosa.load(audioFile)


def getDuration(y, sr):
    return librosa.get_duration(y=y, sr=sr)


def getLibrosaIntervals(y, sr, split=4):
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    bounds = librosa.segment.agglomerative(chroma, split)
    return librosa.frames_to_time(bounds, sr=sr)


def getTempo(y, sr):
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    return librosa.feature.tempo(onset_envelope=onset_env, sr=sr)


def loadFromFile(audioFile):
    return librosa.load(audioFile)


def getInfo(file):
    y, sr = loadFromFile(file)

    fingerprint = generate_fingerprint(y, sr)

    # TODO: here could be inserted a check onto DB to retrieve a (possible) previously saved song
    # ? very rare => very low priority

    duration = getDuration(y, sr)

    tempo = getTempo(y, sr)

    seconds_per_bound = 30
    bounds_number = int(duration/seconds_per_bound)

    boundaries_times = getLibrosaIntervals(
        y, sr, bounds_number)

    # ! ATTENTION: this a very slow computation, test out on OFFLINE mode
    # boundaries_times = getRupturesIntervals(
    #     y, sr, bounds_number)

    boundaries_times = np.append(boundaries_times, duration)
    bounds = getBoundariesInfo(y, sr, boundaries_times, 5, 1)

    return {'id': fingerprint, 'tempo': tempo.tolist(), 'duration': duration, 'intervals': bounds}
