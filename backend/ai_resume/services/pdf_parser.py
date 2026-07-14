import pdfplumber


def extract_resume_text(pdf_path):
    """
    Extract plain text from a PDF resume.

    Args:
        pdf_path (str): Absolute path of uploaded PDF.

    Returns:
        str: Extracted text.
    """

    extracted_text = []

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                extracted_text.append(page_text)

    return "\n".join(extracted_text)