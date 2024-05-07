export const BASE_URL: string = 'https://www.arezzo.com.br';

// HANDLERS LABELS
export const labels: { [key: string]: string } = {
    NEXTPAGE: 'NEXTPAGE',
    PRODUCT: 'PRODUCT'
};

// CATEGORY SELECTOR
export const CATEGORY_URL: string = 'a[data-testid="ta-header-category-title"]';

// NEXT PAGE SELECTOR
export const NEXT_PAGE: string = 'button.see-more-products-container__button';

// PRODUCT SELECTORS
export const PRODUCT_URL: string = 'a[data-testid="ta-product-link"]';
export const PRODUCT_NAME: string = 'h1[data-testid="ta-product-name"]';
export const PRODUCT_CODE: string = 'p[data-testid="ta-product-information__SKU"]';
export const PRODUCT_COLOR: string = 'span[data-testid^="ta-more-colors__current-color-name"]';
export const PRODUCT_DESCRIPTION: string = 'div[data-testid="ta-product_description"]';
export const PRODUCT_PRICE: string = 'span[data-testid="ta-product-price"]';
export const PRODUCT_SPECIAL_PRICE: string = 'span[data-testid="ta-product-price-now"]';
export const PRODUCT_IMAGES: string = 'img[data-testid="ta-product-gallery__photo"]';
export const PRODUCT_MATERIAL: string = 'p[data-testid="ta-product-details__material"]';
export const PRODUCT_SIZES: string = 'button.button-size'
export const PRODUCT_COLLECTION: string = '';
export const PRODUCT_GENDER: string = '';
export const PRODUCT_CATEGORY: string = 'ul[class="breadcrumb-list"] > li';
export const PRODUCT_BRAND: string = 'Arezzo';