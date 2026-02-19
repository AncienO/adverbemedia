import { ChevronDown } from 'lucide-react';

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    required?: boolean;
    children: React.ReactNode;
}

export function AdminSelect({ label, required, children, className, ...props }: AdminSelectProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-[#E4192B]">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    {...props}
                    required={required}
                    className={`w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-lg bg-white text-sm text-gray-900
                        focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] transition-colors cursor-pointer
                        hover:border-gray-300 ${className || ''}`}
                >
                    {children}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
}
