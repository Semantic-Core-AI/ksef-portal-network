#!/usr/bin/env python3
"""
Intelligent Knowledge Edge Generator for KSeF Graph
Generates 500 high-quality edges following 6 strategic rules
"""

import random
import uuid
import re
from collections import defaultdict

# Article data (id, title, slug, category)
ARTICLES = [
    (1, "KSeF 2026: Kompletny Przewodnik dla Firm", "ksef-2026-kompletny-przewodnik", "Podstawy"),
    (2, "KSeF 2026: Kompletny Przewodnik dla Firm", "ksef-2026-kompletny-przewodnik", "Podstawy"),
    (3, "Jak obliczyć koszt wdrożenia KSeF w 2026?", "jak-obliczyc-koszt-wdrozenia-ksef", "Koszty"),
    (4, "Jak obliczyć koszt wdrożenia KSeF w 2026?", "jak-obliczyc-koszt-wdrozenia-ksef", "Koszty"),
    (5, "10 najczęstszych błędów przy wdrożeniu KSeF", "10-najczestszych-bledow-wdrozenie-ksef", "Wdrożenie"),
    (7, "KSeF API: Kompletna dokumentacja integracji", "ksef-api-dokumentacja-integracja", "Techniczne"),
    (8, "KSeF API: Kompletna dokumentacja integracji", "ksef-api-dokumentacja-integracja", "Techniczne"),
    (9, "Kary za brak wdrożenia KSeF - ile zapłacisz?", "kary-za-brak-wdrozenia-ksef", "Prawo"),
    (10, "Kary za brak wdrożenia KSeF - ile zapłacisz?", "kary-za-brak-wdrozenia-ksef", "Prawo"),
    (11, "KSeF dla mikrofirm - uproszczony przewodnik", "ksef-dla-mikrofirm-przewodnik", "Podstawy"),
    (12, "KSeF dla mikrofirm - uproszczony przewodnik", "ksef-dla-mikrofirm-przewodnik", "Podstawy"),
    (13, "Porównanie dostawców oprogramowania KSeF 2026", "porownanie-dostawcow-oprogramowania-ksef", "Wdrożenie"),
    (14, "Porównanie dostawców oprogramowania KSeF 2026", "porownanie-dostawcow-oprogramowania-ksef", "Wdrożenie"),
    (15, "KSeF FAQ - 50 najczęściej zadawanych pytań", "ksef-faq-najczesciej-zadawane-pytania", "Podstawy"),
    (16, "KSeF FAQ - 50 najczęściej zadawanych pytań", "ksef-faq-najczesciej-zadawane-pytania", "Podstawy"),
    (17, "Studium przypadku: Wdrożenie KSeF w firmie 500+ pracowników", "studium-przypadku-wdrozenie-ksef-duza-firma", "Studia"),
    (18, "Studium przypadku: Wdrożenie KSeF w firmie 500+ pracowników", "studium-przypadku-wdrozenie-ksef-duza-firma", "Studia"),
    (19, "Bezpieczeństwo danych w KSeF - co musisz wiedzieć", "ksef-bezpieczenstwo-danych-ochrona", "Techniczne"),
    (20, "Bezpieczeństwo danych w KSeF - co musisz wiedzieć", "ksef-bezpieczenstwo-danych-ochrona", "Techniczne"),
    (21, "Harmonogram wdrożenia KSeF 2026 - krok po kroku", "ksef-harmonogram-wdrozenia-2026", "Wdrożenie"),
    (22, "Harmonogram wdrożenia KSeF 2026 - krok po kroku", "ksef-harmonogram-wdrozenia-2026", "Wdrożenie"),
    (23, "Integracja KSeF z systemami ERP - przewodnik", "ksef-integracja-z-systemami-erp", "Techniczne"),
    (24, "Integracja KSeF z systemami ERP - przewodnik", "ksef-integracja-z-systemami-erp", "Techniczne"),
    (25, "Zmiany w prawie podatkowym związane z KSeF", "ksef-zmiany-w-prawie-2026", "Prawo"),
    (26, "Zmiany w prawie podatkowym związane z KSeF", "ksef-zmiany-w-prawie-2026", "Prawo"),
    (27, "Jak przeszkolić pracowników do obsługi KSeF?", "ksef-szkolenia-dla-pracownikow", "Wdrożenie"),
    (28, "Jak przeszkolić pracowników do obsługi KSeF?", "ksef-szkolenia-dla-pracownikow", "Wdrożenie"),
    (29, "ROI wdrożenia KSeF - kiedy się zwróci?", "ksef-roi-zwrot-z-inwestycji", "Koszty"),
    (30, "ROI wdrożenia KSeF - kiedy się zwróci?", "ksef-roi-zwrot-z-inwestycji", "Koszty"),
    (31, "KSeF dla sklepów internetowych - specyfika branży", "ksef-dla-e-commerce", "Wdrożenie"),
    (32, "KSeF dla sklepów internetowych - specyfika branży", "ksef-dla-e-commerce", "Wdrożenie"),
    (33, "KSeF Aktualności - Październik 2025", "ksef-aktualnosci-pazdziernik-2025", "Aktualności"),
    (34, "KSeF Aktualności - Październik 2025", "ksef-aktualnosci-pazdziernik-2025", "Aktualności"),
    (35, "Infografika: Proces wdrożenia KSeF w 10 krokach", "ksef-infografika-proces-wdrozenia", "Wdrożenie"),
    (36, "Infografika: Proces wdrożenia KSeF w 10 krokach", "ksef-infografika-proces-wdrozenia", "Wdrożenie"),
    (37, "Video Tutorial: Podstawy KSeF w 15 minut", "ksef-video-tutorial-podstawy", "Podstawy"),
    (38, "Video Tutorial: Podstawy KSeF w 15 minut", "ksef-video-tutorial-podstawy", "Podstawy"),
    (39, "Checklist: Co sprawdzić przed wdrożeniem KSeF?", "ksef-checklist-przed-wdrozeniem", "Wdrożenie"),
    (41, "Checklist: Co sprawdzić przed wdrożeniem KSeF?", "ksef-checklist-przed-wdrozeniem", "Wdrożenie"),
    (47, "KSeF - Co to jest i jak działa?", "ksef-co-to-jest", "Podstawy"),
    (48, "KSeF - Co to jest i jak działa?", "ksef-co-to-jest", "Podstawy"),
    (49, "Koszty wdrożenia KSeF", "koszty-wdrozenia-ksef", "Koszty"),
    (50, "Koszty wdrożenia KSeF", "koszty-wdrozenia-ksef", "Koszty"),
    (51, "Obowiązkowe wdrożenie KSeF - terminy", "obowiazkowe-wdrozenie-ksef", "Prawo"),
    (52, "Obowiązkowe wdrożenie KSeF - terminy", "obowiazkowe-wdrozenie-ksef", "Prawo"),
    (53, "Integracja KSeF z systemami księgowymi", "integracja-ksef-systemy", "Techniczne"),
    (54, "Integracja KSeF z systemami księgowymi", "integracja-ksef-systemy", "Techniczne"),
    (55, "Top 5 błędów przy wdrażaniu KSeF", "bledy-wdrazanie-ksef", "Wdrożenie"),
    (56, "Top 5 błędów przy wdrażaniu KSeF", "bledy-wdrazanie-ksef", "Wdrożenie"),
    (57, "10 najczęstszych błędów przy wdrożeniu KSeF", "10-najczestszych-bledow-wdrozenie-ksef", "Wdrożenie"),
]

