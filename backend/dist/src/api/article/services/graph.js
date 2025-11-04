"use strict";
/**
 * Graph Service
 *
 * Implements Knowledge Graph algorithms:
 * - PageRank (link importance)
 * - HITS (authority & hub scores)
 * - Recommendations (related articles)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    /**
     * Calculate PageRank for all articles
     *
     * PageRank formula:
     * PR(A) = (1-d) + d * Σ(PR(Ti) / C(Ti))
     *
     * where:
     * - d = damping factor (0.85)
     * - Ti = pages that link to A
     * - C(Ti) = number of outbound links from Ti
     *
     * @param iterations Number of iterations (default: 20)
     * @param dampingFactor Damping factor (default: 0.85)
     */
    async calculatePageRank(iterations = 20, dampingFactor = 0.85) {
        const startTime = Date.now();
        console.log(`[Graph] Starting PageRank calculation (iterations: ${iterations}, damping: ${dampingFactor})`);
        // Build graph data structure
        const graph = await this.buildGraphData();
        const N = graph.nodes.size;
        if (N === 0) {
            console.log('[Graph] No articles found, skipping PageRank');
            return;
        }
        // Initialize PageRank values
        const pageRank = new Map();
        const newPageRank = new Map();
        // Initial value: 1/N for all nodes
        for (const [id] of graph.nodes) {
            pageRank.set(id, 1.0 / N);
        }
        // Iterate until convergence
        for (let iter = 0; iter < iterations; iter++) {
            // Calculate new PageRank for each node
            for (const [id] of graph.nodes) {
                const incomingNodes = graph.inLinks.get(id) || [];
                let sum = 0.0;
                for (const sourceId of incomingNodes) {
                    const sourcePR = pageRank.get(sourceId) || 0;
                    const sourceOutDegree = (graph.outLinks.get(sourceId) || []).length;
                    if (sourceOutDegree > 0) {
                        sum += sourcePR / sourceOutDegree;
                    }
                }
                // PageRank formula
                const pr = (1.0 - dampingFactor) / N + dampingFactor * sum;
                newPageRank.set(id, pr);
            }
            // Copy new values to current
            for (const [id, pr] of newPageRank) {
                pageRank.set(id, pr);
            }
            console.log(`[Graph] Iteration ${iter + 1}/${iterations} complete`);
        }
        // Normalize PageRank values to 0-1 range
        let maxPR = 0;
        for (const pr of pageRank.values()) {
            if (pr > maxPR)
                maxPR = pr;
        }
        // Update articles in database
        let updated = 0;
        for (const [id, pr] of pageRank) {
            const normalizedPR = maxPR > 0 ? pr / maxPR : 0;
            await strapi.db.query('api::article.article').update({
                where: { id },
                data: {
                    pageRank: normalizedPR,
                    metricsLastCalculated: new Date()
                }
            });
            updated++;
        }
        const duration = Date.now() - startTime;
        console.log(`[Graph] PageRank calculation complete: ${updated} articles updated in ${duration}ms`);
    },
    /**
     * Calculate HITS (Hyperlink-Induced Topic Search) scores
     *
     * Authority: Quality as information source
     * Hub: Quality as directory/gateway
     */
    async calculateHITS(iterations = 20) {
        console.log(`[Graph] Starting HITS calculation (iterations: ${iterations})`);
        const graph = await this.buildGraphData();
        const N = graph.nodes.size;
        if (N === 0) {
            console.log('[Graph] No articles found, skipping HITS');
            return;
        }
        // Initialize scores
        const authority = new Map();
        const hub = new Map();
        for (const [id] of graph.nodes) {
            authority.set(id, 1.0);
            hub.set(id, 1.0);
        }
        // Iterate
        for (let iter = 0; iter < iterations; iter++) {
            const newAuthority = new Map();
            const newHub = new Map();
            // Update authority scores
            for (const [id] of graph.nodes) {
                const incomingNodes = graph.inLinks.get(id) || [];
                let sum = 0.0;
                for (const sourceId of incomingNodes) {
                    sum += hub.get(sourceId) || 0;
                }
                newAuthority.set(id, sum);
            }
            // Update hub scores
            for (const [id] of graph.nodes) {
                const outgoingNodes = graph.outLinks.get(id) || [];
                let sum = 0.0;
                for (const targetId of outgoingNodes) {
                    sum += newAuthority.get(targetId) || 0;
                }
                newHub.set(id, sum);
            }
            // Normalize
            let authNorm = 0, hubNorm = 0;
            for (const score of newAuthority.values())
                authNorm += score * score;
            for (const score of newHub.values())
                hubNorm += score * score;
            authNorm = Math.sqrt(authNorm);
            hubNorm = Math.sqrt(hubNorm);
            for (const [id, score] of newAuthority) {
                authority.set(id, authNorm > 0 ? score / authNorm : 0);
            }
            for (const [id, score] of newHub) {
                hub.set(id, hubNorm > 0 ? score / hubNorm : 0);
            }
        }
        // Update database
        for (const [id] of graph.nodes) {
            await strapi.db.query('api::article.article').update({
                where: { id },
                data: {
                    authorityScore: authority.get(id) || 0,
                    hubScore: hub.get(id) || 0,
                    metricsLastCalculated: new Date()
                }
            });
        }
        console.log('[Graph] HITS calculation complete');
    },
    /**
     * Update degree counts for all articles
     */
    async updateDegreeCounts() {
        console.log('[Graph] Updating degree counts');
        const graph = await this.buildGraphData();
        for (const [id] of graph.nodes) {
            const inDegree = (graph.inLinks.get(id) || []).length;
            const outDegree = (graph.outLinks.get(id) || []).length;
            await strapi.db.query('api::article.article').update({
                where: { id },
                data: {
                    inDegree,
                    outDegree,
                    totalDegree: inDegree + outDegree,
                    metricsLastCalculated: new Date()
                }
            });
        }
        console.log('[Graph] Degree counts updated');
    },
    /**
     * Get recommended articles based on graph structure
     *
     * @param articleId Article ID to get recommendations for
     * @param limit Number of recommendations (default: 5)
     */
    async getRecommendations(articleId, limit = 5) {
        // Get direct connections from Knowledge Edges
        const edges = await strapi.db.query('api::knowledge-edge.knowledge-edge').findMany({
            where: {
                sourceArticle: { id: articleId },
                isActive: true,
                isVisible: true
            },
            populate: ['targetArticle'],
            orderBy: [
                { weight: 'desc' },
                { qualityScore: 'desc' }
            ],
            limit
        });
        const recommendations = edges
            .map(edge => edge.targetArticle)
            .filter(article => article !== null);
        // If not enough direct recommendations, use PageRank similarity
        if (recommendations.length < limit) {
            const article = await strapi.db.query('api::article.article').findOne({
                where: { id: articleId },
                select: ['category', 'tags', 'pageRank']
            });
            if (article) {
                const similarArticles = await strapi.db.query('api::article.article').findMany({
                    where: {
                        id: { $ne: articleId },
                        category: article.category
                    },
                    orderBy: { pageRank: 'desc' },
                    limit: limit - recommendations.length
                });
                recommendations.push(...similarArticles);
            }
        }
        return recommendations.slice(0, limit);
    },
    /**
     * Build graph data structure from database
     */
    async buildGraphData() {
        var _a, _b;
        // Fetch all articles
        const articles = await strapi.db.query('api::article.article').findMany({
            select: ['id', 'title', 'pageRank', 'authorityScore', 'hubScore']
        });
        // Fetch all edges
        const edges = await strapi.db.query('api::knowledge-edge.knowledge-edge').findMany({
            where: { isActive: true },
            populate: ['sourceArticle', 'targetArticle']
        });
        // Build data structures
        const nodes = new Map();
        const adjacencyList = new Map();
        const inLinks = new Map();
        const outLinks = new Map();
        // Initialize nodes
        for (const article of articles) {
            nodes.set(article.id, article);
            adjacencyList.set(article.id, []);
            inLinks.set(article.id, []);
            outLinks.set(article.id, []);
        }
        // Build adjacency lists
        for (const edge of edges) {
            const sourceId = (_a = edge.sourceArticle) === null || _a === void 0 ? void 0 : _a.id;
            const targetId = (_b = edge.targetArticle) === null || _b === void 0 ? void 0 : _b.id;
            if (sourceId && targetId && nodes.has(sourceId) && nodes.has(targetId)) {
                adjacencyList.get(sourceId).push(targetId);
                outLinks.get(sourceId).push(targetId);
                inLinks.get(targetId).push(sourceId);
            }
        }
        return {
            nodes,
            edges,
            adjacencyList,
            inLinks,
            outLinks
        };
    },
    /**
     * Calculate Louvain Community Detection
     *
     * Detects communities/clusters in the knowledge graph using the Louvain method.
     * Maximizes modularity to find densely connected groups of articles.
     *
     * Modularity formula:
     * Q = 1/(2m) * Σ[ Aij - (ki*kj)/(2m) ] * δ(ci, cj)
     *
     * where:
     * - m = total number of edges
     * - Aij = adjacency matrix (1 if edge exists, 0 otherwise)
     * - ki, kj = degrees of nodes i and j
     * - ci, cj = communities of nodes i and j
     * - δ(ci, cj) = 1 if ci == cj, 0 otherwise
     */
    async calculateCommunities() {
        console.log('[Graph] Starting Louvain community detection');
        const startTime = Date.now();
        const graph = await this.buildGraphData();
        const N = graph.nodes.size;
        if (N === 0) {
            console.log('[Graph] No articles found, skipping community detection');
            return new Map();
        }
        // Initialize: each node in its own community
        const communities = new Map();
        for (const [id] of graph.nodes) {
            communities.set(id, id);
        }
        // Calculate total edges (m)
        const totalEdges = graph.edges.length;
        if (totalEdges === 0) {
            console.log('[Graph] No edges found, all nodes in separate communities');
            return communities;
        }
        // Calculate node degrees
        const degrees = new Map();
        for (const [id] of graph.nodes) {
            const degree = (graph.adjacencyList.get(id) || []).length;
            degrees.set(id, degree);
        }
        let improved = true;
        let iteration = 0;
        const maxIterations = 10;
        // Phase 1: Iteratively move nodes to optimize modularity
        while (improved && iteration < maxIterations) {
            improved = false;
            iteration++;
            for (const [nodeId] of graph.nodes) {
                const currentCommunity = communities.get(nodeId);
                const neighbors = graph.adjacencyList.get(nodeId) || [];
                // Find neighboring communities and their modularity gains
                const communityGains = new Map();
                for (const neighborId of neighbors) {
                    const neighborCommunity = communities.get(neighborId);
                    if (!communityGains.has(neighborCommunity)) {
                        const gain = this.calculateModularityGain(nodeId, currentCommunity, neighborCommunity, communities, graph, degrees, totalEdges);
                        communityGains.set(neighborCommunity, gain);
                    }
                }
                // Find best community to move to
                let bestCommunity = currentCommunity;
                let bestGain = 0;
                for (const [community, gain] of communityGains) {
                    if (gain > bestGain) {
                        bestGain = gain;
                        bestCommunity = community;
                    }
                }
                // Move node if improvement found
                if (bestCommunity !== currentCommunity && bestGain > 0) {
                    communities.set(nodeId, bestCommunity);
                    improved = true;
                }
            }
            console.log(`[Graph] Community detection iteration ${iteration}: improved=${improved}`);
        }
        // Count communities
        const uniqueCommunities = new Set(communities.values());
        console.log(`[Graph] Detected ${uniqueCommunities.size} communities in ${N} nodes`);
        // Update database with community assignments
        const communityMap = new Map();
        let communityIndex = 1;
        for (const communityId of uniqueCommunities) {
            communityMap.set(communityId, communityIndex++);
        }
        for (const [nodeId, communityId] of communities) {
            const normalizedCommunity = communityMap.get(communityId) || 0;
            await strapi.db.query('api::article.article').update({
                where: { id: nodeId },
                data: {
                    community: normalizedCommunity,
                    metricsLastCalculated: new Date()
                }
            });
        }
        const duration = Date.now() - startTime;
        console.log(`[Graph] Community detection complete in ${duration}ms`);
        return communities;
    },
    /**
     * Calculate modularity gain for moving a node to a different community
     */
    calculateModularityGain(nodeId, fromCommunity, toCommunity, communities, graph, degrees, totalEdges) {
        if (fromCommunity === toCommunity) {
            return 0;
        }
        const neighbors = graph.adjacencyList.get(nodeId) || [];
        const nodeDegree = degrees.get(nodeId) || 0;
        // Count edges to target community
        let edgesToCommunity = 0;
        let sumDegreesInCommunity = 0;
        for (const [otherId, otherCommunity] of communities) {
            if (otherCommunity === toCommunity) {
                sumDegreesInCommunity += degrees.get(otherId) || 0;
                if (neighbors.includes(otherId)) {
                    edgesToCommunity++;
                }
            }
        }
        // Modularity gain formula (simplified)
        const m2 = 2 * totalEdges;
        const gain = (edgesToCommunity / m2) - ((nodeDegree * sumDegreesInCommunity) / (m2 * m2));
        return gain;
    },
    /**
     * Calculate Betweenness Centrality
     *
     * Measures how often a node appears on shortest paths between other nodes.
     * Identifies "bridge" articles that connect different topic areas.
     *
     * Uses Brandes' algorithm for efficient computation.
     */
    async calculateBetweennessCentrality() {
        console.log('[Graph] Starting betweenness centrality calculation');
        const startTime = Date.now();
        const graph = await this.buildGraphData();
        const N = graph.nodes.size;
        if (N === 0) {
            console.log('[Graph] No articles found, skipping betweenness');
            return;
        }
        const betweenness = new Map();
        for (const [id] of graph.nodes) {
            betweenness.set(id, 0);
        }
        // For each source node
        for (const [sourceId] of graph.nodes) {
            // BFS to find shortest paths
            const stack = [];
            const paths = new Map();
            const sigma = new Map();
            const distance = new Map();
            for (const [id] of graph.nodes) {
                paths.set(id, []);
                sigma.set(id, 0);
                distance.set(id, -1);
            }
            sigma.set(sourceId, 1);
            distance.set(sourceId, 0);
            const queue = [sourceId];
            while (queue.length > 0) {
                const v = queue.shift();
                stack.push(v);
                const neighbors = graph.adjacencyList.get(v) || [];
                for (const w of neighbors) {
                    // First time we see w?
                    if (distance.get(w) < 0) {
                        queue.push(w);
                        distance.set(w, distance.get(v) + 1);
                    }
                    // Shortest path to w via v?
                    if (distance.get(w) === distance.get(v) + 1) {
                        sigma.set(w, sigma.get(w) + sigma.get(v));
                        paths.get(w).push(v);
                    }
                }
            }
            // Accumulation
            const delta = new Map();
            for (const [id] of graph.nodes) {
                delta.set(id, 0);
            }
            while (stack.length > 0) {
                const w = stack.pop();
                const predecessors = paths.get(w) || [];
                for (const v of predecessors) {
                    const c = (sigma.get(v) / sigma.get(w)) * (1 + delta.get(w));
                    delta.set(v, delta.get(v) + c);
                }
                if (w !== sourceId) {
                    betweenness.set(w, betweenness.get(w) + delta.get(w));
                }
            }
        }
        // Normalize (for undirected graph, divide by 2)
        let maxBetweenness = 0;
        for (const value of betweenness.values()) {
            if (value > maxBetweenness)
                maxBetweenness = value;
        }
        // Update database
        for (const [id, value] of betweenness) {
            const normalized = maxBetweenness > 0 ? value / maxBetweenness : 0;
            await strapi.db.query('api::article.article').update({
                where: { id },
                data: {
                    betweennessCentrality: normalized,
                    metricsLastCalculated: new Date()
                }
            });
        }
        const duration = Date.now() - startTime;
        console.log(`[Graph] Betweenness centrality complete in ${duration}ms`);
    },
    /**
     * Find shortest path between two articles using BFS
     *
     * @param sourceId Source article ID
     * @param targetId Target article ID
     * @returns Array of article IDs representing the path, or null if no path exists
     */
    async findShortestPath(sourceId, targetId) {
        const graph = await this.buildGraphData();
        if (!graph.nodes.has(sourceId) || !graph.nodes.has(targetId)) {
            return null;
        }
        if (sourceId === targetId) {
            return [sourceId];
        }
        // BFS to find shortest path
        const queue = [sourceId];
        const visited = new Set([sourceId]);
        const parent = new Map();
        while (queue.length > 0) {
            const current = queue.shift();
            if (current === targetId) {
                // Reconstruct path
                const path = [];
                let node = targetId;
                while (node !== undefined) {
                    path.unshift(node);
                    node = parent.get(node);
                }
                return path;
            }
            const neighbors = graph.adjacencyList.get(current) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    parent.set(neighbor, current);
                    queue.push(neighbor);
                }
            }
        }
        return null; // No path found
    },
    /**
     * Get subgraph for a specific article (neighbors + their neighbors)
     *
     * @param articleId Article ID
     * @param depth Depth of subgraph (default: 2)
     * @returns Object with nodes and edges in the subgraph
     */
    async getSubgraph(articleId, depth = 2) {
        const graph = await this.buildGraphData();
        if (!graph.nodes.has(articleId)) {
            return { nodes: [], edges: [] };
        }
        const subgraphNodes = new Set([articleId]);
        const currentLevel = new Set([articleId]);
        // BFS to depth levels
        for (let level = 0; level < depth; level++) {
            const nextLevel = new Set();
            for (const nodeId of currentLevel) {
                const neighbors = graph.adjacencyList.get(nodeId) || [];
                for (const neighbor of neighbors) {
                    if (!subgraphNodes.has(neighbor)) {
                        nextLevel.add(neighbor);
                        subgraphNodes.add(neighbor);
                    }
                }
                // Also add incoming neighbors
                const inNeighbors = graph.inLinks.get(nodeId) || [];
                for (const neighbor of inNeighbors) {
                    if (!subgraphNodes.has(neighbor)) {
                        nextLevel.add(neighbor);
                        subgraphNodes.add(neighbor);
                    }
                }
            }
            currentLevel.clear();
            for (const node of nextLevel) {
                currentLevel.add(node);
            }
        }
        // Get article details for subgraph nodes
        const nodes = await strapi.db.query('api::article.article').findMany({
            where: {
                id: { $in: Array.from(subgraphNodes) }
            },
            select: ['id', 'title', 'pageRank', 'authorityScore', 'hubScore', 'community']
        });
        // Get edges within subgraph
        const edges = graph.edges.filter(edge => {
            var _a, _b;
            const sourceId = (_a = edge.sourceArticle) === null || _a === void 0 ? void 0 : _a.id;
            const targetId = (_b = edge.targetArticle) === null || _b === void 0 ? void 0 : _b.id;
            return sourceId && targetId && subgraphNodes.has(sourceId) && subgraphNodes.has(targetId);
        });
        return { nodes, edges };
    },
    /**
     * Get bridge articles (high betweenness centrality)
     *
     * @param limit Number of articles to return (default: 10)
     * @returns Articles with highest betweenness centrality
     */
    async getBridgeArticles(limit = 10) {
        const articles = await strapi.db.query('api::article.article').findMany({
            where: {
                betweennessCentrality: { $gt: 0 }
            },
            orderBy: { betweennessCentrality: 'desc' },
            limit,
            select: ['id', 'title', 'betweennessCentrality', 'totalDegree', 'community']
        });
        return articles;
    },
    /**
     * Get community members for a specific article
     *
     * @param articleId Article ID
     * @param limit Number of community members to return (default: 20)
     * @returns Articles in the same community
     */
    async getCommunityMembers(articleId, limit = 20) {
        // Get article's community
        const article = await strapi.db.query('api::article.article').findOne({
            where: { id: articleId },
            select: ['id', 'community']
        });
        if (!article || !article.community) {
            return [];
        }
        // Find other articles in same community
        const members = await strapi.db.query('api::article.article').findMany({
            where: {
                id: { $ne: articleId },
                community: article.community
            },
            orderBy: { pageRank: 'desc' },
            limit,
            select: ['id', 'title', 'pageRank', 'authorityScore', 'community']
        });
        return members;
    },
    /**
     * Get structurally similar articles based on graph properties
     *
     * @param articleId Article ID
     * @param limit Number of similar articles to return (default: 5)
     * @returns Articles with similar graph structure
     */
    async getStructurallySimilar(articleId, limit = 5) {
        // Get article's graph metrics
        const article = await strapi.db.query('api::article.article').findOne({
            where: { id: articleId },
            select: ['id', 'pageRank', 'authorityScore', 'hubScore', 'totalDegree', 'community']
        });
        if (!article) {
            return [];
        }
        // Find articles with similar metrics
        const prLower = (article.pageRank || 0) * 0.7;
        const prUpper = (article.pageRank || 0) * 1.3;
        const degreeLower = Math.max(0, (article.totalDegree || 0) - 2);
        const degreeUpper = (article.totalDegree || 0) + 2;
        const similar = await strapi.db.query('api::article.article').findMany({
            where: {
                id: { $ne: articleId },
                $or: [
                    {
                        pageRank: { $gte: prLower, $lte: prUpper },
                        totalDegree: { $gte: degreeLower, $lte: degreeUpper }
                    },
                    {
                        community: article.community
                    }
                ]
            },
            orderBy: { pageRank: 'desc' },
            limit,
            select: ['id', 'title', 'pageRank', 'authorityScore', 'hubScore', 'totalDegree', 'community']
        });
        return similar;
    },
    /**
     * Run full graph analysis
     */
    async runFullAnalysis() {
        console.log('[Graph] Starting full graph analysis');
        const startTime = Date.now();
        await this.updateDegreeCounts();
        await this.calculatePageRank();
        await this.calculateHITS();
        await this.calculateCommunities();
        await this.calculateBetweennessCentrality();
        const duration = Date.now() - startTime;
        console.log(`[Graph] Full analysis complete in ${duration}ms`);
    }
});
