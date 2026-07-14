from .scoring import calculate_score
from .feedback import generate_feedback


def evaluate_answer(answer):

    score = calculate_score(answer)

    feedback = generate_feedback(score)

    return {
        "score": score,
        "feedback": feedback,
    }