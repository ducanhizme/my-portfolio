# Payload CMS 3.0 + Supabase PostgreSQL for Portfolio

Headless CMS powering the Duc Anh Portfolio with Supabase PostgreSQL as the database backend.

## 🚀 Quick Setup with Supabase

### 1. Configure Supabase Connection
Copy `.env.example` to `.env` (already created if in local workspace):
```bash
cp .env.example .env
```

Open `cms/.env` and update `DATABASE_URI` with your Supabase Transaction Pooler connection string:
```env
DATABASE_URI="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require"
PAYLOAD_SECRET="your-secure-random-secret-key"
NEXT_PUBLIC_SERVER_URL="http://localhost:3001"
```

> **Where to find this in Supabase:**
> 1. Go to your Supabase Project Dashboard -> **Settings** -> **Database**.
> 2. Under **Connection string**, select the **URI** tab.
> 3. Mode: **Transaction** (Port `6543`).
> 4. Copy the connection string and replace `[YOUR-PASSWORD]` with your database password.

---

### 2. Run Seed Script (Optional but Recommended)
To automatically initialize the admin account and populate Supabase with your 4 production portfolio projects (`HIVE KMS`, `YOPAZ PULSE`, `PAWCREW`, `AI DOCUMENT INTELLIGENCE`):

```bash
bun run seed
```

This creates:
- Admin user: `admin@ducanh.systems` (Password: `DucAnh@2026!Secure` or your custom password in `.env`)
- All 4 projects in the `projects` collection
- Global site config in `site-config`

---

### 3. Start Development Server

```bash
bun run dev
```

- **Admin Panel**: [http://localhost:3001/admin](http://localhost:3001/admin)
- **REST API Endpoint**: [http://localhost:3001/api/projects](http://localhost:3001/api/projects)
- **GraphQL Endpoint**: [http://localhost:3001/api/graphql](http://localhost:3001/api/graphql)

---

## 🏗️ Architecture & Collections

- **`projects`**: High-impact production AI architectures (`number`, `title`, `tags`, `metrics`, `techStack`, `architecture.flowSteps`, links).
- **`timeline`**: Career milestones, roles, impact metrics.
- **`stack`**: Engineering proficiencies & tool stacks.
- **`media`**: Uploads & screenshots.
- **`site-config`**: Global bio, availability status, and social URLs.

## 🛡️ Zero-Downtime Static Fallback
The frontend portfolio (`src/services/cms.ts`) automatically falls back to local static data (`src/data/projects.ts`) if the CMS is offline or during cold boot.
