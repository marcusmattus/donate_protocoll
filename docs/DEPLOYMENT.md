# Deployment Guide

## Overview

This guide covers deploying Donate Protocol to production environments. The platform consists of multiple services that can be deployed independently or together.

## Architecture Components

- **Web App** (Next.js): Public-facing website
- **Admin Dashboard** (Next.js): Internal admin tools
- **API Server** (Fastify): REST API for partners
- **MCP Server** (Node.js): MCP protocol server
- **Database** (PostgreSQL): Primary data store
- **Cache** (Redis): Session and rate limiting
- **Queue** (BullMQ/Redis): Background job processing
- **Object Storage** (S3): File storage

## Deployment Options

### Option 1: Vercel + Railway (Recommended for MVP)

**Pros:** Fast deployment, automatic scaling, generous free tiers
**Cons:** Limited control, potential cost at scale

#### Web & Admin (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy web app
cd apps/web
vercel --prod

# Deploy admin dashboard
cd apps/admin
vercel --prod
```

**Vercel Configuration:**
```json
{
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.donate-protocol.com",
    "DATABASE_URL": "@database-url"
  }
}
```

#### API & Services (Railway)

```bash
# Install Railway CLI
npm i -g railway

# Initialize Railway project
railway init

# Deploy API server
railway up --service api

# Deploy MCP server
railway up --service mcp

# Add PostgreSQL
railway add --service postgresql

# Add Redis
railway add --service redis
```

**railway.json:**
```json
{
  "services": {
    "api": {
      "build": {
        "command": "pnpm --filter @donate/api build"
      },
      "start": {
        "command": "pnpm --filter @donate/api start"
      },
      "env": {
        "NODE_ENV": "production",
        "DATABASE_URL": "${{Postgres.DATABASE_URL}}",
        "REDIS_URL": "${{Redis.REDIS_URL}}"
      }
    },
    "mcp": {
      "build": {
        "command": "pnpm --filter @donate/mcp-server build"
      },
      "start": {
        "command": "pnpm --filter @donate/mcp-server start"
      }
    }
  }
}
```

### Option 2: AWS (Production-Ready)

**Pros:** Full control, enterprise features, cost-effective at scale
**Cons:** Complex setup, requires DevOps expertise

#### Infrastructure as Code (Terraform)

```hcl
# vpc.tf
resource "aws_vpc" "donate" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "donate-protocol-vpc"
  }
}

# rds.tf
resource "aws_db_instance" "postgres" {
  identifier        = "donate-protocol-db"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = "db.t3.medium"
  allocated_storage = 100

  db_name  = "donate_protocol"
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 7
  multi_az               = true

  tags = {
    Environment = "production"
  }
}

# elasticache.tf
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "donate-protocol-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
}

# ecs.tf
resource "aws_ecs_cluster" "main" {
  name = "donate-protocol-cluster"
}

resource "aws_ecs_task_definition" "api" {
  family                   = "donate-api"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name  = "api"
      image = "donate-protocol/api:latest"
      portMappings = [
        {
          containerPort = 3001
          hostPort      = 3001
        }
      ]
      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        }
      ]
      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = aws_secretsmanager_secret.db_url.arn
        }
      ]
    }
  ])
}

# s3.tf
resource "aws_s3_bucket" "storage" {
  bucket = "donate-protocol-storage"

  tags = {
    Environment = "production"
  }
}
```

#### Deployment Steps

```bash
# 1. Build Docker images
docker build -t donate-protocol/api:latest -f apps/api/Dockerfile .
docker build -t donate-protocol/web:latest -f apps/web/Dockerfile .

# 2. Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
docker tag donate-protocol/api:latest ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/donate-api:latest
docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/donate-api:latest

# 3. Deploy infrastructure
cd infrastructure/terraform
terraform init
terraform plan
terraform apply

# 4. Run database migrations
aws ecs run-task --cluster donate-protocol-cluster --task-definition migrate --launch-type FARGATE

