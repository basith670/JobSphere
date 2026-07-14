def generate_cover_letter(
    full_name,
    job_description,
    skills,
):

    skill_text = ", ".join(skills)

    return f"""
Dear Hiring Manager,

I am excited to apply for the position advertised by your company.

With hands-on experience in {skill_text}, I have developed scalable web applications, REST APIs, and full-stack software solutions using modern technologies.

My technical background aligns well with your requirements:

{job_description}

I enjoy solving challenging engineering problems, writing clean code, collaborating with teams, and continuously learning new technologies.

I would welcome the opportunity to contribute my skills and enthusiasm to your organization.

Thank you for your time and consideration.

Sincerely,

{full_name}
""".strip()