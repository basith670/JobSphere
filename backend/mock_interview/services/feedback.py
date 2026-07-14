def generate_feedback(score):

    if score >= 9:
        return (
            "Excellent answer. Clear explanation with good detail."
        )

    elif score >= 7:
        return (
            "Good answer. Add more technical examples."
        )

    elif score >= 5:
        return (
            "Average answer. Explain concepts more clearly."
        )

    return (
        "Weak answer. Increase detail and provide examples."
    )