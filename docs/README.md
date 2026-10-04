# AI Disease Prediction System - Documentation

Welcome to the comprehensive documentation for the AI Disease Prediction System. This project uses machine learning to predict diseases based on user-selected symptoms.

## 📁 Project Overview

The AI Disease Prediction System is a full-stack application that consists of:

- **Machine Learning Model**: Random Forest Classifier trained on medical symptom data
- **Backend API**: Flask-based REST API for predictions and disease descriptions
- **Frontend Interface**: Streamlit web application for user interaction
- **AI Integration**: Google Gemini AI for disease descriptions

## 🏗️ Architecture

```
disease-detector/
├── ml/                    # Machine Learning components
├── backend/               # Flask API server
├── frontend/              # Streamlit web interface
└── docs/                  # Documentation (this folder)
```

## 🚀 Quick Start

1. **Set up the ML Model**: Train and save the model using the Jupyter notebook in `ml/`
1. **Configure Backend**: Set up Flask API with required dependencies
1. **Launch Frontend**: Start the Streamlit interface
1. **Access Application**: Navigate to the web interface and start predicting diseases

## 📚 Documentation Structure

- **[Machine Learning Documentation](./ml-documentation.md)** - Detailed explanation of the ML model, training process, and data
- **[Backend Documentation](./backend-documentation.md)** - Flask API endpoints, configuration, and deployment
- **[Frontend Documentation](./frontend-documentation.md)** - Streamlit interface, components, and user flow
- **[API Documentation](./api-documentation.md)** - Complete API reference with examples
- **[Deployment Guide](./deployment-guide.md)** - Step-by-step deployment instructions
- **[Development Guide](./development-guide.md)** - Setup and development workflow

## 🔧 Features

### Core Features

- **Symptom-based Disease Prediction**: Select from 130+ symptoms
- **AI-powered Disease Descriptions**: Detailed information about predicted diseases
- **Modern Web Interface**: Responsive and user-friendly design
- **REST API**: Programmatic access to predictions
- **Production Ready**: Docker support and production configurations

### Technical Features

- **Random Forest Classification**: High-accuracy ML model
- **Cross-platform Compatibility**: Works on Linux, macOS, and Windows
- **Async Processing**: Non-blocking disease description fetching
- **Error Handling**: Comprehensive error management and user feedback
- **Logging**: Detailed logging for debugging and monitoring

## 🎯 Use Cases

1. **Personal Health Assessment**: Users can check potential diseases based on symptoms
1. **Educational Tool**: Learn about disease symptoms and relationships
1. **Healthcare Support**: Assist healthcare professionals with preliminary assessments
1. **Research**: Analyze symptom-disease correlations

## 🔒 Disclaimer

This system is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.

## 📊 Model Performance

- **Accuracy**: ~95% on test dataset
- **Model Type**: Random Forest Classifier
- **Features**: 132 binary symptom indicators
- **Diseases**: 41 different medical conditions
- **Training Data**: Multi-disease dataset with symptom patterns

## 🛠️ Technology Stack

- **Machine Learning**: scikit-learn, pandas, numpy
- **Backend**: Flask, Flask-CORS, Gunicorn
- **Frontend**: Streamlit, aiohttp for async requests
- **AI Integration**: Google Gemini API
- **Data**: JSON-based symptom and disease mappings
- **Deployment**: Docker, production WSGI server

## 📈 Getting Started

Choose your path based on your role:

- **End Users**: See [User Guide](./user-guide.md)
- **Developers**: See [Development Guide](./development-guide.md)
- **DevOps**: See [Deployment Guide](./deployment-guide.md)
- **Data Scientists**: See [ML Documentation](./ml-documentation.md)

## 🤝 Contributing

1. Fork the repository
1. Create a feature branch
1. Make your changes
1. Add tests if applicable
1. Submit a pull request

## 📞 Support

For issues, questions, or contributions, please refer to the specific documentation sections or create an issue in the project repository.
