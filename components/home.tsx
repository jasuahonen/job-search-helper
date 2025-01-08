import { Job } from "./types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface HomeProps {
  jobs: Job[]
}

export function Home({ jobs }: HomeProps) {
  const sortedJobs = [...jobs].sort((a, b) => {
    // Parse dates in YYYY-MM-DD format
    const [yearA, monthA, dayA] = a.due_date.split('-').map(Number);
    const [yearB, monthB, dayB] = b.due_date.split('-').map(Number);

    // Create Date objects with consistent time (midnight UTC)
    const dateA = new Date(Date.UTC(yearA, monthA - 1, dayA));
    const dateB = new Date(Date.UTC(yearB, monthB - 1, dayB));

    // Handle invalid dates
    if (!isValid(dateA)) return 1;
    if (!isValid(dateB)) return -1;

    // Compare timestamps
    return dateA.getTime() - dateB.getTime();
  });

  // Helper function to check if date is valid
  function isValid(date: Date) {
    return date instanceof Date && !isNaN(date.getTime());
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">Your Applications</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedJobs.map((job) => (
          <Card key={job.id} className="bg-gray-800 text-gray-100 flex flex-col w-full">
            <CardHeader>
              <CardTitle className="text-gray-100">
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  {job.title}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-400">Company: {job.company}</p>
              <p className="text-sm text-gray-400">Location: {job.location}</p>
              <p className="text-sm text-gray-400">Due Date: {new Date(job.due_date).toLocaleDateString()}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant={job.status === "Applied" ? "default" : "outline"}
                className={`w-full ${
                  job.status === "Applied"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                {job.status === "Applied" ? "Applied" : "Not Applied"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

