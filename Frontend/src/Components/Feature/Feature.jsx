import {  useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Book, Video, Users, Search, MapPin, Star } from "lucide-react"
import FeatureCard from "../FeatureCard/FeatureCard"
const features = [
  { icon: Book, title: "Post Tutoring Jobs", description: "Students can easily post tutoring job requests." },
  { icon: Users, title: "Connect with Tutors", description: "Find and connect with qualified tutors in your area." },
  {
    icon: Video,
    title: "Educational Content",
    description: "Access a wide range of educational videos and resources.",
  },
  { icon: Search, title: "Range Search", description: "Search for Tution post within a specific range from your location." },
  { icon: MapPin, title: "Tutoring Heatmap", description: "Visualize areas with high tutoring demand." },
  { icon: Star, title: "Tutor Reviews", description: "Read and write reviews for tutors to ensure quality." },
]



export default function FeatureSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-12">Our Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

