import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Job, NewJob } from "./types"

interface JobFormProps {
  onAddJob: (job: NewJob) => void
  setCurrentPage: (page: "home" | "add") => void
}

export function JobForm({ onAddJob, setCurrentPage }: JobFormProps) {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [link, setLink] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newJob: Omit<Job, 'id' | 'created_at'> = {
      title,
      company,
      description,
      due_date: dueDate,
      status: "Not Applied",
      link,
      location
    }
    onAddJob(newJob)
    setCurrentPage("home")
    setTitle("")
    setCompany("")
    setDescription("")
    setDueDate("")
    setLink("")
    setLocation("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="bg-gray-800 text-gray-100 border-gray-700"
      />
      <Input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        className="bg-gray-800 text-gray-100 border-gray-700"
      />
      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="bg-gray-800 text-gray-100 border-gray-700"
      />
      <Input
        type="url"
        placeholder="Job Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
        className="bg-gray-800 text-gray-100 border-gray-700"
      />
      <Textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="bg-gray-800 text-gray-100 border-gray-700"
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="bg-gray-800 text-gray-100 border-gray-700"
      />
      <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Add Job</Button>
    </form>
  )
}

