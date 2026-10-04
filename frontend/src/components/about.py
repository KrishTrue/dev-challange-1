import streamlit as st


def about():
    html_content = """
<div class="info-box">
    <h2>🏥 About AI Disease Predictor</h2>
    <p>A machine learning-powered application that predicts potential diseases based on user-selected symptoms. 
    This project leverages advanced AI algorithms to provide quick health insights for educational purposes.</p>   
    <h4>👥 Development Team</h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
        <div style="background: linear-gradient(135deg, rgba(100, 181, 246, 0.15), rgba(100, 181, 246, 0.05)); padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(100, 181, 246, 0.1); border: 1px solid rgba(100, 181, 246, 0.2); transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #64b5f6, #42a5f5); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-right: 1rem;">🧑‍💻</div>
                <div>
                    <h5 style="color: #64b5f6; margin: 0; font-size: 1.2rem;"><a href="github/MannuVilasara" target="_blank" style="text-decoration: none; color: inherit;">Manpreet Singh</a></h5>
                    <p style="margin: 0.5rem 0 0 0; color: #94a3b8; font-size: 0.9rem;">UID: 2472013</p>
                </div>
            </div>
            <p style="margin: 0; color: #cbd5e1; text-align: center; font-weight: 500;">Department: CSE</p>
        </div>
        <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05)); padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-right: 1rem;">🧑‍💻</div>
                <div>
                    <h5 style="color: #8b5cf6; margin: 0; font-size: 1.2rem;"><a href="github/GurmanDhami05" target="_blank" style="text-decoration: none; color: inherit;">Gurman Singh Dhami</a></h5>
                    <p style="margin: 0.5rem 0 0 0; color: #94a3b8; font-size: 0.9rem;">UID: 2472054</p>
                </div>
            </div>
            <p style="margin: 0; color: #cbd5e1; text-align: center; font-weight: 500;">Department: CSE</p>
        </div>
        <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05)); padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #06b6d4, #0891b2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-right: 1rem;">🧑‍💻</div>
                <div>
                    <h5 style="color: #06b6d4; margin: 0; font-size: 1.2rem;"><a href="github/ikeshav26" target="_blank" style="text-decoration: none; color: inherit;">Keshav Gilhotra</a></h5>
                    <p style="margin: 0.5rem 0 0 0; color: #94a3b8; font-size: 0.9rem;">UID: 2472125</p>
                </div>
            </div>
            <p style="margin: 0; color: #cbd5e1; text-align: center; font-weight: 500;">Department: CSE</p>
        </div>
        <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05)); padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-right: 1rem;">🧑‍💻</div>
                <div>
                    <h5 style="color: #10b981; margin: 0; font-size: 1.2rem;"><a href="github/Ikrish21" target="_blank" style="text-decoration: none; color: inherit;">Krish Puri</a></h5>
                    <p style="margin: 0.5rem 0 0 0; color: #94a3b8; font-size: 0.9rem;">UID: 2472064</p>
                </div>
            </div>
            <p style="margin: 0; color: #cbd5e1; text-align: center; font-weight: 500;">Department: CSE</p>
        </div>
        <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05)); padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-right: 1rem;">🧑‍💻</div>
                <div>
                    <h5 style="color: #f59e0b; margin: 0; font-size: 1.2rem;"><a href="github/iakshra22" target="_blank" style="text-decoration: none; color: inherit;">Akshra</a></h5>
                    <p style="margin: 0.5rem 0 0 0; color: #94a3b8; font-size: 0.9rem;">UID: 2472068</p>
                </div>
            </div>
            <p style="margin: 0; color: #cbd5e1; text-align: center; font-weight: 500;">Department: CSE</p>
        </div>
        <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05)); padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-right: 1rem;">🧑‍💻</div>
                <div>
                    <h5 style="color: #ef4444; margin: 0; font-size: 1.2rem;"><a href="github/bhavukahuja" target="_blank" style="text-decoration: none; color: inherit;">Bhavuk Ahuja</a></h5>
                    <p style="margin: 0.5rem 0 0 0; color: #94a3b8; font-size: 0.9rem;">UID: 2472086</p>
                </div>
            </div>
            <p style="margin: 0; color: #cbd5e1; text-align: center; font-weight: 500;">Department: CSE</p>
        </div>
    </div>
    <h4>🔧 Tech Stack</h4>
    <ul style="color: #cbd5e1;">
        <li><strong>Frontend:</strong> Streamlit</li>
        <li><strong>Backend:</strong> Flask</li>
        <li><strong>ML:</strong> Scikit-learn</li>
        <li><strong>Deployment:</strong> Nginx</li>
    </ul>
    <h4>⚠️ Disclaimer</h4>
    <p style="color: #f59e0b; background-color: rgba(245, 158, 11, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 1rem 0;">
        <strong>For educational purposes only.</strong> This tool should not replace professional medical advice. 
        Always consult healthcare providers for medical concerns.
    </p>
</div>
"""

    st.markdown(html_content, unsafe_allow_html=True)
