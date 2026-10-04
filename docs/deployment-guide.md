# Deployment Guide

## 🚀 Overview

This guide covers various deployment options for the AI Disease Prediction System, from development setup to production deployment with Docker, cloud platforms, and traditional servers.

## 📋 Prerequisites

### System Requirements

**Minimum Requirements**:

- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 10GB free space
- **OS**: Linux, macOS, or Windows

**Recommended for Production**:

- **CPU**: 4+ cores
- **RAM**: 8GB+
- **Storage**: 20GB+ SSD
- **OS**: Linux (Ubuntu 20.04+ or CentOS 8+)

### Dependencies

**Required Software**:

- Python 3.12+
- Git
- UV package manager (recommended) or pip

**Optional but Recommended**:

- Docker and Docker Compose
- Nginx (for reverse proxy)
- SSL certificates (for HTTPS)

## 🏠 Local Development Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd disease-detector
```

### 2. Environment Setup

Create environment files:

**Backend `.env`**:

```env
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_ENV=development
```

**Frontend `.env`** (optional):

```env
BACKEND_URL=http://localhost:5000
```

### 3. Install Dependencies

**Option A: Using UV (Recommended)**:

```bash
# Backend
cd backend
uv sync

# Frontend
cd ../frontend
uv sync
```

**Option B: Using pip**:

```bash
# Backend
cd backend
pip install -r pyproject.toml

# Frontend
cd ../frontend
pip install -r requirements.txt
```

### 4. Start Services

**Terminal 1 - Backend**:

```bash
cd backend
./run.sh dev
# Or: uv run python start.py dev
```

**Terminal 2 - Frontend**:

```bash
cd frontend
uv run python main.py
# Or: uv run streamlit run src/app.py
```

**Access URLs**:

- Frontend: http://localhost:8501
- Backend API: http://localhost:5000

## 🐳 Docker Deployment

### Single Container Setup

**1. Backend Docker**:

```dockerfile
# backend/Dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY . .

RUN pip install uv
RUN uv sync

EXPOSE 8000

CMD ["uv", "run", "python", "start.py", "prod"]
```

**2. Frontend Docker**:

```dockerfile
# frontend/Dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

EXPOSE 8501

CMD ["streamlit", "run", "src/app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

**Build and Run**:

```bash
# Backend
cd backend
docker build -t disease-detector-backend .
docker run -p 8000:8000 -e GEMINI_API_KEY=your_key disease-detector-backend

# Frontend
cd ../frontend
docker build -t disease-detector-frontend .
docker run -p 8501:8501 -e BACKEND_URL=http://localhost:8000 disease-detector-frontend
```

### Docker Compose Setup

**Root `docker-compose.yml`**:

```yaml
version: "3.8"

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - FLASK_ENV=production
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "8501:8501"
    environment:
      - BACKEND_URL=http://backend:8000
    depends_on:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped
```

**Environment file (`.env`)**:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Start with Docker Compose**:

```bash
docker-compose up -d
```

## 🌐 Cloud Deployment

### AWS Deployment

#### Option 1: EC2 with Docker

**1. Launch EC2 Instance**:

- **Instance Type**: t3.medium (2 vCPU, 4GB RAM)
- **AMI**: Amazon Linux 2 or Ubuntu 20.04
- **Security Groups**: Allow ports 22, 80, 443, 8000, 8501

**2. Install Dependencies**:

```bash
# Update system
sudo yum update -y  # Amazon Linux
# or
sudo apt update && sudo apt upgrade -y  # Ubuntu

# Install Docker
sudo amazon-linux-extras install docker -y  # Amazon Linux
# or
sudo apt install docker.io docker-compose -y  # Ubuntu

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

**3. Deploy Application**:

```bash
# Clone repository
git clone <repository-url>
cd disease-detector

# Set environment variables
echo "GEMINI_API_KEY=your_key" > .env

# Deploy with Docker Compose
docker-compose up -d
```

#### Option 2: ECS with Fargate

**1. Create Task Definition**:

```json
{
  "family": "disease-detector",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "your-account.dkr.ecr.region.amazonaws.com/disease-detector-backend",
      "portMappings": [{ "containerPort": 8000 }],
      "environment": [
        { "name": "FLASK_ENV", "value": "production" },
        { "name": "GEMINI_API_KEY", "value": "your_key" }
      ]
    },
    {
      "name": "frontend",
      "image": "your-account.dkr.ecr.region.amazonaws.com/disease-detector-frontend",
      "portMappings": [{ "containerPort": 8501 }],
      "environment": [
        { "name": "BACKEND_URL", "value": "http://localhost:8000" }
      ]
    }
  ]
}
```

### Google Cloud Platform

#### Option 1: Compute Engine

**1. Create VM Instance**:

```bash
gcloud compute instances create disease-detector \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud \
  --machine-type=e2-medium \
  --tags=http-server,https-server
```

**2. Configure Firewall**:

```bash
gcloud compute firewall-rules create allow-app-ports \
  --allow tcp:8000,tcp:8501 \
  --source-ranges 0.0.0.0/0 \
  --target-tags http-server
```

#### Option 2: Cloud Run

**Deploy Backend**:

```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/disease-detector-backend ./backend

