import copy
from src.utils.data import symptoms, display_named_symptoms, diseases
from sklearn.preprocessing import LabelEncoder
from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
PASSWORD = os.getenv("PASSWORD")

le = LabelEncoder()
le.fit_transform(diseases)

client = genai.Client(api_key=API_KEY)


def encode_symptoms(symptom_list):
    """
    Encodes the symptoms into a list of integers.

    Args:
        symptom_list (list): List containing symptoms

    Returns:
        list: List of integers representing the encoded symptoms.
    """
    new_symptom_dict = copy.deepcopy(symptoms)
    for symptom in symptom_list:
        new_symptom_dict[symptom] = 1
    return list(new_symptom_dict.values())


def get_symptoms(symptom_list):
    """
    Returns the non display named symptoms from the given list.

    Args:
        symptom_list (list): List of symptoms.

    Returns:
        list: List of non display named symptoms.
    """
    non_display_symptoms = []
    for symptom in symptom_list:
        non_display_symptoms.append(display_named_symptoms[symptom])
    return non_display_symptoms


def inverse_encode_symptoms(encoded_symptoms):
    """
    Inverse encodes the symptoms from a list of integers to their original names.

    Args:
        encoded_symptoms (list): List of integers representing encoded symptoms.

    Returns:
        list: List of original symptom names.
    """
    return le.inverse_transform(encoded_symptoms)


def get_disease_description(disease_name):
    """
    Fetches the description of a disease using Google Gemini API.

    Args:
        disease_name (str): Name of the disease.

    Returns:
        str: Description of the disease.
    """
    if disease_name not in diseases:
        return "Disease not found."

    with open("cache/disease_descriptions.json", "r") as file:
        disease_descriptions = json.load(file)
    if disease_name in disease_descriptions:
        return disease_descriptions[disease_name]

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            f"""
                Give a brief and clear overview of the disease: {disease_name}.
                Include the following sections in order:
                1. **Description** – What the disease is.
                2. **Symptoms** – Key signs to look out for.
                3. **Causes** – Main reasons it occurs.
                4. **Precautions** – How to prevent or reduce risk.
                5. **Medication** – Common treatments or medicines.
                """
        ],
    )
    if response.candidates:
        disease_descriptions = json.load(open("cache/disease_descriptions.json", "r"))
        disease_descriptions[disease_name] = response.text
        with open("cache/disease_descriptions.json", "w") as file:
            json.dump(disease_descriptions, file)
    return response.text if response.candidates else "No description available."


def clear_cache(password):
    """
    Clears the disease descriptions cache.
    """
    if password != PASSWORD:
        return False
    with open("cache/disease_descriptions.json", "w") as file:
        json.dump({}, file)
    return True
