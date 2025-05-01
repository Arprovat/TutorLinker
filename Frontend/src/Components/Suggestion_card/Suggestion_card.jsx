
import { UserPlus } from "lucide-react"
import { useState } from "react"



export default function SuggestionCard() {
    const [connect,setConnect]=useState(false)
  return (
    <div className="card bg-zinc-100 text-black  shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full">
              <img src='' alt='' width={64} height={64} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">suggestion.name</h3>
            
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            className='btn  btn-sm' onClick={()=>setConnect(true)}>
           
            {connect ? (
              <>
                <span className="loading loading-spinner loading-xs mr-1"></span>
                Connecting...
              </>
            ) : (
              <>
                <UserPlus size={16} className="mr-1" />
                Connect
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
