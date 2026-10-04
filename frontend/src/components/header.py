import streamlit as st


def header():
    st.markdown(
        """
    <div class="main-header">
        <h1>🏥 AI Disease Prediction System</h1>
        <p>Advanced AI-powered disease prediction based on symptoms</p>
    </div>
    """,
        unsafe_allow_html=True,
    )
