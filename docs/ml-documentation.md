# Machine Learning Documentation

## 📊 Overview

The AI Disease Prediction System uses a **Random Forest Classifier** to predict diseases based on symptom patterns. The model is trained on a comprehensive medical dataset containing symptom-disease relationships.

## 🎯 Model Architecture

### Algorithm: Random Forest Classifier

**Random Forest** is an ensemble learning method that combines multiple decision trees to make predictions. It's particularly well-suited for this medical prediction task because:

- **High Accuracy**: Achieves ~95% accuracy on the test dataset
- **Handles Categorical Features**: Works well with binary symptom indicators
- **Reduces Overfitting**: Ensemble approach provides better generalization
- **Feature Importance**: Can identify which symptoms are most predictive

### Model Configuration

```python
RandomForestClassifier(
    n_estimators=100,    # Number of trees in the forest
    max_depth=10,        # Maximum depth of trees
    random_state=100     # For reproducible results
)
```

## 📁 Dataset Description

### Source Data: `MultiDiseaseDataset.csv`

The dataset contains:

- **Rows**: Medical cases with symptom patterns
- **Columns**: 132 symptom features + 1 target (disease)
- **Format**: Binary indicators (0/1) for each symptom
- **Target**: Disease names (41 unique diseases)

### Data Structure

```
Features (132 symptoms):
- itching, skin_rash, nodal_skin_eruptions, continuous_sneezing
- shivering, chills, joint_pain, stomach_pain, acidity
- ... (and 123 more symptoms)

Target:
- prognosis (disease name)
```

## 🔧 Data Preprocessing

### 1. Feature Engineering

All symptoms are represented as binary features:

- **1**: Symptom is present
- **0**: Symptom is absent

### 2. Label Encoding

Disease names are encoded using `LabelEncoder`:

```python
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y_encoded = le.fit_transform(y)
```

### 3. Train-Test Split

```python
train_test_split(
    X, y_encoded,
    train_size=0.8,     # 80% training data
    random_state=100    # Reproducible split
)
```

## 🧠 Model Training Process

### Step-by-Step Training

1. **Data Loading**

   ```python
   df = pd.read_csv("MultiDiseaseDataset.csv")
   ```

1. **Feature-Target Separation**

   ```python
   X = df.drop("prognosis", axis=1)  # Features (symptoms)
   y = df["prognosis"]               # Target (diseases)
   ```

1. **Label Encoding**

   ```python
   le = LabelEncoder()
   y_encoded = le.fit_transform(y)
   ```

1. **Train-Test Split**

   ```python
   X_train, X_test, y_train, y_test = train_test_split(
       X, y_encoded, train_size=0.8, random_state=100
   )
   ```

1. **Model Training**

   ```python
   model = RandomForestClassifier(n_estimators=100, max_depth=10)
   model.fit(X_train, y_train)
   ```

1. **Model Evaluation**

   ```python
   y_pred = model.predict(X_test)
   accuracy = accuracy_score(y_test, y_pred)
   r2 = r2_score(y_test, y_pred)
   ```

## 📈 Model Performance

### Metrics Achieved

- **Accuracy Score**: ~95% (exact value from model evaluation)
- **R² Score**: High correlation between predicted and actual values
- **Features**: 132 input features (symptoms)
- **Classes**: 41 different diseases

### Performance Characteristics

**Strengths:**

- High accuracy on symptom-disease prediction
- Good generalization due to ensemble method
- Handles multi-class classification effectively
- Robust to noisy or missing symptom data

**Considerations:**

- Requires comprehensive symptom input for best results
- Performance depends on training data quality
- May not handle rare disease combinations well

## 💾 Model Persistence

### Saving the Model

```python
import joblib
joblib.dump(model, 'model.joblib')
```

The trained model is saved as `model.joblib` and used by the backend API for real-time predictions.

## 🔍 Feature Analysis

### Symptom Categories

The 132 symptoms are organized into categories:

1. **General Symptoms**: fever, fatigue, weakness, weight loss
1. **Respiratory**: cough, breathlessness, chest pain, throat irritation
1. **Gastrointestinal**: stomach pain, nausea, vomiting, diarrhea
1. **Neurological**: headache, dizziness, loss of balance
1. **Skin**: itching, rash, skin peeling, yellowish skin
1. **Musculoskeletal**: joint pain, muscle weakness, back pain
1. **Cardiovascular**: chest pain, palpitations, fast heart rate
1. **Urological**: burning micturition, blood in urine
1. **Psychological**: anxiety, depression, mood swings

### Disease Categories

The model predicts 41 different diseases across various medical domains:

- **Infectious Diseases**: Common Cold, Flu, Pneumonia
- **Chronic Conditions**: Diabetes, Hypertension, Arthritis
- **Gastrointestinal**: GERD, Peptic Ulcer, Hepatitis
- **Dermatological**: Psoriasis, Eczema, Acne
- **And many more...**

## 🛠️ Prediction Workflow

### Input Processing

1. **Symptom Selection**: User selects symptoms from frontend
1. **Encoding**: Symptoms converted to binary vector
1. **Prediction**: Model predicts disease probability
1. **Decoding**: Encoded prediction converted back to disease name

### Example Prediction Flow

```python
# Example symptom input
selected_symptoms = ["itching", "skin_rash", "fever"]

# Create symptom vector (132 features)
symptom_vector = encode_symptoms(selected_symptoms)

# Make prediction
prediction = model.predict([symptom_vector])

# Decode result
disease_name = le.inverse_transform(prediction)[0]
```

## 📚 Data Files Generated

### 1. `diseases.json`

Contains all unique disease names from the dataset:

```json
[
  "Fungal infection",
  "Allergy",
  "GERD",
  "Chronic cholestasis",
  ...
]
```

### 2. `symptoms.json`

Contains all symptom names used in the model:

```json
[
  "itching",
  "skin_rash",
  "nodal_skin_eruptions",
  ...
]
```

### 3. `model.joblib`

The trained Random Forest model saved for production use.

## 🔬 Model Validation

### Cross-Validation Strategy

The model uses a simple train-test split for validation:

- **Training Set**: 80% of the data
- **Test Set**: 20% of the data
- **Random State**: Fixed for reproducible results

### Future Improvements

1. **K-Fold Cross-Validation**: More robust performance estimation
1. **Hyperparameter Tuning**: Grid search for optimal parameters
1. **Feature Selection**: Remove redundant or low-importance features
1. **Ensemble Methods**: Combine multiple algorithms
1. **Data Augmentation**: Increase dataset size with synthetic samples

## 🎯 Usage in Production

The trained model is integrated into the Flask backend API:

1. **Model Loading**: Loaded once when the server starts
1. **Symptom Encoding**: Convert user input to feature vector
1. **Prediction**: Get disease prediction from model
1. **Result Processing**: Convert prediction back to human-readable format

## 📋 Model Maintenance

### Regular Updates

1. **Retrain with New Data**: Periodically retrain with updated medical data
1. **Performance Monitoring**: Track prediction accuracy over time
1. **Feature Updates**: Add new symptoms or diseases as needed
1. **Validation**: Continuously validate against medical expertise

### Version Control

- Model versions should be tracked
- Performance metrics logged for each version
- Rollback capability for production deployments
