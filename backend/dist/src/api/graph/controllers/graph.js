"use strict";
/**
 * Graph Controller
 *
 * Exposes Knowledge Graph operations via REST API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * POST /api/graph/calculate-pagerank
     *
     * Calculate PageRank for all articles
     */
    async calculatePageRank(ctx) {
        try {
            const { iterations = 20, dampingFactor = 0.85 } = ctx.request.body || {};
            const graphService = strapi.service('api::article.graph');
            await graphService.calculatePageRank(iterations, dampingFactor);
            ctx.send({
                success: true,
                message: `PageRank calculated successfully (${iterations} iterations, damping: ${dampingFactor})`
            });
        }
        catch (error) {
            ctx.throw(500, `PageRank calculation failed: ${error.message}`);
        }
    },
    /**
     * POST /api/graph/calculate-hits
     *
     * Calculate HITS (authority & hub) scores
     */
    async calculateHITS(ctx) {
        try {
            const { iterations = 20 } = ctx.request.body || {};
            const graphService = strapi.service('api::article.graph');
            await graphService.calculateHITS(iterations);
            ctx.send({
                success: true,
                message: `HITS calculated successfully (${iterations} iterations)`
            });
        }
        catch (error) {
            ctx.throw(500, `HITS calculation failed: ${error.message}`);
        }
    },
    /**
     * POST /api/graph/run-analysis
     *
     * Run full graph analysis (degrees, PageRank, HITS, Communities, Betweenness)
     */
    async runAnalysis(ctx) {
        try {
            const graphService = strapi.service('api::article.graph');
            await graphService.runFullAnalysis();
            ctx.send({
                success: true,
                message: 'Full graph analysis completed successfully (PageRank, HITS, Communities, Betweenness)'
            });
        }
        catch (error) {
            ctx.throw(500, `Graph analysis failed: ${error.message}`);
        }
    },
    /**
     * POST /api/graph/calculate-communities
     *
     * Calculate community detection using Louvain algorithm
     */
    async calculateCommunities(ctx) {
        try {
            const graphService = strapi.service('api::article.graph');
            const communities = await graphService.calculateCommunities();
            ctx.send({
                success: true,
                message: 'Community detection completed successfully',
                data: {
                    totalCommunities: new Set(communities.values()).size,
                    totalNodes: communities.size
                }
            });
        }
        catch (error) {
            ctx.throw(500, `Community detection failed: ${error.message}`);
        }
    },
    /**
     * POST /api/graph/calculate-betweenness
     *
     * Calculate betweenness centrality
     */
    async calculateBetweenness(ctx) {
        try {
            const graphService = strapi.service('api::article.graph');
            await graphService.calculateBetweennessCentrality();
            ctx.send({
                success: true,
                message: 'Betweenness centrality calculated successfully'
            });
        }
        catch (error) {
            ctx.throw(500, `Betweenness calculation failed: ${error.message}`);
        }
    },
    /**
     * GET /api/graph/recommendations/:id
     *
     * Get recommended articles for a specific article
     */
    async getRecommendations(ctx) {
        try {
            const { id } = ctx.params;
            const { limit = 5 } = ctx.query;
            const articleId = parseInt(id, 10);
            if (isNaN(articleId)) {
                return ctx.badRequest('Invalid article ID');
            }
            const graphService = strapi.service('api::article.graph');
            const recommendations = await graphService.getRecommendations(articleId, parseInt(limit, 10));
            ctx.send({
                success: true,
                data: recommendations
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to get recommendations: ${error.message}`);
        }
    },
    /**
     * POST /api/graph/create-test-edges
     *
     * Create test edges for demo purposes
     */
    async createTestEdges(ctx) {
        try {
            console.log('\n🔗 Creating test edges using IDs...\n');
            // Use article IDs directly (from stats)
            // 1: KSeF 2026
            // 3: Koszty
            // 5: Błędy
            // 7: API
            const edges = [
                { source: 1, target: 3, type: 'BUILDS_ON', weight: 0.9, anchor: 'Sprawdź koszty wdrożenia' },
                { source: 1, target: 7, type: 'RELATED_TO', weight: 0.85, anchor: 'Zobacz dokumentację API' },
                { source: 1, target: 5, type: 'RELATED_TO', weight: 0.8, anchor: 'Uniknij częstych błędów' },
                { source: 3, target: 7, type: 'PREREQUISITE', weight: 0.75, anchor: 'Techniczne aspekty integracji' },
                { source: 3, target: 5, type: 'RELATED_TO', weight: 0.85, anchor: 'Uniknij kosztownych błędów' },
                { source: 5, target: 1, type: 'PREREQUISITE', weight: 0.7, anchor: 'Poznaj podstawy KSeF' },
                { source: 7, target: 5, type: 'RELATED_TO', weight: 0.6, anchor: 'Typowe błędy integracji' },
                { source: 1, target: 9, type: 'RELATED_TO', weight: 0.7, anchor: 'Sprawdź kary' },
                { source: 1, target: 11, type: 'RELATED_TO', weight: 0.65, anchor: 'Dla mikrofirm' },
                { source: 3, target: 9, type: 'RELATED_TO', weight: 0.75, anchor: 'Koszty vs Kary' }
            ];
            let created = 0;
            let skipped = 0;
            for (const edge of edges) {
                // Verify articles exist
                const sourceExists = await strapi.db.query('api::article.article').findOne({
                    where: { id: edge.source },
                    select: ['id', 'title']
                });
                const targetExists = await strapi.db.query('api::article.article').findOne({
                    where: { id: edge.target },
                    select: ['id', 'title']
                });
                if (!sourceExists || !targetExists) {
                    console.log(`⚠️  Skipped: ${edge.source} → ${edge.target} (article not found)`);
                    skipped++;
                    continue;
                }
                try {
                    await strapi.db.query('api::knowledge-edge.knowledge-edge').create({
                        data: {
                            sourceArticle: edge.source,
                            targetArticle: edge.target,
                            relationshipType: edge.type,
                            weight: edge.weight,
                            anchorText: edge.anchor,
                            linkContext: 'SIDEBAR',
                            isActive: true,
                            isVisible: true,
                            qualityScore: 0.8,
                            confidenceScore: 1.0,
                            provenanceType: 'EDITORIAL'
                        }
                    });
                    console.log(`✅ Created: ${sourceExists.title} → ${targetExists.title}`);
                    created++;
                }
                catch (error) {
                    console.error(`❌ Failed: ${edge.source} → ${edge.target}`, error.message);
                }
            }
            // Run graph analysis
            console.log('\n📊 Running graph analysis...');
            const graphService = strapi.service('api::article.graph');
            await graphService.runFullAnalysis();
            ctx.send({
                success: true,
                message: `Created ${created} edges, skipped ${skipped}. Graph analysis completed.`,
                data: {
                    created,
                    skipped,
                    totalEdges: created
                }
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to create test edges: ${error.message}`);
        }
    },
    /**
     * GET /api/graph/stats
     *
     * Get graph statistics
     */
    async getStats(ctx) {
        try {
            const articlesCount = await strapi.db.query('api::article.article').count();
            const edgesCount = await strapi.db.query('api::knowledge-edge.knowledge-edge').count({
                where: { isActive: true }
            });
            // Get top articles by PageRank
            const topByPageRank = await strapi.db.query('api::article.article').findMany({
                select: ['id', 'title', 'pageRank', 'authorityScore', 'hubScore'],
                orderBy: { pageRank: 'desc' },
                limit: 10
            });
            // Get articles with most connections
            const topByConnections = await strapi.db.query('api::article.article').findMany({
                select: ['id', 'title', 'totalDegree', 'inDegree', 'outDegree'],
                orderBy: { totalDegree: 'desc' },
                limit: 10
            });
            ctx.send({
                success: true,
                data: {
                    stats: {
                        articlesCount,
                        edgesCount,
                        avgDegree: edgesCount > 0 ? (edgesCount * 2) / articlesCount : 0
                    },
                    topByPageRank,
                    topByConnections
                }
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to get graph stats: ${error.message}`);
        }
    },
    /**
     * GET /api/graph/shortest-path/:sourceId/:targetId
     *
     * Find shortest path between two articles
     */
    async getShortestPath(ctx) {
        try {
            const { sourceId, targetId } = ctx.params;
            const source = parseInt(sourceId, 10);
            const target = parseInt(targetId, 10);
            if (isNaN(source) || isNaN(target)) {
                return ctx.badRequest('Invalid article IDs');
            }
            const graphService = strapi.service('api::article.graph');
            const path = await graphService.findShortestPath(source, target);
            if (!path) {
                return ctx.send({
                    success: false,
                    message: 'No path found between articles',
                    data: { path: null }
                });
            }
            // Get article details for path
            const articles = await strapi.db.query('api::article.article').findMany({
                where: { id: { $in: path } },
                select: ['id', 'title', 'slug']
            });
            // Sort articles by path order
            const orderedArticles = path.map(id => articles.find(a => a.id === id));
            ctx.send({
                success: true,
                data: {
                    path,
                    articles: orderedArticles,
                    length: path.length - 1
                }
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to find shortest path: ${error.message}`);
        }
    },
    /**
     * GET /api/graph/subgraph/:id
     *
     * Get subgraph for an article
     */
    async getSubgraph(ctx) {
        try {
            const { id } = ctx.params;
            const { depth = 2 } = ctx.query;
            const articleId = parseInt(id, 10);
            if (isNaN(articleId)) {
                return ctx.badRequest('Invalid article ID');
            }
            const graphService = strapi.service('api::article.graph');
            const subgraph = await graphService.getSubgraph(articleId, parseInt(depth, 10));
            ctx.send({
                success: true,
                data: subgraph
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to get subgraph: ${error.message}`);
        }
    },
    /**
     * GET /api/graph/bridge-articles
     *
     * Get bridge articles (high betweenness centrality)
     */
    async getBridgeArticles(ctx) {
        try {
            const { limit = 10 } = ctx.query;
            const graphService = strapi.service('api::article.graph');
            const bridges = await graphService.getBridgeArticles(parseInt(limit, 10));
            ctx.send({
                success: true,
                data: bridges
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to get bridge articles: ${error.message}`);
        }
    },
    /**
     * GET /api/graph/community/:id
     *
     * Get community members for an article
     */
    async getCommunityMembers(ctx) {
        try {
            const { id } = ctx.params;
            const { limit = 20 } = ctx.query;
            const articleId = parseInt(id, 10);
            if (isNaN(articleId)) {
                return ctx.badRequest('Invalid article ID');
            }
            const graphService = strapi.service('api::article.graph');
            const members = await graphService.getCommunityMembers(articleId, parseInt(limit, 10));
            ctx.send({
                success: true,
                data: members
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to get community members: ${error.message}`);
        }
    },
    /**
     * GET /api/graph/structurally-similar/:id
     *
     * Get structurally similar articles
     */
    async getStructurallySimilar(ctx) {
        try {
            const { id } = ctx.params;
            const { limit = 5 } = ctx.query;
            const articleId = parseInt(id, 10);
            if (isNaN(articleId)) {
                return ctx.badRequest('Invalid article ID');
            }
            const graphService = strapi.service('api::article.graph');
            const similar = await graphService.getStructurallySimilar(articleId, parseInt(limit, 10));
            ctx.send({
                success: true,
                data: similar
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to get structurally similar articles: ${error.message}`);
        }
    },
    /**
     * GET /api/graph/full
     *
     * Get full knowledge graph (all nodes and edges) for visualization
     */
    async getFullGraph(ctx) {
        try {
            // Get all articles with graph metrics
            const articles = await strapi.db.query('api::article.article').findMany({
                select: ['id', 'title', 'slug', 'category', 'pageRank', 'authorityScore', 'hubScore', 'community', 'totalDegree', 'betweennessCentrality'],
                orderBy: { pageRank: 'desc' }
            });
            // Get all active edges with populated relations
            const edges = await strapi.db.query('api::knowledge-edge.knowledge-edge').findMany({
                where: { isActive: true },
                populate: {
                    sourceArticle: true,
                    targetArticle: true
                }
            });
            // Format for react-force-graph
            const nodes = articles.map(article => ({
                id: article.id,
                title: article.title,
                slug: article.slug,
                category: article.category,
                pageRank: article.pageRank || 0.15,
                authorityScore: article.authorityScore || 0,
                hubScore: article.hubScore || 0,
                community: article.community || 0,
                totalDegree: article.totalDegree || 0,
                betweenness: article.betweennessCentrality || 0
            }));
            const links = edges
                .filter(edge => { var _a, _b; return ((_a = edge.sourceArticle) === null || _a === void 0 ? void 0 : _a.id) && ((_b = edge.targetArticle) === null || _b === void 0 ? void 0 : _b.id); })
                .map(edge => ({
                id: edge.id,
                source: edge.sourceArticle.id,
                target: edge.targetArticle.id,
                type: edge.relationshipType,
                weight: edge.weight || 0.5,
                label: edge.anchorText
            }));
            ctx.send({
                success: true,
                data: {
                    nodes,
                    links,
                    stats: {
                        totalNodes: nodes.length,
                        totalLinks: links.length,
                        communities: new Set(nodes.map(n => n.community)).size
                    }
                }
            });
        }
        catch (error) {
            ctx.throw(500, `Failed to get full graph: ${error.message}`);
        }
    }
};
