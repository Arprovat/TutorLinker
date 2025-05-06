import {  useNavigate } from "react-router-dom"
import { BookOpen, BuildingIcon, CalendarDays, ClockIcon, Currency, MapPinIcon, Users } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { applyToJob } from "../../Redux/JobSlice"
import { toast, ToastContainer } from "react-toastify"

export default function JobDetailsPage() {
const userId = localStorage.getItem("userId")
const [showApplicants, setShowApplicants] = useState(false)
const navigate = useNavigate() 
const dispatch = useDispatch()
const [openModal,setOpenModal]=useState(false)
const {selectedPost} =useSelector(state=>state.jobPost)

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
const handleSubmit = async()=>{
const response =await dispatch(applyToJob({postId:selectedPost._id, applicantData:''}))
if(response.payload.success){
setOpenModal(!openModal)
toast(response.payload.message)
}
else{
  toast(response.payload.message)
  setOpenModal(!openModal)
}
}
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
    <ToastContainer></ToastContainer>
    <button onClick={()=>navigate(-1)} className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      Back to Jobs
    </button>

    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 relative">
      <div className="flex items-start gap-6 mb-8">
        <div className="avatar">
          <div className="w-20 h-20 rounded-xl border-2 border-white shadow-sm bg-gradient-to-br from-blue-50 to-purple-50">
            <BuildingIcon className="w-full h-full p-4 text-blue-600" />
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedPost.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays className="w-4 h-4" />
                <span>Posted on {formatDate(selectedPost.createdAt)}</span>
              </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-lg text-gray-600">
              <BuildingIcon className="w-5 h-5" />
              <span>{selectedPost.userId.username}</span>
            </div>
            
            <button 
            onClick={()=>{setOpenModal(!openModal)}}
              className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg
                       hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm"
            >
              Apply Now
            </button>
            {
              openModal && (
<dialog id="my_modal_3" className={`modal modal-bottom sm:modal-middle ${openModal ? "modal-open" : ""}`}>
  <div className="modal-box bg-white text-black">
    <form method="dialog">
      <button onClick={()=>setOpenModal(!openModal)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="text-lg font-semibold mb-4">Would you like to upload your resume?</h3>
    <div className="form-control">
                  <label className="label">
                    <span className="label-text">Resume</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    accept=".pdf,.doc,.docx"
                    
                  />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                <button type="button" className="btn btn-ghost" onClick={()=>setOpenModal(!openModal)}>
                  Cancel
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                  Submit Application
                </button>
              </div>
  </div>
</dialog>
              )
            }
          </div>

          {userId === selectedPost.userId._id && (
            <button 
              onClick={() => setShowApplicants(!showApplicants)}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg
                       hover:bg-emerald-200 transition-colors flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              {selectedPost.applicationId.length} Applicants
            </button>
          )}
          
        </div>
      </div>

      {showApplicants && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg text-cyan-600 font-semibold mb-4">Applicants List</h3>
          <ui className='list'>
          {selectedPost.applicationId.length > 0 ? (
            selectedPost.applicationId.map((applicant) => (
              <li className="list-row" key={applicant._id}>
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
    <div>
      <div>Dio Lupa</div>
      <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
    </div>
    <button className="btn btn-square btn-ghost">
      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
    </button>
    <button className="btn btn-square btn-ghost">
      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
    </button>
  </li>
            ))
          ) : (
            <p className="text-gray-500">No applicants yet</p>
          )}
          </ui>
        </div>
      )}
       <div className="flex flex-wrap gap-2 mb-4">
              {selectedPost.subject?.map((subject, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Hours per Week</p>
                <p className="font-medium text-gray-900">{selectedPost.hours}</p>
              </div>
            </div>
          </div>

          {/* Existing blocks */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <MapPinIcon className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium text-gray-900">{selectedPost.location}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <Currency className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Salary Range</p>
                <p className="font-medium text-gray-900">{selectedPost.salary}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Job Type</p>
                <p className="font-medium text-gray-900">{selectedPost.jobType}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 mb-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 pb-2 border-b border-gray-200">Job Description</h2>
            <div className="prose text-gray-700 space-y-4">
              <p>
                {selectedPost.description}
              </p>
  
            </div>
          </section>
        </div>

       
      </div>

    </div>
  )
}