import ColsedNIABInfo from "@/components/niab/ColsedNIABInfo";

export default function Layout({ children }: any) {
    return (
        <>
            <ColsedNIABInfo />
            <>{children}</>
        </>
    )
}
