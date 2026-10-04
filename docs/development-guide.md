# Development Guide

## 🛠️ Overview

This guide provides comprehensive instructions for setting up a development environment, understanding the codebase structure, and contributing to the AI Disease Prediction System.

## 🚀 Quick Start for Developers

### Prerequisites

- **Python 3.12+**
- **Git**
- **UV package manager** (recommended) or pip
- **Code editor** (VS Code recommended)
- **Google Gemini API key**

### 1. Environment Setup

**Clone Repository**:

```bash
git clone <repository-url>
cd disease-detector
```

**Install UV** (if not already installed):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Set up environment variables**:

```bash
# Backend .env file
cd backend
cat > .env << EOF
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_ENV=development
EOF
```

### 2. Install Dependencies

**Backend**:

```bash
cd backend
uv sync
```

**Frontend**:

```bash
cd ../frontend
uv sync
```

### 3. Start Development Servers

**Backend** (Terminal 1):

```bash
cd backend
./run.sh dev
# Server: http://localhost:5000
```

**Frontend** (Terminal 2):

```bash
cd frontend
uv run python main.py
# Server: http://localhost:8501
```

## 📁 Project Structure Deep Dive

### Root Directory Structure

```
disease-detector/
├── docs/                      # Documentation
├── ml/                        # Machine Learning components
│   ├── fithub.ipynb          # Jupyter notebook for model training
│   ├── MultiDiseaseDataset.csv
│   ├── diseases.json         # Generated disease list
│   └── symptoms.json         # Generated symptom list
├── backend/                   # Flask API
├── frontend/                  # Streamlit interface
├── display_symptoms.json     # Symptom display mappings
└── README.md
```

### Backend Structure

```
backend/
├── src/
│   ├── app.py                # Main Flask application
│   ├── model/
│   │   └── model.joblib      # Trained ML model
│   └── utils/
│       ├── data.py           # Data constants and mappings
│       └── utils.py          # Utility functions
├── docker-compose.yml        # Docker composition
├── Dockerfile               # Container definition
├── gunicorn.conf.py         # Production server config
├── pyproject.toml           # Dependencies and project config
├── run.sh                   # Development script
├── start.py                 # Application entry point
└── wsgi.py                  # WSGI entry point
```

### Frontend Structure

```
frontend/
├── src/
│   ├── app.py               # Main Streamlit app
│   ├── styles.css           # Custom CSS styling
│   ├── components/          # UI components
│   │   ├── __init__.py
│   │   ├── header.py        # App header
│   │   ├── info.py          # Information section
│   │   ├── selection.py     # Symptom selection
│   │   ├── result.py        # Results display
│   │   ├── displayResult.py # Result formatting
│   │   └── footer.py        # App footer
│   └── utils/
│       ├── constants.py     # App constants
│       ├── data.py          # Symptom data
│       └── utils.py         # Utility functions
├── main.py                  # Entry point
├── pyproject.toml          # Dependencies
├── requirements.txt        # Pip requirements
└── uv.lock                 # UV lock file
```

## 🧠 Understanding the ML Pipeline

### Data Flow

1. **Training Data** → `MultiDiseaseDataset.csv`
1. **Data Processing** → Extract symptoms and diseases
1. **Model Training** → Random Forest Classifier
1. **Model Serialization** → `model.joblib`
1. **Prediction** → Load model in Flask app

### Key ML Files

**`fithub.ipynb`**: Complete ML pipeline including:

- Data loading and exploration
- Feature engineering
- Model training and evaluation
- Model serialization

**Generated Files**:

- `diseases.json`: List of 41 unique diseases
- `symptoms.json`: List of 132 symptoms
- `model.joblib`: Trained Random Forest model

### Model Training Process

```python
# Key steps in the notebook
1. Load dataset
2. Separate features (symptoms) and target (disease)
3. Encode disease labels
4. Split into train/test sets
5. Train Random Forest (100 estimators, max_depth=10)
6. Evaluate model (accuracy ~95%)
7. Save model with joblib
```

## 🔧 Development Workflow

### Setting Up Your IDE

**VS Code Configuration** (`.vscode/settings.json`):

