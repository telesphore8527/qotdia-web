export const ENDPOINTS = {
    QUOTES: '/quotes',
    QUOTE_TODAY: '/quotes/today',
    QUOTE_BY_ID: (id)=> `/quotes/${id}`,
    CATEGORIES: '/categories',
    CATEGORY_BY_SLUG: (slug)=> `/categories/${slug}`,
    QUOTES_OF_CATEGORY: (slug)=> `/categories/${slug}/quotes`
}