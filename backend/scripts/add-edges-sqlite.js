#!/usr/bin/env node

/**
 * Add Knowledge Edges directly to SQLite database
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');
console.log(`📁 Opening database: ${dbPath}\n`);

const db = new Database(dbPath);

// Check current state
const articlesCount = db.prepare('SELECT COUNT(*) as count FROM articles').get();
const edgesCount = db.prepare('SELECT COUNT(*) as count FROM knowledge_edges').get();

console.log(`📊 Current state:`);
console.log(`   Articles: ${articlesCount.count}`);
console.log(`   Edges: ${edgesCount.count}\n`);

// Define edges to create
const edges = [
  { source: 1, target: 3, type: 'BUILDS_ON', weight: 0.9, anchor: 'Sprawdź koszty wdrożenia', context: 'SIDEBAR' },
  { source: 1, target: 5, type: 'RELATED_TO', weight: 0.8, anchor: 'Uniknij częstych błędów', context: 'SIDEBAR' },
  { source: 1, target: 7, type: 'RELATED_TO', weight: 0.85, anchor: 'Zobacz dokumentację API', context: 'SIDEBAR' },
  { source: 1, target: 9, type: 'RELATED_TO', weight: 0.7, anchor: 'Sprawdź kary', context: 'FOOTER' },
  { source: 1, target: 11, type: 'RELATED_TO', weight: 0.65, anchor: 'Dla mikrofirm', context: 'FOOTER' },
  { source: 3, target: 7, type: 'PREREQUISITE', weight: 0.75, anchor: 'Techniczne aspekty integracji', context: 'INLINE' },
  { source: 3, target: 5, type: 'RELATED_TO', weight: 0.85, anchor: 'Uniknij kosztownych błędów', context: 'SIDEBAR' },
  { source: 3, target: 9, type: 'RELATED_TO', weight: 0.75, anchor: 'Koszty vs Kary', context: 'SIDEBAR' },
  { source: 5, target: 1, type: 'PREREQUISITE', weight: 0.7, anchor: 'Poznaj podstawy KSeF', context: 'SIDEBAR' },
  { source: 7, target: 5, type: 'RELATED_TO', weight: 0.6, anchor: 'Typowe błędy integracji', context: 'FOOTER' }
];

console.log(`🔗 Creating ${edges.length} edges...\n`);

// Prepare statements
const insertEdge = db.prepare(`
  INSERT INTO knowledge_edges (
    document_id,
    relationship_type,
    weight,
    anchor_text,
    link_context,
    is_active,
    is_visible,
    quality_score,
    confidence_score,
    provenance_type,
    impression_count,
    click_count,
    click_through_rate,
    created_at,
    updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertSourceLink = db.prepare(`
  INSERT INTO knowledge_edges_source_article_lnk (knowledge_edge_id, article_id)
  VALUES (?, ?)
`);

const insertTargetLink = db.prepare(`
  INSERT INTO knowledge_edges_target_article_lnk (knowledge_edge_id, article_id)
  VALUES (?, ?)
`);

let created = 0;
const now = new Date().toISOString();

function generateDocumentId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

for (const edge of edges) {
  try {
    // Insert main edge
    const result = insertEdge.run(
      generateDocumentId(),
      edge.type,
      edge.weight,
      edge.anchor,
      edge.context,
      1, // is_active
      1, // is_visible
      0.8, // quality_score
      1.0, // confidence_score
      'EDITORIAL',
      0, // impression_count
      0, // click_count
      0.0, // click_through_rate
      now,
      now
    );

    const edgeId = result.lastInsertRowid;

    // Insert source article link
    insertSourceLink.run(edgeId, edge.source);

    // Insert target article link
    insertTargetLink.run(edgeId, edge.target);

    console.log(`✅ Created: Article ${edge.source} → Article ${edge.target} (${edge.type})`);
    created++;
  } catch (error) {
    console.error(`❌ Failed: Article ${edge.source} → Article ${edge.target}`);
    console.error(`   Error: ${error.message}`);
  }
}

const newEdgesCount = db.prepare('SELECT COUNT(*) as count FROM knowledge_edges').get();

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`✅ Created ${created} edges`);
console.log(`📊 Total edges now: ${newEdgesCount.count}`);
console.log(`═══════════════════════════════════════════════════\n`);

console.log(`Next steps:`);
console.log(`1. Uruchom graph analysis:`);
console.log(`   curl -X POST http://localhost:1337/api/graph/run-analysis\n`);
console.log(`2. Sprawdź statystyki:`);
console.log(`   curl http://localhost:1337/api/graph/stats | python3 -m json.tool\n`);
console.log(`3. Sprawdź recommendations:`);
console.log(`   curl "http://localhost:1337/api/graph/recommendations/1?limit=5"\n`);

db.close();
