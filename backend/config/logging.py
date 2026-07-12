import os

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,

    "formatters": {
        "standard": {
            "format": "[{levelname}] {asctime} {name}: {message}",
            "style": "{",
        },
    },

    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "standard",
        },

        "file": {
            "level": "ERROR",
            "class": "logging.FileHandler",
            "filename": os.path.join(
                os.path.dirname(os.path.dirname(__file__)),
                "errors.log",
            ),
            "formatter": "standard",
        },
    },

    "root": {
        "handlers": [
            "console",
            "file",
        ],
        "level": "INFO",
    },
}