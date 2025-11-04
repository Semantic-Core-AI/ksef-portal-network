const axios = require('axios');
const cheerio = require('cheerio');

async function checkSEO(url) {
  console.log(`\n🔍 Sprawdzam SEO dla: ${url}\n`);
  console.log('⏳ Pobieram stronę...\n');

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    const seo = {
      title: $('title').text().trim(),
      titleLength: $('title').text().trim().length,
      description: $('meta[name="description"]').attr('content') || '',
      descriptionLength: ($('meta[name="description"]').attr('content') || '').length,
      h1Count: $('h1').length,
      h1Text: $('h1').first().text().trim(),
      h2Count: $('h2').length,
      h3Count: $('h3').length,
      bodyText: $('article, main, body').text().replace(/\s+/g, ' ').trim(),
      wordCount: 0,
      paragraphs: $('p').length,
      internalLinks: 0,
      externalLinks: 0,
      totalImages: $('img').length,
      imagesWithAlt: $('img[alt]').filter((i, el) => $(el).attr('alt').trim() !== '').length,
      imagesWithoutAlt: 0,
      hasCanonical: $('link[rel="canonical"]').length > 0,
      canonicalUrl: $('link[rel="canonical"]').attr('href') || null,
      hasSchema: $('script[type="application/ld+json"]').length > 0,
      ogTitle: $('meta[property="og:title"]').attr('content') || null,
      ogDescription: $('meta[property="og:description"]').attr('content') || null,
      ogImage: $('meta[property="og:image"]').attr('content') || null,
    };

    seo.wordCount = seo.bodyText.split(/\s+/).filter(word => word.length > 0).length;

    const currentDomain = new URL(url).hostname;
    $('a[href]').each((i, el) => {
      const href = $(el).attr('href');
      if (href) {
        if (href.startsWith('/') || href.includes(currentDomain)) {
          seo.internalLinks++;
        } else if (href.startsWith('http')) {
          seo.externalLinks++;
        }
      }
    });

    seo.imagesWithoutAlt = seo.totalImages - seo.imagesWithAlt;

    let score = 0;
    const issues = [];
    const recommendations = [];

    console.log('✅ Strona pobrana!\n');
    console.log('📊 Analizuję SEO...\n');

    if (seo.titleLength === 0) {
      issues.push('❌ KRYTYCZNE: Brak title tag!');
      recommendations.push('🔧 Dodaj tag <title> z 50-60 znakami');
    } else if (seo.titleLength >= 50 && seo.titleLength <= 60) {
      score += 20;
      console.log('✅ Title length: PERFECT! (20/20 pkt)');
    } else if (seo.titleLength >= 30 && seo.titleLength < 50) {
      score += 15;
      issues.push(`⚠️  Title za krótki (${seo.titleLength} znaków)`);
      recommendations.push(`🔧 Wydłuż title do 50-60 znaków (teraz: ${seo.titleLength})`);
    } else if (seo.titleLength > 60) {
      score += 10;
      issues.push(`⚠️  Title za długi (${seo.titleLength} znaków - Google przytnie!)`);
      recommendations.push(`🔧 Skróć title do 50-60 znaków (teraz: ${seo.titleLength})`);
    } else {
      score += 5;
      issues.push(`❌ Title zbyt krótki (${seo.titleLength} znaków)`);
      recommendations.push('🔧 Title powinien mieć 50-60 znaków');
    }

    if (seo.descriptionLength === 0) {
      issues.push('❌ KRYTYCZNE: Brak meta description!');
      recommendations.push('🔧 Dodaj meta description (140-160 znaków)');
    } else if (seo.descriptionLength >= 140 && seo.descriptionLength <= 160) {
      score += 15;
      console.log('✅ Description length: PERFECT! (15/15 pkt)');
    } else if (seo.descriptionLength >= 120 && seo.descriptionLength < 140) {
      score += 12;
      issues.push(`⚠️  Description za krótki (${seo.descriptionLength} znaków)`);
      recommendations.push(`🔧 Wydłuż description do 140-160 znaków (teraz: ${seo.descriptionLength})`);
    } else if (seo.descriptionLength > 160) {
      score += 10;
      issues.push(`⚠️  Description za długi (${seo.descriptionLength} znaków)`);
      recommendations.push(`🔧 Skróć description do 140-160 znaków (teraz: ${seo.descriptionLength})`);
    } else {
      score += 5;
      issues.push(`❌ Description zbyt krótki (${seo.descriptionLength} znaków)`);
      recommendations.push('🔧 Description powinien mieć 140-160 znaków');
    }

    if (seo.h1Count === 1) {
      score += 15;
      console.log('✅ H1 tag: PERFECT! (15/15 pkt)');
    } else if (seo.h1Count === 0) {
      issues.push('❌ KRYTYCZNE: Brak H1!');
      recommendations.push('🔧 Dodaj dokładnie jeden tag H1 (główny nagłówek artykułu)');
    } else {
      issues.push(`❌ Za dużo H1 tagów (${seo.h1Count} - powinien być 1)`);
      recommendations.push('🔧 Usuń duplikaty H1, zostaw tylko jeden główny nagłówek');
      score += 5;
    }

    if (seo.wordCount >= 1500) {
      score += 25;
      console.log(`✅ Word count: EXCELLENT! ${seo.wordCount} słów (25/25 pkt)`);
    } else if (seo.wordCount >= 1000) {
      score += 20;
      console.log(`✅ Word count: GOOD! ${seo.wordCount} słów (20/25 pkt)`);
      recommendations.push(`💡 Dodaj ~${1500 - seo.wordCount} słów dla lepszego rankingu (cel: 1500+)`);
    } else if (seo.wordCount >= 500) {
      score += 12;
      issues.push(`⚠️  Treść za krótka (${seo.wordCount} słów)`);
      recommendations.push(`🔧 Dodaj ~${1000 - seo.wordCount} słów (minimum: 1000)`);
    } else {
      issues.push(`❌ KRYTYCZNE: Treść zbyt krótka (${seo.wordCount} słów)`);
      recommendations.push(`🔧 Dodaj ~${1000 - seo.wordCount} słów (minimum: 1000)`);
      score += 5;
    }

    if (seo.totalImages === 0) {
      recommendations.push('💡 Dodaj obrazki do artykułu (minimum 2-3)');
    } else if (seo.imagesWithoutAlt === 0) {
      score += 10;
      console.log(`✅ Images alt text: PERFECT! (10/10 pkt)`);
    } else {
      score += Math.max(0, 10 - (seo.imagesWithoutAlt * 2));
      issues.push(`⚠️  ${seo.imagesWithoutAlt} obrazków bez alt text`);
      recommendations.push(`🔧 Dodaj alt text do ${seo.imagesWithoutAlt} obrazków`);
    }

    if (seo.internalLinks >= 5) {
      score += 10;
      console.log(`✅ Internal links: PERFECT! (10/10 pkt)`);
    } else if (seo.internalLinks >= 3) {
      score += 7;
      recommendations.push(`💡 Dodaj ${5 - seo.internalLinks} więcej linków wewnętrznych (cel: 5+)`);
    } else {
      issues.push(`⚠️  Za mało linków wewnętrznych (${seo.internalLinks})`);
      recommendations.push(`🔧 Dodaj ${Math.max(3 - seo.internalLinks, 0)} linki wewnętrzne (minimum: 3)`);
      score += seo.internalLinks * 2;
    }

    if (seo.hasCanonical) {
      score += 5;
      console.log('✅ Canonical URL: OK (5/5 pkt)');
    } else {
      recommendations.push('💡 Dodaj canonical URL');
    }

    if (seo.hasSchema) {
      score += 5;
      console.log('✅ Schema.org: BONUS! (+5 pkt)');
    } else {
      recommendations.push('💡 Dodaj Schema.org structured data (Article)');
    }

    let quality = '';
    let emoji = '';
    if (score >= 90) {
      quality = 'EXCELLENT';
      emoji = '🏆';
    } else if (score >= 80) {
      quality = 'VERY GOOD';
      emoji = '🌟';
    } else if (score >= 70) {
      quality = 'GOOD';
      emoji = '✅';
    } else if (score >= 60) {
      quality = 'FAIR';
      emoji = '⚠️';
    } else {
      quality = 'POOR - NEEDS WORK!';
      emoji = '❌';
    }

    console.log('\n');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`${emoji} SEO SCORE: ${score}/100 - ${quality}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📝 META TAGS:');
    console.log(`   Title: "${seo.title}"`);
    console.log(`   Length: ${seo.titleLength} znaków ${seo.titleLength >= 50 && seo.titleLength <= 60 ? '✅' : '⚠️'}`);
    console.log(`   Description: "${seo.description.substring(0, 80)}${seo.description.length > 80 ? '...' : ''}"`);
    console.log(`   Length: ${seo.descriptionLength} znaków ${seo.descriptionLength >= 140 && seo.descriptionLength <= 160 ? '✅' : '⚠️'}\n`);

    console.log('📄 STRUKTURA TREŚCI:');
    console.log(`   Liczba słów: ${seo.wordCount} ${seo.wordCount >= 1000 ? '✅' : '⚠️'}`);
    console.log(`   H1: ${seo.h1Count} ${seo.h1Count === 1 ? '✅' : '❌'}`);
    if (seo.h1Text) {
      console.log(`   H1 text: "${seo.h1Text}"`);
    }
    console.log(`   H2: ${seo.h2Count}`);
    console.log(`   H3: ${seo.h3Count}`);
    console.log(`   Paragrafy: ${seo.paragraphs}\n`);

    console.log('🔗 LINKI:');
    console.log(`   Wewnętrzne: ${seo.internalLinks} ${seo.internalLinks >= 3 ? '✅' : '⚠️'}`);
    console.log(`   Zewnętrzne: ${seo.externalLinks}\n`);

    console.log('🖼️  OBRAZKI:');
    console.log(`   Wszystkie: ${seo.totalImages}`);
    console.log(`   Z alt text: ${seo.imagesWithAlt} ✅`);
    console.log(`   Bez alt text: ${seo.imagesWithoutAlt} ${seo.imagesWithoutAlt === 0 ? '✅' : '❌'}\n`);

    console.log('🔧 TECHNICAL SEO:');
    console.log(`   Canonical URL: ${seo.hasCanonical ? '✅' : '❌'}`);
    console.log(`   Schema.org: ${seo.hasSchema ? '✅' : '❌'}`);
    console.log(`   Open Graph title: ${seo.ogTitle ? '✅' : '❌'}`);
    console.log(`   Open Graph image: ${seo.ogImage ? '✅' : '❌'}\n`);

    if (issues.length > 0) {
      console.log('═══════════════════════════════════════════════════════════');
      console.log('🚨 PROBLEMY DO NAPRAWIENIA:');
      console.log('═══════════════════════════════════════════════════════════');
      issues.forEach((issue, i) => console.log(`${i + 1}. ${issue}`));
      console.log('');
    }

    if (recommendations.length > 0) {
      console.log('═══════════════════════════════════════════════════════════');
      console.log('💡 REKOMENDACJE:');
      console.log('═══════════════════════════════════════════════════════════');
      recommendations.forEach((rec, i) => console.log(`${i + 1}. ${rec}`));
      console.log('');
    }

    console.log('═══════════════════════════════════════════════════════════\n');

    return { score, seo, issues, recommendations, quality };

  } catch (error) {
    console.error('\n❌ BŁĄD:', error.message);
    console.error('\nMożliwe przyczyny:');
    console.error('1. URL jest nieprawidłowy');
    console.error('2. Strona nie odpowiada (timeout)');
    console.error('3. Brak dostępu do internetu');
    console.error('4. Strona blokuje web scraping\n');
    throw error;
  }
}

if (require.main === module) {
  const url = process.argv[2];
  
  if (!url) {
    console.log('\n❌ Błąd: Nie podano URL!\n');
    console.log('📖 Użycie:');
    console.log('   node scripts/seo-check.js <URL>\n');
    console.log('📝 Przykłady:');
    console.log('   node scripts/seo-check.js https://google.com');
    console.log('   node scripts/seo-check.js https://ksefgov.pl/baza-wiedzy/ksef-2026\n');
    process.exit(1);
  }

  checkSEO(url)
    .then(({ score, quality }) => {
      console.log(`\n🎉 Analiza zakończona! Score: ${score}/100 (${quality})\n`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Analiza nie powiodła się!\n');
      process.exit(1);
    });
}

module.exports = { checkSEO };
