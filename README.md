<div align="center">
  <img src='./public/logo.png' width="100px" height="100px" />
  <h1>ResGenie</h1>
</div>

<h3 align="center">A simple online a resume builder web app built with Next.js and Supabase</h3>

<div align="center">
  <p>
    <a href="https://github.com/Carbowix/ResGenie/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/carbowix/ResGenie?style=for-the-badge" alt="license mit"/>
    </a>
    <a href="https://github.com/Carbowix/ResGenie">
      <img src="https://img.shields.io/github/package-json/v/carbowix/ResGenie?style=for-the-badge" alt="ResGenie version"/>
    </a>
    <br>
    <a href="https://discord.gg/nntu7rgxtP">
      <img src="https://img.shields.io/discord/633795546724827157?color=5865F2&logo=discord&logoColor=white" alt="Discord server" />
    </a>
  </p>
  <br>
    <a href="https://resgenie.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/Carbowix/ResGenie/issues">Report Bug</a>
    ·
    <a href="https://github.com/Carbowix/ResGenie/issues">Request Feature</a>
   
</div>
 <br>
<details>
<summary style="font-size: 21px;">Table of Contents</summary>
<ol>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
    </ul>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
</details>
<br>

# Features

- **Section Customization**: Allow users to add, edit, or remove sections in their resumes. Common sections may include "Objective," "Work Experience," "Education," "Skills," and "Certifications."
- **Export and Share**: Enable users to export their completed resumes in various formats (e.g., PDF, Word, or plain text) and share them with potential employers directly from the web app.
- **User-Friendly Interface**: The web app should have an intuitive and user-friendly interface.

# Getting Started

## Prerequisites

- Latest [Node.js LTS](https://nodejs.org/en/download)
- [Supabase](https://supabase.com/) database

## Installation

```bash
# Clone repo
git clone https://github.com/Carbowix/ResGenie.git

# Install the required packages
## Using NPM
npm install

## Using yarn (preferred)
yarn install
```

- Add your Supabase and Next-Auth details to `.env.example` (don't forget to rename `.env` obviously)

- Push and generate the prisma schema

```bash
## Using NPM
# Generate schema
npm run postinstall
# Push schema to database
npm run prisma:push

## Using yarn (preferred)
# Generate schema
yarn postinstall
# Push schema to database
yarn prisma:push
```

- Run the application on development mode

```bash
## Using NPM
npm run dev

## Using yarn
yarn run dev
```

# Technologies

This project is heavily based on the [nextjs-postgres-auth-starter](https://github.com/vercel/nextjs-postgres-auth-starter/)

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) for utility CSS classes
- [Next-Auth](https://next-auth.js.org/) for authentication
- [Supabase](https://supabase.com/) for PostgreSQL database hosting
- [Prisma](https://www.prisma.io/) for database ORM
- [ESLint](https://eslint.org/) configured with some initial rules
- [Prettier](https://prettier.io/) to enforce consistent code style

# Acknowledgements

- [SYNC INTERN's](https://www.syncinterns.com/) gave me the energy to do this project
- [ResGenie Icon](https://ideogram.ai/)
