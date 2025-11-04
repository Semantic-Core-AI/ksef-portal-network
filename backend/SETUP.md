# KSeF Strapi Backend - Setup Documentation

## 🎉 Installation Complete!

Strapi CMS backend został pomyślnie zainstalowany i skonfigurowany.

---

## ✅ Verification Checklist

### 1. ✅ Strapi installed and running
- **Version**: v5.30.0
- **Location**: `/Users/a2141/NOW/ksef-strapi-backend/`
- **Database**: SQLite (`.tmp/data.db`)

### 2. ✅ Admin user created
- **Email**: admin@ksef.expert
- **Password**: [Created during initial setup - zapisane w menedżerze haseł]
- **Access**: http://localhost:1337/admin

### 3. ✅ Admin panel accessible
- **URL**: http://localhost:1337/admin
- **Status**: ✅ Running and accessible
- **Title**: "Strapi Admin"

### 4. ✅ API responds at /api endpoint
- **URL**: http://localhost:1337/api
- **Status**: ✅ Responding (404 is expected - no content types yet)
- **Response format**: JSON

### 5. ✅ No errors in terminal
- Server running on port 1337
- SQLite database connected
- No compilation errors

---

## 📂 Project Structure

```
ksef-strapi-backend/
├── .env                    # Environment variables (SECRETS!)
├── .git/                   # Git repository
├── .strapi/               # Strapi internal files
├── .tmp/                  # Temporary files & SQLite database
│   └── data.db            # SQLite database file
├── config/                # Configuration files
│   ├── admin.ts
│   ├── api.ts             # ✅ REST API config (limits, pagination)
│   ├── database.ts
│   ├── middlewares.ts
│   ├── plugins.ts
│   └── server.ts          # ✅ Server config (host, port, webhooks)
├── database/              # Database migrations
├── dist/                  # Compiled TypeScript output
├── node_modules/          # Dependencies (1358 packages)
├── public/                # Public assets
├── src/                   # Source code
│   ├── admin/             # Admin panel customizations
│   ├── api/               # API endpoints (content types will go here)
│   ├── extensions/        # Plugin extensions
│   └── index.ts           # Main entry point
├── types/                 # TypeScript type definitions
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Configuration Files

### config/server.ts
```typescript
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

### config/api.ts
```typescript
export default {
  rest: {
    defaultLimit: 25,      // Default number of items per page
    maxLimit: 100,         // Maximum items per request
    withCount: true,       // Include total count in responses
  },
};
```

### .env (KEEP SECRET!)
```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS=[auto-generated]
API_TOKEN_SALT=[auto-generated]
ADMIN_JWT_SECRET=[auto-generated]
TRANSFER_TOKEN_SALT=[auto-generated]
ENCRYPTION_KEY=[auto-generated]
JWT_SECRET=[auto-generated]
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

---

## 🚀 Running Strapi

### Development Mode (with auto-reload)
```bash
cd /Users/a2141/NOW/ksef-strapi-backend
npm run develop
```

### Production Mode
```bash
npm run build
npm run start
```

### Other Commands
```bash
npm run strapi               # Show all available commands
npm run strapi generate      # Generate new content types, controllers, etc.
npm run strapi console       # Interactive console
```

---

## 🌐 URLs

| Service | URL | Status |
|---------|-----|--------|
| **Admin Panel** | http://localhost:1337/admin | ✅ Active |
| **API Root** | http://localhost:1337/api | ✅ Active (404 until content types created) |
| **Next.js Frontend** | http://localhost:3000 | ✅ Active (separate process) |

---

## 📊 Database

- **Type**: SQLite
- **Location**: `.tmp/data.db`
- **Good for**: Development, testing, small projects
- **Migrate to PostgreSQL/MySQL**: When scaling to production

### Backup Database
```bash
cp .tmp/data.db .tmp/data.db.backup
```

---

## 🔐 Security Notes

### IMPORTANT: Keep these files SECRET!
- `.env` - Contains all secrets and API keys
- `.tmp/data.db` - SQLite database with all data
- Admin credentials

### Never commit to Git:
- `.env` file (already in .gitignore)
- `.tmp/` directory
- `node_modules/`

---

## 🎯 Next Steps

### PROMPT #2 - Create Content Types
You're ready to create the following content types:

1. **Article** (artykuły blogowe)
   - title, slug, content, excerpt, thumbnail
   - category, tags, difficulty, contentType
   - author (relation), publishedAt, updatedAt
   - readingTime, views, commentsCount
   - rating, isFeatured, isTrending, etc.

2. **Comment** (komentarze)
   - content, author name/email
   - relation to Article
   - createdAt, approved status

3. **ArticleView** (tracking wyświetleń)
   - relation to Article
   - IP address, user agent
   - createdAt timestamp

### Create Content Types via Admin Panel:
1. Otwórz http://localhost:1337/admin
2. Idź do: **Content-Type Builder** (lewa sidebar)
3. Click **Create new collection type**
4. Zdefiniuj pola zgodnie ze strukturą Article z `blog-data.ts`

### OR use CLI (faster for multiple fields):
```bash
npm run strapi generate
```

---

## 🐛 Troubleshooting

### Port 1337 already in use
```bash
# Change port in .env
PORT=1338

# Or kill existing process
lsof -i :1337
kill -9 [PID]
```

### SQLite errors
```bash
npm install better-sqlite3
```

### Build errors
```bash
rm -rf node_modules dist .tmp
npm install
npm run develop
```

### Can't access admin panel
```bash
# Check if Strapi is running
lsof -i :1337

# Restart Strapi
npm run develop
```

### Database reset (WARNING: deletes all data!)
```bash
rm -rf .tmp
npm run develop  # Will create new database
```

---

## 📝 Development Workflow

1. **Start both servers:**
   ```bash
   # Terminal 1: Strapi backend
   cd /Users/a2141/NOW/ksef-strapi-backend
   npm run develop

   # Terminal 2: Next.js frontend
   cd /Users/a2141/NOW/ksef-expert-konsolid
   npm run dev
   ```

2. **Create content in Strapi admin panel**
3. **Consume API in Next.js**
4. **Test and iterate**

---

## 🔗 Integration with Next.js

### Install Strapi SDK in Next.js project:
```bash
cd /Users/a2141/NOW/ksef-expert-konsolid
npm install @strapi/sdk-plugin-graphql  # If using GraphQL
# OR
npm install axios  # If using REST API directly
```

### Example API call (REST):
```typescript
// lib/strapi.ts
const STRAPI_URL = 'http://localhost:1337'

export async function getArticles() {
  const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`)
  const data = await response.json()
  return data.data
}
```

---

## ✨ Success Indicators

✅ Strapi running on http://localhost:1337
✅ Admin panel accessible and functional
✅ Admin user created and can login
✅ API endpoint responding (even with 404 for now)
✅ TypeScript compilation working
✅ SQLite database created
✅ Configuration files properly set up
✅ No errors in terminal output

---

## 📚 Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi REST API Reference](https://docs.strapi.io/dev-docs/api/rest)
- [Content-Type Builder Guide](https://docs.strapi.io/user-docs/content-type-builder)
- [Next.js Integration](https://strapi.io/integrations/nextjs-cms)

---

**Setup completed by:** Claude (Senior Backend Developer)
**Date:** 2025-10-30
**Strapi Version:** v5.30.0
**Node Version:** v22.19.0
**Database:** SQLite (development)

---

## 🎯 Ready for PROMPT #2!

Your Strapi backend is fully set up and ready for content type creation.
Proceed with creating the Article, Comment, and ArticleView content types! 🚀
