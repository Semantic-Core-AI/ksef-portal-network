"use strict";
/**
 * Graph Routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        // Algorithm endpoints
        {
            method: 'POST',
            path: '/graph/calculate-pagerank',
            handler: 'graph.calculatePageRank',
            config: {
                auth: false // Set to true if you want to require authentication
            }
        },
        {
            method: 'POST',
            path: '/graph/calculate-hits',
            handler: 'graph.calculateHITS',
            config: {
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/graph/calculate-communities',
            handler: 'graph.calculateCommunities',
            config: {
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/graph/calculate-betweenness',
            handler: 'graph.calculateBetweenness',
            config: {
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/graph/run-analysis',
            handler: 'graph.runAnalysis',
            config: {
                auth: false
            }
        },
        // Query endpoints
        {
            method: 'GET',
            path: '/graph/recommendations/:id',
            handler: 'graph.getRecommendations',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/graph/stats',
            handler: 'graph.getStats',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/graph/shortest-path/:sourceId/:targetId',
            handler: 'graph.getShortestPath',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/graph/subgraph/:id',
            handler: 'graph.getSubgraph',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/graph/bridge-articles',
            handler: 'graph.getBridgeArticles',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/graph/community/:id',
            handler: 'graph.getCommunityMembers',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/graph/structurally-similar/:id',
            handler: 'graph.getStructurallySimilar',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/graph/full',
            handler: 'graph.getFullGraph',
            config: {
                auth: false
            }
        }
    ]
};
