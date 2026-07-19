import pdfplumber


def extract_resume_text(resume_file):
    """
    Extract plain text from an uploaded PDF.

    Works with:
    - Local FileSystemStorage
    - Cloudinary
    - Any Django storage backend
    """

    extracted_text = []

    resume_file.open("rb")

    try:
        with pdfplumber.open(resume_file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()

                if page_text:
                    extracted_text.append(page_text)

    finally:
        resume_file.close()

    return "\n".join(extracted_text)