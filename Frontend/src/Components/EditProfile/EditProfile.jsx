import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
import SetInfo from "../SetInfo/SetInfo";
import { editProfile, setAddress, setdob, setInfo, setRelationShip, setReligious } from "../../Redux/Profileslice";
import PropTypes from "prop-types";

const FieldSet = ({ value, action, label }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col gap-2 w-full text-black">
            <label className='text-sm font-semibold text-gray-600' htmlFor={label}>
                {label}
            </label>
            <input
                type={label === 'Date Of Birth' ? 'date' : 'text'}
                onChange={(e) => dispatch(action(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                placeholder={label === 'Date Of Birth' ? 'Select date' : 'Enter your information...'}
                value={value}
                id={label}
            />
        </div>
    );
};

FieldSet.propTypes = {
    value: PropTypes.string,
    action: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

const EditProfile = () => {
    const { profile_pic,cover_pic,username, address, relationship, religious, dob, experience, skill, education, languages } = useSelector(
        (state) => state.profile
    );
    const dispatch = useDispatch()
    const handleAddInfo =(field,value)=>{
        console.log(field,value)
    dispatch(setInfo({field,value}))
    }
const handleSave=()=>{
    const updateData ={
        profile_pic:profile_pic?profile_pic:'',cover_pic:cover_pic?cover_pic:'', address, relationship, religious, dob, experience, skill, education, languages
    }
    dispatch(editProfile(updateData))
}
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                    <p className="text-gray-500 mt-2">Update your personal information</p>
                </div>

                <div className="mb-8 flex items-center gap-6">
                    <div className="relative group">
                        <img
                            src=""
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <label className="absolute bottom-0 right-0 cursor-pointer bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors">
                            <Camera className="text-white" size={20} />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"

                            />
                        </label>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{username}</h2>

                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <FieldSet value={address} label="Address" action={setAddress} />
                        <FieldSet value={dob} label="Date Of Birth" action={setdob} />
                    </div>

                    <div className="space-y-6">
                        <SetInfo  onAdd={(value)=>handleAddInfo('education',value)} information={education} type="Education" />
                        <SetInfo onAdd={(value)=>handleAddInfo("experience",value)} information={experience} type="Experience" />
                        <SetInfo onAdd={(value)=>handleAddInfo('skill',value)} information={skill} type="Skill" />
                        <SetInfo onAdd={(value)=>handleAddInfo('languages',value)} information={languages} type="Languages" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex flex-col text-black">
                        <label className='text-sm font-semibold text-gray-600' >
                relationship
            </label>
                            <select defaultValue={relationship} 
                              onChange={(e) => dispatch(setRelationShip(e.target.value))}

                            className="w-full h-16 p-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all select">
                                <option>Single</option>
                                <option>Married</option>
                                <option>Complicated</option>
                            </select>
                        </div>
                        <FieldSet value={religious} label="religious" action={setReligious} />
                    </div></div>
                <div className="mt-8 border-t pt-6">
                    <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors" onClick={()=>handleSave()}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;