import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
const HeatMap = ({heatData}) => {
    const map = useMap()
    if(heatData){
      L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
       gradient: {
        0.4: 'blue',
        0.6: 'lime',
        0.5: 'yellow',
        1.0: 'red'
      }
    }).addTo(map);
    }
    return null
};
HeatMap.propTypes={
    heatData:PropTypes.array
}
export default HeatMap;