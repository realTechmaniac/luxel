import { View, StyleSheet, Alert, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constant/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

function LocationPicker() {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermission() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
  }

  function pickOnMapHandler() {}

  let defaultFallback = (
    <Text style={styles.text}>
      No Preview available currently. Google Map Billing account needed..
    </Text>
  );
  return (
    <View>
      <View style={styles.mapPreview}>{defaultFallback}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
    width: "100%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});
