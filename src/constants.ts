export const BASE_URL: string = 'https://www.nike.com.br';

// HANDLERS LABELS
export const labels: { [key: string]: string } = {
    NEXTPAGE: 'NEXTPAGE',
    PRODUCT: 'PRODUCT'
};

// CATEGORY SELECTOR
export const CATEGORY_URL: string = '';

// NEXT PAGE SELECTOR
export const NEXT_PAGE: string = 'a[title="Ir para próxima página"]';

// PRODUCT SELECTORS
export const PRODUCT_URL: string = 'div[data-testid="products-search-3"] > div a';
export const PRODUCT_NAME: string = 'h1[data-testid="product-name"]';
export const PRODUCT_CODE: string = 'div[data-testid="product-info-container"] > ul > li:nth-child(2)';
export const PRODUCT_COLOR: string = 'li[data-testid="color-description"]';
export const PRODUCT_DESCRIPTION: string = 'div[data-testid="tech-info"] > div > div > p:nth-child(1)';
export const PRODUCT_PRICE: string = 'span.bPYemK';
export const PRODUCT_SPECIAL_PRICE: string = 'span[data-testid="pricebox"]';
export const PRODUCT_IMAGES: string = 'ul[data-testid="main-image"] > li > a > span > img';
export const PRODUCT_MATERIAL: string = '';
export const PRODUCT_COLLECTION: string = '';
export const PRODUCT_GENDER: string = '';
export const PRODUCT_CATEGORY: string = 'span[itemprop="name"]';
export const PRODUCT_BRAND: string = 'Nike';