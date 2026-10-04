# API Documentation

## 📡 Overview

The AI Disease Prediction System exposes a RESTful API that enables programmatic access to disease prediction and description services. The API is built with Flask and follows REST conventions with JSON request/response formats.

## 🔗 Base URL

- **Development**: `http://127.0.0.1:5000`
- **Production**: `http://127.0.0.1:8000`

## 🛡️ Authentication

Currently, the API does not require authentication. For production deployments, consider implementing:

- API key authentication
- Rate limiting
- CORS restrictions

## 📋 API Endpoints

### 1. Health Check

**Endpoint**: `GET /`

**Description**: Basic server health check

**Response**:

```json
{
  "message": "Welcome to the Flask API!"
}
```

**Example**:

```bash
curl -X GET http://localhost:8000/
```

______________________________________________________________________

### 2. Advanced Health Check

**Endpoint**: `GET /health`

**Description**: Detailed health status including model availability

**Response**:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "1704067200"
}
```

**Response Fields**:

- `status`: Overall system status
- `model_loaded`: Whether ML model is loaded
- `timestamp`: Unix timestamp of response

**Example**:

```bash
curl -X GET http://localhost:8000/health
```

______________________________________________________________________

### 3. Disease Prediction

**Endpoint**: `POST /predict`

**Description**: Predicts disease based on selected symptoms

**Request Headers**:

```
Content-Type: application/json
```

**Request Body**:

```json
{
  "symptoms": ["Itching", "Skin Rash", "High Fever", "Headache"]
}
```

**Request Schema**:

- `symptoms` (array, required): List of symptom names

**Success Response** (200):

```json
{
  "disease": "Fungal infection"
}
```

**Error Responses**:

**400 - Bad Request**:

```json
{
  "error": "No data provided"
}
```

**500 - Internal Server Error**:

```json
{
  "error": "Prediction failed"
}
```

**503 - Service Unavailable**:

```json
{
  "error": "Model not available"
}
```

**Example**:

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": ["Itching", "Skin Rash", "High Fever"]
  }'
```