```json
{
  "python.defaultInterpreterPath": "./backend/.venv/bin/python",
  "python.terminal.activateEnvironment": true,
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "python.sortImports.args": ["--profile", "black"]
}
```

**Recommended Extensions**:

- Python
- Pylance
- Python Docstring Generator
- GitLens
- Docker

### Code Style and Standards

**Python Formatting**:

```bash
# Install development tools
uv add --dev black isort pylint pytest

# Format code
black .
isort .

# Lint code
pylint src/
```

**Pre-commit Hooks** (`.pre-commit-config.yaml`):

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 22.3.0
    hooks:
      - id: black
  - repo: https://github.com/pycqa/isort
    rev: 5.10.1
    hooks:
      - id: isort
```

## 🧪 Testing Strategy

### Backend Testing

**Unit Tests** (`tests/test_utils.py`):

```python
import pytest
from src.utils.utils import encode_symptoms, get_symptoms

def test_encode_symptoms():
    symptoms = ["itching", "fever"]
    encoded = encode_symptoms(symptoms)
    assert len(encoded) == 132
    assert sum(encoded) == 2  # Two symptoms selected

def test_get_symptoms():
    display_symptoms = ["Itching", "High Fever"]
    internal_symptoms = get_symptoms(display_symptoms)
    assert "itching" in internal_symptoms
    assert "high_fever" in internal_symptoms
```

**API Tests** (`tests/test_api.py`):

```python
import pytest
from src.app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_endpoint(client):
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert 'status' in data

def test_predict_endpoint(client):
    response = client.post('/predict',
        json={"symptoms": ["Itching", "Skin Rash"]})
    assert response.status_code == 200
    data = response.get_json()
    assert 'disease' in data
```

**Run Tests**:

```bash
cd backend
uv run pytest tests/ -v
```

### Frontend Testing

**Manual Testing Checklist**:

- [ ] Application loads without errors
- [ ] Symptom selection works correctly
- [ ] Prediction button enables/disables appropriately
- [ ] Results display properly
- [ ] Error handling works
- [ ] Responsive design on different screen sizes

**Automated Testing** (future enhancement):

```python
# Example using Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By

def test_symptom_selection():
    driver = webdriver.Chrome()
    driver.get("http://localhost:8501")

    # Test symptom selection
    symptoms_element = driver.find_element(By.CLASS_NAME, "multiselect")
    # Add test logic

    driver.quit()
```

## 🔄 Data Flow Understanding

### Complete Request Flow

1. **User Interaction**: Selects symptoms in frontend
1. **Frontend Processing**: Validates selection, enables button
1. **API Request**: POST to `/predict` with symptom list
1. **Backend Processing**:
   - Maps display names to internal names
   - Encodes symptoms to binary vector
   - Makes ML prediction
   - Decodes result to disease name
1. **Response**: Returns predicted disease
1. **Description Fetch**: Async request to `/disease_description`
1. **AI Processing**: Gemini generates description
1. **Display**: Shows results to user

### Data Transformations

**Symptom Mapping**:

```
"Itching" → "itching" → [1,0,0,...] → model prediction → encoded disease → "Fungal infection"
```

**Example Flow**:

```python
# Frontend sends
{"symptoms": ["Itching", "Skin Rash"]}

# Backend processes
display_symptoms = ["Itching", "Skin Rash"]
internal_symptoms = ["itching", "skin_rash"]  # via get_symptoms()
binary_vector = [1,1,0,0,...]                # via encode_symptoms()
prediction = model.predict([binary_vector])   # ML prediction
disease = "Fungal infection"                  # via inverse_encode_symptoms()

