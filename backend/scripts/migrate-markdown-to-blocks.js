const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Convert Markdown string to Strapi Blocks format
function markdownToBlocks(markdown) {
  const blocks = [];
  const lines = markdown.split('\n');

  let currentParagraph = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      if (currentParagraph.length > 0) {
        blocks.push({
          type: 'paragraph',
          children: [{ type: 'text', text: currentParagraph.join(' ') }]
        });
        currentParagraph = [];
      }
      continue;
    }

    // Heading
    if (line.startsWith('#')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          type: 'paragraph',
          children: [{ type: 'text', text: currentParagraph.join(' ') }]
        });
        currentParagraph = [];
      }

      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, '');
      blocks.push({
        type: 'heading',
        level: Math.min(level, 6),
        children: [{ type: 'text', text }]
      });
      continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          type: 'paragraph',
          children: [{ type: 'text', text: currentParagraph.join(' ') }]
        });
        currentParagraph = [];
      }

      const text = line.replace(/^[-*•]\s*/, '');
      blocks.push({
        type: 'list',
        format: 'unordered',
        children: [
          {
            type: 'list-item',
            children: [{ type: 'text', text }]
          }
        ]
      });
      continue;
    }

    // Quote
    if (line.startsWith('>')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          type: 'paragraph',
          children: [{ type: 'text', text: currentParagraph.join(' ') }]
        });
        currentParagraph = [];
      }

      const text = line.replace(/^>\s*/, '');
      blocks.push({
        type: 'quote',
        children: [{ type: 'text', text }]
      });
      continue;
    }

    // Regular text - accumulate into paragraph
    currentParagraph.push(line);
  }

  // Flush remaining paragraph
  if (currentParagraph.length > 0) {
    blocks.push({
      type: 'paragraph',
      children: [{ type: 'text', text: currentParagraph.join(' ') }]
    });
  }

  return blocks;
}

// Main migration function
async function migrateArticles() {
  const dbPath = path.join(__dirname, '../.tmp/data.db');
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    db.all('SELECT id, content FROM articles', [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      console.log(`Found ${rows.length} articles to migrate`);

      let updated = 0;
      let skipped = 0;

      rows.forEach(row => {
        const content = row.content;

        // Check if content is already in Blocks format (starts with '[')
        if (typeof content === 'string' && !content.trim().startsWith('[')) {
          // Convert Markdown to Blocks
          const blocks = markdownToBlocks(content);
          const blocksJson = JSON.stringify(blocks);

          db.run(
            'UPDATE articles SET content = ? WHERE id = ?',
            [blocksJson, row.id],
            (updateErr) => {
              if (updateErr) {
                console.error(`Error updating article ${row.id}:`, updateErr);
              } else {
                updated++;
                console.log(`✓ Migrated article ${row.id}`);
              }
            }
          );
        } else {
          skipped++;
          console.log(`- Skipped article ${row.id} (already in Blocks format)`);
        }
      });

      // Wait a bit for all updates to complete
      setTimeout(() => {
        console.log(`\nMigration complete!`);
        console.log(`- Updated: ${updated}`);
        console.log(`- Skipped: ${skipped}`);
        db.close();
        resolve();
      }, 1000);
    });
  });
}

// Run migration
migrateArticles()
  .then(() => {
    console.log('✓ Migration successful!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('✗ Migration failed:', err);
    process.exit(1);
  });
