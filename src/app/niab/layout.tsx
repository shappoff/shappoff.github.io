import AlertInfo from "@/components/featured/niab/AlertInfo";
import * as React from "react";
import ReactQueryTanstack from "@/components/featured/niab/ReactQueryTanstack";
// import Link from "next/link";

export default function Layout({ children }: any) {
    return (
        <>
            <AlertInfo severity="info" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>Количество записей в базе: Минск 816389 Гродно 201590</AlertInfo>
{/*
            <AlertInfo style={{bottom: '90px'}} severity="info" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                Бумажные дела не выдают с 02.06.2025 <Link target="_blank" href="https://niab.by/newsite/ru/Priostanovka_hkranilische4"><u>подробнее...</u></Link>
            </AlertInfo>
*/}
            <ReactQueryTanstack>{children}</ReactQueryTanstack>
        </>
    )
}
