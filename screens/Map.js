import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map() {
  const region = {
    lattitude: 37.78,
    longitude: -122.43,
    lattitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return <MapView initialRegion={region}></MapView>;
}

export default Map;
