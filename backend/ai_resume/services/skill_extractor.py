import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SKILLS_FILE = BASE_DIR / "data" / "skills.json"

with open(SKILLS_FILE, "r") as file:
    SKILLS_DATABASE = json.load(file)


def extract_skills(text):
    """
    Extract technical skills from resume text without spaCy.
    """

    text = text.lower()

    tokens = set(
        re.findall(r"\b[a-zA-Z0-9+#.]+\b", text)
    )

    found = []

    for skill in SKILLS_DATABASE:

        skill_lower = skill.lower()

        if skill_lower in text:
            found.append(skill)

        elif skill_lower in tokens:
            found.append(skill)

    return sorted(set(found))