import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="container px-4 md:px-6 py-12 md:py-24">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter mb-4">Get in Touch</h1>
                        <p className="text-xl text-muted-foreground">
                            Have a question, pitch, or partnership inquiry? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Email Us</h3>
                                <p className="text-muted-foreground">hello@podcastnetwork.com</p>
                                <p className="text-muted-foreground">press@podcastnetwork.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Twitter className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Follow Us</h3>
                                <p className="text-muted-foreground">@PodcastNetwork on all platforms</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-8">
                        <h3 className="font-bold mb-4">Mailing Address</h3>
                        <address className="not-italic text-muted-foreground">
                            123 Audio Lane<br />
                            Studio City, CA 90210<br />
                            United States
                        </address>
                    </div>
                </div>

                <div className="bg-secondary/30 p-8 rounded-xl border border-border">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                                <input className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" id="first-name" placeholder="Jane" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                                <input className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" id="last-name" placeholder="Doe" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" id="email" type="email" placeholder="jane@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                            <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" id="subject">
                                <option>General Inquiry</option>
                                <option>Sponsorship</option>
                                <option>Press</option>
                                <option>Show Pitch</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm" id="message" placeholder="How can we help you?" required />
                        </div>

                        <Button type="submit" size="lg" className="w-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
