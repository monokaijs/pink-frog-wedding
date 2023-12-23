import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

export default function Map() {
  const position = [20.9765727, 105.7767252]
  return <>
    <MapContainer zoom={24} center={position as any} style={{
      width: '100%',
      height: '100%'
    }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position as any}>
        <Popup>
          <b>Cầu Am Palace</b><br/>
          9 Chu Văn An, Yết Kiêu, Hà Đông, Hà Nội.
        </Popup>
      </Marker>
    </MapContainer>
  </>
}