
export default function RequestCard() {
  return (
    <div className="card  bg-zinc-100 text-black  shadow-xl hover:shadow-2xl">
      <div className="card-body p-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full">
              <img src='' alt='' width={64} height={64} />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">request.name</h3>
            <p className="text-sm text-gray-600">request.title</p>
            <p className="text-sm text-gray-600">request.company</p>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm" onClick=''>
            Accept
          </button>
          <button className="btn btn-ghost btn-sm" onClick=''>
            Ignore
          </button>
        </div>
      </div>
    </div>
  )
}
