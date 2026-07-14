def generate_suggestions(
    score,
    missing_skills,
    resume_text,
):
    suggestions = []

    if score < 60:
        suggestions.append(
            "Your ATS score is low. Add more relevant technical skills."
        )

    if missing_skills:
        suggestions.append(
            f"Consider adding: {', '.join(missing_skills)}."
        )

    if len(resume_text) < 800:
        suggestions.append(
            "Expand your resume with more project and experience details."
        )

    if "github" not in resume_text.lower():
        suggestions.append(
            "Add your GitHub profile."
        )

    if "linkedin" not in resume_text.lower():
        suggestions.append(
            "Add your LinkedIn profile."
        )

    return suggestions