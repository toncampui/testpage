import dynamic from "next/dynamic";

const Contact = dynamic(() => import("../components/Contact"), {
    loading: () => <div className="min-h-screen bg-black" />,
});

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black pt-20">
            <Contact />
        </main>
    );
}
