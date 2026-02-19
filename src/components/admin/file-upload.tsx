'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2, FileAudio, FileText, Image as ImageIcon, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
    onUpload: (url: string) => void;
    accept?: string;
    bucket?: string;
    folder?: string;
    currentUrl?: string;
    label?: string;
}

export function FileUpload({ onUpload, accept = '*', bucket = 'uploads', folder = '', currentUrl, label = 'Upload File' }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isImage = accept.includes('image');

    const getIcon = () => {
        if (accept.includes('audio')) return <FileAudio className="w-10 h-10 text-gray-300" />;
        if (isImage) return <ImageIcon className="w-10 h-10 text-gray-300" />;
        return <FileText className="w-10 h-10 text-gray-300" />;
    };

    const handleFile = async (file: File) => {
        setUploading(true);
        setFileName(file.name);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('bucket', bucket);
            formData.append('folder', folder);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (result.url) {
                onUpload(result.url);
            } else {
                alert(result.error || 'Upload failed');
            }
        } catch (err) {
            alert('Upload failed. Please try again.');
        }

        setUploading(false);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await handleFile(file);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) await handleFile(file);
    };

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
                    ${dragOver ? 'border-[#E4192B] bg-red-50/40 scale-[1.01]' : 'border-gray-200 hover:border-[#E4192B]/50 hover:bg-gray-50/50'}
                    ${uploading ? 'pointer-events-none opacity-60' : ''}`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />
                {uploading ? (
                    <div className="flex flex-col items-center gap-3 py-2">
                        <Loader2 className="w-10 h-10 text-[#E4192B] animate-spin" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Uploading...</p>
                            <p className="text-xs text-gray-400 mt-1">{fileName}</p>
                        </div>
                    </div>
                ) : currentUrl ? (
                    <div className="flex flex-col items-center gap-3 py-2">
                        {isImage ? (
                            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                <Image src={currentUrl} alt="Uploaded" fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                                <CheckCircle className="w-7 h-7 text-green-500" />
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-medium text-green-600">File uploaded successfully</p>
                            <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{currentUrl.split('/').pop()}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Click or drop a new file to replace</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 py-2">
                        {getIcon()}
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                <span className="text-[#E4192B]">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {accept === '*' ? 'Any file type' :
                                    isImage ? 'PNG, JPG, GIF, WebP up to 10MB' :
                                        accept.includes('audio') ? 'MP3, WAV, M4A, OGG' :
                                            accept}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
