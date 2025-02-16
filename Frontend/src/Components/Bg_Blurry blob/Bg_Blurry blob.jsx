import { motion } from "framer-motion"
import PropTypes from "prop-types"
const Bg_Blurry_blob = ({duration}) => {  
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={`absolute top-[25%] left-[10%] w-[20%] h-[20%] rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-30 blur-[80px]`}
      />
    </div>
  )
}

Bg_Blurry_blob.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default Bg_Blurry_blob;
