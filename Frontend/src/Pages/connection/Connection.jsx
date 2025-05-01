
import { useState } from "react"
import ConnectionCard from "../../Components/Connection_card/Connection_card"
import RequestCard from "../../Components/request_card/Request_card"
import SuggestionCard from "../../Components/Suggestion_card/Suggestion_card"


// Mock data
const mockConnections = [
  {
    id: 1,
    name: "Jane Smith",
    title: "Product Manager",
    company: "TechCorp",
    connected: true,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "John Doe",
    title: "Software Engineer",
    company: "DevInc",
    connected: true,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "UX Designer",
    company: "DesignHub",
    connected: true,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
]

const mockRequests = [
  {
    id: 4,
    name: "Michael Brown",
    title: "Marketing Director",
    company: "BrandCo",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Emily Davis",
    title: "Data Scientist",
    company: "DataTech",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
]

const mockSuggestions = [
  {
    id: 6,
    name: "David Wilson",
    title: "Frontend Developer",
    company: "WebWorks",
    mutualConnections: 3,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 7,
    name: "Lisa Chen",
    title: "Project Manager",
    company: "AgileTeam",
    mutualConnections: 5,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 8,
    name: "Robert Taylor",
    title: "CTO",
    company: "StartupX",
    mutualConnections: 2,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 9,
    name: "Amanda Lee",
    title: "HR Manager",
    company: "PeopleFirst",
    mutualConnections: 4,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
]

export default function ConnectionsPage() {
  const [connections, setConnections] = useState(mockConnections)
  const [requests, setRequests] = useState(mockRequests)
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [activeTab, setActiveTab] = useState("connections")

  const handleAcceptRequest = (id) => {
    const request = requests.find((r) => r.id === id)
    if (request) {
      setConnections([...connections, { ...request, connected: true }])
      setRequests(requests.filter((r) => r.id !== id))
    }
  }

  const handleIgnoreRequest = (id) => {
    setRequests(requests.filter((r) => r.id !== id))
  }

  const handleConnect = (id) => {
    setSuggestions(suggestions.map((s) => (s.id === id ? { ...s, connecting: true } : s)))
  }

  return (
    <div className="container text-black bg-white min-h-screen mx-auto p-4">
 
      <h1 className="text-3xl font-bold mb-6">My Network</h1>

      <div className="flex gap-4 mb-6">
        <a
          className={` ${activeTab === "connections" && "text-black bg-gray-200" } text-gray-500 p-2  cursor-pointer hover:bg-gray-200 rounded-2xl`}
          onClick={() => setActiveTab("connections")}
        >
          Connections ({connections.length})
        </a>
        <a className={` cursor-pointer ${activeTab === "requests" && "text-black bg-gray-200" } text-gray-500 p-2 hover:bg-gray-200 rounded-2xl`} onClick={() => setActiveTab("requests")}>
          Requests ({requests.length})
        </a>
        <a
          className={` cursor-pointe  text-gray-900 ${activeTab === "suggestions" && "text-black bg-gray-200"} text-gray-500 hover:bg-gray-200 rounded-2xl p-2`}
          onClick={() => setActiveTab("suggestions")}
        >
          Suggestions ({suggestions.length})
        </a>
      </div>

      {activeTab === "connections" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connections.map((connection) => (
            <ConnectionCard key={connection.id} connection={connection} />
          ))}
        </div>
      )}

      {activeTab === "requests" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onAccept={() => handleAcceptRequest(request.id)}
                onIgnore={() => handleIgnoreRequest(request.id)}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-10">
              <p className="text-lg text-gray-500">You have no pending connection requests.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "suggestions" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onConnect={() => handleConnect(suggestion.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
