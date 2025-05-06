
import { useState } from "react"
import { Send, Mail, Phone, MapPin, CheckCircle, Users, GraduationCap } from "lucide-react"
import { toast } from "react-toastify"



export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <section className="w-ful py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Story</h2>
              <p className="text-gray-500 md:text-lg">
                EduConnect was founded with a simple yet powerful vision: to create a platform where students and
                teachers could connect seamlessly, sharing knowledge and opportunities in an interactive environment.
              </p>
              <p className="text-gray-500 md:text-lg">
                What started as a small project has grown into a comprehensive educational ecosystem that serves
                thousands of users worldwide. Our platform enables students to post educational content, search for
                teaching assistance, and connect with qualified educators.
              </p>
              <p className="text-gray-500 md:text-lg">
                For teachers, EduConnect provides a space to showcase their expertise, find teaching opportunities, and
                contribute to the educational community through content sharing and collaboration.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="EduConnect Team"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Mission & Vision</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                We&apos;re committed to transforming educational connections through technology.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="overflow-hidden border-none shadow-lg transition-all hover:shadow-xl">
              <div className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-gray-500">
                    To create an accessible, user-friendly platform that connects students with teachers, fostering
                    educational growth and professional development for all users. We aim to make quality education more
                    accessible by facilitating meaningful connections between those who seek knowledge and those who can
                    provide it.
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden border-none shadow-lg transition-all hover:shadow-xl">
              <div className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                  <p className="text-gray-500">
                    To become the leading global platform for educational connections, where every student can find the
                    right teacher and every teacher can find meaningful opportunities. We envision a world where
                    geographical barriers no longer limit educational access, and where knowledge sharing becomes a
                    seamless, enriching experience for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-2 border  border-gray-300 bg-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-2xl">
              <div className="text-4xl font-bold">10K+</div>
              <p className="text-sm text-gray-500">Active Students</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border  border-gray-300 bg-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-2xl">
              <div className="text-4xl font-bold">5K+</div>
              <p className="text-sm text-gray-500">Qualified Teachers</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border  border-gray-300 bg-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-2xl">
              <div className="text-4xl font-bold">50K+</div>
              <p className="text-sm text-gray-500">Educational Posts</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border border-gray-300 bg-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-2xl">
              <div className="text-4xl font-bold">100+</div>
              <p className="text-sm text-gray-500">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Have questions or feedback? We&apos;d love to hear from you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-sm text-gray-500">provatar0@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-sm text-gray-500">01635739256</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-sm text-gray-500">123 Education Lane, Knowledge City, 12345</p>
                </div>
              </div>
              <div className="pt-4">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  width={500}
                  height={300}
                  alt="Office Location"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg  bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Message Sent!</h3>
                    <p className="text-gray-500">
                      Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                    <button  onClick={() => setIsSubmitted(false)} className="mt-4">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="border-gray-200 pl-4"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="border-gray-200 pl-4"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="subject">Subject</label>
                      <input
                        id="subject"
                        name="subject"
                        placeholder="Message subject"
                        required
                        className="border-gray-200 pl-4"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Your message"
                        required
                        className="min-h-[120px] pl-4 border-gray-200"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex btn btn-primary items-center justify-center gap-2">
                          <Send className="" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
