import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalPage() {
    return (
        <main className="min-h-screen bg-black text-white py-32 px-6">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <h1 className="text-3xl md:text-4xl font-black mb-12">
                    Legal Notice & <span className="text-[#863ecc]">Privacy Policy</span>
                </h1>

                <div className="space-y-12 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Ownership</h2>
                        <p>
                            This website is the personal portfolio of <strong className="text-white">Toni Camacho</strong> (Visual Engineer). It is created for professional display purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. Data Collection</h2>
                        <p>
                            This site is static and does not use cookies for tracking, advertising, or analytics. We do not store your personal data when you browse.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. Contact Information</h2>
                        <p>
                            If you contact me via email, your address will only be used to reply to your inquiry. It will not be added to any marketing lists or shared with third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
                        <p>
                            All images, videos, and 3D assets displayed on this site are the property of Toni Camacho or the respective clients/companies mentioned (Dabuten, Cymatic, etc.). Unauthorized reproduction is prohibited.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
