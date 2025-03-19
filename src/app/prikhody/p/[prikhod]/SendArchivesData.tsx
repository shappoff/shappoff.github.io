import {sendTGMessage} from "@/components/prikhody/IndicateButton";
import React from "react";
import Textarea from '@mui/joy/Textarea';
import {Button} from "@mui/material";

const SendArchivesData = ({objectID}: any) => {
    return <React.Fragment>
        <Textarea placeholder="Прислать сохранность по приходу" minRows={3} slotProps={{
            textarea: {
                id: 'new-fod-text',
            }
        }} />
        <Button variant="outlined" type="button" onClick={() => {
            const newFodText: any = document.getElementById('new-fod-text');
            if (newFodText.value.length > 10 && newFodText.value.length < 4096) {
                const pre = `src:prikhody\n\`${objectID}\``;
                const msg = `${pre}\n${newFodText.value}`;
                sendTGMessage(msg)
                    .then(() => {
                        alert("Отправлено!");
                        newFodText.value = '';
                    });
            }
        }}>Отправить</Button>
    </React.Fragment>
};

export default SendArchivesData;
