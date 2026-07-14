from .skill_extractor import extract_skills


def match_resume_with_jd(resume_text, job_description):
    """
    Compare resume against a job description.
    """

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    resume_set = set(skill.lower() for skill in resume_skills)
    jd_set = set(skill.lower() for skill in jd_skills)

    matched = sorted(resume_set.intersection(jd_set))
    missing = sorted(jd_set - resume_set)

    if len(jd_set) == 0:
        score = 0
    else:
        score = int(len(matched) / len(jd_set) * 100)

    suggestions = []

    for skill in missing:
        suggestions.append(
            f"Consider adding {skill.title()} experience."
        )

    return {
        "match_score": score,
        "matched_skills": [s.title() for s in matched],
        "missing_keywords": [s.title() for s in missing],
        "suggestions": suggestions,
    }