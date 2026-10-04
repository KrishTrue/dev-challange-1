import streamlit as st
from streamlit_option_menu import option_menu
from dotenv import load_dotenv
from utils.utils import load_css
from components import header, info, selection, result, footer, about

load_dotenv()
styles = load_css()

# Configure page
st.set_page_config(
    page_title="AI Disease Predictor",
    page_icon="🏥",
    layout="wide",
)


# Custom CSS for modern dark theme
st.markdown(
    f"""
<style>
    {styles}
    
    /* Targeted navigation menu styling */
    .stHorizontalBlock {{
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }}
    
    .stHorizontalBlock > div {{
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }}
    
    /* Streamlit option menu container override */
    .streamlit-option-menu {{
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
    }}
    
    .streamlit-option-menu * {{
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }}
    
    /* Navigation link container */
    .nav-link-container {{
        background: transparent !important;
        border: none !important;
    }}
</style>
""",
    unsafe_allow_html=True,
)


def main():
    # App header
    header()

    # Navigation Menu
    selected = option_menu(
        None,
        ["Home", "Team", "Sources"],
        icons=["house", "info-circle", "github"],
        menu_icon=None,
        default_index=0,
        orientation="horizontal",
        styles={
            "container": {
                "padding": "0px",
                "background-color": "transparent",
                "border": "0px solid transparent",
                "box-shadow": "none",
                "margin": "0px",
                "border-radius": "0px",
                "width": "100%",
                "max-width": "none",
            },
            "icon": {"color": "#64b5f6", "font-size": "20px"},
            "nav-link": {
                "font-size": "16px",
                "text-align": "center",
                "margin": "5px 10px",
                "padding": "12px 24px",
                "--hover-color": "rgba(100, 181, 246, 0.1)",
                "border-radius": "12px",
                "color": "#ffffff",
                "background-color": "transparent",
                "border": "0px solid transparent",
                "box-shadow": "none",
            },
            "nav-link-selected": {
                "background-color": "rgba(100, 181, 246, 0.2)",
                "color": "#64b5f6",
                "border": "0px solid transparent",
                "box-shadow": "none",
            },
        },
    )

    col1, col2, col3 = st.columns([1, 3, 1])

    with col2:
        if selected == "Home":
            # Information section
            info()

            # selection section
            selected_symptoms = selection()

            # result section
            result(selected_symptoms)
        elif selected == "Sources":
            st.markdown("### 🔗 Sources")
            st.markdown(
                """
                <div class="info-box">
                    <p><a href="https://github.com/MannuVilasara/disease-detector" target="_blank" style="color: #64b5f6; text-decoration: none; font-weight: bold;">
                        🚀 Visit GitHub Repository →
                    </a></p>
                    <p><a href="https://github.com/MannuVilasara/disease-detector" target="_blank" style="color: #64b5f6; text-decoration: none; font-weight: bold;">
                        📘 Visit Docs →
                    </a></p>
                </div>
                """,
                unsafe_allow_html=True,
            )

        elif selected == "Team":
            # About section
            about()

    # Footer
    footer()


if __name__ == "__main__":
    main()
