import random

from .technical_questions import TECHNICAL_QUESTIONS
from .coding_questions import CODING_QUESTIONS
from .behavioral_questions import BEHAVIORAL_QUESTIONS
from .hr_questions import HR_QUESTIONS


def generate_questions(skills):

    technical = []
    coding = []

    for skill in skills:

        if skill in TECHNICAL_QUESTIONS:
            technical.extend(
                TECHNICAL_QUESTIONS[skill]
            )

        if skill in CODING_QUESTIONS:
            coding.extend(
                CODING_QUESTIONS[skill]
            )

    # Remove duplicates while preserving order
    technical = list(dict.fromkeys(technical))
    coding = list(dict.fromkeys(coding))

    random.shuffle(technical)
    random.shuffle(coding)

    return {
        "technical_questions": technical[:8],
        "coding_questions": coding[:5],
        "behavioral_questions": random.sample(
            BEHAVIORAL_QUESTIONS,
            min(5, len(BEHAVIORAL_QUESTIONS)),
        ),
        "hr_questions": random.sample(
            HR_QUESTIONS,
            min(5, len(HR_QUESTIONS)),
        ),
    }