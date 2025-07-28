import * as React from "react";
import MapWrapper from "@/components/featured/catalogarchivesgov/MapWrapper";
import NavigationMenu from "@/components/featured/catalogarchivesgov/NavigationMenu";

export default function Layout({ children }: any) {
    return (
        <>
            <NavigationMenu />
            <MapWrapper>{children}</MapWrapper>

        </>
    )
}
