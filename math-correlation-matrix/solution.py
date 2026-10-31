import numpy as np

from _load import load_solution

correlation = load_solution("math-expectation-variance-covariance").correlation


def correlation_matrix(x: np.ndarray) -> np.ndarray:
    """
    x is (num_samples, num_features). Returns a (num_features,
    num_features) matrix where entry [i, j] is the correlation
    between feature column i and feature column j.
    """

    num_features = x.shape[1]

    result = np.zeros((num_features, num_features))

    for i in range(num_features):
        for j in range(num_features):
            result[i, j] = correlation(x[:, i], x[:, j])

    return result


def most_correlated_pair(corr_matrix: np.ndarray) -> tuple[int, int]:
    """
    Given a correlation matrix, returns the (row, col) index of the
    single most correlated pair of DIFFERENT features.
    """

    abs_corr = np.abs(corr_matrix).copy()

    np.fill_diagonal(abs_corr, -np.inf)

    row, col = np.unravel_index(np.argmax(abs_corr), abs_corr.shape)

    return (int(row), int(col))
