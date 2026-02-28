require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'uploads';
const FOLDER = 'images';
const OUTPUT_FILE = path.join(__dirname, 'supabase-image-urls.txt');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function listAllFiles(prefix) {
    let allFiles = [];
    let offset = 0;
    const limit = 1000;

    while (true) {
        const { data, error } = await supabase.storage
            .from(BUCKET)
            .list(prefix, { limit, offset, sortBy: { column: 'name', order: 'asc' } });

        if (error) {
            console.error(`❌ Error listing ${prefix}: ${error.message}`);
            break;
        }

        if (!data || data.length === 0) break;

        for (const item of data) {
            const itemPath = `${prefix}/${item.name}`;
            if (item.metadata === null) {
                // It's a folder — recurse into it
                const nested = await listAllFiles(itemPath);
                allFiles = allFiles.concat(nested);
            } else {
                // It's a file
                allFiles.push(itemPath);
            }
        }

        if (data.length < limit) break;
        offset += limit;
    }

    return allFiles;
}

async function main() {
    console.log(`Listing all files in ${BUCKET}/${FOLDER}/ ...\n`);

    const filePaths = await listAllFiles(FOLDER);

    const urls = filePaths.map(filePath => {
        // filePath is like "images/foo.webp" — strip the leading "images/" for the URL
        const relativePath = filePath.slice(FOLDER.length + 1); // remove "images/"
        return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${FOLDER}/${relativePath}`;
    });

    fs.writeFileSync(OUTPUT_FILE, urls.join('\n') + '\n', 'utf8');

    console.log(`Found ${urls.length} file(s). URLs written to supabase-image-urls.txt`);
    urls.forEach(url => console.log(`  ${url}`));
}

main();
