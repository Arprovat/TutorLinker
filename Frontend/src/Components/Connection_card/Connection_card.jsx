
const Connection_card = () => {
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="profile_pic" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        UserName
                    </h2>
                    <div className="card-actions justify-end">
                        <button className="badge badge-outline">Accept</button>
                        <button className="badge badge-outline">Reject</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Connection_card;