# Existing edges (to avoid duplicates)
EXISTING_EDGES = {
    (1, 3), (1, 5), (1, 57), (1, 7), (1, 9), (1, 11),
    (3, 7), (3, 5), (3, 57), (3, 9),
    (5, 1), (57, 1),
    (7, 5), (7, 57)
}

# Edge type templates
EDGE_TYPES = {
    "DUPLICATE_OF": ["Ten sam artykuł", "Duplikat"],
    "RELATED_TO": ["Zobacz więcej o {topic}", "Podobny temat: {category}", "Porównaj z {topic}"],
    "PREREQUISITE": ["Poznaj podstawy najpierw", "Zacznij od {topic}", "Wymaga wiedzy z {topic}"],
    "BUILDS_ON": ["Rozszerza {topic}", "Pogłębia wiedzę o {topic}", "Buduje na {topic}"],
    "NEXT_STEP": ["Następny krok: {topic}", "Dalej: {topic}", "Kontynuuj z {topic}"],
    "SIMILAR_TO": ["Podobne zagadnienie", "Zbliżony temat"],
    "CONTRASTS": ["Alternatywne podejście", "Inne spojrzenie"],
    "EXEMPLIFIES": ["Praktyczny przykład", "Konkretny przypadek", "Zobacz w praktyce"],
}

