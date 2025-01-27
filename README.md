## This is a job-search-helper that is deployed in a private domain.
Main function is to store jobs, manage their states (Applied | Not applied) and make notes about the tech-stacks or important info about the position. 
Adding and deleting job-postings is easy and you can find them all in the same place. Filtering done by "Due date".
Mainly for personal use and the main thing is to remove the excess use of Notes-app and clarify job searching. Also you can save the description of the job to help you prepare for an interview after the job listing is deleted from recruitment websites.


<img width="551" alt="Screenshot 2025-01-28 at 0 54 55" src="https://github.com/user-attachments/assets/7bb53c61-56d9-476c-adef-5140c60a10fc" />

<img width="391" alt="Screenshot 2025-01-09 at 0 23 33" src="https://github.com/user-attachments/assets/bba79a32-2800-477d-a233-6f788a07b3d5" />





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









