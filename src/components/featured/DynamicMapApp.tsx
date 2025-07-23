"use client";
import dynamic from "next/dynamic";
import React from "react";

// Map key types for different map applications
type MapKey = "zalazje1943" | "glinniki1870" | "glinniki1846" | "bocheikovo1943";

// Component import function type
type ComponentImportFunction = () => Promise<{ default: React.ComponentType<any> }>;

// Component map type for dynamic imports
type ComponentMap = Record<MapKey, ComponentImportFunction>;

// Props interface for the DynamicMapApp component
interface DynamicMapAppProps {
  mapKey: MapKey;
  children?: React.ReactNode;
}

// Dynamic component type
type DynamicComponentType = React.ComponentType<{ children?: React.ReactNode }>;

// Component map configuration
const componentMap: ComponentMap = {
  zalazje1943: () => import("@/app/zalazje1943/Zalazje1943"),
  glinniki1870: () => import("@/app/glinniki1870/Glinniki1870"),
  glinniki1846: () => import("@/app/glinniki1846/Glinniki1846"),
  bocheikovo1943: () => import("@/app/bocheikovo1943/Bocheikovo1943"),
};

const DynamicMapApp: React.FC<DynamicMapAppProps> = ({ mapKey, children }): React.JSX.Element => {
  const DynamicComponent: DynamicComponentType = React.useMemo(
    () => dynamic(componentMap[mapKey], { ssr: false }),
    [mapKey]
  );
  return <DynamicComponent>{children}</DynamicComponent>;
};

export default DynamicMapApp;
