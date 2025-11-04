#!/usr/bin/env python3
"""Delete incomplete articles from Strapi"""
import requests
import json

STRAPI_URL = "http://localhost:1337"

def main():
    # Fetch all articles
    print("🔍 Fetching all articles...")
    response = requests.get(f"{STRAPI_URL}/api/articles?populate=*")
    data = response.json()

    articles = data.get('data', [])
    print(f"📊 Total articles: {len(articles)}")

    # Find incomplete articles
    incomplete = []
    for art in articles:
        has_grid = art.get('gridImage') is not None
        has_featured = art.get('featuredImage') is not None

        if not has_grid and not has_featured:
            incomplete.append({
                'id': art['id'],
                'documentId': art['documentId'],
                'title': art.get('title', 'NO TITLE')
            })

    print(f"❌ Incomplete articles (no images): {len(incomplete)}\n")

    if not incomplete:
        print("✅ No incomplete articles found!")
        return

    print("📋 Articles to delete:")
    for art in incomplete:
        print(f"  - [{art['id']}] {art['title']}")

    print(f"\n🗑️  Deleting {len(incomplete)} incomplete articles...")

    for art in incomplete:
        # Delete using documentId
        delete_url = f"{STRAPI_URL}/api/articles/{art['documentId']}"
        response = requests.delete(delete_url)

        if response.status_code == 200:
            print(f"  ✓ Deleted: {art['title']}")
        else:
            print(f"  ✗ Failed to delete [{art['id']}]: {response.status_code}")

    # Count remaining
    response = requests.get(f"{STRAPI_URL}/api/articles")
    remaining = len(response.json().get('data', []))

    print(f"\n✅ Done! Remaining articles: {remaining}")

if __name__ == "__main__":
    main()
