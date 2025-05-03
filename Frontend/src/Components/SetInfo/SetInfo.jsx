import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const emptyTemplates = {
  education: { institute: '', year: '' },
  experience: { title: '', year: '', about: '' },
  skill: '',
  languages: ''
};

const SetInfo = ({ information, type, onAdd, onRemove }) => {
  const [item, setItem] = useState(emptyTemplates,type);
  const [isExpanded, setIsExpanded] = useState(false);
console.log(item)
  // Reset form when type changes
  useEffect(() => {
    setItem(emptyTemplates[type]);
  }, [type]);

  const handleChange = (field, value) => {
    if (['education', 'experience'].includes(type)) {
      setItem(prev => ({ ...prev, [field]: value }));
    } else {
      setItem(value);
    }
  };

  const handleAdd = () => {
    onAdd(item);
    setItem(emptyTemplates[type]);
  };

  return (
    <div className="w-full collapse collapse-arrow bg-white text-black rounded-box border border-gray-200 mb-4">
      <input
        type="checkbox"
        checked={isExpanded}
        onChange={() => setIsExpanded(!isExpanded)}
      />
      <div className="collapse-title flex items-center justify-between p-4 hover:bg-gray-50">
        <h3 className="text-lg font-bold text-gray-700">{type}</h3>
      </div>
      <div className="collapse-content px-4 pb-4">
        <div className="grid gap-2 mb-4 md:grid-cols-2">
          {['education', 'experience'].includes(type.toLowerCase()) ? (
            Object.keys(emptyTemplates[type.toLowerCase()]).map(field => (
                console.log(field,item),
              <input
                key={field}
                
                onChange={e => handleChange(field, e.target.value)}
                className="input bg-white text-black border-gray-300 input-bordered w-full focus:ring-3 focus:ring-blue-900"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))
          ) : (
            <input
              type="text"
              onChange={e => handleChange(null, e.target.value)}
              className="input bg-white text-black border-gray-300 input-bordered w-full focus:ring-3 focus:ring-blue-900"
              placeholder={`Enter your ${type}`} 
            />
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="btn btn-primary mb-4"
        >
          Add {type}
        </motion.button>

        <div className="flex flex-col gap-2">
          {information?.map((info, idx) => {
            const isObject = info && typeof info === 'object';
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div>
                  {isObject ? (
                    Object.entries(info)
                      .filter(([k]) => k !== '_id')
                      .map(([k, v]) => (
                        <p key={k} className="text-sm text-gray-700">
                          <strong>{k.charAt(0).toUpperCase() + k.slice(1)}:</strong> {v}
                        </p>
                      ))
                  ) : (
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                      {info}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onRemove(idx)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

SetInfo.propTypes = {
  information: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['education', 'experience', 'skill', 'languages']).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default SetInfo;
