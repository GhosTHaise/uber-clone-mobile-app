import { Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  return (
    <MapView provider={PROVIDER_DEFAULT} className="w-full h-full rounded-2xl">
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
