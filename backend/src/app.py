from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from src.utils.utils import (
    encode_symptoms,
    get_symptoms,
    inverse_encode_symptoms,
    get_disease_description,
    clear_cache,
)
from joblib import load
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Configure CORS (allow all origins for now, change for production)
CORS(app, origins=["*"])

# Create Blueprint for API
api_bp = Blueprint("api", __name__, url_prefix="/api")

# Load ML model
try:
    model = load("src/model/model.joblib")
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    model = None


# Routes
@api_bp.route("/")
def index():
    return jsonify(message="Welcome to the Flask API!")


@api_bp.route("/predict", methods=["POST"])
def encode_symptoms_route():
    if model is None:
        return jsonify(error="Model not available"), 503

    data = request.get_json()
    if not data:
        return jsonify(error="No data provided"), 400

    try:
        encoded_symptoms = encode_symptoms(get_symptoms(data))
        prediction = model.predict([encoded_symptoms])
        return jsonify(disease=str(inverse_encode_symptoms(prediction)[0]))
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify(error="Prediction failed"), 500


@api_bp.route("/disease_description", methods=["POST"])
def disease_description_route():
    data = request.get_json()
    if not data or "disease_name" not in data:
        return jsonify(error="No disease name provided"), 400

    try:
        disease_name = data["disease_name"]
        description = get_disease_description(disease_name)
        if description:
            return jsonify(description=str(description))
        else:
            return jsonify(error="Description not found for the given disease"), 404
    except Exception as e:
        logger.error(f"Description lookup error: {e}")
        return jsonify(error="Description lookup failed"), 500


@api_bp.route("/clear_cache", methods=["POST"])
def clear_cache_route():
    password = request.json.get("password")
    if not password:
        return jsonify(error="Password is required"), 400
    try:
        if clear_cache(password=password):
            return jsonify(message="Cache cleared successfully"), 200
        else:
            return jsonify(error="Failed to clear cache. Enter correct password"), 500
    except Exception as e:
        logger.error(f"Cache clearing error: {e}")
        return jsonify(error="Cache clearing failed"), 500


@api_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify(
        {
            "status": "healthy",
            "model_loaded": model is not None,
            "timestamp": str(int(time.time())),
        }
    )


# Register blueprint
app.register_blueprint(api_bp)

# Main entry
if __name__ == "__main__":
    # For production, run via Gunicorn
    app.run(host="0.0.0.0", port=8000, debug=True)