# 5. Deploy services
aws ecs update-service --cluster donate-protocol-cluster --service api --force-new-deployment
```

### Option 3: Kubernetes (Enterprise)

**Pros:** Maximum scalability, cloud-agnostic, advanced orchestration
**Cons:** Highest complexity, requires K8s expertise

#### Kubernetes Manifests

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: donate-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: donate-api
  template:
    metadata:
      labels:
        app: donate-api
    spec:
      containers:
      - name: api
        image: donate-protocol/api:latest
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: donate-api-service
spec:
  selector:
    app: donate-api
  ports:
  - port: 80
    targetPort: 3001
  type: LoadBalancer
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: donate-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: donate-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

#### Helm Chart

```yaml
# values.yaml
api:
  replicaCount: 3
  image:
    repository: donate-protocol/api
    tag: latest
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"

postgresql:
  enabled: true
  auth:
    username: donate
    password: changeme
    database: donate_protocol
  primary:
    persistence:
      size: 100Gi

redis:
  enabled: true
  master:
    persistence:
      size: 10Gi

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: api.donate-protocol.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: donate-tls
      hosts:
        - api.donate-protocol.com
```

## Environment Variables

### Production Environment Variables

```bash
# Application
NODE_ENV=production
LOG_LEVEL=info

# Database (use connection pooling)
DATABASE_URL=postgresql://user:pass@rds.amazonaws.com:5432/donate?ssl=true&connection_limit=20

# Redis
REDIS_URL=redis://elasticache.amazonaws.com:6379

# Secrets (use AWS Secrets Manager, Vault, etc.)
JWT_SECRET=$(aws secretsmanager get-secret-value --secret-id jwt-secret --query SecretString --output text)

# External Services
PLAID_ENV=production
PLAID_CLIENT_ID=$(vault kv get -field=client_id secret/plaid)
PLAID_SECRET=$(vault kv get -field=secret secret/plaid)

STRIPE_SECRET_KEY=$(vault kv get -field=secret_key secret/stripe)

# Monitoring
SENTRY_DSN=https://...@sentry.io/...
DATADOG_API_KEY=$(vault kv get -field=api_key secret/datadog)

# URLs
NEXT_PUBLIC_APP_URL=https://donate-protocol.com
NEXT_PUBLIC_API_URL=https://api.donate-protocol.com
```

## Database Migrations

### Production Migration Strategy

```bash
# 1. Create migration
pnpm --filter @donate/database db:migrate --create-only

