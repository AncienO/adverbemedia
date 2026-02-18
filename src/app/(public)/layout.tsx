import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalPlayer } from "@/components/layout/player";
import { AudioProvider } from "@/lib/audio-context";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AudioProvider>
            <Header />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
            <Footer />
            <GlobalPlayer />
        </AudioProvider>
    );
}
