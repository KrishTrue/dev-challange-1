import streamlit as st


def footer():
    st.markdown("<br><br>", unsafe_allow_html=True)
    st.markdown(
        """
    <div class="footer">
        <p style="font-size: 1.1rem; font-weight: 600; color: #495057;">
            🏥 AI Disease Prediction System | Made with ❤️ using Streamlit
        </p>
        <p style="font-size: 0.95rem; color: #6c757d;">
            Remember: This tool is for informational purposes only. Always consult healthcare professionals for medical advice.
        </p>
    </div>
    """,
        unsafe_allow_html=True,
    )
