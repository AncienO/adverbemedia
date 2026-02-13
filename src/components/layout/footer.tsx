import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Podcast Network</h3>
                        <p className="text-sm text-muted-foreground">
                            Telling stories that matter. Connecting voices with ears around the globe.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Network</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shows" className="hover:text-primary transition-colors">Shows</Link></li>
                            <li><Link href="/hosts" className="hover:text-primary transition-colors">Hosts</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/sponsor" className="hover:text-primary transition-colors">Sponsor a Show</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Podcast Network. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
