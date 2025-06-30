import L from "leaflet";
import React from "react";
import {useMap} from "react-leaflet";
import Badge from "react-bootstrap/Badge";

    const IndicateButton = ({item, callBack, label = 'указать на карте'}: any) => {
    const map = useMap();
    return <Badge bg="secondary" className="indicate-button"
                 onClick={() => {
                     callBack && callBack();
                     const mapElement = document.getElementById('map');
                     if (mapElement) {
                         L.DomUtil.addClass(mapElement,'crosshair-cursor-enabled');
                     }
                     const clichHandler = async (e: any) => {

                         var coord = e.latlng;
                         var lat = coord.lat;
                         var lng = coord.lng;
                         const tag = `${item.title}`;
                         const text = `new:prikhody\n\`${tag}\`;\n\`${item.objectID}\`;\n\`${lat}, ${lng}\`\n[ordaOfBy](https://orda.of.by/.map/?${lat},${lng}&m=1v/14,wig/13,wig_v2/14,wig250/14,rkka/14,rkka_v2/14,rkka250/14,rkka2km/12,3v/13,3v_tmp56/13,3v_tmp71/13,kdwr/13,nem25/14,2v/13,polv/13,austr/13)`;

                         const parse_mode = 'Markdown';
                         const disable_web_page_preview = true;
                         sendTGMessage(text).then(() => {
                             if (mapElement) {
                                 L.DomUtil.removeClass(mapElement,'crosshair-cursor-enabled');
                             }
                             map.off('click', clichHandler);
                             alert("Координаты отправлены!");
                         }, () => {
                             if (mapElement) {
                                 L.DomUtil.removeClass(mapElement,'crosshair-cursor-enabled');
                             }
                             map.off('click', clichHandler);
                             alert("Координаты НЕ отправлены!");
                         }).catch(() => {
                             if (mapElement) {
                                 L.DomUtil.removeClass(mapElement,'crosshair-cursor-enabled');
                             }
                             map.off('click', clichHandler);
                             alert("Координаты НЕ отправлены!");
                         });
                     }
                     setTimeout(() => {
                         map.on('click', clichHandler);
                     });
                 }}
    >{label}</Badge>
};

const sendTGMessage = async (text: string) => {
    const response = await fetch(`/api/feedback?text=${encodeURIComponent(text)}`);
    const data = await response.json();
    console.log(data);
    if (data.error) {
        throw new Error(data.error);
    }
    if (data.success) {
        throw new Error(data.success);
    }
    return data;
};

export {sendTGMessage};
export default IndicateButton;
