import json
from pathlib import Path

import spacy

nlp = spacy.load("en_core_web_sm")


BASE_DIR = Path(__file__).resolve().parent.parent
SKILLS_FILE = BASE_DIR / "data" / "skills.json"


with open(SKILLS_FILE, "r") as file:
    SKILLS_DATABASE = json.load(file)


def extract_skills(text):
    """
    Extract technical skills from resume text.
    """

    doc = nlp(text.lower())

    tokens = {
        token.text
        for token in doc
    }

    found = []

    for skill in SKILLS_DATABASE:

        if skill.lower() in text.lower():
            found.append(skill)

        elif skill.lower() in tokens:
            found.append(skill)

    return sorted(list(set(found)))