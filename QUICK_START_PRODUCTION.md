# Quick Start - Production Deployment

## Prerequisites
- Node.js 20+ LTS
- pnpm 8+
- Docker & Docker Compose
- PostgreSQL 16+ (managed service recommended)
- Redis 7+ (managed service recommended)

## Setup Paths

### Path 1: Quick Development Setup (5 minutes)
```bash
# Clone
git clone <repo>
cd donate-protocol

# Install
pnpm install

# Start services
docker-compose up -d

# Setup DB
pnpm db:generate
pnpm db:push

# Run
pnpm dev

# Access
# - Web: http://localhost:3000
# - API: http://localhost:3001
# - Admin: http://localhost:3002
```

### Path 2: Docker Deployment (Production-Ready)

#### Build Images
```bash
docker build -t donate-api:latest -f apps/api/Dockerfile .
docker build -t donate-web:latest -f apps/web/Dockerfile .
docker build -t donate-admin:latest -f apps/admin/Dockerfile .
```

#### Run with Docker Compose
```bash
# Pull services
docker-compose up -d postgres redis

# Create database
docker-compose exec postgres createdb -U donate donate_protocol

# Run migrations
docker-compose run --rm api pnpm db:push

# Start services
docker-compose up -d api web admin

# Check status
docker-compose ps
```

#### Or Kubernetes
```bash
# Create namespace
kubectl create namespace donate-protocol

# Apply manifests
kubectl apply -n donate-protocol -f k8s/

# Verify rollout
kubectl rollout status deployment/donate-api -n donate-protocol
```

### Path 3: Managed Services (AWS/GCP/Azure)

#### AWS Example
```bash
# Database
aws rds create-db-instance \
  --db-instance-identifier donate-prod \
  --db-instance-class db.t4g.medium \
  --engine postgres \
  --master-username donate \
  --allocated-storage 100

# Cache
aws elasticache create-cache-cluster \
  --cache-cluster-id donate-redis \
  --cache-node-type cache.t4g.micro \
  --engine redis

# ECS Task Definition
aws ecs register-task-definition \
  --cli-input-json file://ecs-task-definition.json

# Launch Service
aws ecs create-service \
  --cluster donate-prod \
  --service-name donate-api \
  --task-definition donate-api:1
```

---

## Configuration

### Environment Variables Required

```bash
# Server
NODE_ENV=production
PORT=3001
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://user:password@host:5432/donate_protocol

# Cache
REDIS_URL=redis://host:6379

# Security
JWT_SECRET=<generate-with: openssl rand -base64 32>

# CORS
CORS_ORIGINS=https://donate-protocol.com,https://app.donate-protocol.com

# External Services
PLAID_CLIENT_ID=<your-id>
PLAID_SECRET=<your-secret>
STRIPE_SECRET_KEY=<your-key>
SENDGRID_API_KEY=<your-key>

# Monitoring
DATADOG_API_KEY=<your-key>
SENTRY_DSN=<your-dsn>
```

### Quick Configuration Script

```bash
# Generate JWT secret
export JWT_SECRET=$(openssl rand -base64 32)

# Create .env.production
cat > .env.production << 'ENVEOF'
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=$JWT_SECRET
CORS_ORIGINS=https://your-domain.com
ENVEOF
```

---

## Database Setup

### Initial Schema
```bash
# Generate Prisma client
pnpm db:generate

# Create schema
pnpm db:push

# Seed data (optional)
pnpm db:seed

# Verify
pnpm db:studio  # Open Prisma Studio
```

### Migrations
```bash
# Create migration
pnpm db:migrate --name add_feature

# View status
pnpm db:migrate status

# Rollback (dev only)
pnpm db:migrate resolve
```

---

## Verification Steps

### Health Checks
```bash
# API Health
curl https://api.donate-protocol.com/health

# Database Connection
curl https://api.donate-protocol.com/health/ready

# Web App
curl https://donate-protocol.com

# Admin
curl https://admin.donate-protocol.com
```

### Run Tests
```bash
# All tests
pnpm test

# Specific package
pnpm test --filter @donate/api

# Coverage
pnpm test:coverage
```

### Build Verification
```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Format check
pnpm format --check
```

---

## Monitoring Setup

### Datadog
```bash
# Install agent
docker run -d --name datadog-agent \
  -e DD_SITE="datadoghq.com" \
  -e DD_API_KEY=$DD_API_KEY \
  datadog/agent:latest

# Configure traces
export DD_TRACE_ENABLED=true
export DD_TRACE_DEBUG=false
```

### Sentry
```bash
# Initialize
pnpm add @sentry/node

# In API
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

## Common Operations

### View Logs
```bash
# Docker
docker-compose logs -f api

# Kubernetes
kubectl logs -f deployment/donate-api -n donate-protocol

# File logs
tail -f logs/api.log
```

### Scale Services
```bash
# Docker Compose
docker-compose up -d --scale api=3

# Kubernetes
kubectl scale deployment donate-api --replicas=3 -n donate-protocol
```

### Database Backup
```bash
# Backup
pg_dump $DATABASE_URL | gzip > backup.sql.gz

# Restore
gunzip < backup.sql.gz | psql $DATABASE_URL
```

### Clear Cache
```bash
# Redis
redis-cli FLUSHDB

# Docker
docker-compose exec redis redis-cli FLUSHDB
```

---

## Troubleshooting

### API won't start
```bash
# Check database connection
psql $DATABASE_URL

# Check Redis
redis-cli ping

# Check logs
docker-compose logs api
```

### Database migration failed
```bash
# Check status
pnpm db:migrate status

# Resolve
pnpm db:migrate resolve --rolled-back

# Try again
pnpm db:push
```

### Performance issues
```bash
# Check slow queries
SELECT query, mean_time FROM pg_stat_statements ORDER BY mean_time DESC;

# Create missing index
CREATE INDEX idx_name ON table(column);

# Check cache hit rate
INFO stats
```

---

## Security Checklist

Before launch, verify:
- [ ] SSL/TLS certificates installed
- [ ] JWT_SECRET is strong (32+ bytes)
- [ ] CORS_ORIGINS doesn't include *
- [ ] Database password is strong
- [ ] API keys rotated
- [ ] Rate limiting enabled
- [ ] HTTPS enforced (redirects)
- [ ] Security headers configured
- [ ] Webhook signing enabled

---

## Support

- **Documentation:** https://docs.donate-protocol.com
- **Issues:** GitHub Issues
- **Email:** ops@donate-protocol.com
- **On-Call:** PagerDuty rotation
- **Status:** https://status.donate-protocol.com

---

**First Deployment?** Start with Path 1, then move to Path 3 for production.
**Need Help?** See PRODUCTION_LAUNCH_SUMMARY.md for detailed guide.
