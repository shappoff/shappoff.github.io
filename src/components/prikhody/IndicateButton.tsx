import L from "leaflet";
import React from "react";
import {useMap} from "react-leaflet";
import Badge from "react-bootstrap/Badge";

// Define type for IndicateButton props
interface IndicateButtonProps {
    item: {
        title: string;
        objectID: string;
        [key: string]: any;
    };
    callBack?: () => void;
    label?: string;
    setIsShowPanel?: (show: boolean) => void;
    popupRef?: React.Ref<any>
}

const IndicateButton = ({item, callBack, label = 'указать на карте', setIsShowPanel}: IndicateButtonProps) => {
    const map = useMap();
    return <Badge bg="secondary" className="indicate-button"
                 onClick={() => {
                     callBack && callBack();
                     const mapElement = document.getElementById('map');
                     if (mapElement) {
                         L.DomUtil.addClass(mapElement,'crosshair-cursor-enabled');
                     }
                     const clichHandler = async (e: L.LeafletMouseEvent) => {
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

const sendTGMessage = (text: string) => {
    const parse_mode = 'Markdown';
    const disable_web_page_preview = true;
    return fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=162676802&parse_mode=${parse_mode}&disable_web_page_preview=${disable_web_page_preview}&text=${encodeURIComponent(text)}`)
};

export {sendTGMessage};
export default IndicateButton;
