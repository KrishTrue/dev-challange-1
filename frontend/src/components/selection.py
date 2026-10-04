import streamlit as st
from utils.data import symptoms
from utils.constants import COLORS


def selection():
    selected_symptoms = st.multiselect(
        "Choose all symptoms that apply to you:",
        symptoms,
        default=None,
        help="💡 Select multiple symptoms for more accurate predictions. Our AI analyzes symptom combinations to provide better results.",
    )

    # st.markdown('</div>', unsafe_allow_html=True)

    # Display selected symptoms count with modern styling
    if selected_symptoms:
        st.markdown(
            f"""
        <div style="background: linear-gradient(135deg, {COLORS['success']} 0%, #059669 100%); 
                    padding: 1rem; border-radius: 12px; margin: 1rem 0; color: white; text-align: center;">
            <strong>✅ {len(selected_symptoms)} symptom(s) selected</strong>
            <p style="margin: 0.5rem 0 0 0; opacity: 0.9; font-size: 0.9rem;">
                Great! Our AI has enough data to make a prediction.
            </p>
        </div>
        """,
            unsafe_allow_html=True,
        )
    else:
        st.markdown(
            f"""
        <div style="background: linear-gradient(135deg, {COLORS['warning']} 0%, #d97706 100%); 
                    padding: 1rem; border-radius: 12px; margin: 1rem 0; color: white; text-align: center;">
            <strong>⚠️ No symptoms selected</strong>
            <p style="margin: 0.5rem 0 0 0; opacity: 0.9; font-size: 0.9rem;">
                Please select at least one symptom to get an AI prediction.
            </p>
        </div>
        """,
            unsafe_allow_html=True,
        )
    return selected_symptoms
