import { X } from "lucide-react";
import PropTypes from "prop-types";

const Comment = ({ isOpen, isClose }) => {
    return (
        <div>
            <dialog id="post_modal" className={`modal modal-bottom sm:modal-middle ${isOpen ? "modal-open" : ""}`}>
                <div className="modal-box relative bg-white p-6 rounded-2xl shadow-lg">
                    <button
                        onClick={isClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                    >
                        <X/>
                    </button>
                
                </div>
            </dialog>

        </div>
    );
};


Comment.propTypes = {
    isOpen:PropTypes .bool.isRequired,
    isClose: PropTypes.func.isRequired

};
export default Comment;