const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const QUALITY = 85;
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

function getAllImageFiles(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getAllImageFiles(fullPath));
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (SUPPORTED_EXTENSIONS.includes(ext)) {
                results.push(fullPath);
            }
        }
    }
    return results;
}

async function convertToWebP() {
    const imageFiles = getAllImageFiles(PUBLIC_DIR);
    let converted = 0;
    let skipped = 0;

    for (const filePath of imageFiles) {
        const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

        if (fs.existsSync(webpPath)) {
            console.log(`⏭  Skipped (already exists): ${path.relative(__dirname, webpPath)}`);
            skipped++;
            continue;
        }

        try {
            await sharp(filePath)
                .webp({ quality: QUALITY })
                .toFile(webpPath);
            console.log(`✅ Converted: ${path.relative(__dirname, filePath)} → ${path.relative(__dirname, webpPath)}`);
            converted++;
        } catch (err) {
            console.error(`❌ Failed: ${path.relative(__dirname, filePath)} — ${err.message}`);
        }
    }

    console.log(`\nDone. ${converted} converted, ${skipped} skipped.`);
}

convertToWebP();
