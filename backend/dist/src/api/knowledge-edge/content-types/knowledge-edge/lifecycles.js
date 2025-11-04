"use strict";
/**
 * Knowledge Edge Lifecycle Hooks
 *
 * Automatically updates graph metrics when edges are created, updated, or deleted.
 * This ensures the Knowledge Graph stays synchronized in real-time.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * After creating a new edge
     */
    async afterCreate(event) {
        const { result } = event;
        console.log('[Lifecycle] Knowledge Edge created:', result.id);
        try {
            // Run incremental graph update
            const graphService = strapi.service('api::article.graph');
            // Update only affected articles
            await graphService.updateDegreeCounts();
            console.log('[Lifecycle] Graph metrics updated after edge creation');
        }
        catch (error) {
            console.error('[Lifecycle] Failed to update graph metrics:', error.message);
        }
    },
    /**
     * After updating an edge
     */
    async afterUpdate(event) {
        const { result } = event;
        console.log('[Lifecycle] Knowledge Edge updated:', result.id);
        try {
            const graphService = strapi.service('api::article.graph');
            await graphService.updateDegreeCounts();
            console.log('[Lifecycle] Graph metrics updated after edge update');
        }
        catch (error) {
            console.error('[Lifecycle] Failed to update graph metrics:', error.message);
        }
    },
    /**
     * After deleting an edge
     */
    async afterDelete(event) {
        const { result } = event;
        console.log('[Lifecycle] Knowledge Edge deleted:', result.id);
        try {
            const graphService = strapi.service('api::article.graph');
            // Full recalculation after deletion
            await graphService.updateDegreeCounts();
            await graphService.calculatePageRank();
            console.log('[Lifecycle] Graph metrics recalculated after edge deletion');
        }
        catch (error) {
            console.error('[Lifecycle] Failed to update graph metrics:', error.message);
        }
    },
    /**
     * Before creating - validation
     */
    async beforeCreate(event) {
        const { params } = event;
        const { data } = params;
        // Prevent self-loops
        if (data.sourceArticle === data.targetArticle) {
            throw new Error('Cannot create edge from article to itself (self-loop)');
        }
        console.log('[Lifecycle] Validated edge before creation');
    },
    /**
     * Before updating - validation
     */
    async beforeUpdate(event) {
        const { params } = event;
        const { data } = params;
        // Prevent self-loops
        if (data.sourceArticle && data.targetArticle && data.sourceArticle === data.targetArticle) {
            throw new Error('Cannot update edge to create self-loop');
        }
        console.log('[Lifecycle] Validated edge before update');
    }
};
