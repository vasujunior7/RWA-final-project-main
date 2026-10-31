import numpy as np


def skewness(x: np.ndarray) -> float:
    """
    Pearson's moment coefficient of skewness: the average CUBED
    z-score of every value.
    """
    mean = np.mean(x)
    std = np.std(x)

    if std == 0:
        return 0.0

    skewness = np.mean(((x - mean) / std) ** 3)

    return float(skewness)


def summarize_distribution(x: np.ndarray) -> dict:
    """
    Returns {"mean": ..., "median": ..., "std": ..., "skew": ...}.
    """
    result = {
        "mean": np.mean(x),
        "median": np.median(x),
        "std": np.std(x),
        "skew": skewness(x)
    }

    return result
