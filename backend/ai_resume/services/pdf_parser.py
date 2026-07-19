import io
import requests
import pdfplumber


def extract_resume_text(resume_file):
    """
    Extract text from a PDF stored in Cloudinary or any remote storage.
    """

    response = requests.get(resume_file.url, timeout=30)
    response.raise_for_status()

    pdf_stream = io.BytesIO(response.content)

    extracted_text = []

    with pdfplumber.open(pdf_stream) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                extracted_text.append(page_text)

    return "\n".join(extracted_text)