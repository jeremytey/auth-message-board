# Members Only 

A role-based access-controlled message board where members can post anonymously to the public, but fellow members can see who wrote what.
Built with Node.js, Express, PostgreSQL, and Passport.js as part of The Odin Project curriculum.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL (raw SQL via `pg`)
- **Auth:** Passport.js Local Strategy
- **Sessions:** express-session + connect-pg-simple
- **Templating:** EJS
- **Validation:** express-validator
- **Password Hashing:** bcrypt

---

## Roles

| Role | Can View Messages | See Author + Date | Create Messages | Delete Messages |
|---|---|---|---|---|
| Public | ✅ | ❌ | ❌ | ❌ |
| Guest (logged in) | ✅ | ❌ | ✅ | ❌ |
| Member | ✅ | ✅ | ✅ | ❌ |
| Admin | ✅ | ✅ | ✅ | ✅ |

---

## Local Setup

### Prerequisites

- Node.js v18+
- PostgreSQL installed and running locally

### 1. Clone the repository

```bash
git clone https://github.com/jeremytey/auth-message-board.git
cd auth-message-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your environment file

```bash
cp .env.example .env
```

Then open `.env` and fill in your values:

```
DATABASE_URL=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/members_only
SESSION_SECRET=your_super_secret_session_key
MEMBER_PASSCODE=your_member_passcode
ADMIN_PASSCODE=your_admin_passcode
NODE_ENV=development
PORT=3000
```

### 4. Set up the database

Create the database in PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE members_only;"
```

Run the schema:

```bash
psql -U postgres -d members_only -f db/schema.sql
```

Optionally seed with sample data:

```bash
node db/seed.js
```

### 5. Start the development server

```bash
npm run dev
```

App will be running at `http://localhost:3000`

---

## Project Structure

```
auth-message-board/
├── config/
│   └── passport.js          # Passport Local Strategy configuration
├── controllers/
│   ├── authController.js    # Signup, login, logout, passcode handlers
│   └── messageController.js # Create, read, delete messages
├── db/
│   ├── pool.js              # PostgreSQL connection pool
│   ├── schema.sql           # Table definitions
│   ├── seed.js              # Sample data seeder
│   └── queries/
│       ├── userQueries.js   # All user-related SQL
│       └── messageQueries.js# All message-related SQL
├── middleware/
│   └── auth.js              # requireAuth, requireAdmin middleware
├── routers/
│   ├── authRouter.js        # /sign-up, /login, /logout, /passcode routes
│   └── messageRouter.js     # /messages routes
├── views/
│   ├── index.ejs            # Home page - all messages
│   ├── signupForm.ejs       # Sign up form
│   ├── loginForm.ejs        # Login form
│   ├── messageForm.ejs      # New message form
│   └── memberPasscode.ejs   # Membership/admin upgrade form
├── public/
│   └── style.css            # Minimal styling
├── .env.example             # Environment variable template
├── .gitignore
├── app.js                   # Express app entry point
└── package.json
```

---

## Scripts

```bash
npm run dev     # Start with nodemon (development)
npm start       # Start without nodemon (production)
```

---

## Deployment (Render)

1. Push your repo to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Create a **PostgreSQL** database on Render
4. Add all environment variables from `.env.example` in the Render dashboard
5. Set build command: `npm install`
6. Set start command: `npm start`
7. On first deploy, run your schema manually via Render's psql shell

---

## Security Notes

- Passwords are hashed with bcrypt (12 salt rounds)
- Sessions use httpOnly cookies
- Passcodes are stored in environment variables only — never in source code
- Admin role cannot be self-assigned via any form
- Rate limiting applied to login route

---
