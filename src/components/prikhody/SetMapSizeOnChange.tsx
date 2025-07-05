import {useMap} from "react-leaflet";
import React from "react";

// Define type for SetMapSizeOnChange props
interface SetMapSizeOnChangeProps {
    top: string;
    height: string;
}

const SetMapSizeOnChange = ({ top, height }: SetMapSizeOnChangeProps) => {
    const map = useMap();
    React.useEffect(() => {
        if (map != null) {
            map.invalidateSize();
        }
    }, [map, top, height]);
    const mapContainer = map.getContainer();
    mapContainer.style.cssText = `top: ${top};height: ${height};position: relative;`;

    return <div/>;
}

export default SetMapSizeOnChange;