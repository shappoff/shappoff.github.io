"use client";
import dynamic from "next/dynamic";
import React from "react";

interface DynamicMapAppProps {
  mapKey: "zalazje1943" | "glinniki1870" | "glinniki1846" | "bocheikovo1943";
  children?: React.ReactNode
}
const componentMap = {
  zalazje1943: () => import("@/app/zalazje1943/Zalazje1943"),
  glinniki1870: () => import("@/app/glinniki1870/Glinniki1870"),
  glinniki1846: () => import("@/app/glinniki1846/Glinniki1846"),
  bocheikovo1943: () => import("@/app/bocheikovo1943/Bocheikovo1943"),
};
const DynamicMapApp: React.FC<DynamicMapAppProps> = ({ mapKey, children }) => {
  const DynamicComponent = React.useMemo(
    () => dynamic(componentMap[mapKey], { ssr: false }),
    [mapKey]
  );
  return <DynamicComponent>{children}</DynamicComponent>;
};

export default DynamicMapApp;
