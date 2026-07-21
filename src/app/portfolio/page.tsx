import dynamic from "next/dynamic";

const Portfolio = dynamic(() => import("../components/Portfolio"), {
    loading: () => <div className="min-h-screen bg-black" />,
});

export default function PortfolioPage() {
    return (
        <div className="pt-20">
            <Portfolio />
        </div>
    );
}
