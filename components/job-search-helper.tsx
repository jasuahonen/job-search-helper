"use client"

import { useState, useEffect } from "react"
import { JobForm } from "./job-form"
import { Job, NewJob } from "./types"
import { Home } from "./home"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { JobItem } from "./job-item"

export default function JobSearchHelper() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentPage, setCurrentPage] = useState<"home" | "add">("home")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching jobs:', error)
      return
    }

    setJobs(data || [])
  }

  const addJob = async (job: NewJob) => {
    const { error } = await supabase
      .from('jobs')
      .insert([job])

    if (error) {
      console.error('Error adding job:', error)
      return
    }

    fetchJobs()
  }

  const updateJob = async (updatedJob: Job) => {
    const { error } = await supabase
      .from('jobs')
      .update(updatedJob)
      .eq('id', updatedJob.id)

    if (error) {
      console.error('Error updating job:', error)
      return
    }

    fetchJobs()
  }

  const deleteJob = async (id: string) => {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting job:', error)
      return
    }

    fetchJobs()
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center">Job Search Helper</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <Button onClick={() => setCurrentPage("home")} variant={currentPage === "home" ? "default" : "outline"}>
          Home
        </Button>
        <Button onClick={() => setCurrentPage("add")} variant={currentPage === "add" ? "default" : "outline"}>
          Add Job
        </Button>
      </div>
      <div className="w-full max-w-7xl">
        {currentPage === "home" ? (
          <Home jobs={jobs} />
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <JobForm onAddJob={addJob} setCurrentPage={setCurrentPage} />
            </div>
            <div className="w-full mt-8 space-y-4">
              {jobs.map((job) => (
                <JobItem
                  key={job.id}
                  job={job}
                  onUpdateJob={updateJob}
                  onDeleteJob={deleteJob}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

