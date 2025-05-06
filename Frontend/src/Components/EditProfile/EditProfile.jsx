import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
import SetInfo from "../SetInfo/SetInfo";
import {
    editProfile,
    setAddress,
    setdob,
    setRelationShip,
    setReligious,
    removeEducation,
    updateEducation,
    removeExperience,
    setInfo,
    setProfile,
} from "../../Redux/Profileslice";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UploadFile from "../../Helper/updateFile/UpdateFile";

const FieldSet = ({ value, action, label }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col bg-white text-black gap-2 w-full">
            <label className="text-sm font-semibold text-gray-600" htmlFor={label}>
                {label}
            </label>
            <input
                type={label === 'Date Of Birth' ? 'date' : 'text'}
                onChange={(e) => dispatch(action(e.target.value))}
                className="input input-bordered bg-white text-black w-full focus:ring-2 focus:ring-blue-500"
                placeholder={label === 'Date Of Birth' ? 'Select date' : 'Enter your information...'}
                value={value}
                id={label}
            />
        </div>
    );
};
FieldSet.propTypes = {
    value: PropTypes.string,
    action: PropTypes.func,
    label: PropTypes.string
}
const EditProfile = () => {
    const {
        profile_pic,
        cover_pic,
        username,
        address,
        relationship,
        religious,
        dob,
        experience,
        skill,
        education,
        languages,
    } = useSelector((state) => state.profile.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSave = async () => {
        const updateData = {
            profile_pic,
            cover_pic,
            address,
            relationship,
            religious,
            dob,
            experience,
            skill,
            education,
            languages,
        };
        const response = await dispatch(editProfile(updateData));
        if (response.payload.success) {
            toast(response.payload.message)
            navigate(-1)
        }
    };
    const handleImage = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (!file) return;
        try {
            const result = await UploadFile(file);
            console.log(result)
            const url = result?.url 
            dispatch(setProfile( url )); 
            toast.success("Profile picture updated!");
          } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload image");
          }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer></ToastContainer>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
                    <p className="text-gray-500 mt-2">Update your personal information</p>
                </header>

                <section className="mb-8 flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {profile_pic ? (
                                <img src={profile_pic} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-gray-400 text-2xl">👤</span>
                            )}
                        </div>
                        <label htmlFor="profile" className="absolute bottom-0 right-0 cursor-pointer bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-all shadow-lg">
                            <Camera className="text-white" size={20} />
                            <input
                                type="file"
                                id="profile"
                                onChange={handleImage}
                                className="hidden"
                                onClick={(e) => (e.target.value = null)}
                            />                        </label>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{username}</h2>
                        <p className="text-gray-500">Update your profile picture</p>
                    </div>
                </section>

                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <FieldSet value={address} label="Address" action={setAddress} />
                        <FieldSet value={dob} label="Date Of Birth" action={setdob} />
                    </div>

                    <div className="space-y-4">
                        <SetInfo
                            type="Education"
                            information={education}
                            onAdd={(item) => dispatch(setInfo({ field: 'education', item }))}
                            onUpdate={(index, item) => dispatch(updateEducation({ index, item }))}
                            onRemove={(index) => dispatch(removeEducation(index))}
                        />
                        <SetInfo
                            type="Experience"
                            information={experience}
                            onAdd={(item) => dispatch(setInfo({ field: 'experience', item }))}
                            onRemove={(index) => dispatch(removeExperience(index))}
                        />
                        <SetInfo
                            type="Skill"
                            information={skill}
                            onAdd={(value) => dispatch(setInfo({ field: 'skill', value }))}
                        />
                        <SetInfo
                            type="Languages"
                            information={languages}
                            onAdd={(value) => dispatch(setInfo({ field: 'languages', value }))}
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Relationship Status</span>
                            </label>
                            <select
                                value={relationship}
                                onChange={(e) => dispatch(setRelationShip(e.target.value))}
                                className="select text-black bg-white select-bordered w-full focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Single</option>
                                <option>Married</option>
                                <option>Complicated</option>
                            </select>
                        </div>
                        <FieldSet value={religious} label="Religious" action={setReligious} />
                    </div>
                </div>

                <footer className="mt-8 border-t pt-6">
                    <button
                        onClick={handleSave}
                        className="btn btn-primary w-full text-lg py-3 px-6 hover:bg-blue-600 transition-colors"
                    >
                        Save Changes
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default EditProfile;