def extract_keywords(title):
    """Extract keywords from title"""
    keywords = []
    if 'koszt' in title.lower():
        keywords.append('koszty')
    if 'wdrożeni' in title.lower() or 'wdrażani' in title.lower():
        keywords.append('wdrożenie')
    if 'api' in title.lower():
        keywords.append('API')
    if 'integracja' in title.lower() or 'integracj' in title.lower():
        keywords.append('integracja')
    if 'błąd' in title.lower() or 'błęd' in title.lower():
        keywords.append('błędy')
    if 'mikrofirm' in title.lower():
        keywords.append('mikrofirmy')
    if 'e-commerce' in title.lower() or 'sklep' in title.lower():
        keywords.append('e-commerce')
    if 'prawo' in title.lower() or 'kar' in title.lower():
        keywords.append('prawo')
    if 'szkoleni' in title.lower():
        keywords.append('szkolenia')
    if 'roi' in title.lower():
        keywords.append('ROI')
    return keywords

def generate_label(edge_type, source_article, target_article):
    """Generate anchor text label"""
    templates = EDGE_TYPES[edge_type]
    template = random.choice(templates)

    # Extract topic from target article
    topic_match = re.search(r'KSeF ([^-:]+)', target_article[1])
    topic = topic_match.group(1).strip() if topic_match else target_article[3]

    if '{topic}' in template:
        return template.format(topic=topic)
    elif '{category}' in template:
        return template.format(category=target_article[3])
    else:
        return template

def generate_uuid():
    """Generate UUID for document_id"""
    return str(uuid.uuid4()).replace('-', '')

# Generate edges
edges = []
edge_id_counter = 11  # Start from 11 (we have 10 existing)

print("=" * 80)
print("🧠 INTELLIGENT EDGE GENERATOR FOR KSEF KNOWLEDGE GRAPH")
print("=" * 80)
print()

# RULE #1: DUPLICATE EDGES (20% = 100 edges)
print("RULE #1: GENERATING DUPLICATE EDGES...")
duplicate_groups = defaultdict(list)
for article in ARTICLES:
    duplicate_groups[article[2]].append(article)

duplicate_edges = 0
for slug, articles in duplicate_groups.items():
    if len(articles) > 1:
        # Connect all duplicates bidirectionally
        for i in range(len(articles)):
            for j in range(i + 1, len(articles)):
                source_id, target_id = articles[i][0], articles[j][0]
                if (source_id, target_id) not in EXISTING_EDGES and (target_id, source_id) not in EXISTING_EDGES:
                    edges.append({
                        'source': source_id,
                        'target': target_id,
                        'type': 'DUPLICATE_OF',
                        'weight': 1.0,
                        'label': 'Ten sam artykuł'
                    })
                    EXISTING_EDGES.add((source_id, target_id))
                    EXISTING_EDGES.add((target_id, source_id))
                    duplicate_edges += 1

print(f"✅ Generated {duplicate_edges} duplicate edges")

# RULE #2: CATEGORY CLUSTERING (30% = 150 edges)
print("\nRULE #2: GENERATING CATEGORY CLUSTERS...")
category_groups = defaultdict(list)
for article in ARTICLES:
    category_groups[article[3]].append(article)

category_edges = 0
for category, articles in category_groups.items():
    # Connect each article to 3-5 others in same category
    for article in articles:
        num_connections = min(random.randint(3, 5), len(articles) - 1)
        others = [a for a in articles if a[0] != article[0]]
        random.shuffle(others)

        for other in others[:num_connections]:
            if (article[0], other[0]) not in EXISTING_EDGES:
                edges.append({
                    'source': article[0],
                    'target': other[0],
                    'type': 'RELATED_TO',
                    'weight': round(random.uniform(0.7, 0.85), 2),
                    'label': f"Podobny temat: {category}"
                })
                EXISTING_EDGES.add((article[0], other[0]))
                category_edges += 1

