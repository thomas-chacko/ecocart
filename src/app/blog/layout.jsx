import Header from "@/components/Header";

export default function page({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}