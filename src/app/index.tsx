import React, { useEffect, useState } from "react";
import MapView, { Circle, Polyline, Region } from "react-native-maps";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import ctaLines from "@/src/service/ctaLines";
import ctaStations from "@/src/service/ctaStations";
import { getStrokeColor, getLegend, Legend } from "@/src/service/helpers";

export default function App() {
  const [region, setRegion] = useState<Region>();
  const [zoom, setZoom] = useState<number>(0);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      const region = {
        latitude,
        longitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      };

      setRegion(region);
      handleRegionChange(region);
    }

    getCurrentLocation();
  }, []);

  const handleRegionChange = (region: Region) => {
    let zoom =
      Math.round((Math.log(360 / region.longitudeDelta) * 100) / Math.LN2) /
      100;
    setZoom(zoom);
  };

  const getStrokeWidth = (zoom: number) => {
    if (zoom < 14) return Math.round(zoom / 4);
    if (zoom < 15) return Math.round(zoom / 3);
    if (zoom < 16.4) return Math.round(zoom / 2);
    else return zoom;
  };

  const showCtaStations = zoom > 14;

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      showsUserLocation
      showsPointsOfInterest={false}
      rotateEnabled={false}
      mapType="mutedStandard"
      cameraZoomRange={{
        // minCenterCoordinateDistance: 1500,
        maxCenterCoordinateDistance: 150000,
        animated: false,
      }}
      onRegionChange={handleRegionChange}
    >
      {ctaLines.map(({ legend, the_geom: { coordinates }, description }) => (
        <Polyline
          key={`${legend}${description}`}
          coordinates={coordinates[0]?.map(([longitude, latitude]) => ({
            longitude,
            latitude,
          }))}
          strokeColor={getStrokeColor(legend as Legend)}
          strokeWidth={getStrokeWidth(zoom)}
          lineCap="butt"
        />
      ))}
      {ctaStations.map(
        ({ coordinates: [longitude, latitude], station_id, lines }) => (
          <Circle
            key={station_id}
            center={{ longitude, latitude }}
            radius={showCtaStations ? 20 : 0}
            strokeColor={getStrokeColor(getLegend(lines))}
            strokeWidth={2}
            fillColor={"white"}
          />
        )
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