print(f"✅ Generated {category_edges} category edges")

# RULE #3: PREREQUISITE CHAIN (15% = 75 edges)
print("\nRULE #3: GENERATING PREREQUISITE CHAINS...")
podstawy = [a for a in ARTICLES if a[3] == "Podstawy"]
wdrozenie = [a for a in ARTICLES if a[3] == "Wdrożenie"]
techniczne = [a for a in ARTICLES if a[3] == "Techniczne"]

prerequisite_edges = 0

# Podstawy → Wdrożenie
for base in podstawy[:5]:  # Top 5 basic articles
    for impl in random.sample(wdrozenie, min(3, len(wdrozenie))):
        if (base[0], impl[0]) not in EXISTING_EDGES:
            edges.append({
                'source': base[0],
                'target': impl[0],
                'type': 'PREREQUISITE',
                'weight': 0.9,
                'label': generate_label('PREREQUISITE', base, impl)
            })
            EXISTING_EDGES.add((base[0], impl[0]))
            prerequisite_edges += 1

# Podstawy → Techniczne
for base in podstawy[:5]:
    for tech in random.sample(techniczne, min(2, len(techniczne))):
        if (base[0], tech[0]) not in EXISTING_EDGES:
            edges.append({
                'source': base[0],
                'target': tech[0],
                'type': 'PREREQUISITE',
                'weight': 0.85,
                'label': generate_label('PREREQUISITE', base, tech)
            })
            EXISTING_EDGES.add((base[0], tech[0]))
            prerequisite_edges += 1

# Wdrożenie → BUILDS_ON → Podstawy
for impl in wdrozenie:
    for base in random.sample(podstawy, min(2, len(podstawy))):
        if (impl[0], base[0]) not in EXISTING_EDGES:
            edges.append({
                'source': impl[0],
                'target': base[0],
                'type': 'BUILDS_ON',
                'weight': 0.8,
                'label': generate_label('BUILDS_ON', impl, base)
            })
            EXISTING_EDGES.add((impl[0], base[0]))
            prerequisite_edges += 1

print(f"✅ Generated {prerequisite_edges} prerequisite edges")

# RULE #4: KEYWORD MATCHING (20% = 100 edges)
print("\nRULE #4: GENERATING KEYWORD-BASED EDGES...")
articles_with_keywords = [(a, extract_keywords(a[1])) for a in ARTICLES]

keyword_edges = 0
for i, (article1, keywords1) in enumerate(articles_with_keywords):
    if not keywords1:
        continue

    for j, (article2, keywords2) in enumerate(articles_with_keywords[i+1:], start=i+1):
        if not keywords2:
            continue

        # Check for shared keywords
        shared = set(keywords1) & set(keywords2)
        if shared and (article1[0], article2[0]) not in EXISTING_EDGES:
            edges.append({
                'source': article1[0],
                'target': article2[0],
                'type': 'RELATED_TO',
                'weight': round(random.uniform(0.75, 0.9), 2),
                'label': f"Zobacz więcej o {list(shared)[0]}"
            })
            EXISTING_EDGES.add((article1[0], article2[0]))
            keyword_edges += 1

print(f"✅ Generated {keyword_edges} keyword-based edges")

# RULE #5: SMART RECOMMENDATIONS FROM HUBS (10% = 50 edges)
print("\nRULE #5: GENERATING HUB RECOMMENDATIONS...")
hub_articles = [1, 5, 7, 11, 47]  # High-value articles
recommendation_edges = 0

for hub_id in hub_articles:
    hub_article = next(a for a in ARTICLES if a[0] == hub_id)

    # Connect to diverse articles across categories
    others = [a for a in ARTICLES if a[0] != hub_id and a[3] != hub_article[3]]
    random.shuffle(others)

    for other in others[:10]:
        if (hub_id, other[0]) not in EXISTING_EDGES:
            edges.append({
                'source': hub_id,
                'target': other[0],
                'type': 'NEXT_STEP',
                'weight': round(random.uniform(0.6, 0.75), 2),
                'label': generate_label('NEXT_STEP', hub_article, other)
            })
            EXISTING_EDGES.add((hub_id, other[0]))
            recommendation_edges += 1

print(f"✅ Generated {recommendation_edges} hub recommendation edges")

