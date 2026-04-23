import { getLocalProductById as getStaticLocalProduct } from '../data/localProducts';
import { getLocalProductById as getCatalogLocalProduct } from '../data/localProductCatalog';

const STORAGE_KEY = 'adimiaLocalCartV1';

const readRaw = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeRaw = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const resolveClientOnlyProduct = (productId) =>
    getCatalogLocalProduct(productId) || getStaticLocalProduct(productId);

export const getLocalCartQuantitySum = () =>
    readRaw().reduce((sum, row) => sum + (Number(row.quantity) || 0), 0);

const lineId = (productId) => `local-line-${productId}`;

const parseLineOrProductId = (id) => {
    const s = String(id);
    if (s.startsWith('local-line-')) {
        return s.slice('local-line-'.length);
    }
    return s;
};

export const addLocalCartItem = (productId, addQty = 1) => {
    if (!resolveClientOnlyProduct(productId)) return;
    const items = readRaw();
    const idx = items.findIndex((row) => row.productId === productId);
    const q = Math.max(1, Number(addQty) || 1);
    if (idx >= 0) {
        items[idx].quantity += q;
    } else {
        items.push({ productId, quantity: q });
    }
    writeRaw(items);
};

/** Add one unit of a local catalog product (full product object) to browser cart storage. */
export const addLocalProductToCart = (product) => {
    if (!product?._id) return;
    addLocalCartItem(product._id, 1);
};

/** Single line item in the same shape as getLocalCartItems() for checkout / buy-now. */
export const buildLocalCheckoutItem = (product) => {
    if (!product?._id) return null;
    return {
        _id: lineId(product._id),
        quantity: 1,
        isLocalCatalogProduct: true,
        productId: {
            productName: product.productName,
            productImage: product.productImage,
            category: product.category,
            sellingPrice: product.sellingPrice,
        },
    };
};

export const getLocalCartItems = () => {
    const rows = readRaw();
    return rows
        .map((row) => {
            const product = resolveClientOnlyProduct(row.productId);
            if (!product) return null;
            return {
                _id: lineId(row.productId),
                quantity: row.quantity,
                isLocalCatalogProduct: true,
                productId: {
                    productName: product.productName,
                    productImage: product.productImage,
                    category: product.category,
                    sellingPrice: product.sellingPrice,
                },
            };
        })
        .filter(Boolean);
};

export const updateLocalCartItemQuantity = (id, quantity) => {
    const productId = parseLineOrProductId(id);
    const nextQty = Math.max(0, Math.floor(Number(quantity) || 0));
    const items = readRaw();
    const idx = items.findIndex((row) => row.productId === productId);
    if (idx < 0) return;
    if (nextQty <= 0) {
        items.splice(idx, 1);
    } else {
        items[idx].quantity = nextQty;
    }
    writeRaw(items);
};

export const removeLocalCartItem = (id) => {
    const productId = parseLineOrProductId(id);
    const items = readRaw().filter((row) => row.productId !== productId);
    writeRaw(items);
};
