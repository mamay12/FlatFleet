import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {Input, Modal} from 'antd';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

type GoogleMapPickerProps = {
    apiKey: string;
    open: boolean
    onClose: () => void;
    setPlaceId: Dispatch<SetStateAction<string | null>>
    onPlaceSelect?: (address: string) => void;
};


function GoogleMapPicker({apiKey, onPlaceSelect, open, onClose, setPlaceId}: Readonly<GoogleMapPickerProps>) {
    const [address, setAddress] = useState<string>('');
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
    const markerInstance = useRef<google.maps.Marker | null>(null);

    const {placesService} = usePlacesService({apiKey})

    const handleOk = () => {
        onClose()
        if (onPlaceSelect) {
            onPlaceSelect(address);
        }
    };

    const handleCancel = () => {
        onClose()
    };

    const fetchAddress = async (lat: number, lng: number) => {
        const geocoder = new google.maps.Geocoder();
        const response = await geocoder.geocode({location: {lat, lng}});
        if (response.results[0]) {
            setAddress(response.results[0].formatted_address);
            placesService?.nearbySearch({
                location: response.results[0].geometry.location,
                radius: 1
            }, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
                    setPlaceId(results[0].place_id!)
                }
            })
        } else {
            setAddress('Address not found');
        }
    };

    useEffect(() => {
        if (open && !mapInstance.current) {
            const loadMap = () => {
                if (!mapRef.current) return;

                mapInstance.current = new google.maps.Map(mapRef.current, {
                    center: {lat: 0, lng: 0},
                    zoom: 2,
                });

                markerInstance.current = new google.maps.Marker({
                    map: mapInstance.current,
                    draggable: true,
                });

                mapInstance.current.addListener('click', (event: google.maps.MapMouseEvent) => {
                    if (event.latLng) {
                        const lat = event.latLng.lat();
                        const lng = event.latLng.lng();
                        markerInstance.current?.setPosition({lat, lng});
                        fetchAddress(lat, lng);
                    }
                });

                markerInstance.current.addListener('dragend', () => {
                    if (markerInstance.current) {
                        const position = markerInstance.current.getPosition();
                        if (position) {
                            const lat = position.lat();
                            const lng = position.lng();
                            fetchAddress(lat, lng);
                        }
                    }
                });
            };

            if (!window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                script.async = true;
                script.defer = true;
                script.onload = loadMap;
                document.head.appendChild(script);
            } else {
                loadMap();
            }
        }
    }, [apiKey, fetchAddress, open]);


    return (
        <div>
            <Modal
                title="Select Location on Map"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <div style={{marginBottom: '16px'}}>
                    <Input value={address} readOnly placeholder="Selected address will appear here"/>
                </div>
                <div
                    ref={mapRef}
                    style={{width: '100%', height: '400px', border: '1px solid #ddd'}}
                ></div>
            </Modal>
        </div>
    );
}

export default GoogleMapPicker;
