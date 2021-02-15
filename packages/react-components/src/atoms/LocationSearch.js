import React, { useEffect } from "react";
import { SearchIconSvg } from "./svgindex";
import { Loader } from "@googlemaps/js-api-loader";

//API key
const key = globalConfigs.getConfig("GMAPS_API_KEY");

const GetPinCode = (places) => {
  let postalCode = null;
  places?.address_components?.forEach((place) => {
    let hasPostalCode = place.types.includes("postal_code");
    postalCode = hasPostalCode ? place.long_name : null;
  });
  return postalCode;
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
        const searchBox = new window.google.maps.places.SearchBox(input);
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
        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          console.log("places", places);

          if (places.length === 0) {
            return;
          } // Clear out the old markers.
          let pincode = GetPinCode(places[0]);
          if (pincode) {
            props.onChange(pincode);
          }
          markers.forEach((marker) => {
            marker.setMap(null);
          });
          markers = []; // For each place, get the icon, name and location.

          const bounds = new window.google.maps.LatLngBounds();
          places.forEach((place) => {
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
            console.log("place.geometry.location:", place.geometry.location);
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
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
                props.onChange(pincode);
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