# Backend responds
{"disease": "Fungal infection"}
```

## 🔌 Adding New Features

### Adding New Symptoms

1. **Update ML Data**: Add symptom column to `MultiDiseaseDataset.csv`
1. **Retrain Model**: Run `fithub.ipynb` to retrain
1. **Update Backend Data**: Add to `symptoms` dict in `data.py`
1. **Update Frontend Data**: Add to `symptoms` list in `data.py`
1. **Update Mappings**: Add display name mapping
1. **Test**: Verify end-to-end functionality

### Adding New Diseases

1. **Update Training Data**: Add disease cases to dataset
1. **Retrain Model**: Update model with new disease classes
1. **Update Backend**: Ensure disease list includes new diseases
1. **Test Predictions**: Verify new diseases can be predicted
1. **Update Documentation**: Add to disease list documentation

### Adding API Endpoints

**Example**: Add symptoms list endpoint

```python
@app.route('/symptoms', methods=['GET'])
def get_symptoms_list():
    """Return list of all available symptoms"""
    try:
        return jsonify(symptoms=list(symptoms.keys()))
    except Exception as e:
        logger.error(f"Error getting symptoms: {e}")
        return jsonify(error='Failed to get symptoms'), 500
```

### Frontend Component Development

**Component Structure**:

```python
# components/new_component.py
import streamlit as st

def new_component(param1, param2):
    """
    Description of the component

    Args:
        param1: Description
        param2: Description

    Returns:
        result: Description
    """
    # Component implementation
    pass
```

## 🐛 Debugging and Troubleshooting

### Common Development Issues

**1. Model Loading Error**:

```python
# Check if model file exists
import os
model_path = 'src/model/model.joblib'
print(f"Model exists: {os.path.exists(model_path)}")

# Check file permissions
import stat
st = os.stat(model_path)
print(f"Permissions: {stat.filemode(st.st_mode)}")
```

**2. Import Errors**:

```bash
# Check Python path
python -c "import sys; print('\n'.join(sys.path))"

# Check installed packages
uv pip list
```

**3. API Connection Issues**:

```python
# Test backend connectivity
import requests
try:
    response = requests.get('http://localhost:5000/health', timeout=5)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
```

### Debugging Tools

**Backend Debugging**:

```python
# Add debug logging
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Use pdb for debugging
import pdb; pdb.set_trace()
```

**Frontend Debugging**:

```python
# Streamlit debugging
st.write("Debug info:", variable_to_debug)
st.json(data_to_inspect)

# Session state inspection
st.write("Session state:", st.session_state)
```

## 📝 Contributing Guidelines

### Git Workflow

1. **Create Feature Branch**:

```bash
git checkout -b feature/new-feature-name
```

2. **Make Changes**: Implement your feature

1. **Test Changes**: Run tests and manual verification

1. **Commit Changes**:

```bash
git add .
git commit -m "feat: add new feature description"
```

5. **Push and Create PR**:

```bash
git push origin feature/new-feature-name
```

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:

- `feat(api): add new symptom endpoint`
- `fix(frontend): resolve button alignment issue`
- `docs(readme): update installation instructions`

### Code Review Checklist

**Before Submitting**:

- [ ] Code follows style guidelines
- [ ] Tests are added/updated
- [ ] Documentation is updated
- [ ] No debug code or console.log statements
- [ ] Error handling is implemented
- [ ] Performance impact considered

## 🚀 Deployment from Development

### Development to Staging

```bash
# Build and test
docker-compose -f docker-compose.staging.yml up --build

# Run integration tests
pytest tests/integration/

# Deploy to staging server
git push staging main
```

### Environment Promotion

**Environment Variables**:

```bash
# Development
FLASK_ENV=development
LOG_LEVEL=DEBUG

# Staging
FLASK_ENV=staging
LOG_LEVEL=INFO

# Production
FLASK_ENV=production
LOG_LEVEL=WARNING
```

## 📚 Learning Resources

### Understanding the Codebase

1. **Start with**: `ml/fithub.ipynb` to understand the ML model
1. **Then**: `backend/src/app.py` for API structure
1. **Finally**: `frontend/src/app.py` for UI flow

### External Documentation

- **Flask**: https://flask.palletsprojects.com/
- **Streamlit**: https://docs.streamlit.io/
- **scikit-learn**: https://scikit-learn.org/stable/
- **Google Gemini**: https://ai.google.dev/docs

### Best Practices

- **Python**: PEP 8 style guide
- **Flask**: Follow Flask patterns and conventions
- **Streamlit**: Component-based architecture
- **ML**: Model versioning and reproducibility

This development guide provides everything needed to start contributing to the AI Disease Prediction System effectively.
