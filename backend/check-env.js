import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '.env');

console.log('🔍 Environment Configuration Checker\n');
console.log('📂 Current directory:', __dirname);
console.log('📄 Looking for .env at:', envPath);
console.log('✓ .env file exists:', existsSync(envPath));

if (existsSync(envPath)) {
  console.log('\n📝 .env file contents (sanitized):');
  const envContent = readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  lines.forEach((line, index) => {
    if (line.trim() && !line.trim().startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=');
      if (key.trim() === 'BLACKBOX_API_KEY') {
        console.log(`  Line ${index + 1}: ${key.trim()}=${value ? value.substring(0, 10) + '...' : '(empty)'}`);
        console.log(`    - Key length: ${key.trim().length}`);
        console.log(`    - Value length: ${value ? value.trim().length : 0}`);
        console.log(`    - Has leading/trailing spaces in key: ${key !== key.trim()}`);
        console.log(`    - Has leading/trailing spaces in value: ${value && value !== value.trim()}`);
      } else {
        console.log(`  Line ${index + 1}: ${key.trim()}=***`);
      }
    }
  });
}

console.log('\n🔄 Loading with dotenv...');
dotenv.config({ path: envPath });

console.log('\n✅ Environment variables after loading:');
console.log('  BLACKBOX_API_KEY:', process.env.BLACKBOX_API_KEY ? 
  `${process.env.BLACKBOX_API_KEY.substring(0, 10)}... (length: ${process.env.BLACKBOX_API_KEY.length})` : 
  '❌ NOT FOUND');

if (!process.env.BLACKBOX_API_KEY) {
  console.log('\n❌ ISSUE DETECTED: BLACKBOX_API_KEY is not loaded');
  console.log('\n💡 Possible solutions:');
  console.log('  1. Ensure .env file has: BLACKBOX_API_KEY=sk-Bqqe-JMxrVsbw3pvSpTytg');
  console.log('  2. No spaces around the = sign');
  console.log('  3. No quotes around the value');
  console.log('  4. File is saved with UTF-8 encoding');
  console.log('  5. No hidden characters or BOM at the start of the file');
} else {
  console.log('\n✅ SUCCESS: BLACKBOX_API_KEY is properly configured!');
}
