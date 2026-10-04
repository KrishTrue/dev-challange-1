# Backend Documentation

## 🏗️ Overview

The backend is a Flask-based REST API that serves as the core engine for the AI Disease Prediction System. It handles disease predictions, provides disease descriptions using Google Gemini AI, and manages all server-side logic.

## 🎯 Architecture

### Technology Stack

- **Framework**: Flask 3.1.1
- **WSGI Server**: Gunicorn (production)
- **AI Integration**: Google Gemini API
- **Machine Learning**: scikit-learn, joblib
- **Cross-Origin**: Flask-CORS
- **Environment**: python-dotenv

### Project Structure

```
backend/
├── src/
│   ├── app.py              # Main Flask application
│   ├── model/
│   │   └── model.joblib    # Trained ML model
│   └── utils/
│       ├── data.py         # Data mappings and constants
│       └── utils.py        # Utility functions
├── docker-compose.yml      # Docker composition
├── Dockerfile             # Container configuration
├── gunicorn.conf.py       # Gunicorn configuration
├── pyproject.toml         # Dependencies
├── start.py               # Entry point with mode selection
├── wsgi.py                # WSGI application entry
└── run.sh                 # Convenience startup script
```

## 🚀 Quick Start

### Development Mode

```bash
# Using the convenience script
./run.sh dev

# Or directly with Python
uv run python start.py dev

# Or with environment variable
FLASK_ENV=development uv run python start.py
```

**Server URL**: `http://127.0.0.1:5000`

### Production Mode

```bash
# Using the convenience script
./run.sh prod

# Or directly with Python
uv run python start.py prod

# Or with environment variable
FLASK_ENV=production uv run python start.py
```

**Server URL**: `http://127.0.0.1:8000`

## 📡 API Endpoints

### 1. Health Check

**Endpoint**: `GET /`

**Description**: Basic welcome message to verify server is running.

**Response**:

```json
{
  "message": "Welcome to the Flask API!"
}
```

### 2. Advanced Health Check

**Endpoint**: `GET /health`

**Description**: Detailed health status including model availability.

**Response**:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "1704067200"
}
```

### 3. Disease Prediction

**Endpoint**: `POST /predict`

**Description**: Predicts disease based on selected symptoms.

**Request Body**:

```json
{
  "symptoms": ["Itching", "Skin Rash", "High Fever"]
}
```

**Response** (Success):

```json
{
  "disease": "Fungal infection"
}
```

**Response** (Error):

```json
{
  "error": "Model not available"
}
```

**Status Codes**:

- `200`: Successful prediction
- `400`: Invalid request data
- `500`: Prediction failed
- `503`: Model not available

### 4. Disease Description

**Endpoint**: `POST /disease_description`

**Description**: Fetches detailed description of a disease using Google Gemini AI.

**Request Body**:

```json
{
  "disease_name": "Common Cold"
}
```

**Response** (Success):

```json
{
  "description": "**Description** – A viral infection affecting the upper respiratory tract...\n**Symptoms** – Runny nose, sneezing, cough...\n**Causes** – Viral infection, commonly rhinoviruses...\n**Precautions** – Wash hands frequently, avoid close contact...\n**Medication** – Rest, fluids, over-the-counter pain relievers..."
}
```

**Response** (Error):

```json
{
  "error": "Description not found for the given disease"
}
```

**Status Codes**:

- `200`: Description retrieved successfully
- `400`: Missing disease name
- `404`: Description not found
- `500`: Description lookup failed

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
FLASK_ENV=development  # or production
```

### Gunicorn Configuration

**File**: `gunicorn.conf.py`

```python
# Server settings
bind = "127.0.0.1:8000"
workers = 4
worker_class = "sync"
timeout = 30
keepalive = 2

# Performance settings
max_requests = 1000
max_requests_jitter = 50
preload_app = True

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"
```

### CORS Configuration

```python
CORS(app, origins=['*'])  # Configure for production
```

**Note**: In production, replace `'*'` with specific frontend origins.

## 🧠 Core Components

### 1. Flask Application (`app.py`)

**Key Features**:

- Model loading with error handling
- Comprehensive logging
- Error handling and validation
- CORS configuration
- Health monitoring endpoints

**Model Loading**:

```python
try:
    model = load('src/model/model.joblib')
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    model = None
```

### 2. Utility Functions (`utils.py`)

#### `encode_symptoms(symptom_list)`

Converts symptom names to binary feature vector.

**Parameters**:

- `symptom_list` (list): List of symptom names

**Returns**:

