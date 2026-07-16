import re


def evaluate_single_answer(question, answer):

    score = 0

    feedback = []

    answer = answer.strip()

    if not answer:

        return {
            "score": 0,
            "feedback": [
                "No answer was provided."
            ],
        }

    words = len(answer.split())

    if words >= 10:
        score += 20
    else:
        feedback.append(
            "Answer is too short."
        )

    if words >= 30:
        score += 20

    if words >= 60:
        score += 10

    keywords = [

        "because",
        "example",
        "used",
        "process",
        "implementation",
        "advantage",
        "performance",

    ]

    found = 0

    lower = answer.lower()

    for word in keywords:

        if word in lower:
            found += 1

    score += found * 8

    if found < 3:

        feedback.append(
            "Use more technical explanations."
        )

    if "." in answer:

        score += 10

    if re.search(r"\b(i think|maybe|probably)\b", lower):

        feedback.append(
            "Answer with more confidence."
        )

    score = min(score, 100)

    if score > 80:

        feedback.append(
            "Excellent answer."
        )

    elif score > 60:

        feedback.append(
            "Good answer."
        )

    else:

        feedback.append(
            "Needs improvement."
        )

    return {

        "score": score,

        "feedback": feedback,

    }


def evaluate_interview(

    questions,

    answers,

):

    results = []

    total = 0

    strengths = []

    improvements = []

    for question, answer in zip(

        questions,

        answers,

    ):

        result = evaluate_single_answer(

            question,

            answer,

        )

        total += result["score"]

        results.append(result)

    overall = round(

        total / len(results),

        1,

    ) if results else 0

    if overall >= 80:

        strengths.append(

            "Strong technical explanations."

        )

    else:

        improvements.append(

            "Explain concepts in more detail."

        )

    communication = max(

        overall - 5,

        0,

    )

    confidence = max(

        overall - 10,

        0,

    )

    return {

        "overall_score": overall,

        "technical": overall,

        "communication": communication,

        "confidence": confidence,

        "strengths": strengths,

        "improvements": improvements,

        "results": results,

    }