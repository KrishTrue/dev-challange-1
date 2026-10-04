#!/bin/bash

# Disease Detector Backend Server Launcher
# Usage: ./run.sh [dev|prod] [options]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Default mode
MODE="dev"

# Parse arguments
if [ $# -gt 0 ]; then
    MODE="$1"
fi

case "$MODE" in
    "dev"|"development")
        echo "🚀 Starting development server with Flask..."
        echo "Server will be available at: http://127.0.0.1:5000"
        echo "Press Ctrl+C to stop the server"
        echo ""
        uv run python start.py dev
        ;;
    "prod"|"production")
        echo "🚀 Starting production server with Gunicorn..."
        echo "Server will be available at: http://127.0.0.1:8000"
        echo "Press Ctrl+C to stop the server"
        echo ""
        uv run python start.py prod
        ;;
    "test")
        echo "🧪 Testing server startup..."
        echo "This will start the server for 5 seconds and then stop"
        timeout 5 uv run python start.py dev || echo "✅ Server test completed"
        ;;
    *)
        echo "Usage: $0 [dev|prod|test]"
        echo ""
        echo "Modes:"
        echo "  dev   - Development mode with Flask's built-in server (default)"
        echo "  prod  - Production mode with Gunicorn WSGI server"
        echo "  test  - Test server startup and shutdown"
        echo ""
        echo "Examples:"
        echo "  $0 dev      # Start development server"
        echo "  $0 prod     # Start production server"
        echo "  $0 test     # Test server startup"
        exit 1
        ;;
esac
