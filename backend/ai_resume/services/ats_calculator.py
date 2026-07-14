def calculate_ats_score(
    extracted_skills,
    required_skills,
):
    """
    Calculate ATS score based on required skills.

    Returns:
        score,
        found_skills,
        missing_skills
    """

    extracted = {
        skill.lower()
        for skill in extracted_skills
    }

    found = []
    missing = []

    for skill in required_skills:

        if skill.lower() in extracted:
            found.append(skill)
        else:
            missing.append(skill)

    if required_skills:
        score = int(
            (len(found) / len(required_skills)) * 100
        )
    else:
        score = 0

    return score, found, missing