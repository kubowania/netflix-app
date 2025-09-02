# Netflix Clone App Setup Guide

This is a fully functional Netflix clone built with Next.js, TypeScript, MongoDB, and NextAuth.js.

## Features

- 🔐 **Authentication**: User registration and login with NextAuth.js
- 🎬 **Movie Catalog**: Browse movies and TV shows with Netflix-style interface
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎯 **Featured Content**: Hero section with trending and featured movies
- 🎞️ **Movie Rows**: Horizontal scrollable movie rows by category
- 💾 **MongoDB Integration**: User and movie data stored in MongoDB
- 🎨 **Netflix-style UI**: Authentic Netflix design with CSS modules

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally OR MongoDB Atlas account
- A terminal/command line interface

## Setup Instructions

### 1. Environment Variables

Copy the environment template and configure your variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```env
# For MongoDB Atlas (replace with your connection string):
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-app?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-here
```

### 2. Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Copy the output and replace `your-super-secret-nextauth-secret-here` in your `.env.local` file.

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The app will create the database automatically

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Replace the MONGODB_URI in `.env.local`

### 4. Install Dependencies and Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### 5. Seed the Database

To populate your database with sample movies, make a POST request to the seed endpoint:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or visit `http://localhost:3000/api/seed` in your browser.

## Usage

### 1. Register a New Account
- Go to `http://localhost:3000/register`
- Fill in your name, email, and password
- You'll be automatically signed in

### 2. Sign In
- Go to `http://localhost:3000/login`
- Use your email and password to sign in

### 3. Browse Content
- The homepage shows featured movies, trending content, movies, and TV shows
- Click on movie cards to see more details (placeholder functionality)
- Use the navigation to browse different categories

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication
- `GET /api/movies` - Get all movies
- `GET /api/movies?category=movie` - Get movies only
- `GET /api/movies?category=series` - Get TV series only
- `GET /api/movies?featured=true` - Get featured content
- `GET /api/movies?trending=true` - Get trending content
- `POST /api/seed` - Seed database with sample data

## Sample Users for Testing

You can create test users through the registration form, or you can manually insert test users into your MongoDB database.

## Customization

### Adding More Movies
You can add more movies by:
1. Editing `src/lib/sampleData.ts`
2. Making POST requests to `/api/movies` with movie data
3. Directly inserting into your MongoDB database

### Styling
- Global styles: `src/app/globals.css`
- Component styles: `src/styles/*.module.css`
- Netflix color variables are defined in `globals.css`

## Deployment

### Environment Variables for Production
Make sure to set these environment variables in your production environment:
- `MONGODB_URI` - Your production MongoDB connection string
- `NEXTAUTH_URL` - Your production domain (e.g., `https://yourdomain.com`)
- `NEXTAUTH_SECRET` - A secure random secret

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set your environment variables in Vercel dashboard
4. Deploy!

## Troubleshooting

### MongoDB Connection Issues
- Check your MongoDB URI is correct
- Ensure MongoDB is running (for local setup)
- Check network access settings (for Atlas)
- Verify database user permissions (for Atlas)

### Authentication Issues
- Ensure NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies if having session issues

### Build Issues
- Run `npm run build` to check for TypeScript errors
- Ensure all dependencies are installed
- Check that all environment variables are set

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **MongoDB** - NoSQL database for storing user and movie data
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication library for Next.js
- **bcryptjs** - Password hashing
- **CSS Modules** - Component-scoped styling

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## License

This project is for educational purposes. Netflix is a trademark of Netflix, Inc.
