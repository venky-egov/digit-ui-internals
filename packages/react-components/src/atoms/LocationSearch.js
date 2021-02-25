import React, { useEffect } from "react";
import { SearchIconSvg } from "./svgindex";
import { Loader } from "@googlemaps/js-api-loader";

//API key
const key = "AIzaSyDHVGCHFr-kGZA7dKFpGmF1uQafwaEkDus";
let defaultBounds = {};

const updateDefaultBounds = (center) => {
  if (!center.lat || !center.lng) {
    return;
  }
  defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };
};
const GetPinCode = (places) => {
  console.log(places, places.geometry.location.lat(), '---------places');
  let postalCode = null;
  places?.address_components?.forEach((place) => {
    let hasPostalCode = place.types.includes("postal_code");
    postalCode = hasPostalCode ? place.long_name : null;
  });
  return postalCode;
};

const getName = (places) => {
  let name = "";
  places?.address_components?.forEach((place) => {
    let hasName = place.types.includes("sublocality_level_2") || place.types.includes("sublocality_level_1");
    if (hasName) {
      name = hasName ? place.long_name : null;
    }
  });
  return name;
};

const loadGoogleMaps = (callback) => {
  const loader = new Loader({
    apiKey: key,
    version: "weekly",
    libraries: ["places"],
  });

  loader
    .load()
    .then(() => {
      if (callback) callback();
    })
    .catch((e) => {
      // do something
    });
};

const LocationSearch = (props) => {
  useEffect(() => {
    //AIzaSyCvzuo69lmgwc2XoqhACHcQhrGLALBUZAU

    async function mapScriptCall() {
      const initAutocomplete = function () {
        const defaultLatLong = {
          lat: 31.6160638,
          lng: 74.8978579,
        };
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: defaultLatLong,
          zoom: 15,
          mapTypeId: "roadmap",
        }); // Create the search box and link it to the UI element.

        const input = document.getElementById("pac-input");
        updateDefaultBounds(defaultLatLong);
        const options = {
          bounds: defaultBounds,
          componentRestrictions: { country: "in" },
          fields: ["address_components", "geometry", "icon", "name"],
          origin: defaultLatLong,
          strictBounds: false,
          types: ["address"],
        };
        const searchBox = new window.google.maps.places.Autocomplete(input, options);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); // Bias the SearchBox results towards current map's viewport.

        map.addListener("bounds_changed", () => {
          searchBox.setBounds(map.getBounds());
        });

        let markers = [
          new window.google.maps.Marker({
            map,
            title: "a",
            position: defaultLatLong,
            draggable: true,
            clickable: true,
          }),
        ]; // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        markers[0].addListener("dragend", onMarkerDragged);
        searchBox.addListener("place_changed", () => {
          const place = searchBox.getPlace();

          if (!place) {
            return;
          } // Clear out the old markers.
          let pincode = GetPinCode(place);
          if (pincode) {
            const { geometry } = place;
            const geoLocation = {
              latitude: geometry.location.lat(),
              longitude: geometry.location.lng(),
            }
            props.onChange(pincode, geoLocation);
          }
          markers.forEach((marker) => {
            marker.setMap(null);
          });
          markers = []; // For each place, get the icon, name and location.

          const bounds = new window.google.maps.LatLngBounds();
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }

          markers.push(
            new window.google.maps.Marker({
              map,
              title: place.name,
              position: place.geometry.location,
              draggable: true,
              clickable: true,
            })
          );
          markers[0].addListener("dragend", onMarkerDragged);
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }

          map.fitBounds(bounds);
        });
      };
      const onMarkerDragged = (marker) => {
        if (!marker) return;
        const { latLng } = marker;
        const currLat = latLng.lat();
        const currLang = latLng.lng();
        const location = {
          lat: currLat,
          lng: currLang,
        };
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          {
            location,
          },
          function (results, status) {
            if (status === "OK") {
              if (results[0]) {
                let pincode = GetPinCode(results[0]);
                props.onChange(pincode, { longitude: location.lng, latitude: location.lat });
                const infoWindowContent = document.getElementById("pac-input");
                infoWindowContent.value = getName(results[0]);
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          }
        );
      };

      loadGoogleMaps(initAutocomplete);
    }
    mapScriptCall();
  }, []);

  return (
    <div className="map-wrap">
      <div className="map-search-bar-wrap">
        {/* <img src={searchicon} className="map-search-bar-icon" alt=""/> */}
        <SearchIconSvg className="map-search-bar-icon" />
        <input id="pac-input" className="map-search-bar" type="text" placeholder="Search Address" />
      </div>
      <div id="map" className="map"></div>
    </div>
  );
};

export default LocationSearch;
