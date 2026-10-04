# Frontend Documentation

## 🎨 Overview

The frontend is a modern, responsive web application built with **Streamlit** that provides an intuitive interface for users to interact with the AI Disease Prediction System. It features a dark theme design, multi-symptom selection, and real-time disease predictions.

## 🏗️ Architecture

### Technology Stack

- **Framework**: Streamlit 1.46.1
- **HTTP Client**: aiohttp (for async requests)
- **Environment**: python-dotenv
- **Styling**: Custom CSS with modern dark theme
- **State Management**: Streamlit session state

### Project Structure

```
frontend/
├── src/
│   ├── app.py              # Main Streamlit application
│   ├── styles.css          # Custom CSS styling
│   ├── components/         # UI components
│   │   ├── __init__.py
│   │   ├── header.py       # App header component
│   │   ├── info.py         # Information section
│   │   ├── selection.py    # Symptom selection component
│   │   ├── result.py       # Results and prediction component
│   │   ├── displayResult.py # Result display formatting
│   │   └── footer.py       # App footer
│   └── utils/
│       ├── constants.py    # Application constants
│       ├── data.py         # Symptom data
│       └── utils.py        # Utility functions
├── main.py                 # Application entry point
├── pyproject.toml          # Dependencies
├── requirements.txt        # Pip requirements
└── uv.lock                # UV lock file
```

## 🚀 Quick Start

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies with uv
uv sync

# Or with pip
pip install -r requirements.txt
```

### Running the Application

```bash
# Using main.py
uv run python main.py

# Or directly with Streamlit
uv run streamlit run src/app.py

# With specific port
uv run streamlit run src/app.py --server.port 8501
```

**Application URL**: `http://localhost:8501`

## 🧩 Component Architecture

### 1. Main Application (`app.py`)

The main application orchestrates all components and manages the overall layout:

```python
def main():
    # App header
    header()

    col1, col2, col3 = st.columns([1, 3, 1])

    with col2:
        # Information section
        info()

        # Symptom selection
        selected_symptoms = selection()

        # Results and prediction
        result(selected_symptoms)

    # Footer
    footer()
```

**Key Features**:

- Responsive 3-column layout
- Component-based architecture
- Custom CSS loading
- Page configuration

### 2. Header Component (`header.py`)

Displays the application title and description.

```python
def header():
    st.markdown("""
    <div class="main-header">
        <h1>🏥 AI Disease Prediction System</h1>
        <p>Advanced AI-powered disease prediction based on symptoms</p>
    </div>
    """, unsafe_allow_html=True)
```

### 3. Info Component (`info.py`)

Provides user guidance and instructions.

**Features**:

- Explains how the AI system works
- Provides usage tips
- Modern card-style design

### 4. Selection Component (`selection.py`)

Handles symptom selection with real-time feedback.

```python
def selection():
    selected_symptoms = st.multiselect(
        "Choose all symptoms that apply to you:",
        symptoms,
        default=None,
        help="💡 Select multiple symptoms for more accurate predictions."
    )

    # Display selection feedback
    if selected_symptoms:
        # Success feedback
    else:
        # Warning feedback

    return selected_symptoms
```

**Features**:

- Multi-select dropdown with 130+ symptoms
- Real-time selection count
- Visual feedback (success/warning states)
- Helpful tooltips and guidance

### 5. Result Component (`result.py`)

Manages prediction requests and displays results.

**Key Functions**:

#### Async Disease Description Fetching

```python
async def fetch_disease_description(disease_name):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{BACKEND_URL}/disease_description",
                json={"disease_name": disease_name},
                timeout=aiohttp.ClientTimeout(total=20)
            ) as response:
                if response.status == 200:
                    return await response.json()
    except Exception as e:
        st.error(f"Error: {str(e)}")
        return None
```

#### Prediction Flow

```python
def result(selected_symptoms):
    predict_button = st.button(
        "🔮 Analyze Symptoms",
        disabled=len(selected_symptoms) == 0
    )

    if predict_button and selected_symptoms:
        with st.spinner("🤖 Analyzing your symptoms..."):
            # Make prediction request
            # Display results
            # Fetch disease description
            # Show disclaimer
```

### 6. Display Result Component (`displayResult.py`)

Formats and displays prediction results.

**Functions**:

- `display_result()`: Shows predicted disease with styling
- `display_disease_disc()`: Formats AI-generated disease description
- `disclaimer()`: Shows medical disclaimer

## 🎨 Styling and Design

### Custom CSS (`styles.css`)

The application uses a comprehensive custom CSS system:

**Key Design Elements**:

- **Dark Theme**: Modern dark color scheme
- **Gradient Backgrounds**: Smooth color transitions
- **Responsive Design**: Works on all screen sizes
- **Modern Cards**: Clean, shadowed containers
- **Smooth Animations**: Hover effects and transitions

### Color Scheme (`constants.py`)

```python
COLORS = {
    'primary': '#3b82f6',      # Blue
    'success': '#10b981',      # Green
    'warning': '#f59e0b',      # Orange
    'danger': '#ef4444',       # Red
    'background': '#0f172a',   # Dark blue
    'surface': '#1e293b'       # Lighter dark
}
```

### CSS Classes

**Main Components**:

- `.main-header`: Application header styling
- `.info-box`: Information card styling
- `.symptom-section`: Symptom selection area
- `.prediction-button-container`: Button styling
- `.result-card`: Results display container

## 📊 Data Management

### Symptom Data (`data.py`)

Contains 130+ symptoms organized for user selection:

```python
symptoms = [
    "Itching",
    "Skin Rash",
    "Nodal Skin Eruptions",
    "Continuous Sneezing",
    # ... 126 more symptoms
]
```

