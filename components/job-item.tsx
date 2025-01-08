import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Job } from "./types"

interface JobItemProps {
  job: Job
  onUpdateJob: (job: Job) => void
  onDeleteJob: (id: string) => void
}

export function JobItem({ job, onUpdateJob, onDeleteJob }: JobItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleStatusChange = (value: string) => {
    onUpdateJob({ ...job, status: value as "Not Applied" | "Applied" })
  }

  return (
    <Card className="bg-gray-800 text-gray-100">
      <CardHeader>
        <CardTitle className="text-gray-100">
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            {job.title} at {job.company}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400">Location: {job.location}</p>
        <p className="text-sm text-gray-400">Due: {new Date(job.due_date).toLocaleDateString()}</p>
        <p className="text-sm text-gray-400">Status: {job.status}</p>
        {isExpanded && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-200">Description:</h4>
            <p className="text-sm text-gray-300">{job.description}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="text-gray-200 border-gray-600 hover:bg-gray-700">
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
        <div className="flex space-x-2">
          <Select onValueChange={handleStatusChange} defaultValue={job.status}>
            <SelectTrigger className={`w-[120px] text-gray-200 border-gray-600 ${
              job.status === "Applied"
                ? "bg-green-600"
                : "bg-red-600"
            }`}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-200">
              <SelectItem value="Not Applied" className="hover:bg-red-600">Not Applied</SelectItem>
              <SelectItem value="Applied" className="hover:bg-green-600">Applied</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="destructive" onClick={() => onDeleteJob(job.id)} className="bg-gray-800 hover:bg-red-600">Delete</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

