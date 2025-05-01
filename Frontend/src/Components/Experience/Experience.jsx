import { Briefcase } from "lucide-react";
import PropTypes from "prop-types";

const Experience = ({experience}) => {
    return (
        <div>
          <div className="space-y-4 mt-4">
                                    <div className="flex gap-3">
                                        <Briefcase className="h-5 w-5 text-gray-500 mt-1" />
                                        <div>
                                            <h3 className="font-medium">{experience.title}</h3>
                                            <p className="text-sm text-gray-500">{experience.year}</p>
                                            <p>{experience.about}</p>
                                        </div>
                                    </div>  
                                    
                                    </div>
                                    </div>
    );
};
Experience.propTypes={
    experience:PropTypes.object
}
export default Experience;