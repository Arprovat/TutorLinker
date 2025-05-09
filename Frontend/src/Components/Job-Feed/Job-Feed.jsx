import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Job_card from "../job_card/Job_card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobPosts } from "../../Redux/JobSlice";
import { setCoordinate } from "../../Redux/AuthSlice";

const JobFeed = () => {
    const { posts } = useSelector((state) => state.jobPost)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [data, setData] = useState({
        lat: 0, lng: 0, range: 0
    })
    const handleMap = async()=> {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                    maximumAge: 0  
            })
        })
       dispatch(setCoordinate([position.coords.latitude,position.coords.longitude]))
      navigate('/main/map')
    } catch (error) {
        console.log(error)
    }
}
const handelRange = async (e) => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,

            })
        })
        setData(
            {
                lng: position.coords.longitude,
                lat: position.coords.latitude,
                range: e.target.value
            }

        )
    }
    catch (err) {
        console.log(err)
    }
}
useEffect(() => {
    dispatch(fetchAllJobPosts({ page, data }))
}, [dispatch, page, data])
useEffect(() => {
    setPage(1);
}, [data]);
const handleScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage((prev) => prev + 1);
    }
};

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
    <div className="bg-white p-6 rounded-xl shadow-md text-black mx-4 my-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Tuition Posts</h1>
            <button
               onClick={handleMap}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293a1 1 0 00-1.414 0l-1 1a1 1 0 000 1.414l3.586 3.586a1 1 0 001.414 0l1-1a1 1 0 000-1.414L3.707 3.293zm12.586 0a1 1 0 00-1.414 0l-1 1a1 1 0 000 1.414l3.586 3.586a1 1 0 001.414 0l1-1a1 1 0 000-1.414l-3.586-3.586z" clipRule="evenodd" />
                </svg>
                View Heat Map
            </button>
        </div>

        <div className="border rounded-lg bg-gray-50 overflow-hidden">
            <div className="collapse collapse-arrow group">
                <input
                    type="checkbox"
                    className="peer"
                    aria-label="Toggle search range filters"
                />
                <div className="collapse-title text-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">
                    Search Radius
                </div>
                <div className="collapse-content bg-white">
                    <div className="pt-4 pb-2 px-2">
                        <label className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                            <div>Set radius (km):
                                <span className="ml-2 text-teal-700 font-semibold">{data.range}</span></div>

                        </label>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            defaultValue={data.range}
                            onChange={(e) => handelRange(e)}
                            className="w-full range range-accent range-sm"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0 km</span>
                            <span>100 km</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-8  text-gray-500">
            {
                posts.map((post) => (
                    <Job_card key={post._id} post={post}></Job_card>
                ))
            }
        </div>
    </div>
);
};

export default JobFeed;