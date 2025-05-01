import { MessageSquare } from "lucide-react"


export default function ConnectionCard() {
  return (
    <div className="card  bg-zinc-100 text-black  shadow-xl hover:shadow-2xl shadow-gray-900 transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full">
              <img src="/placeholder.svg" alt='' width={64} height={64} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">connection.name</h3>
            <p className="text-sm text-gray-600">connection.title</p>
            <p className="text-sm text-gray-600">connection.company</p>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-outline btn-sm">
            <MessageSquare size={16} className="mr-1" />
           send Mail
          </button>
        </div>
      </div>
    </div>
  )
}
