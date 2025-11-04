#!/usr/bin/env node

/**
 * ElevenLabs Audio Generator for KSeF Articles
 *
 * Generates audio files for all articles using ElevenLabs Text-to-Speech API
 * with your custom voice clone.
 *
 * Usage:
 *   node scripts/generate-audio.js --dry-run          # Test without generating
 *   node scripts/generate-audio.js --limit 5          # Generate only 5 articles
 *   node scripts/generate-audio.js                    # Generate all
 *   node scripts/generate-audio.js --skip-existing    # Skip articles with audio
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'YOUR_STRAPI_API_TOKEN_HERE';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'YOUR_ELEVENLABS_API_KEY_HERE';
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'YOUR_VOICE_ID_HERE';

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const skipExisting = args.includes('--skip-existing');
const limitIndex = args.indexOf('--limit');
const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) : null;

console.log('🎙️  KSEF.EXPERT Audio Generator\n');
console.log('Configuration:');
console.log(`  Strapi URL: ${STRAPI_URL}`);
console.log(`  Voice ID: ${ELEVENLABS_VOICE_ID}`);
console.log(`  Dry Run: ${isDryRun ? 'YES' : 'NO'}`);
console.log(`  Skip Existing: ${skipExisting ? 'YES' : 'NO'}`);
console.log(`  Limit: ${limit || 'ALL'}\n`);

// Helper: Extract clean text from Strapi rich text blocks
function extractTextFromContent(content) {
  if (!content) return '';

  // If content is a string (Markdown), return as is
  if (typeof content === 'string') {
    // Remove Markdown formatting
    return content
      .replace(/#+\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/`(.*?)`/g, '$1') // Remove code
      .replace(/\n\n+/g, '\n\n') // Normalize line breaks
      .trim();
  }

  // If content is Strapi blocks format (array)
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.type === 'paragraph' && block.children) {
        return block.children.map(child => child.text || '').join('');
      }
      if (block.type === 'heading' && block.children) {
        return block.children.map(child => child.text || '').join('');
      }
      if (block.type === 'list' && block.children) {
        return block.children.map(item => {
          if (item.children) {
            return item.children.map(child => child.text || '').join('');
          }
          return '';
        }).join('\n');
      }
      return '';
    }).filter(Boolean).join('\n\n');
  }

  return '';
}

// Helper: Create audio text from article
function createAudioText(article) {
  const title = article.title || '';
  const excerpt = article.excerpt || '';
  const content = extractTextFromContent(article.content);

  // Combine title, excerpt, and content
  let audioText = `${title}.\n\n`;

  if (excerpt) {
    audioText += `${excerpt}\n\n`;
  }

  audioText += content;

  // Limit to reasonable length (ElevenLabs has limits)
  const maxChars = 50000; // ~50K characters max
  if (audioText.length > maxChars) {
    console.log(`    ⚠️  Article too long (${audioText.length} chars), truncating to ${maxChars}`);
    audioText = audioText.substring(0, maxChars) + '...';
  }

  return audioText.trim();
}

// Fetch all articles from Strapi
async function fetchArticles() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/articles`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      },
      params: {
        'populate': 'audioFile',
        'pagination[limit]': limit || 1000
      }
    });

    return response.data.data;
  } catch (error) {
    console.error('❌ Error fetching articles:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

// Generate audio using ElevenLabs API
async function generateAudio(text, articleTitle) {
  try {
    console.log(`    📝 Text length: ${text.length} characters`);

    if (isDryRun) {
      console.log(`    🧪 DRY RUN: Would generate audio for "${articleTitle}"`);
      return null;
    }

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
      {
        text: text,
        model_id: 'eleven_multilingual_v2', // Best for Polish
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    return Buffer.from(response.data);
  } catch (error) {
    console.error(`    ❌ Error generating audio:`, error.message);
    if (error.response) {
      console.error('    Response:', error.response.status, error.response.statusText);
    }
    return null;
  }
}

// Upload audio file to Strapi
async function uploadAudioToStrapi(audioBuffer, articleId, articleSlug) {
  try {
    if (isDryRun) {
      console.log(`    🧪 DRY RUN: Would upload audio for article ${articleId}`);
      return null;
    }

    // Save temporarily
    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, `${articleSlug}.mp3`);
    fs.writeFileSync(tempFilePath, audioBuffer);

    // Upload to Strapi
    const form = new FormData();
    form.append('files', fs.createReadStream(tempFilePath), {
      filename: `${articleSlug}.mp3`,
      contentType: 'audio/mpeg'
    });

    const uploadResponse = await axios.post(
      `${STRAPI_URL}/api/upload`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      }
    );

    const uploadedFile = uploadResponse.data[0];

    // Link to article
    await axios.put(
      `${STRAPI_URL}/api/articles/${articleId}`,
      {
        data: {
          audioFile: uploadedFile.id
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Cleanup
    fs.unlinkSync(tempFilePath);

    return uploadedFile;
  } catch (error) {
    console.error(`    ❌ Error uploading audio:`, error.message);
    if (error.response) {
      console.error('    Response:', error.response.data);
    }
    return null;
  }
}

// Main processing function
async function processArticles() {
  console.log('📥 Fetching articles from Strapi...\n');

  const articles = await fetchArticles();
  console.log(`✅ Found ${articles.length} articles\n`);

  if (articles.length === 0) {
    console.log('No articles to process. Exiting.');
    return;
  }

  let processed = 0;
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const article of articles) {
    const articleData = article.attributes;
    const articleId = article.id;

    processed++;
    console.log(`\n[${processed}/${articles.length}] Processing: "${articleData.title}"`);
    console.log(`    ID: ${articleId}, Slug: ${articleData.slug}`);

    // Skip if already has audio and --skip-existing flag is set
    if (skipExisting && articleData.audioFile?.data) {
      console.log(`    ⏭️  SKIPPED: Already has audio file`);
      skipped++;
      continue;
    }

    // Create audio text
    const audioText = createAudioText(articleData);

    if (!audioText || audioText.length < 100) {
      console.log(`    ⚠️  SKIPPED: Content too short (${audioText.length} chars)`);
      skipped++;
      continue;
    }

    // Generate audio
    console.log(`    🎙️  Generating audio...`);
    const audioBuffer = await generateAudio(audioText, articleData.title);

    if (!audioBuffer) {
      console.log(`    ❌ FAILED: Could not generate audio`);
      failed++;
      continue;
    }

    // Upload to Strapi
    console.log(`    ☁️  Uploading to Strapi...`);
    const uploaded = await uploadAudioToStrapi(audioBuffer, articleId, articleData.slug);

    if (uploaded) {
      console.log(`    ✅ SUCCESS: Audio generated and uploaded`);
      generated++;
    } else {
      console.log(`    ❌ FAILED: Could not upload audio`);
      failed++;
    }

    // Rate limiting: wait 1 second between requests
    if (processed < articles.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total articles: ${articles.length}`);
  console.log(`✅ Generated: ${generated}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('='.repeat(60));
}

// Validate environment variables
function validateConfig() {
  const errors = [];

  if (!STRAPI_API_TOKEN || STRAPI_API_TOKEN.includes('YOUR_')) {
    errors.push('STRAPI_API_TOKEN is not set. Set it in .env or environment.');
  }

  if (!isDryRun) {
    if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY.includes('YOUR_')) {
      errors.push('ELEVENLABS_API_KEY is not set. Set it in .env or environment.');
    }

    if (!ELEVENLABS_VOICE_ID || ELEVENLABS_VOICE_ID.includes('YOUR_')) {
      errors.push('ELEVENLABS_VOICE_ID is not set. Set it in .env or environment.');
    }
  }

  if (errors.length > 0) {
    console.error('❌ Configuration errors:\n');
    errors.forEach(err => console.error(`  - ${err}`));
    console.error('\nPlease set the required environment variables and try again.\n');
    process.exit(1);
  }
}

// Run
validateConfig();
processArticles().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
