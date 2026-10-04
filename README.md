# AI Disease Prediction System

🏥 **Advanced AI-powered disease prediction based on symptoms**

An intelligent medical assistance system that uses machine learning to predict diseases based on user-selected symptoms, powered by Random Forest classification and Google Gemini AI for detailed disease descriptions.

## 🚀 Quick Start

### For Users

Visit the web application and start predicting diseases based on your symptoms:

- Select symptoms from 130+ available options
- Get AI-powered disease predictions
- Receive detailed disease information

### For Developers

```bash
# Clone repository
git clone <repository-url>
cd disease-detector

# Start backend (Terminal 1)
cd backend && ./run.sh dev

# Start frontend (Terminal 2)
cd frontend && uv run python main.py
```

## 📊 System Overview

- **🧠 ML Model**: Random Forest Classifier with ~95% accuracy
- **🔬 Symptoms**: 132 different medical symptoms
- **🏥 Diseases**: 41 different medical conditions
- **🤖 AI Integration**: Google Gemini for disease descriptions
- **🌐 Interface**: Modern Streamlit web application
- **⚡ API**: Flask-based REST API

## 📁 Project Structure

```
disease-detector/
├── docs/                    # 📚 Comprehensive documentation
├── ml/                      # 🧠 Machine learning components
├── backend/                 # 🔧 Flask API server
├── frontend/                # 🎨 Streamlit web interface
└── README.md               # 📖 This file
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

| Document | Description |
| ----------------------------------------------------------------- | ------------------------------- |
| **[📋 Documentation Index](./docs/README.md)** | Complete documentation overview |
| **[🧠 ML Documentation](./docs/ml-documentation.md)** | Machine learning model details |
| **[🔧 Backend Documentation](./docs/backend-documentation.md)** | Flask API reference |
| **[🎨 Frontend Documentation](./docs/frontend-documentation.md)** | Streamlit interface guide |
| **[📡 API Documentation](./docs/api-documentation.md)** | Complete API reference |
| **[🚀 Deployment Guide](./docs/deployment-guide.md)** | Production deployment |
| **[🛠️ Development Guide](./docs/development-guide.md)** | Developer setup and workflow |
| **[👤 User Guide](./docs/user-guide.md)** | End-user instructions |

## 🎯 Features

### Core Features

- **Symptom-based Prediction**: Select from 130+ medical symptoms
- **AI Disease Descriptions**: Detailed information powered by Google Gemini
- **Modern UI**: Responsive, dark-themed web interface
- **REST API**: Programmatic access to predictions
- **Production Ready**: Docker support and production configurations

### Technical Features

- **High Accuracy**: ~95% prediction accuracy on test data
- **Real-time Processing**: Fast symptom analysis and prediction
- **Async Operations**: Non-blocking disease description fetching
- **Error Handling**: Comprehensive error management
- **Cross-platform**: Works on Linux, macOS, and Windows

## 🔧 Technology Stack

- **Machine Learning**: scikit-learn, pandas, numpy
- **Backend**: Flask, Gunicorn, Flask-CORS
- **Frontend**: Streamlit, aiohttp
- **AI Integration**: Google Gemini API
- **Data Processing**: joblib, JSON-based mappings
- **Deployment**: Docker, production WSGI server

## ⚡ Quick Examples

### API Usage

```bash
# Get disease prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["Itching", "Skin Rash", "High Fever"]}'

# Get disease description
curl -X POST http://localhost:8000/disease_description \
  -H "Content-Type: application/json" \
  -d '{"disease_name": "Common Cold"}'
```

### Python Integration

```python
import requests

# Predict disease
response = requests.post('http://localhost:8000/predict',
    json={"symptoms": ["Headache", "Fever", "Nausea"]})
disease = response.json()['disease']
print(f"Predicted disease: {disease}")
```

## 🏥 Supported Conditions

The system can predict 41 different medical conditions including:

**Common Conditions**: Cold, Flu, Pneumonia, Diabetes, Hypertension\
**Infectious Diseases**: Malaria, Dengue, Typhoid, Hepatitis variants\
**Chronic Conditions**: Arthritis, GERD, Peptic Ulcer Disease\
**Other Conditions**: Migraine, Jaundice, Heart Attack, and more

## 🛡️ Medical Disclaimer

⚠️ **Important**: This system is for **educational and informational purposes only**. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

## 🤝 Contributing

We welcome contributions! Please see our [Development Guide](./docs/development-guide.md) for:

- Setting up the development environment
- Understanding the codebase
- Contribution guidelines
- Testing procedures

## 📞 Support

- **Documentation**: Check the [docs/](./docs/) directory
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Questions**: Refer to the [User Guide](./docs/user-guide.md)

## 📈 Performance

- **Model Accuracy**: ~95% on test dataset
- **API Response Time**: \<500ms for predictions
- **Symptoms Supported**: 132 different symptoms
- **Disease Categories**: 41 medical conditions
- **Concurrent Users**: Supports multiple simultaneous users

## 🔐 Privacy

- No personal data collection
- Temporary session-based processing
- No medical record storage
- Anonymous usage tracking

______________________________________________________________________

**Built with ❤️ for better healthcare accessibility through AI**
