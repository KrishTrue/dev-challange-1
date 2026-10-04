# Disease Detector Backend

A Flask-based REST API for disease prediction using machine learning.

## Features

- Disease prediction based on symptoms
- Disease description lookup
- Production-ready WSGI server setup with Gunicorn
- Development and production modes

## Quick Start

### Development Mode (Flask built-in server)

```bash
# Using the run script
./run.sh dev

# Or directly with Python
uv run python start.py dev

# Or with environment variable
FLASK_ENV=development uv run python start.py
```

The development server will be available at: http://127.0.0.1:5000

### Production Mode (Gunicorn WSGI server)

```bash
# Using the run script
./run.sh prod

# Or directly with Python
uv run python start.py prod

# Or with environment variable
FLASK_ENV=production uv run python start.py
```

The production server will be available at: http://127.0.0.1:8000

### Testing Server Startup

```bash
./run.sh test
```

## API Endpoints

### Health Check

- **GET** `/` - Returns a welcome message

### Disease Prediction

- **POST** `/predict` - Predict disease based on symptoms
  ```json
  {
    "symptoms": ["fever", "cough", "headache"]
  }
  ```

### Disease Description

- **POST** `/disease_description` - Get description for a disease
  ```json
  {
    "disease_name": "Common Cold"
  }
  ```

## Configuration

### Gunicorn Configuration

The production server uses Gunicorn with the following default settings (configurable in `gunicorn.conf.py`):

- **Workers**: 4
- **Bind**: 127.0.0.1:8000
- **Worker Class**: sync
- **Timeout**: 30 seconds
- **Max Requests**: 1000 (auto-restart workers)

### Environment Variables

- `FLASK_ENV`: Set to `production` for production mode, `development` for development mode

## Files

- `start.py` - Main entry point with mode selection
- `wsgi.py` - WSGI application entry point
- `gunicorn.conf.py` - Gunicorn configuration
- `run.sh` - Convenience script for starting the server
- `src/app.py` - Flask application
- `src/model/model.joblib` - Trained ML model
- `src/utils/` - Utility functions

## Development

### Installing Dependencies

```bash
uv sync
```

### Running Tests

```bash
./run.sh test
```

## Production Deployment

For production deployment, you can use the Gunicorn setup directly:

```bash
# Install dependencies
uv sync

# Start production server
./run.sh prod
```

For deployment behind a reverse proxy (nginx, etc.), bind to a Unix socket:

```python
# In gunicorn.conf.py, change bind to:
bind = "unix:/tmp/gunicorn.sock"
```
