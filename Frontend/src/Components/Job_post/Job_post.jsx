
import { useState } from "react"
import { Briefcase, Clock, DollarSign, GraduationCap, Calendar, LocateIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Job_Post() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        jobType: "",
        salary: "",
        days: "",
        location: "",
        hours: "",
        description: "",
        lng: 0,
        lat: 0
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            
            const position = await new Promise((resolve,reject)=>{
                navigator.geolocation.getCurrentPosition(resolve,reject,{
                    enableHighAccuracy:true,
                    timeout:10000,
                    
                }) })
                setFormData((prev)=>({
                    ...prev,
                    lng:position.coords.longitude,
                    lat:position.coords.latitude
                    
                }))
                setIsSubmitting(true)
          console.log(formData)
        setTimeout(() => {
            setIsSubmitting(false)
            Navigate(-1)
        }, 1500)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container bg-white text-black mx-auto px-4 py-12">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                        <Briefcase size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Create Tuition Job Post</h1>
                        <p className="text-slate-600 ">Find the perfect tutor for your needs</p>
                    </div>
                </div>

                <div className="border-1 border-gray-300 rounded-2xl p-4">
                    <div className="pb-6">
                        <h2 className="text-2xl font-semibold">Tuition Job Details</h2>
                        <p className="text-gray-600">Fill in the information about the tutoring position</p>
                    </div>
                    <div >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="title" className="font-semibold">Job Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    className="w-full rounded-2xl px-2 border-gray-300 h-8"
                                    placeholder="e.g., Math Tutor Needed for High School Student"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="subject" className="font-semibold">Subject</label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-[30%] h-4 w-4 text-slate-500" />
                                        <input
                                            id="subject"
                                            name="subject"
                                            className="w-full h-8  pl-10 rounded-2xl px-2 border-gray-300"
                                            placeholder="e.g., Mathematics, Physics"
                                            value={formData.subject}
                                            onChange={handleInputChange}

                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="jobType" className="font-semibold">Job Type</label>
                                    <select
                                        value={formData.jobType}
                                        onChange={(e) => handleSelectChange("jobType", e.target.value)}
                                        className="w-full h-8 rounded-2xl px-2 border-gray-300"
                                        required
                                        id="jobType"
                                    >
                                        <option value="">Select job type</option>
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="one-time">One-time</option>
                                        <option value="recurring">Recurring</option>
                                    </select>                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <label htmlFor="salary" className="font-semibold">Salary/Rate</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-[30%] h-4 w-4 text-slate-500" />
                                        <input
                                            id="salary"
                                            name="salary"
                                            placeholder="e.g., $30/hr"
                                            value={formData.salary}
                                            onChange={handleInputChange}
                                            className="pl-10 h-8 rounded-2xl px-2 border-gray-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="days" className="font-semibold">Days per Week</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-[30%] items-center h-4 w-4 text-slate-500" />
                                        <input
                                            id="days"
                                            name="days"
                                            placeholder="e.g., 3 days"
                                            value={formData.days}
                                            onChange={handleInputChange}
                                            className="pl-10 rounded-2xl px-2 border-gray-300 h-8 w-full"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="hours" className="font-semibold">Hours per Session</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-[30%] h-4 w-4 text-slate-500" />
                                        <input
                                            id="hours"
                                            name="hours"
                                            placeholder="e.g., 2 hours"
                                            value={formData.hours}
                                            onChange={handleInputChange}
                                            className="pl-10 rounded-2xl px-2 border-gray-300 h-8 w-full"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="location" className="font-semibold">Location</label>
                                <div className="relative">
                                    <LocateIcon className="absolute left-3 top-[30%] h-4 w-4 text-slate-500" />
                                    <input
                                        id="location"
                                        name="location"
                                        placeholder="e.g., Mirpur-10,Dhaka"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="pl-10 rounded-2xl border-gray-300 h-8 w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="description" className="font-semibold">Job Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe the tutoring job, requirements, and expectations..."
                                    rows={6}
                                    className="w-full px-4 py-3 resize-none rounded-2xl border-gray-600"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={()=>Navigate(-1)} className="btn">
                                    Cancel
                                </button>
                                <button className="btn bg-blue-900 text-lg text-white rounded-xl font-semibold px-3 " type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Publishing..." : "Publish Job Post"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
