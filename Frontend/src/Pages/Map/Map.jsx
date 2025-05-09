import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft} from 'lucide-react';
import { useSelector } from 'react-redux';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const customRedIcon = new L.Icon({
  iconUrl:'https://i.ibb.co.com/cKjYKRK6/placeholder.png',
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -45],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
  shadowAnchor: [14, 41],
});

const Map = () => {
  const { coordinates = [51.505, -0.09] } = useSelector(state => state.auth);
  const { posts = [] } = useSelector(state => state.jobPost);
  const navigate = useNavigate();

  if (!coordinates) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='my-3'>
        <button 
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md
                     hover:bg-gray-50 transition-colors duration-200 text-gray-700
                     hover:text-gray-900 border border-gray-200'
        >
          <ArrowLeft className='h-5 w-5' />
          <span className='font-medium'>Back to Previous</span>
        </button>
      </div>

      <MapContainer center={coordinates} zoom={13}  className='h-full w-full'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {posts.map((post, index) => (
        console.log(post,'lo'),
          <Marker
            key={index}
            position={[post.coordinates.coordinates[1], post.coordinates.coordinates[0]]}
            icon={customRedIcon}
          >
            <Popup className="custom-popup">
             <p>{post.title}</p>
             <Link to={`/main/job/${post._id}`}>View Details</Link>
            </Popup>
          </Marker>
        ))}

        <Marker position={coordinates}>
          <Popup>Your current position</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