# Deploy to Cloud Run
gcloud run deploy backend \
  --image gcr.io/PROJECT_ID/disease-detector-backend \
  --platform managed \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY=your_key
```

### Azure Deployment

#### Container Instances

**Deploy with Azure CLI**:

```bash
# Create resource group
az group create --name disease-detector-rg --location eastus

# Deploy container group
az container create \
  --resource-group disease-detector-rg \
  --name disease-detector \
  --image your-registry/disease-detector:latest \
  --dns-name-label disease-detector \
  --ports 80 443 8000 8501
```

## 🔧 Production Configuration

### Nginx Reverse Proxy

**`nginx.conf`**:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:8000;
    }

    upstream frontend {
        server frontend:8501;
    }

    server {
        listen 80;
        server_name your-domain.com;

        # Redirect to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name your-domain.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Backend API
        location /api/ {
            proxy_pass http://backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            proxy_pass http://backend/health;
        }
    }
}
```

### SSL/TLS Configuration

**Let's Encrypt with Certbot**:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Environment Variables

**Production `.env`**:

```env
# Backend
FLASK_ENV=production
GEMINI_API_KEY=your_production_key
CORS_ORIGINS=https://your-domain.com

# Database (if added)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=INFO

# Security
SECRET_KEY=your_secret_key
```

## 📊 Monitoring and Logging

### Application Monitoring

**Health Check Endpoint**:

```bash
# Set up health check monitoring
curl -f http://localhost:8000/health || exit 1
```

**Prometheus Metrics** (if implemented):

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "disease-detector"
    static_configs:
      - targets: ["localhost:8000"]
```

### Logging Configuration

**Structured Logging**:

```python
import logging
import json

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_entry = {
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'message': record.getMessage(),
            'module': record.module
        }
        return json.dumps(log_entry)

# Configure logger
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)
```

## 🛡️ Security Hardening

### Production Security Checklist

**Application Security**:

- [ ] Set `FLASK_ENV=production`
- [ ] Use strong secret keys
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use HTTPS only
- [ ] Set proper CORS origins
- [ ] Enable security headers

**Infrastructure Security**:

- [ ] Update all system packages
- [ ] Configure firewall rules
- [ ] Use non-root containers
- [ ] Implement log monitoring
- [ ] Set up intrusion detection
- [ ] Regular security scans

**Security Headers** (Nginx):

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=63072000" always;
add_header Content-Security-Policy "default-src 'self'" always;
```

## 📈 Performance Optimization

### Backend Optimization

**Gunicorn Configuration**:

```python
# gunicorn.conf.py
bind = "0.0.0.0:8000"
workers = 4  # (2 x CPU cores) + 1
worker_class = "sync"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 50
timeout = 30
keepalive = 2
preload_app = True
```

**Caching**:

```python
from flask_caching import Cache

cache = Cache(config={'CACHE_TYPE': 'redis'})
cache.init_app(app)

@app.route('/predict')
@cache.cached(timeout=300)  # Cache for 5 minutes
def predict():
    # Implementation
```

### Database (if added)

**PostgreSQL Configuration**:

```sql
-- postgresql.conf optimizations
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB
```

## 🔍 Troubleshooting

### Common Issues

**1. Model Loading Failed**:

```bash
# Check model file exists
ls -la backend/src/model/model.joblib

# Check permissions
chmod 644 backend/src/model/model.joblib
```

**2. CORS Errors**:

```python
# Update CORS configuration
CORS(app, origins=['https://your-frontend-domain.com'])
```

**3. High Memory Usage**:

```bash
# Monitor memory usage
docker stats

# Optimize worker count
workers = max(1, (cpu_count() * 2) + 1)
```

**4. SSL Certificate Issues**:

```bash
# Check certificate validity
openssl x509 -in cert.pem -text -noout

# Renew Let's Encrypt certificate
sudo certbot renew
```

### Debug Commands

**Check Service Status**:

```bash
# Docker services
docker-compose ps
docker-compose logs backend
docker-compose logs frontend

# System services
systemctl status nginx
systemctl status docker

# Network connectivity
curl -I http://localhost:8000/health
curl -I http://localhost:8501
```

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] Code review completed
- [ ] All tests passing
- [ ] Dependencies updated
- [ ] Security scan completed
- [ ] Environment variables configured
- [ ] SSL certificates ready
- [ ] Backup procedures in place

### Deployment

- [ ] Deploy to staging environment
- [ ] Run integration tests
- [ ] Verify health checks
- [ ] Test all API endpoints
- [ ] Verify frontend functionality
- [ ] Check monitoring/logging

### Post-Deployment

- [ ] Monitor application metrics
- [ ] Check error logs
- [ ] Verify SSL certificate
- [ ] Test disaster recovery
- [ ] Update documentation
- [ ] Notify stakeholders

## 🔄 CI/CD Pipeline

### GitHub Actions Example

**`.github/workflows/deploy.yml`**:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: |
          # Add test commands here
          echo "Running tests..."

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          # Add deployment commands
          echo "Deploying to production..."
```

This comprehensive deployment guide covers everything from local development to production deployment across various platforms and configurations.