# 2. Review migration SQL
cat packages/database/prisma/migrations/*/migration.sql

# 3. Test in staging
DATABASE_URL=staging_url pnpm db:migrate

# 4. Backup production database
pg_dump -h production-db -U donate donate_protocol > backup-$(date +%Y%m%d).sql

# 5. Run migration in production (with downtime)
pnpm --filter @donate/database db:migrate

# OR use blue-green deployment for zero-downtime
```

### Zero-Downtime Migrations

```bash
# Phase 1: Add new columns (backward compatible)
pnpm db:migrate

# Phase 2: Deploy new code (reads from both old and new)
kubectl rollout restart deployment/donate-api

# Phase 3: Backfill data
node scripts/backfill-data.js

# Phase 4: Deploy code that writes to new columns
kubectl rollout restart deployment/donate-api

# Phase 5: Remove old columns
pnpm db:migrate
```

## Monitoring & Observability

### Health Checks

```typescript
// apps/api/src/routes/health.ts
app.get('/health', async (req, reply) => {
  const dbHealth = await checkDatabaseHealth();
  const redisHealth = await checkRedisHealth();

  const isHealthy = dbHealth && redisHealth;

  return {
    status: isHealthy ? 'healthy' : 'unhealthy',
    checks: {
      database: dbHealth ? 'up' : 'down',
      redis: redisHealth ? 'up' : 'down',
    },
    timestamp: new Date().toISOString(),
  };
});
```

### Metrics Collection

```typescript
// Prometheus metrics
import { register, Counter, Histogram } from 'prom-client';

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

const donationsProcessed = new Counter({
  name: 'donations_processed_total',
  help: 'Total number of donations processed',
  labelNames: ['status'],
});

app.get('/metrics', async (req, reply) => {
  reply.type('text/plain').send(await register.metrics());
});
```

### Alerting Rules

```yaml
# alertmanager.yml
groups:
  - name: donate-protocol
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"

      - alert: DatabaseConnectionPoolExhausted
        expr: database_connections_in_use / database_connections_max > 0.9
        for: 2m
        labels:
          severity: warning

      - alert: DonationProcessingLag
        expr: donation_processing_lag_seconds > 300
        for: 10m
        labels:
          severity: warning
```

## Security Checklist

- [ ] All secrets stored in secret manager (not env files)
- [ ] Database uses SSL connections
- [ ] Redis requires authentication
- [ ] API keys are rotated regularly
- [ ] HTTPS enforced for all endpoints
- [ ] CORS configured restrictively
- [ ] Rate limiting enabled
- [ ] DDoS protection (CloudFlare, AWS Shield)
- [ ] Security headers configured
- [ ] Vulnerability scanning enabled
- [ ] Audit logging enabled
- [ ] Encrypted backups
- [ ] MFA enabled for admin access

## Backup & Disaster Recovery

### Automated Backups

```bash
# Daily database backup
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="donate_protocol_$TIMESTAMP.sql.gz"

pg_dump -h $DB_HOST -U $DB_USER $DB_NAME | gzip > /backups/$BACKUP_FILE

# Upload to S3
aws s3 cp /backups/$BACKUP_FILE s3://donate-backups/database/$BACKUP_FILE

# Retain backups for 30 days
aws s3api put-object-tagging --bucket donate-backups --key database/$BACKUP_FILE --tagging 'TagSet=[{Key=Expiration,Value=30days}]'
```

### Disaster Recovery Runbook

1. **Assess Impact**
   - Check monitoring dashboards
   - Identify affected services
   - Estimate data loss

2. **Activate DR Plan**
   - Notify stakeholders
   - Switch to read-only mode if needed
   - Restore from backup

3. **Recovery Steps**
   ```bash
   # Restore database
   aws s3 cp s3://donate-backups/database/latest.sql.gz .
   gunzip latest.sql.gz
   psql -h $DB_HOST -U $DB_USER $DB_NAME < latest.sql

   # Verify data integrity
   npm run verify-data-integrity

   # Switch traffic back
   kubectl rollout restart deployment/donate-api
   ```

4. **Post-Mortem**
   - Document incident
   - Identify root cause
   - Implement preventive measures

## Performance Optimization

### Database Optimization

```sql
-- Add indexes for common queries
CREATE INDEX CONCURRENTLY idx_donations_user_status ON donations(user_id, status);
CREATE INDEX CONCURRENTLY idx_trades_timestamp ON trade_events(trade_timestamp DESC);
CREATE INDEX CONCURRENTLY idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- Enable connection pooling
-- Set in DATABASE_URL: ?connection_limit=20&pool_timeout=30

-- Configure PostgreSQL
ALTER SYSTEM SET shared_buffers = '2GB';
ALTER SYSTEM SET effective_cache_size = '6GB';
ALTER SYSTEM SET maintenance_work_mem = '512MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET max_connections = 100;
```

### CDN Configuration

```nginx
# CloudFlare / CloudFront cache rules
location /api/ {
  # Don't cache API responses
  add_header Cache-Control "private, no-cache, no-store, must-revalidate";
}

location /static/ {
  # Cache static assets for 1 year
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## Cost Optimization

### Resource Sizing Recommendations

**Startup (< 1000 users):**
- Web: Vercel Free tier
- API: 1x CPU, 512MB RAM
- Database: db.t3.micro (RDS) or Railway Starter
- Redis: cache.t3.micro

**Growth (1K-10K users):**
- Web: Vercel Pro
- API: 2x (2 CPU, 1GB RAM)
- Database: db.t3.medium
- Redis: cache.t3.small

**Scale (10K+ users):**
- Web: Vercel Enterprise + CDN
- API: Auto-scaling (2-10 instances)
- Database: db.r6g.large (Multi-AZ)
- Redis: cache.r6g.large (Cluster mode)

## Rollback Procedures

```bash
# Rollback deployment
kubectl rollout undo deployment/donate-api

# Rollback database migration
pnpm --filter @donate/database db:migrate --rollback

# Rollback to specific version
kubectl set image deployment/donate-api api=donate-protocol/api:v1.2.3
```

## Support

For deployment assistance:
- Email: devops@donate-protocol.com
- Slack: #donate-protocol-ops
- On-call: +1-XXX-XXX-XXXX
