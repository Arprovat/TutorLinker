import { BookOpen, Users, BriefcaseIcon, Bell, FileText, UserCircle, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"


export default function FeaturesPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                EduConnect Features
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Connecting students and teachers through a powerful educational platform. Discover all the tools
                designed to enhance your learning and teaching experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full  text-black py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center rounded-lg bg-blue-100 p-2 shadow-sm">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">For Students</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Create & View Posts</h4>
                    <p className="text-sm text-gray-500">Share your thoughts and view content from others</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Edit Profile</h4>
                    <p className="text-sm text-gray-500">Customize your profile to showcase your skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">View Applicants</h4>
                    <p className="text-sm text-gray-500">See who&apos;s applied to your job postings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Job Postings</h4>
                    <p className="text-sm text-gray-500">Post job opportunities for teachers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center rounded-lg bg-purple-100 p-2 shadow-sm">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold">For Teachers</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Search Jobs by Range</h4>
                    <p className="text-sm text-gray-500">Find opportunities that match your criteria</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Apply to Posts</h4>
                    <p className="text-sm text-gray-500">Easily apply to student job postings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Create Educational Content</h4>
                    <p className="text-sm text-gray-500">Share your knowledge and expertise</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Professional Profile</h4>
                    <p className="text-sm text-gray-500">Showcase your qualifications and experience</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center rounded-lg bg-green-100 p-2 shadow-sm">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold">For Everyone</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Post Educational Content</h4>
                    <p className="text-sm text-gray-500">Share valuable resources with the community</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Edit Profile</h4>
                    <p className="text-sm text-gray-500">Keep your information up-to-date</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Notifications</h4>
                    <p className="text-sm text-gray-500">Stay informed about relevant activities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 transition-all hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Interactive Community</h4>
                    <p className="text-sm text-gray-500">Connect with like-minded individuals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How EduConnect Works</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Our platform brings together students and teachers in a seamless educational ecosystem.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="/placeholder.svg?height=400&width=600"
              width={600}
              height={400}
              alt="EduConnect Platform Screenshot"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <UserCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold">Create Your Profile</h3>
                    </div>
                    <p className="text-sm text-gray-500 pl-10">
                      Set up your profile as a student or teacher and showcase your skills and interests.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                        <FileText className="h-4 w-4 text-purple-600" />
                      </div>
                      <h3 className="font-semibold">Post or Search</h3>
                    </div>
                    <p className="text-sm text-gray-500 pl-10">
                      Students can post job opportunities while teachers can search and apply for positions.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <Bell className="h-4 w-4 text-green-600" />
                      </div>
                      <h3 className="font-semibold">Stay Connected</h3>
                    </div>
                    <p className="text-sm text-gray-500 pl-10">
                      Receive notifications about applications, new posts, and other relevant activities.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                        <BriefcaseIcon className="h-4 w-4 text-orange-600" />
                      </div>
                      <h3 className="font-semibold">Collaborate</h3>
                    </div>
                    <p className="text-sm text-gray-500 pl-10">
                      Connect with others to share educational content and collaborate on projects.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Join EduConnect today and become part of our growing educational community.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/signup">
                <button className="bg-blue-600 btn hover:bg-blue-700 ">Sign Up Now</button>
              </Link>
              <Link to="/about">
                <button className="btn bg-white text-black" >Learn More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
