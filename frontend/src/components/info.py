import streamlit as st


def info():
    st.markdown(
        """
        <div class="info-box">
            <h4>🧠 How Our AI Works</h4>
            <p><strong>Select the symptoms you're experiencing from the comprehensive list below.</strong> Our advanced AI model will analyze your symptom patterns and predict the most likely medical conditions.</p>
            <p style="margin-top: 1rem; font-style: italic; color: #94a3b8;">
                💡 <strong>Pro Tip:</strong> The more accurate and complete your symptom selection, the better our AI prediction will be.
            </p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.markdown(
        """
        <div class="symptom-section">
            <h3>🔍 Select Your Symptoms</h3>
            <p style="color: #cbd5e1; margin: 0; font-size: 1rem;">Choose all symptoms that apply to your current condition</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
