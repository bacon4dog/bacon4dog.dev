import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Collect all text content that uses the font
const texts = [
	'培根是條狗',
	'@bacon4dog',

	// Common punctuation and symbols
	'，。！？：；（）「」『』、',

	// ASCII characters for mixed content
	'abcdefghijklmnopqrstuvwxyz',
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	'0123456789',
	'!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
];

// Extract unique characters
const uniqueChars = [...new Set(texts.join(''))];

// Convert to unicode ranges
const unicodeRanges = uniqueChars
	.map((char) => 'U+' + char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0'))
	.join(',');

// Log info about the subsetting
console.log(`Creating font subset with ${uniqueChars.length} unique characters:`);
console.log('Characters:', uniqueChars.join(' '));
console.log('Unicode ranges:', unicodeRanges);

// Font paths
const inputFont = 'static/fonts/LXGWWenKaiTC-Medium.ttf';
const outputFont = 'static/fonts/LXGWWenKaiTC-Medium-subset.woff2';
const characterList = 'static/fonts/used-characters.txt';

try {
	// Create font subset
	execSync(
		`pyftsubset "${inputFont}" \
        --unicodes="${unicodeRanges}" \
        --flavor="woff2" \
        --layout-features="*" \
        --desubroutinize \
        --no-hinting \
        --output-file="${outputFont}"`,
		{ stdio: 'inherit' }
	);

	// Save character list for reference
	writeFileSync(
		characterList,
		`Characters (${uniqueChars.length}):\n${uniqueChars.join(' ')}\n\n` +
			`Unicode ranges:\n${unicodeRanges}\n`
	);

	// Get file sizes for comparison
	const originalSize = execSync(`ls -l "${inputFont}" | awk '{print $5}'`).toString().trim();
	const subsetSize = execSync(`ls -l "${outputFont}" | awk '{print $5}'`).toString().trim();

	console.log('\nFont subsetting completed successfully!');
	console.log(`Original size: ${(parseInt(originalSize) / 1024 / 1024).toFixed(2)}MB`);
	console.log(`Subset size: ${(parseInt(subsetSize) / 1024 / 1024).toFixed(2)}MB`);
	console.log(
		`Reduction: ${(100 - (parseInt(subsetSize) / parseInt(originalSize)) * 100).toFixed(1)}%`
	);
} catch (error) {
	console.error('\nError creating font subset:');
	console.error('Make sure you have fonttools installed:');
	console.error('pip install fonttools brotli');
	console.error('Error details:', error);
	process.exit(1);
}
