This is a [Next.js](https://nextjs.org) TypeScript app.

# Welcome to the Hobby Verse
**Demo**: [https://hobbyverse.vercel.app/](https://hobbyverse.vercel.app/)

Hobby Verse is an event booking and management app for small businesses. Businesses can:

- Set up, edit, and delete events, tickets and categories
- Perform basic order management
- Manage user permissions

Users can:

- Browse events and add tickets to their basket
- Checkout and finalise orders
- View and print past orders
- View tickets and add to their Google Calendar

Authentication is based on JWT.

## User Guide
For the sake of the demo, there are two sets of user credentials you can use:
### Admin User
- admin@example.com
- adminhash123

### Customer User
- customer1@example.com
- customerhash123

If you want to register a new user, the API uses [Ethereal Email](https://ethereal.email/login) to spoof the registration process. To validate your email after registering as a user, use the following details to access the email verification process:

- [https://ethereal.email/login](https://ethereal.email/login), and use
- alexander.reynolds98@ethereal.email
- y7U31qScWH9CyzhwZv

### Admin Guide
To set up an event:
- **Create category**: `/admin/categories`, if the category doesn't already exist.
- **Create a ticket**: `/admin/tickets`. *Tickets are reusable. Create generic tickets to use across different events*
- **Add Events**: `/events`. Select `add event` and fill in the form.
- **Add Event Tickets**: `/events/:eventId`, choose the tickets you want to include and set the quantity. 
- **Set Event status to published**: `/events/:eventId`

### Customer Guide
An e-commerce process that is familiar to most users.

## Running locally
To run the app locally make a directory and initialise it with git - `git init` and clone the repository.

Now, 
```bash
npm install
```

to install all the dependencies for the app to run.

Your package.json should look like this

```json
{
  "name": "hobby-verse-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "dotenv": "^16.4.5",
    "luxon": "^3.5.0",
    "next": "14.2.8",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.53.0",
    "react-icons": "^5.3.0",
    "react-spinners": "^0.14.1"
  },
  "devDependencies": {
    "@types/luxon": "^3.4.2",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.8",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

### Environment
You need to create a `.env` file at the root directory.

```bash
NEXT_PUBLIC_UNSPLASH_API_KEY=your-api-key
NEXT_PUBLIC_UNSPLASH_SECRET=your-unspash-secret
NEXT_PUBLIC_IMAGE_HOST=https://api.unsplash.com/
NEXT_PUBLIC_API_HOST=https://-YOUR-LOCAL-HOST
```

#### Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
You will need to clone, set up and start the [Hobby Verse server](https://github.com/OJ423/hobby-verse). *Set up instructions included in the repo.*

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
- Next.js - React framework
- Axios
- React Hook Form
- Luxon (local data conversion)
- TypeScript
- Tailwind
- React icons
- React spinners (loading)

## Build

To build run `npm run build`



The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
