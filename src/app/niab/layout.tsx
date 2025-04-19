import AlertInfo from "@/components/niab/AlertInfo";
import * as React from "react";

export default function Layout({ children }: any) {
    return (
        <>
            <AlertInfo severity="info" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>Количество записей в базе: Минск 816389 Гродно 201590</AlertInfo>
            <>{children}</>
        </>
    )
}
