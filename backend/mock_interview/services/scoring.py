def calculate_score(answer):

    answer = answer.strip()

    if not answer:
        return 0

    words = len(answer.split())

    if words < 20:
        return 3

    elif words < 50:
        return 6

    elif words < 100:
        return 8

    return 10