- `list`: Binary vector (132 elements) representing symptoms

**Example**:

```python
symptoms = ["itching", "fever"]
encoded = encode_symptoms(symptoms)
# Returns: [1, 0, 0, ..., 1, 0, ...]  (132 elements)
```

#### `get_symptoms(symptom_list)`

Maps display names to internal symptom names.

**Parameters**:

- `symptom_list` (list): Display symptom names from frontend

**Returns**:

- `list`: Internal symptom names used by the model

#### `inverse_encode_symptoms(encoded_symptoms)`

Converts model predictions back to disease names.

**Parameters**:

- `encoded_symptoms` (array): Model prediction output

**Returns**:

- `list`: Human-readable disease names

#### `get_disease_description(disease_name)`

Fetches disease description using Google Gemini AI.

**Parameters**:

- `disease_name` (str): Name of the disease

**Returns**:

- `str`: Formatted disease description with sections

**AI Prompt Structure**:

```
Give a brief and clear overview of the disease: {disease_name}.
Include the following sections in order:
1. **Description** – What the disease is.
2. **Symptoms** – Key signs to look out for.
3. **Causes** – Main reasons it occurs.
4. **Precautions** – How to prevent or reduce risk.
5. **Medication** – Common treatments or medicines.
```

### 3. Data Mappings (`data.py`)

Contains critical data structures:

- **`symptoms`**: Dictionary mapping internal names to binary values
- **`display_named_symptoms`**: Mapping display names to internal names
- **`diseases`**: List of all possible disease predictions

## 🛡️ Error Handling

### Model Availability

```python
if model is None:
    return jsonify(error='Model not available'), 503
```

### Input Validation

```python
data = request.get_json()
if not data:
    return jsonify(error='No data provided'), 400
```

### Prediction Errors

```python
try:
    encoded_symptoms = encode_symptoms(get_symptoms(data))
    prediction = model.predict([encoded_symptoms])
    return jsonify(disease=str(inverse_encode_symptoms(prediction)[0]))
except Exception as e:
    logger.error(f"Prediction error: {e}")
    return jsonify(error='Prediction failed'), 500
```

## 📊 Logging

### Configuration

```python
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

### Log Events

- Model loading success/failure
- Prediction errors
- Description lookup errors
- Server startup events

## 🐳 Docker Support

### Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY . .

RUN pip install uv
RUN uv sync

EXPOSE 8000

CMD ["uv", "run", "python", "start.py", "prod"]
```

### Docker Compose

```yaml
version: "3.8"
services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - FLASK_ENV=production
      - GEMINI_API_KEY=${GEMINI_API_KEY}
```

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**:

   - Set `FLASK_ENV=production`
   - Configure `GEMINI_API_KEY`

1. **CORS Configuration**:

   - Update origins to specific frontend URLs
   - Remove wildcard (`*`) origins

1. **Gunicorn Settings**:

   - Adjust worker count based on CPU cores
   - Configure appropriate timeouts
   - Set up proper logging

1. **Security**:

   - Use HTTPS in production
   - Implement rate limiting
   - Add authentication if required

### Performance Tuning

**Workers Calculation**:

```
workers = (2 × CPU_cores) + 1
```

**Memory Considerations**:

- Each worker loads the ML model (~50MB)
- Monitor memory usage with multiple workers

## 🔍 Monitoring

### Health Endpoints

Use `/health` endpoint for:

- Load balancer health checks
- Monitoring system integration
- Model availability verification

### Metrics to Monitor

- Response times for `/predict` endpoint
- Error rates by endpoint
- Model prediction accuracy over time
- Memory and CPU usage
- Gemini API response times

## 🧪 Testing

### Manual Testing

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["Itching", "Skin Rash"]}'

# Test description
curl -X POST http://localhost:8000/disease_description \
  -H "Content-Type: application/json" \
  -d '{"disease_name": "Common Cold"}'
```

### Load Testing

Use tools like `wrk` or `apache bench` to test under load:

```bash
# Basic load test
wrk -t12 -c400 -d30s http://localhost:8000/health
```

## 🔄 API Versioning

Future versions should implement API versioning:

```
/api/v1/predict
/api/v1/disease_description
/api/v1/health
```

## 📝 Best Practices

1. **Always validate input data**
1. **Use proper HTTP status codes**
1. **Implement comprehensive logging**
1. **Handle model failures gracefully**
1. **Monitor API performance**
1. **Keep dependencies updated**
1. **Use environment variables for configuration**
1. **Implement proper error messages**
