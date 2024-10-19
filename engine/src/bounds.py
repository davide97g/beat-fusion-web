import librosa
import numpy as np
# import ruptures as rpt  # our package


# def getRupturesIntervals(signal, sampling_rate, n_bkps):

#     hop_length_tempo = 256
#     oenv = librosa.onset.onset_strength(
#         y=signal, sr=sampling_rate, hop_length=hop_length_tempo
#     )
#     # Compute the tempogram
#     tempogram = librosa.feature.tempogram(
#         onset_envelope=oenv,
#         sr=sampling_rate,
#         hop_length=hop_length_tempo,
#     )

#     # Choose detection method
#     algo = rpt.KernelCPD(kernel="linear").fit(tempogram.T)

#     # Choose the number of changes (elbow heuristic)
#     n_bkps_max = 20  # K_max
#     # Start by computing the segmentation with most changes.
#     # After start, all segmentations with 1, 2,..., K_max-1 changes are also available for free.
#     _ = algo.predict(n_bkps_max)

#     # Segmentation
#     bkps = algo.predict(n_bkps=n_bkps)
#     # Convert the estimated change points (frame counts) to actual timestamps
#     bkps_times = librosa.frames_to_time(
#         bkps, sr=sampling_rate, hop_length=hop_length_tempo)

#     return bkps_times


def defineFlowType(limit_values, bound_intensity):
    if bound_intensity == 0.0:
        return 'UNKNOWN'
    ratio = (limit_values[-1] - limit_values[0])/bound_intensity
    if ratio > 0.1:
        return 'CLIMAX'
    elif ratio < -0.1:
        return 'COOLDOWN'
    return 'STABLE'


def getBoundariesInfo(y, sr, bound_times, sub_boundaries=5, sub_boundary_time=1.0):

    # sub_boundary_time = The number of seconds for each sub-boundary
    # sub_boundaries = The number of sub-boundaries to consider

    # Initialize lists to store the volumes within each boundary and the volumes of the sub-boundaries
    info = []

    for i in range(len(bound_times) - 1):
        start_time = bound_times[i]
        end_time = bound_times[i + 1]

        # Convert time boundaries to sample indices
        start_sample = librosa.time_to_samples(start_time, sr=sr)
        end_sample = librosa.time_to_samples(end_time, sr=sr)

        # Extract values within the current boundary
        values_in_range = y[start_sample:end_sample]

        # Calculate the RMSE (root mean square energy) of values within the boundary
        rmse_in_range = np.sqrt(np.mean(np.square(values_in_range)))

        # Generate starting sub-boundaries
        startSubs = [start_time + x *
                     sub_boundary_time for x in range(sub_boundaries)]

        # Generate ending sub-boundaries
        endSubs = [end_time - (sub_boundaries - x * sub_boundary_time)
                   for x in range(sub_boundaries)]

        intensity_in_sub_boundaries_start = []
        # Calculate the RMSE for the sub-boundaries within the current main boundary
        for j in range(len(startSubs)-1):
            sub_start_sample = librosa.time_to_samples(startSubs[j], sr=sr)
            sub_end_sample = librosa.time_to_samples(startSubs[j+1], sr=sr)
            values_in_sub_range = y[sub_start_sample:sub_end_sample]
            rmse_in_sub_range = np.sqrt(
                np.mean(np.square(values_in_sub_range)))
            intensity_in_sub_boundaries_start.append(rmse_in_sub_range)

        intensity_in_sub_boundaries_end = []
        # Calculate the RMSE for the sub-boundaries within the current main boundary
        for j in range(len(endSubs)-1):
            sub_start_sample = librosa.time_to_samples(endSubs[j], sr=sr)
            sub_end_sample = librosa.time_to_samples(endSubs[j+1], sr=sr)
            values_in_sub_range = y[sub_start_sample:sub_end_sample]
            rmse_in_sub_range = np.sqrt(
                np.mean(np.square(values_in_sub_range)))
            intensity_in_sub_boundaries_end.append(rmse_in_sub_range)

        rmse_in_range = rmse_in_range if not np.isnan(rmse_in_range) else 0
        info.append({
            'intensity': int(rmse_in_range*100),
            'start': bound_times[i],
            'end': bound_times[i + 1],
            'flow_start': defineFlowType(intensity_in_sub_boundaries_start, rmse_in_range),
            'flow_end': defineFlowType(intensity_in_sub_boundaries_end, rmse_in_range),
        })

    max_intensity = np.max([x['intensity'] for x in info])
    min_intensity = np.min([x['intensity'] for x in info])
    for item in info:
        if item['intensity'] == max_intensity:
            item['energy'] = 'HIGH'
        elif item['intensity'] == min_intensity:
            item['energy'] = 'LOW'
        else:
            item['energy'] = 'AVG'

    return info