**Valid Symptoms**: See [Symptom Reference](#symptom-reference)

______________________________________________________________________

### 4. Disease Description

**Endpoint**: `POST /disease_description`

**Description**: Fetches detailed description using Google Gemini AI

**Request Headers**:

```
Content-Type: application/json
```

**Request Body**:

```json
{
  "disease_name": "Common Cold"
}
```

**Request Schema**:

- `disease_name` (string, required): Name of the disease

**Success Response** (200):

```json
{
  "description": "**Description** – A viral infection affecting the upper respiratory tract that commonly causes symptoms like runny nose, sneezing, and cough.\n\n**Symptoms** – Runny or stuffy nose, sneezing, cough, sore throat, mild headache, low-grade fever, body aches, fatigue.\n\n**Causes** – Viral infection, most commonly caused by rhinoviruses, but can also be caused by coronaviruses, adenoviruses, and other respiratory viruses. Spread through respiratory droplets.\n\n**Precautions** – Wash hands frequently with soap and water, avoid close contact with infected individuals, avoid touching face with unwashed hands, maintain good hygiene, get adequate rest, stay hydrated.\n\n**Medication** – Rest and fluids are primary treatment. Over-the-counter pain relievers (acetaminophen, ibuprofen) for aches and fever. Decongestants for nasal congestion. Throat lozenges for sore throat. Antibiotics are not effective as it's viral."
}
```

**Error Responses**:

**400 - Bad Request**:

```json
{
  "error": "No disease name provided"
}
```

**404 - Not Found**:

```json
{
  "error": "Description not found for the given disease"
}
```

**500 - Internal Server Error**:

```json
{
  "error": "Description lookup failed"
}
```

**Example**:

```bash
curl -X POST http://localhost:8000/disease_description \
  -H "Content-Type: application/json" \
  -d '{
    "disease_name": "Diabetes"
  }'
```

## 🏥 Symptom Reference

The API accepts 132 different symptoms. Here's the complete list:

### General Symptoms

- Fatigue
- Weight Gain
- Weight Loss
- Anxiety
- Mood Swings
- Restlessness
- Lethargy
- High Fever
- Mild Fever
- Sweating
- Dehydration
- Malaise
- Depression
- Irritability

### Respiratory Symptoms

- Continuous Sneezing
- Cough
- Breathlessness
- Phlegm
- Throat Irritation
- Patches In Throat
- Runny Nose
- Congestion
- Sinus Pressure
- Mucoid Sputum
- Rusty Sputum
- Blood In Sputum

### Gastrointestinal Symptoms

- Stomach Pain
- Acidity
- Vomiting
- Indigestion
- Nausea
- Loss Of Appetite
- Abdominal Pain
- Diarrhoea
- Constipation
- Belly Pain
- Passage Of Gases
- Internal Itching
- Stomach Bleeding
- Distention Of Abdomen

### Skin & Dermatological

- Itching
- Skin Rash
- Nodal Skin Eruptions
- Yellowish Skin
- Skin Peeling
- Silver Like Dusting
- Pus Filled Pimples
- Blackheads
- Scurring
- Blister
- Red Sore Around Nose
- Yellow Crust Ooze
- Dischromic Patches
- Red Spots Over Body

### Neurological

- Headache
- Dizziness
- Loss Of Balance
- Unsteadiness
- Weakness Of One Body Side
- Loss Of Smell
- Spinning Movements
- Lack Of Concentration
- Visual Disturbances
- Blurred And Distorted Vision
- Altered Sensorium
- Coma
- Slurred Speech

### Musculoskeletal

- Joint Pain
- Back Pain
- Neck Pain
- Knee Pain
- Hip Joint Pain
- Muscle Weakness
- Muscle Wasting
- Muscle Pain
- Stiff Neck
- Swelling Joints
- Movement Stiffness
- Cramps

### Cardiovascular

- Chest Pain
- Fast Heart Rate
- Palpitations
- Weakness In Limbs

### Urological

- Burning Micturition
- Spotting Urination
- Dark Urine
- Yellow Urine
- Foul Smell Of Urine
- Continuous Feel Of Urine
- Bladder Discomfort
- Polyuria

### Other Symptoms

- Chills
- Shivering
- Cold Hands And Feets
- Sunken Eyes
- Pain Behind The Eyes
- Ulcers On Tongue
- Irregular Sugar Level
- Pain During Bowel Movements
- Pain In Anal Region
- Bloody Stool
- Irritation In Anus
- Bruising
- Obesity
- Swollen Legs
- Swollen Blood Vessels
- Puffy Face And Eyes
- Enlarged Thyroid
- Brittle Nails
- Swollen Extremeties
- Excessive Hunger
- Extra Marital Contacts
- Drying And Tingling Lips
- Redness Of Eyes
- Watering From Eyes
- Increased Appetite
- Family History
- Receiving Blood Transfusion
- Receiving Unsterile Injections
- History Of Alcohol Consumption
- Acute Liver Failure
- Fluid Overload
- Swelling Of Stomach
- Swelled Lymph Nodes
- Yellowing Of Eyes
- Toxic Look (Typhos)
- Abnormal Menstruation
- Prominent Veins On Calf
- Painful Walking
- Small Dents In Nails
- Inflammatory Nails

## 🎯 Disease Categories

The API can predict 41 different diseases across these categories:

### Infectious Diseases

- Common Cold
- Pneumonia
- Tuberculosis
- Hepatitis A, B, C, D, E
- Malaria
- Dengue
- Typhoid
- Fungal infection
- (and others)

### Chronic Conditions

- Diabetes
- Hypertension
- Heart attack
- Chronic cholestasis
- Alcoholic hepatitis
- Gastroenteritis
- (and others)

### Gastrointestinal

- GERD
- Peptic ulcer disease
- Gastroenteritis
- (and others)

### Other Conditions

- Migraine
- Cervical spondylosis
- Paralysis (brain hemorrhage)
- Jaundice
- Arthritis
- (and others)

## 📊 Response Formats

### Success Responses

All successful responses return HTTP 200 with JSON data:

```json
{
  "field_name": "value"
}
```

### Error Responses

Error responses include appropriate HTTP status codes:

```json
{
  "error": "Descriptive error message"
}
```

**Common HTTP Status Codes**:

- `200`: Success
- `400`: Bad Request (invalid input)
- `404`: Not Found (resource not found)
- `500`: Internal Server Error
- `503`: Service Unavailable (model not loaded)

## 🔍 Request Examples

### Python Requests

```python
import requests

# Health check
response = requests.get('http://localhost:8000/health')
print(response.json())

# Disease prediction
payload = {
    "symptoms": ["Itching", "Skin Rash", "High Fever"]
}
response = requests.post(
    'http://localhost:8000/predict',
    json=payload
)
print(response.json())

# Disease description
payload = {
    "disease_name": "Diabetes"
}
response = requests.post(
    'http://localhost:8000/disease_description',
    json=payload
)
print(response.json())
```

### JavaScript Fetch

```javascript
// Disease prediction
const predictDisease = async (symptoms) => {
  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Usage
predictDisease(["Itching", "Skin Rash"]).then((result) => console.log(result));
```

### cURL Examples

```bash
# Health check
curl -X GET http://localhost:8000/health

# Prediction with multiple symptoms
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": [
      "Itching",
      "Skin Rash",
      "High Fever",
      "Headache"
    ]
  }'

# Disease description
curl -X POST http://localhost:8000/disease_description \
  -H "Content-Type: application/json" \
  -d '{
    "disease_name": "Common Cold"
  }'
```

## ⚡ Performance Considerations

### Response Times

**Typical Response Times**:

- Health check: \<100ms
- Disease prediction: 200-500ms
- Disease description: 2-10 seconds (depends on Gemini AI)

### Rate Limiting

**Recommendations for Production**:

- Implement rate limiting (e.g., 100 requests/minute per IP)
- Add request logging and monitoring
- Consider caching disease descriptions

### Timeout Handling

**Client-side Timeouts**:

- Health check: 5 seconds
- Prediction: 10 seconds
- Description: 20 seconds (AI processing time)

## 🚨 Error Handling

### Client-Side Error Handling

```python
import requests
from requests.exceptions import Timeout, ConnectionError

def predict_disease(symptoms):
    try:
        response = requests.post(
            'http://localhost:8000/predict',
            json={"symptoms": symptoms},
            timeout=10
        )
        response.raise_for_status()
        return response.json()

    except Timeout:
        return {"error": "Request timed out"}
    except ConnectionError:
        return {"error": "Could not connect to server"}
    except requests.exceptions.HTTPError as e:
        if response.status_code == 400:
            return {"error": "Invalid request"}
        elif response.status_code == 503:
            return {"error": "Service temporarily unavailable"}
        else:
            return {"error": f"HTTP error: {e}"}
```

## 🔒 Security Considerations

### Production Security

**Recommendations**:

1. **HTTPS**: Use TLS/SSL encryption
1. **CORS**: Restrict origins to your frontend domains
1. **Rate Limiting**: Prevent abuse
1. **Input Validation**: Validate all inputs
1. **API Keys**: Add authentication for production
1. **Logging**: Monitor and log requests

### Input Validation

The API validates:

- JSON format of requests
- Required fields presence
- Symptom names against known list
- Disease names for descriptions

## 📝 Integration Notes

### Frontend Integration

When integrating with a frontend:

1. Use proper error handling for network issues
1. Implement loading states for user feedback
1. Handle timeout scenarios gracefully
1. Cache disease descriptions when possible

### Backend Integration

For server-to-server communication:

1. Implement retry logic with exponential backoff
1. Use connection pooling for better performance
1. Monitor response times and error rates
1. Consider using a reverse proxy for load balancing

## 📈 Monitoring and Analytics

### Recommended Metrics

**Performance Metrics**:

- Request response times
- Error rates by endpoint
- Model prediction accuracy
- Gemini AI response times

**Usage Metrics**:

- Most predicted diseases
- Most selected symptoms
- Peak usage times
- Geographic distribution

### Health Monitoring

Use the `/health` endpoint for:

- Load balancer health checks
- Monitoring system integration
- Automated alerting
- Service discovery
