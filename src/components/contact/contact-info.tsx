import { Mail, MapPin } from 'lucide-react';

export function ContactInfo() {
    return (
        <div className="bg-gray-50 p-8 md:p-12 rounded-3xl space-y-10 h-full flex flex-col justify-center">
            <div className="space-y-2">
                <h3
                    className="text-2xl font-bold text-black mb-4 flex items-center gap-3"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    <span className="w-10 h-10 rounded-full bg-[#E4192B]/10 flex items-center justify-center text-[#E4192B]">
                        <Mail className="w-5 h-5" />
                    </span>
                    Email Us
                </h3>
                <a href="mailto:talktous@adverbemedia.com" className="block text-xl md:text-2xl font-medium text-gray-600 hover:text-[#E4192B] transition-colors">
                    talktous@adverbemedia.com
                </a>
            </div>

            <div className="space-y-2">
                <h3
                    className="text-2xl font-bold text-black mb-4 flex items-center gap-3"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    <span className="w-10 h-10 rounded-full bg-[#E4192B]/10 flex items-center justify-center text-[#E4192B]">
                        <MapPin className="w-5 h-5" />
                    </span>
                    Visit Us
                </h3>
                <address className="not-italic text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                    Adverbe Studios<br />
                    Oak Villa Estates, B5<br />
                    Abokobi<br />
                    Accra, Ghana
                </address>
            </div>
        </div>
    );
}
