

import { motion } from "framer-motion"
import CounterUp from "react-countup"
import PropTypes from "prop-types"
import { useOutletContext } from "react-router-dom"
const HeroSection = () => {
    const {theme} = useOutletContext()
  return (
    <section className={`relative ${theme === "dark" ?   "bg-gray-900": "bg-gray-50"}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${theme === "dark" ? "text-white": "text-gray-900"}`}>
            Connect, Learn, and Grow with <span className="text-primary ">EduConnect</span>
          </h1>
          <p className={`mt-6 text-xl ${theme === "dark" ? "text-gray-300": "text-gray-600"} max-w-3xl mx-auto`}>
            Join our thriving community of students and tutors. Find the perfect match for your learning needs or share
            your expertise with eager learners.
          </p>
          <div className="mt-12 flex justify-center space-x-6 sm:space-x-12">
            <div className="text-center">
              <p className={`text-4xl sm:text-5xl font-bold text-primary `}>
                <CounterUp start={0} end={5000}  duration={5} enableScrollSpy  />+
              </p>
              <p className={`mt-2 text-lg ${theme === "dark" ? "text-gray-300": "text-gray-600"}`}>Tutors</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-primary ">
                <CounterUp start={0} end={10000} duration={5} enableScrollSpy  />+
              </p>
              <p className={`mt-2 text-lg ${theme === "dark" ? "text-gray-300": "text-gray-600"}`}>Job Posts</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-primary ">
                <CounterUp start={0} end={50000} duration={5} enableScrollSpy  />+
              </p>
              <p className={`mt-2 text-lg ${theme === "dark" ? "text-gray-300": "text-gray-600"}`}>Students</p>
            </div>
          </div>
          <div className="mt-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#get-started"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-2xl shadow-primary/50  text-white bg-primary hover:bg-primary-dark "
            >
              Get Started
            </motion.a>
          </div>
        </motion.div>
      </div>
      
    </section>
  )
}
HeroSection.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default HeroSection

