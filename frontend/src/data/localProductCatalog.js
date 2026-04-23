const productImageModules = {
    ...import.meta.glob('../assets/product/*.{png,jpg,jpeg,webp}', {
      eager: true,
      import: 'default',
    }),
    ...import.meta.glob('../assets/apple product/*.{png,jpg,jpeg,webp}', {
      eager: true,
      import: 'default',
    }),
  };
  
  const manualSellingPrices = {
    'boAt Airdopes 111': 12500,
    'boAt Airdopes 115': 13200,
    'boAt Airdopes 121 v2': 14500,
    'boAt Airdopes 131': 15900,
    'boAt Airdopes 172': 16900,
    'boAt Airdopes 192': 18900,
    'boAt Airdopes 201': 19900,
    'boAt Airdopes 381': 21500,
    'boAt Airdopes 381 MKI': 22900,
    'boAt Cosmos Pro': 38900,
    'boAt Storm': 27900,
    'boAt Storm Call': 32900,
    'boAt Storm RTL': 29900,
    'boAt TRebel Blaze': 30900,
    'boAt TRebel Matrix': 34900,
    'boAt Watch Storm - Captain America Marvel Edition': 36900,
    'realme 7 Pro (Mirror Silver, 128 GB) (6 GB RAM)': 228000,
    'realme 9 5G (Stargaze White, 128 GB) (6 GB RAM)': 214000,
    'realme 9 Pro 5G (Midnight Black, 128 GB) (6 GB RAM)': 259000,
    'realme C25s (Watery Grey, 128 GB) (4 GB RAM)': 168000,
    'realme C30 (Bamboo Green, 32 GB) (2 GB RAM)': 99000,
    'realme C35 (Glowing Green, 64 GB) (4 GB RAM)': 134000,
    'realme GT 5G (Racing Yellow, 256 GB) (12 GB RAM)': 415000,
    'realme GT Neo 3 (Asphalt Black, 128 GB) (8 GB RAM)': 398000,
    'realme Narzo 30 Pro 5G (Blade Silver, 64 GB) (6 GB RAM)': 188000,
    'realme Narzo 50A (Oxygen Blue, 128 GB) (4 GB RAM)': 126000,
    'realme Narzo 50A Prime (Flash Black, 64 GB) (4 GB RAM)': 118000,
    'SAMSUNG Galaxy A12 (Black, 128 GB) (6 GB RAM)': 152000,
    'SAMSUNG Galaxy A14 5G (Dark Red, 64 GB) (4 GB RAM)': 182000,
    'SAMSUNG Galaxy F23 5G (Aqua Blue, 128 GB) (6 GB RAM)': 236000,
    'SAMSUNG Galaxy M53 5G (Mystique Green, 128 GB) (8 GB RAM)': 328000,
    'SAMSUNG Galaxy Z Flip3 5G (Cream, 128 GB) (8 GB RAM)': 745000,
    'iphone 17': 1650000,
    'iphone12pro max': 820000,
    'iphone16 plus': 1380000,
    'Apple macbook air 13': 1490000,
    'Apple macbook pro 16': 2680000,
  };
  
  const normalizeFilename = (filePath) => {
    const fileName = filePath.split('/').pop() || '';
    return decodeURIComponent(fileName).replace(/\.[^.]+$/, '').trim();
  };
  
  const getProductKey = (fileName) => fileName.replace(/\s+\d+$/, '').trim();
  
  const slugify = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  
  const isAppleProduct = (productName) => {
    const normalizedName = String(productName || '').toLowerCase();
    return normalizedName.includes('iphone') || normalizedName.includes('macbook') || normalizedName.startsWith('apple');
  };
  
  const inferCategory = (productName) => {
    const normalizedName = String(productName || '').toLowerCase();
  
    if (normalizedName.includes('macbook')) {
      return 'laptops';
    }
  
    if (normalizedName.includes('iphone')) {
      return 'mobiles';
    }
  
    if (productName.includes('Airdopes')) {
      return 'airpodes';
    }
  
    if (productName.startsWith('boAt')) {
      return 'watches';
    }
  
    return 'mobiles';
  };
  
  const inferBrandName = (productName) => {
    if (isAppleProduct(productName)) {
      return 'Apple';
    }
  
    if (productName.startsWith('boAt')) {
      return 'boAt';
    }
  
    if (productName.startsWith('SAMSUNG')) {
      return 'Samsung';
    }
  
    return 'realme';
  };
  
  const buildPhoneDescription = (productName) => {
    const normalizedName = String(productName || '').toLowerCase();
  
    if (normalizedName.includes('iphone')) {
      return `${productName} delivers a premium Apple phone experience with a sharp display, smooth day-to-day performance, dependable cameras, and the polished feel users expect from iPhone.`;
    }
  
    const match = productName.match(/^(.*?) \((.*?), ([^)]*GB)\) \(([^)]*RAM)\)$/);
  
    if (!match) {
      return `${productName} gives shoppers a stylish finish, solid day-to-day speed, and enough storage for photos, apps, and entertainment.`;
    }
  
    const [, modelName, color, storage, ram] = match;
    const networkLine = modelName.includes('5G')
      ? ' It also adds 5G-ready connectivity for faster browsing and streaming.'
      : '';
  
    return `${modelName} in ${color} combines ${storage} storage with ${ram} for smooth multitasking, social apps, photos, and everyday entertainment.${networkLine}`;
  };
  
  const buildLaptopDescription = (productName) => {
    if (productName.toLowerCase().includes('pro')) {
      return `${productName} is built for demanding creative work and professional multitasking, with a large immersive display, premium build quality, and the fast, fluid performance expected from a MacBook Pro.`;
    }
  
    return `${productName} offers a slim premium design, smooth Apple performance, and all-day portability for study, work, streaming, and everyday productivity.`;
  };
  
  const buildAudioDescription = (productName) => {
    const extraLine =
      productName.includes('v2') || productName.includes('MKI')
        ? ' The updated build keeps it comfortable and dependable throughout the day.'
        : '';
  
    return `${productName} true wireless earbuds deliver clear sound, easy touch controls, and a pocket-friendly case for calls, music, and commuting.${extraLine}`;
  };
  
  const buildWatchDescription = (productName) => {
    if (productName.includes('Captain America')) {
      return `${productName} blends everyday fitness tracking with a bold Marvel-inspired look, giving users a smartwatch that stands out while handling notifications and daily activity goals.`;
    }
  
    if (productName.includes('Call')) {
      return `${productName} smartwatch keeps calls, message alerts, and workout tracking close at hand, making it a practical pick for busy days on the move.`;
    }
  
    return `${productName} smartwatch offers a sleek display, essential health tracking, and smart notifications to help users stay connected from workouts to workdays.`;
  };
  
  const buildDescription = (productName, category) => {
    if (category === 'mobiles') {
      return buildPhoneDescription(productName);
    }
  
    if (category === 'airpodes') {
      return buildAudioDescription(productName);
    }
  
    if (category === 'laptops') {
      return buildLaptopDescription(productName);
    }
  
    return buildWatchDescription(productName);
  };
  
  const buildSubCategory = (category) => {
    if (category === 'mobiles') {
      return 'smartphone';
    }
  
    if (category === 'airpodes') {
      return 'wireless_audio';
    }
  
    if (category === 'laptops') {
      return 'ultrabook';
    }
  
    return 'smartwatch';
  };
  
  const buildItemCount = (productName) => {
    const seed = productName.length * 3;
    return 4 + (seed % 11);
  };
  
  const buildOriginalPrice = (sellingPrice) => {
    const increasedPrice = Math.round(sellingPrice * 1.12);
    return Math.ceil(increasedPrice / 100) * 100;
  };
  
  const buildSortWeight = (productName) =>
    [...productName].reduce((total, char, index) => total + char.charCodeAt(0) * (index + 3), 0);
  
  const buildPriorityWeight = (productName) => {
    if (isAppleProduct(productName)) {
      return 0;
    }
  
    return 1;
  };
  
  const groupedProductImages = Object.entries(productImageModules).reduce((collection, [filePath, imageUrl]) => {
    const fileName = normalizeFilename(filePath);
    const productKey = getProductKey(fileName);
    const currentImages = collection.get(productKey) || [];
  
    currentImages.push({
      fileName,
      imageUrl,
    });
    collection.set(productKey, currentImages);
  
    return collection;
  }, new Map());
  
  export const localProducts = [...groupedProductImages.entries()]
    .map(([productName, imageEntries]) => {
      const category = inferCategory(productName);
      const sellingPrice = manualSellingPrices[productName] || 25000;
  
      return {
        _id: `local-${slugify(productName)}`,
        productName,
        brandName: inferBrandName(productName),
        category,
        subCategory: buildSubCategory(category),
        hotDeal: '',
        productStatus: 'Available',
        item: buildItemCount(productName),
        price: buildOriginalPrice(sellingPrice),
        sellingPrice,
        description: buildDescription(productName, category),
        productImage: imageEntries
          .sort((firstImage, secondImage) =>
            firstImage.fileName.localeCompare(secondImage.fileName, undefined, { numeric: true })
          )
          .map(({ imageUrl }) => imageUrl),
        sellerName: 'Elitech',
        sellerBrandName: 'Elitech Store',
        sellerPhoneNumber: '08000000000',
        isLocalCatalogProduct: true,
      };
    })
    .sort((firstProduct, secondProduct) => {
      const priorityDifference =
        buildPriorityWeight(firstProduct.productName) - buildPriorityWeight(secondProduct.productName);
  
      if (priorityDifference !== 0) {
        return priorityDifference;
      }
  
      return buildSortWeight(firstProduct.productName) - buildSortWeight(secondProduct.productName);
    });
  
  export const getLocalProductById = (productId) =>
    localProducts.find((product) => product._id === productId);
  
  export const isLocalProductId = (productId) => String(productId || '').startsWith('local-');
  
  export const getRelatedLocalProducts = (productId, category, limit = 6) => {
    const sameCategoryProducts = localProducts.filter(
      (product) => product._id !== productId && product.category === category
    );
  
    if (sameCategoryProducts.length >= limit) {
      return sameCategoryProducts.slice(0, limit);
    }
  
    const additionalProducts = localProducts.filter(
      (product) => product._id !== productId && product.category !== category
    );
  
    return [...sameCategoryProducts, ...additionalProducts].slice(0, limit);
  };
  