**Symptom Categories**:

- General symptoms (fever, fatigue)
- Respiratory (cough, breathlessness)
- Gastrointestinal (stomach pain, nausea)
- Neurological (headache, dizziness)
- Dermatological (skin rash, itching)
- And more...

### Constants (`constants.py`)

**Configuration Variables**:

- `BACKEND_URL`: API endpoint configuration
- `COLORS`: Application color scheme
- `TIMEOUTS`: Request timeout settings

## 🔄 User Flow

### 1. Landing Page

- User sees welcome header
- Reads instructions and tips
- Views symptom selection interface

### 2. Symptom Selection

- User selects symptoms from dropdown
- Real-time feedback shows selection count
- Button enables when symptoms are selected

### 3. Prediction Process

- User clicks "Analyze Symptoms" button
- Loading spinner appears
- Synchronous prediction request to backend
- Asynchronous disease description fetch

### 4. Results Display

- Predicted disease shown with styling
- Detailed description with sections:
  - Description
  - Symptoms
  - Causes
  - Precautions
  - Medication
- Medical disclaimer displayed

## 🌐 API Integration

### Backend Communication

**Prediction Request**:

```python
response = requests.post(
    f"{BACKEND_URL}/predict",
    json=selected_symptoms,
    timeout=10
)
```

**Description Request** (Async):

```python
async with session.post(
    f"{BACKEND_URL}/disease_description",
    json={"disease_name": disease_name},
    timeout=aiohttp.ClientTimeout(total=20)
) as response:
    return await response.json()
```

### Error Handling

**Connection Errors**:

- Backend server unavailable
- Network connectivity issues
- Timeout handling

**User-Friendly Messages**:

- "🔌 Could not connect to the prediction service"
- "⏱️ Request timed out. Please check your connection"
- "❌ An unexpected error occurred"

## 📱 Responsive Design

### Layout Strategy

**Desktop** (>768px):

- 3-column layout with centered content
- Full-width symptom selection
- Large prediction button

**Tablet** (768px - 1024px):

- Responsive column sizing
- Maintained spacing and proportions

**Mobile** (\<768px):

- Single column layout
- Touch-friendly button sizes
- Optimized text sizing

### Streamlit Configuration

```python
st.set_page_config(
    page_title="AI Disease Predictor",
    page_icon="🏥",
    layout="wide"
)
```

## 🎯 User Experience Features

### Loading States

- Spinner during prediction: "🤖 Analyzing your symptoms..."
- Progress indication for long operations
- Smooth transitions between states

### Feedback Systems

- ✅ Success: When symptoms are selected
- ⚠️ Warning: When no symptoms selected
- ❌ Error: When operations fail
- 💡 Tips: Helpful guidance throughout

### Accessibility

- Semantic HTML structure
- Clear contrast ratios
- Descriptive button text
- Helpful tooltips and hints

## 🔧 Configuration

### Environment Variables

```env
BACKEND_URL=http://localhost:8000  # Backend API URL
STREAMLIT_SERVER_PORT=8501         # Frontend port
```

### Streamlit Configuration

Create `.streamlit/config.toml`:

```toml
[server]
port = 8501
enableCORS = false
enableXsrfProtection = false

[theme]
base = "dark"
primaryColor = "#3b82f6"
backgroundColor = "#0f172a"
secondaryBackgroundColor = "#1e293b"
```

## 🧪 Testing

### Manual Testing Checklist

**UI Components**:

- [ ] Header displays correctly
- [ ] Info section shows guidance
- [ ] Symptom selection works
- [ ] Button enables/disables properly
- [ ] Results display correctly
- [ ] Footer appears

**Functionality**:

- [ ] Symptom selection updates count
- [ ] Prediction button triggers request
- [ ] Loading states appear
- [ ] Error handling works
- [ ] Results format correctly

**Responsiveness**:

- [ ] Desktop layout (1920px)
- [ ] Tablet layout (768px)
- [ ] Mobile layout (375px)

### Performance Testing

**Load Times**:

- Initial page load: \<2 seconds
- Prediction response: \<5 seconds
- Description fetch: \<10 seconds

## 🚀 Deployment

### Streamlit Cloud

1. **Connect Repository**: Link GitHub repository
1. **Configure Settings**: Set Python version and requirements
1. **Environment Variables**: Add backend URL
1. **Deploy**: Automatic deployment on push

### Docker Deployment

```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

EXPOSE 8501

CMD ["streamlit", "run", "src/app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

### Self-Hosted

```bash
# Install dependencies
pip install -r requirements.txt

# Run with custom settings
streamlit run src/app.py --server.port 8501 --server.address 0.0.0.0
```

## 📈 Performance Optimization

### Streamlit Optimizations

1. **Caching**: Use `@st.cache_data` for data loading
1. **Session State**: Minimize state changes
1. **Component Reuse**: Avoid unnecessary re-renders

### Network Optimizations

1. **Async Requests**: Non-blocking disease descriptions
1. **Timeout Management**: Appropriate timeout values
1. **Error Recovery**: Graceful fallbacks

## 🔒 Security Considerations

### Input Validation

- Symptom selection from predefined list
- No user text input to prevent injection

### API Security

- Backend URL configuration
- No sensitive data in frontend
- HTTPS in production

## 📝 Best Practices

1. **Component Separation**: Keep components focused and reusable
1. **Error Handling**: Provide clear, actionable error messages
1. **User Feedback**: Show loading states and progress
1. **Responsive Design**: Test on multiple screen sizes
1. **Performance**: Minimize unnecessary API calls
1. **Accessibility**: Use semantic HTML and clear contrast
1. **Documentation**: Keep component documentation updated
