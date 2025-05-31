# Donezo - Your Personal Task Manager

Donezo is a modern and intuitive to-do application designed to help you manage your tasks efficiently. With authentication, task management, and a dashboard, Donezo ensures that you stay on top of your to-dos effortlessly.

## Features

- ✅ **User Authentication** - Secure login and signup functionality.
- 📝 **Task Management** - Add, update, delete, and mark tasks as complete.
- 📅 **Scheduling** - Set due dates for tasks.
- 🗒 **Notes** - Add additional details to tasks.
- 📊 **Dashboard** - View your task progress and analytics.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (Frontend), Railway/Fly.io (Backend)

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/donezo.git
   cd donezo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (create a `.env` file):
   ```env
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```
4. Run the development server:
   ```sh
   npm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

Happy task managing with **Donezo**! 🚀
