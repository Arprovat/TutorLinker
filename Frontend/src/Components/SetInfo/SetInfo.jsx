import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SetInfo = ({ information, type,onAdd }) => {
    const [inputValue,setInputValue] =useState('')

    return (
        <div>
            <div className='my-2 text-black'>
                <fieldset className="fieldset rounded-box  border p-4">
                    <div className="join justify-between">
                        <label className='text-lg font-bold ' htmlFor={type}>{type}</label>
                        <input type="text" name={type} onChange={(e)=> setInputValue(e.target.value)} className="input rounded-2xl border-blue-300 border-2 w-[30%] focus:ring-2 focus:ring-blue-600 bg-gray-200 join-item" placeholder="" value={inputValue} />
                        <motion.button whileTap={{scale:1.1}}  onClick={()=>{
                            onAdd(inputValue)
                            setInputValue('')
                        }} className="btn  shadow-2xl rounded-full join-item text-lg ">ADD</motion.button>
                    </div>
                   <div className='flex gap-2'>
                    {
                         information?.length ?
                         information.map((info, index) => (
                                 <p key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                                     {info}
                                 </p>
                             ))
                             : "not provided"
                    }
                   </div>
                </fieldset>
               
            </div>
        </div>
    );
};

SetInfo.propTypes = {
    information: PropTypes.array,
    type: PropTypes.string.isRequired,
    onAdd:PropTypes.func
};

export default SetInfo;