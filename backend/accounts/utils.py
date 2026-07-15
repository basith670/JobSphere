def calculate_profile_completion(user):
    score = 0

    if user.first_name:
        score += 10

    if user.last_name:
        score += 10

    if user.email:
        score += 10

    if user.phone:
        score += 10

    if user.bio:
        score += 10

    if user.headline:
        score += 10

    if user.location:
        score += 10

    if user.skills:
        score += 10

    if user.linkedin:
        score += 10

    if user.github or user.portfolio:
        score += 10

    return score