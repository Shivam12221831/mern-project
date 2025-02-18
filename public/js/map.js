mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",  // style url
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});

const marker = new mapboxgl.Marker({color: 'red'})
.setLngLat(listing.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25}).setHTML(
        `<div class="custom-popup">
            <h5>${listing.title}</h5>
            <p>Exact location will be provided after booking</p>
        </div>`
    )
)
.addTo(map);

// // Show popup on hover and remove it on mouse leave
// marker.getElement().addEventListener("mouseenter", () => {
//     marker.setPopup(popup).togglePopup(); // Show popup
// });

// marker.getElement().addEventListener("mouseleave", () => {
//     popup.remove(); // Hide popup
// });

// // Create a popup element manually (without the default Mapbox popup)
// const popupDiv = document.createElement("div");
// popupDiv.className = "custom-popup";
// popupDiv.innerHTML = `
//     <h5>${listing.title}</h5>
//     <p>Exact location will be provided after booking</p>
// `;
// popupDiv.style.display = "none"; // Initially hidden

// // Append the custom popup to the map container
// document.body.appendChild(popupDiv);

// // Create a marker
// const marker = new mapboxgl.Marker({ color: "#ff0000" }) // Red marker
//     .setLngLat(listing.geometry.coordinates) // Set the coordinates of the listing
//     .addTo(map);

// // Show popup on hover
// marker.getElement().addEventListener("mouseenter", (e) => {
//     const markerElement = e.target.getBoundingClientRect();
//     const popupWidth = popupDiv.offsetWidth;
//     const popupHeight = popupDiv.offsetHeight;
    
//     // Center the popup horizontally relative to the marker
//     popupDiv.style.left = `${markerElement.left + markerElement.width / 2 - popupWidth / 2 + window.scrollX}px`;
    
//     // Position the popup slightly above the marker
//     popupDiv.style.top = `${markerElement.top + window.scrollY - popupHeight - 10}px`; // 10px above the marker

//     popupDiv.style.display = "block"; // Show the popup
// });

// // Hide popup on mouse leave
// marker.getElement().addEventListener("mouseleave", () => {
//     popupDiv.style.display = "none"; // Hide popup
// });
