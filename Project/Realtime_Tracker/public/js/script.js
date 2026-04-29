const socket = io();

// Get room from URL parameter or prompt user
const urlParams = new URLSearchParams(window.location.search);
let roomId = urlParams.get('room');
let userName = urlParams.get('name');

// If no room in URL, prompt user
if (!roomId) {
    roomId = prompt('Enter Room ID (e.g., room1, event-abc):', 'room1') || 'default';
}

// If no name in URL, prompt user
if (!userName) {
    userName = prompt('Enter your name:', `User-${Math.random().toString(36).slice(2, 7)}`) || 'Anonymous';
}

// Update URL with room and name (optional, for sharing)
const newUrl = `${window.location.pathname}?room=${roomId}&name=${userName}`;
window.history.replaceState({}, '', newUrl);

// Update info bar
document.getElementById('room-name').textContent = roomId;
document.getElementById('user-name').textContent = userName;

// Join the room
socket.emit('join-room', { roomId, userName });

// Initialize map
const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

const markers = {};
let userCount = 0;

// Watch user's position
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Sending location: ${latitude}, ${longitude}`);
            socket.emit('send-location', { latitude, longitude });
        },
        (error) => {
            console.error('Geolocation error:', error);
            alert('Please enable location services to use this app');
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
} else {
    alert('Geolocation is not supported by your browser');
}

// Receive location updates
socket.on("receive-location", (data) => {
    const { id, latitude, longitude, userName: otherUserName } = data;
    
    console.log(`Received location from ${otherUserName} (${id}):`, latitude, longitude);

    // Center map on first location received
    if (Object.keys(markers).length === 0) {
        map.setView([latitude, longitude], 16);
    }

    // Create or update marker
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        // Create custom icon color based on if it's current user
        const isCurrentUser = id === socket.id;
        const markerColor = isCurrentUser ? 'green' : 'blue';
        
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        });

        markers[id] = L.marker([latitude, longitude], { icon: customIcon })
            .bindPopup(`<strong>${otherUserName}</strong><br>${isCurrentUser ? '(You)' : ''}`)
            .addTo(map);
        
        userCount++;
        updateUserCount();
    }
});

// Handle user joined
socket.on("user-joined", (data) => {
    console.log(`${data.userName} joined the room`);
});

// Handle user disconnected
socket.on("user-disconnected", (data) => {
    const { id, userName: disconnectedUser } = data;
    console.log(`${disconnectedUser} disconnected`);
    
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
        userCount--;
        updateUserCount();
    }
});

// Update user count
function updateUserCount() {
    document.getElementById('count').textContent = Object.keys(markers).length;
}

// Log socket connection
socket.on('connect', () => {
    console.log('Connected to server with socket ID:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});