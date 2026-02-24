import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NotFoundAnimated } from "@/components/shared/not-found-animated";

export const metadata = {
    title: '404 - Page Not Found | The Adverbe',
};

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
                <NotFoundAnimated />
            </main>
            <Footer />
        </div>
    );
}
