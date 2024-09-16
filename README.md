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

this will install all the dependencies for the app to run

your package.json should look like this

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
