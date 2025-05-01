import { GraduationCap } from 'lucide-react';
import PropTypes from 'prop-types';


const Education = ({ edu }) => {
    return (
        <div>
            <div className="space-y-4">
                <div className="flex gap-3">
                    <GraduationCap className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                        <h3 className="font-medium">{edu.institute}</h3>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                </div>


            </div>
        </div>
    );
};
Education.propTypes = {
    edu: PropTypes.object
}
export default Education;