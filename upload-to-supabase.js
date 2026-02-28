require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'uploads';
const BUCKET_PREFIX = 'images';
const PUBLIC_DIR = path.join(__dirname, 'public');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function getAllWebPFiles(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getAllWebPFiles(fullPath));
        } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.webp') {
            results.push(fullPath);
        }
    }
    return results;
}

async function uploadImages() {
    const files = getAllWebPFiles(PUBLIC_DIR);
    console.log(`Found ${files.length} .webp file(s) to upload.\n`);

    let succeeded = 0;
    let failed = 0;

    for (const filePath of files) {
        // Compute the relative path from the public/ directory
        const relativePath = path.relative(PUBLIC_DIR, filePath);
        // Normalise path separators for use as storage key (important on Windows)
        const storagePath = `${BUCKET_PREFIX}/${relativePath.split(path.sep).join('/')}`;

        try {
            const fileBuffer = fs.readFileSync(filePath);

            const { error } = await supabase.storage
                .from(BUCKET)
                .upload(storagePath, fileBuffer, {
                    contentType: 'image/webp',
                    upsert: true,
                });

            if (error) {
                console.error(`❌ Failed: ${storagePath} — ${error.message}`);
                failed++;
            } else {
                const { data: { publicUrl } } = supabase.storage
                    .from(BUCKET)
                    .getPublicUrl(storagePath);
                console.log(`✅ Uploaded: ${publicUrl}`);
                succeeded++;
            }
        } catch (err) {
            console.error(`❌ Error reading/uploading ${relativePath}: ${err.message}`);
            failed++;
        }
    }

    console.log(`\n─────────────────────────────────────`);
    console.log(`Done. ${succeeded} uploaded, ${failed} failed.`);
}

uploadImages();
