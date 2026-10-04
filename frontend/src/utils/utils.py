import streamlit as st
import os


def load_css():
    # Load CSS from external file
    try:
        css_file_path = os.path.join(os.path.dirname(__file__), "../styles.css")
        # Ensure the path is correct relative to the current file
        with open(css_file_path, "r") as f:
            styles = f.read()
            return styles
    except FileNotFoundError:
        # Fallback if CSS file is not found
        styles = ""
        st.warning("CSS file not found. Using default styling.")
