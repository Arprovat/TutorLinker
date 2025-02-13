import { Facebook, Twitter as TwitterX, Instagram, Linkedin, Youtube } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">EduConnect</h3>
            <p className="text-sm text-gray-400">Connecting students and tutors for a brighter future.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <TwitterX size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/post-job" className="text-gray-400 hover:text-white">
                  Post a Tutoring Job
                </Link>
              </li>
              <li>
                <Link href="/find-tutor" className="text-gray-400 hover:text-white">
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link href="/educational-content" className="text-gray-400 hover:text-white">
                  Browse Educational Content
                </Link>
              </li>
              <li>
                <Link href="/tutor-reviews" className="text-gray-400 hover:text-white">
                  Read Tutor Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Tutors</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/apply-jobs" className="text-gray-400 hover:text-white">
                  Apply for Tutoring Jobs
                </Link>
              </li>
              <li>
                <Link href="/post-content" className="text-gray-400 hover:text-white">
                  Post Educational Content
                </Link>
              </li>
              <li>
                <Link href="/upload-video" className="text-gray-400 hover:text-white">
                  Upload Educational Videos
                </Link>
              </li>
              <li>
                <Link href="/tutor-dashboard" className="text-gray-400 hover:text-white">
                  Tutor Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/heatmap" className="text-gray-400 hover:text-white">
                  Tutoring Heatmap
                </Link>
              </li>
              <li>
                <Link href="/range-search" className="text-gray-400 hover:text-white">
                  Range Search
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} EduConnect. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/contact-us" className="hover:text-white">
            Abdur Rahman
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

