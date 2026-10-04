# AI Disease Prediction System

**Advanced AI-powered disease prediction based on symptoms**

An intelligent medical assistance system that uses machine learning to predict diseases based on user-selected symptoms, powered by Random Forest classification and Google Gemini AI for detailed disease descriptions.

## Quick Start

### For Users

Visit the web application and start predicting diseases based on your symptoms:

- Pick your symptoms from 130+ options in a chat-style assistant
- Get an AI-powered disease prediction
- Read a structured overview: description, symptoms, causes, precautions and medication

### For Developers

**Prerequisites:** Python 3 with [uv](https://docs.astral.sh/uv/), Node.js 20+ and [pnpm](https://pnpm.io/)

```bash
# Clone repository
git clone <repository-url>
cd dev-challenge-1

# Start backend (Terminal 1) - runs on http://127.0.0.1:5000
cd backend && ./run.sh dev

# Start frontend (Terminal 2) - runs on http://localhost:5173
cd client
pnpm install
pnpm dev
```

The client reads the API URL from `client/.env`:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## System Overview

- **ML Model**: Random Forest Classifier with ~95% accuracy
- **Symptoms**: 132 different medical symptoms
- **Diseases**: 41 different medical conditions
- **AI Integration**: Google Gemini for disease descriptions
- **Interface**: React + Vite chat-style web app
- **API**: Flask-based REST API

## Project Structure

```
dev-challenge-1/
├── docs/                    # Comprehensive documentation
├── ml/                      # Machine learning components
├── backend/                 # Flask API server
├── client/                  # React + Vite web app
│   └── src/
│       ├── api/             # Axios client for the Flask API
│       ├── components/      # Chat UI, layout and shared components
│       ├── data/            # Symptom list and categories
│       ├── lib/             # Helpers, incl. the disease description parser
│       ├── pages/           # Home (assistant) and Sources pages
│       └── store/           # Zustand state (chat messages, selection)
└── README.md                # This file
```

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

| Document | Description |
| ----------------------------------------------------------------- | ------------------------------- |
| **[Documentation Index](./docs/README.md)** | Complete documentation overview |
| **[ML Documentation](./docs/ml-documentation.md)** | Machine learning model details |
| **[Backend Documentation](./docs/backend-documentation.md)** | Flask API reference |
| **[Frontend Documentation](./docs/frontend-documentation.md)** | Web interface guide |
| **[API Documentation](./docs/api-documentation.md)** | Complete API reference |
| **[Deployment Guide](./docs/deployment-guide.md)** | Production deployment |
| **[Development Guide](./docs/development-guide.md)** | Developer setup and workflow |
| **[User Guide](./docs/user-guide.md)** | End-user instructions |

## Features

### Core Features

- **Symptom-based Prediction**: Select from 130+ medical symptoms
- **AI Disease Descriptions**: Detailed information powered by Google Gemini
- **Chat-style Assistant**: Your symptoms appear on the right and the assessment on the left, like a chatbot
- **Symptom Picker**: Search, filter by body-system category, or one-click common symptoms
- **Structured Report**: Each result is split into Overview, Symptoms, Causes, Precautions and Medication
- **REST API**: Programmatic access to predictions
- **Production Ready**: Docker support and production configurations

### Technical Features

- **High Accuracy**: ~95% prediction accuracy on test data
- **Real-time Processing**: Fast symptom analysis and prediction
- **Async Operations**: Prediction is shown first; the description loads afterwards
- **Error Handling**: Comprehensive error management
- **Cross-platform**: Works on Linux, macOS, and Windows

## Technology Stack

- **Machine Learning**: scikit-learn, pandas, numpy
- **Backend**: Flask, Gunicorn, Flask-CORS
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, Axios, react-markdown, lucide-react
- **AI Integration**: Google Gemini API
- **Data Processing**: joblib, JSON-based mappings
- **Deployment**: Docker, production WSGI server

## Quick Examples

### API Usage

All endpoints are served under `/api`. In dev mode the server runs on port `5000`
(`./run.sh prod` uses port `8000`). `/predict` takes a plain JSON array of symptom names.

```bash
# Get disease prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '["Itching", "Skin Rash", "High Fever"]'

# Get disease description
curl -X POST http://localhost:5000/api/disease_description \
  -H "Content-Type: application/json" \
  -d '{"disease_name": "Common Cold"}'

# Health check
curl http://localhost:5000/api/health
```

### Python Integration

```python
import requests

# Predict disease
response = requests.post('http://localhost:5000/api/predict',
    json=["Headache", "High Fever", "Nausea"])
disease = response.json()['disease']
print(f"Predicted disease: {disease}")
```

## Supported Conditions

The system can predict 41 different medical conditions including:

**Common Conditions**: Cold, Flu, Pneumonia, Diabetes, Hypertension\
**Infectious Diseases**: Malaria, Dengue, Typhoid, Hepatitis variants\
**Chronic Conditions**: Arthritis, GERD, Peptic Ulcer Disease\
**Other Conditions**: Migraine, Jaundice, Heart Attack, and more

## Medical Disclaimer

**Important**: This system is for **educational and informational purposes only**. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

## Contributing

We welcome contributions! Please see our [Development Guide](./docs/development-guide.md) for:

- Setting up the development environment
- Understanding the codebase
- Contribution guidelines
- Testing procedures

## Support

- **Documentation**: Check the [docs/](./docs/) directory
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Questions**: Refer to the [User Guide](./docs/user-guide.md)

## Performance

- **Model Accuracy**: ~95% on test dataset
- **API Response Time**: \<500ms for predictions
- **Symptoms Supported**: 132 different symptoms
- **Disease Categories**: 41 medical conditions
- **Concurrent Users**: Supports multiple simultaneous users

## Privacy

- No personal data collection
- Temporary session-based processing
- No medical record storage
- Anonymous usage tracking

______________________________________________________________________

**Built for better healthcare accessibility through AI**
