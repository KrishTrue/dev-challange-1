import dotenv
import os

dotenv.load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:5000/api").rstrip("/")
if not BACKEND_URL.endswith("/api"):
    BACKEND_URL = f"{BACKEND_URL}/api"


COLORS = {
    "primary": "#6366f1",  # Indigo
    "primary_dark": "#4f46e5",  # Darker indigo
    "secondary": "#8b5cf6",  # Purple
    "accent": "#06b6d4",  # Cyan
    "success": "#10b981",  # Emerald
    "warning": "#f59e0b",  # Amber
    "error": "#ef4444",  # Red
    "dark_bg": "#0f172a",  # Slate 900
    "card_bg": "#1e293b",  # Slate 800
    "card_light": "#334155",  # Slate 700
    "text_primary": "#f8fafc",  # Slate 50
    "text_secondary": "#cbd5e1",  # Slate 300
    "text_muted": "#94a3b8",  # Slate 400
    "border": "#475569",  # Slate 600
}
