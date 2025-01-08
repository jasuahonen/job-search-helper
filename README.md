## This is a job-search-helper that is deployed in a private domain.
Main function is to store jobs, manage their states (Applied | Not applied) and make notes about the tech-stacks or important info about the position. 
Adding and deleting job-postings is easy and you can find them all in the same place. Filtering done by "Due date".
Mainly for personal use.



### Built using Next.js + Supabase for CRUD operations.

### Deployed on Vercel. 

### If you would like to use this create a Supabase table and run this SQL command:

create table jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  description text,
  due_date date not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  link text,
  location text
);

### Add your Supabase environmental variables to a .env.local at your project root.

#### Deploying on Vercel:
#### Build command: npm run dev
#### Output directory: .next
#### Install command: npm install

Add your supabase env-variables to Vercel-project.
NEXT_PUBLIC_SUPABASE_URL=yourkey
NEXT_PUBLIC_SUPABASE_ANON_KEY=yourkey

Start applying for jobs and stay updated on your progress.:)









