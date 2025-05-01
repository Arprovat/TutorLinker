import { Link } from "react-router-dom"
import { BuildingIcon, ClockIcon, Currency, MapPinIcon } from "lucide-react"

export default function JobDetailsPage() {

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Jobs
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
        <div className="flex items-start gap-6 mb-8">
          <div className="avatar">
            <div className="w-20 h-20 rounded-xl border-2 border-white shadow-sm">
              <img
                src="/placeholder.svg" 
                alt="Company Logo" 
                width={80} 
                height={80}
                className="bg-gray-100 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Software Engineer</h1>
            <div className="flex items-center gap-2 text-lg text-gray-600">
              <BuildingIcon className="w-5 h-5" />
              <span>TechCorp Inc.</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <MapPinIcon className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium text-gray-900">San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <Currency className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Salary Range</p>
                <p className="font-medium text-gray-900">$120K - $160K</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Job Type</p>
                <p className="font-medium text-gray-900">Full-time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 mb-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 pb-2 border-b border-gray-200">Job Description</h2>
            <div className="prose text-gray-700 space-y-4">
              <p>
                We are looking for a skilled Software Engineer to join our dynamic team. The ideal candidate will have
                experience in building scalable web applications and a passion for creating elegant solutions to complex
                problems.
              </p>
              <p>
                As a Software Engineer at TechCorp, you will be responsible for developing and maintaining our core
                products, collaborating with cross-functional teams, and contributing to the architecture of our systems.
              </p>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 sm:-mx-8 px-6 sm:px-8 mt-8">
          <button 
           
            className="w-full btn btn-primary btn-lg hover:scale-[1.02] transition-transform"
          >
            Apply Now
          </button>
        </div>
      </div>

    </div>
  )
}