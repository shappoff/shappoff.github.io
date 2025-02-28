import ColsedNIABInfo from "@/components/niab/ColsedNIABInfo";

export default function Layout({ children }) {
    return (
        <>
            <ColsedNIABInfo />
            <>{children}</>
        </>
    )
}
