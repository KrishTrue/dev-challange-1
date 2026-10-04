#!/usr/bin/env python3
"""
Production startup script for the disease detector backend.
Uses Gunicorn WSGI server for production deployment.
"""

import os
import sys
from pathlib import Path


def start_development():
    """Start the application in development mode with Flask's built-in server."""
    from src.app import app

    app.run(debug=True, host="127.0.0.1", port=5000)


def start_production():
    """Start the application in production mode with Gunicorn."""
    import subprocess

    # Get the backend directory
    backend_dir = Path(__file__).parent

    # Change to backend directory
    os.chdir(backend_dir)

    # Run Gunicorn with configuration file
    cmd = [sys.executable, "-m", "gunicorn", "--config", "gunicorn.conf.py", "wsgi:app"]

    print("Starting production server with Gunicorn...")
    print(f"Command: {' '.join(cmd)}")

    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error starting Gunicorn: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nShutting down server...")
        sys.exit(0)


if __name__ == "__main__":
    # Check if we should run in production mode
    mode = os.environ.get("FLASK_ENV", "development").lower()

    if len(sys.argv) > 1:
        if sys.argv[1] == "prod" or sys.argv[1] == "production":
            start_production()
        elif sys.argv[1] == "dev" or sys.argv[1] == "development":
            start_development()
        else:
            print("Usage: python start.py [dev|prod]")
            sys.exit(1)
    else:
        # Default behavior based on environment
        if mode == "production":
            start_production()
        else:
            start_development()