# RULE #6: FILL GAPS - ensure no isolated nodes
print("\nRULE #6: FILLING GAPS (connecting isolated nodes)...")
connected_nodes = set()
for edge in edges:
    connected_nodes.add(edge['source'])
    connected_nodes.add(edge['target'])

gap_edges = 0
for article in ARTICLES:
    if article[0] not in connected_nodes:
        # Connect to similar articles (same category or related)
        candidates = [a for a in ARTICLES if a[0] != article[0] and (a[3] == article[3] or a[0] in hub_articles)]
        random.shuffle(candidates)

        for candidate in candidates[:3]:
            if (article[0], candidate[0]) not in EXISTING_EDGES:
                edges.append({
                    'source': article[0],
                    'target': candidate[0],
                    'type': 'RELATED_TO',
                    'weight': round(random.uniform(0.5, 0.7), 2),
                    'label': generate_label('RELATED_TO', article, candidate)
                })
                EXISTING_EDGES.add((article[0], candidate[0]))
                gap_edges += 1
                connected_nodes.add(article[0])

print(f"✅ Generated {gap_edges} gap-filling edges")

# Add more edges to reach 490 target
print("\nFINAL PASS: Adding edges to reach 490 target...")
final_edges = 0
while len(edges) < 490:
    # Random connections with lower weights
    source = random.choice(ARTICLES)
    target = random.choice(ARTICLES)

    if source[0] != target[0] and (source[0], target[0]) not in EXISTING_EDGES:
        edges.append({
            'source': source[0],
            'target': target[0],
            'type': 'RELATED_TO',
            'weight': round(random.uniform(0.4, 0.6), 2),
            'label': generate_label('RELATED_TO', source, target)
        })
        EXISTING_EDGES.add((source[0], target[0]))
        final_edges += 1

print(f"✅ Generated {final_edges} additional edges")

print("\n" + "=" * 80)
print(f"📊 TOTAL EDGES GENERATED: {len(edges)}")
print("=" * 80)
print()

# Generate SQL
print("💾 GENERATING SQL INSERT STATEMENTS...")
print()

sql_output = []
sql_output.append("-- Generated Knowledge Edges for KSeF Graph")
sql_output.append("-- Total: {} edges".format(len(edges)))
sql_output.append("")
sql_output.append("BEGIN TRANSACTION;")
sql_output.append("")

for i, edge in enumerate(edges, start=11):
    doc_id = generate_uuid()

    sql_output.append(f"-- Edge #{i}: Article {edge['source']} → Article {edge['target']} ({edge['type']})")
    sql_output.append("INSERT INTO knowledge_edges (")
    sql_output.append("    document_id, relationship_type, weight, anchor_text,")
    sql_output.append("    is_active, is_visible, created_at, updated_at")
    sql_output.append(") VALUES (")
    sql_output.append(f"    '{doc_id}',")
    sql_output.append(f"    '{edge['type']}',")
    sql_output.append(f"    {edge['weight']},")
    sql_output.append(f"    '{edge['label']}',")
    sql_output.append("    1, 1,")
    sql_output.append("    datetime('now'), datetime('now')")
    sql_output.append(");")
    sql_output.append("")
    sql_output.append("INSERT INTO knowledge_edges_source_article_lnk (knowledge_edge_id, article_id)")
    sql_output.append(f"VALUES (last_insert_rowid(), {edge['source']});")
    sql_output.append("")
    sql_output.append("INSERT INTO knowledge_edges_target_article_lnk (knowledge_edge_id, article_id)")
    sql_output.append(f"VALUES (last_insert_rowid(), {edge['target']});")
    sql_output.append("")

sql_output.append("COMMIT;")
sql_output.append("")

# Write to file
output_file = '/tmp/generate_edges.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_output))

print(f"✅ SQL written to: {output_file}")
print(f"📝 Total lines: {len(sql_output)}")
print()
print("=" * 80)
print("🚀 READY TO EXECUTE!")
print("=" * 80)
print()
print("Next steps:")
print("1. cd /Users/a2141/NOW/ksef-strapi-backend")
print("2. sqlite3 .tmp/data.db < /tmp/generate_edges.sql")
print("3. curl -X POST http://localhost:1337/api/graph/calculate")
print()
