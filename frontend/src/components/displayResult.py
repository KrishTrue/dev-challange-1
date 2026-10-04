import streamlit as st


def display_result(disease, symptoms):
    """Display the prediction result with enhanced styling"""
    if disease and disease.lower() != "unknown":
        st.markdown(
            f"""
        <div class="result-success">
            <h2>🎯 Prediction Result</h2>
            <h3>Possible Disease: {disease}</h3>
            <p>Based on the {len(symptoms)} symptoms you selected</p>
        </div>
        """,
            unsafe_allow_html=True,
        )

        # Additional information
        with st.expander("📊 Selected Symptoms Summary"):
            st.write("You reported the following symptoms:")
            for i, symptom in enumerate(symptoms, 1):
                st.write(f"{i}. {symptom}")

    else:
        st.markdown(
            """
        <div class="result-warning">
            <h2>🤔 No Clear Prediction</h2>
            <p>Our AI model couldn't determine a specific disease based on the selected symptoms.</p>
            <p>This could mean the symptoms are too general or don't match known patterns.</p>
        </div>
        """,
            unsafe_allow_html=True,
        )

        st.markdown(
            """
        <div class="info-box">
            <h4>💡 Suggestions</h4>
            <ul>
                <li>Try selecting more specific symptoms</li>
                <li>Review your symptom selection for accuracy</li>
                <li>Consider consulting a healthcare professional</li>
            </ul>
        </div>
        """,
            unsafe_allow_html=True,
        )


def display_disease_disc(description_data):
    """Display the disease description with enhanced styling"""
    with st.expander("📖 Disease Description"):
        st.markdown(
            f"""
        <div class="description-success">
            <p>{description_data.get('description', 'No description available.')}</p>
        </div>
        """,
            unsafe_allow_html=True,
        )


def disclaimer():
    # Disclaimer
    st.markdown(
        """
        <div class="info-box">
            <h4>⚠️ Important Disclaimer</h4>
            <p>This prediction is for informational purposes only and should not replace professional medical advice. 
            Please consult with a healthcare professional for proper diagnosis and treatment.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
