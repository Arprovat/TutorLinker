import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

const FeatureCard = ({icon:Icon,title,description}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer" 
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ y: isHovered ? 0 : [0, -10, 0] }}>
            <Icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl text-black font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
};

FeatureCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default FeatureCard;