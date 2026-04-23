import bakingSetImage from '../assets/product/6-piece-non-stick-baking-set.webp';
import dinnerPlateSetImage from '../assets/product/6-piece-white-dinner-plate-set.jpg';
import tealTshirtImage from '../assets/product/adults-plain-cotton-tshirt-2-pack-teal.jpg';
import cottonSocksImage from '../assets/product/athletic-cotton-socks-6-pairs.jpg';
import backpackImage from '../assets/product/backpack.jpg';
import bathroomRugImage from '../assets/product/bathroom-rug.jpg';
import toasterImage from '../assets/product/black-2-slot-toaster.jpg';
import beigeCurtainImage from '../assets/product/blackout-curtain-set-beige.webp';
import blackCurtainImage from '../assets/product/blackout-curtains-black.jpg';
import coffeeMakerImage from '../assets/product/coffeemaker-with-glass-carafe-black.jpg';
import bathTowelsImage from '../assets/product/cotton-bath-towels-teal.webp';
import blenderImage from '../assets/product/countertop-blender-64-oz.jpg';
import earringsTwistImage from '../assets/product/double-elongated-twist-french-wire-earrings.webp';
import duvetImage from '../assets/product/duvet-cover-set-blue-twin.jpg';
import kettleImage from '../assets/product/electric-glass-and-steel-hot-water-kettle.webp';
import tissueImage from '../assets/product/facial-tissue-2-ply-18-boxes.jpg';
import mixingBowlImage from '../assets/product/floral-mixing-bowl-set.jpg';
import basketballImage from '../assets/product/intermediate-composite-basketball.jpg';
import kitchenTowelImage from '../assets/product/kitchen-paper-towels-30-pack.jpg';
import graySneakerImage from '../assets/product/knit-athletic-sneakers-gray.jpg';
import pinkSneakerImage from '../assets/product/knit-athletic-sneakers-pink.webp';
import detergentImage from '../assets/product/liquid-laundry-detergent-plain.jpg';
import luxuryTowelSetImage from '../assets/product/luxury-tower-set-6-piece.jpg';
import greenAthleticShoeImage from '../assets/product/men-athletic-shoes-green.jpg';
import chinoPantsImage from '../assets/product/men-chino-pants-beige.jpg';
import fleeceHoodieImage from '../assets/product/men-cozy-fleece-zip-up-hoodie-red.jpg';
import golfPoloImage from '../assets/product/men-golf-polo-t-shirt-blue.jpg';
import navigatorSunglassesImage from '../assets/product/men-navigator-sunglasses-brown.jpg';
import summerShortsImage from '../assets/product/men-slim-fit-summer-shorts-gray.jpg';
import cookingSetImage from '../assets/product/non-stick-cooking-set-15-pieces.webp';
import yellowSweatshirtImage from '../assets/product/plain-hooded-fleece-sweatshirt-yellow.jpg';
import foodStorageImage from '../assets/product/round-airtight-food-storage-containers.jpg';
import blackSunglassesImage from '../assets/product/round-sunglasses-black.jpg';
import flowerEarringsImage from '../assets/product/sky-flower-stud-earrings.webp';
import sunhatImage from '../assets/product/straw-sunhat.webp';
import trashCanImage from '../assets/product/trash-can-with-foot-pedal-50-liter.jpg';
import umbrellaImage from '../assets/product/umbrella.jpg';
import vanityMirrorImage from '../assets/product/vanity-mirror-silver.jpg';
import beachSandalsImage from '../assets/product/women-beach-sandals.jpg';
import beachwearImage from '../assets/product/women-chiffon-beachwear-coverup-black.jpg';
import beanieImage from '../assets/product/women-chunky-beanie-gray.webp';
import joggerImage from '../assets/product/women-french-terry-fleece-jogger-camo.jpg';
import balletFlatImage from '../assets/product/women-knit-ballet-flat-black.jpg';
import blackHoodieImage from '../assets/product/women-stretch-popover-hoodie-black.jpg';

const buildProduct = ({
  _id,
  image,
  productName,
  brandName,
  category,
  subCategory,
  price,
  sellingPrice,
  rating,
  reviewCount,
  badge,
  soldLabel,
  hotDeal = false,
  productStatus = 'preorder',
  description,
}) => ({
  _id,
  productName,
  brandName,
  category,
  subCategory,
  productImage: [image],
  price,
  sellingPrice,
  rating,
  reviewCount,
  badge,
  soldLabel,
  hotDeal,
  productStatus,
  description:
    description ||
    `${productName} is available on Preordify as a curated preorder-ready item with clear pricing, modern styling, and reliable delivery expectations.`,
});

export const localProducts = [
  buildProduct({ _id: 'baking-set-6pc', image: bakingSetImage, productName: '6-Piece Non-Stick Baking Set', brandName: 'KitchenCraft', category: 'kitchen', subCategory: 'cookware', price: 42000, sellingPrice: 34900, rating: 4.6, reviewCount: 184, badge: 'Best seller', soldLabel: '320+ reserved', hotDeal: true }),
  buildProduct({ _id: 'white-dinner-plate-set', image: dinnerPlateSetImage, productName: '6-Piece White Dinner Plate Set', brandName: 'Casa Table', category: 'home', subCategory: 'dining', price: 24000, sellingPrice: 19900, rating: 4.4, reviewCount: 96, badge: 'Top rated', soldLabel: '140+ reserved' }),
  buildProduct({ _id: 'plain-cotton-tshirt-teal', image: tealTshirtImage, productName: 'Adults Plain Cotton T-Shirt 2-Pack', brandName: 'Daily Basics', category: 'apparel', subCategory: 'tops', price: 22000, sellingPrice: 17900, rating: 4.5, reviewCount: 312, badge: 'Everyday value', soldLabel: '900+ reserved', hotDeal: true }),
  buildProduct({ _id: 'athletic-cotton-socks', image: cottonSocksImage, productName: 'Athletic Cotton Socks 6 Pairs', brandName: 'StrideLab', category: 'apparel', subCategory: 'essentials', price: 15000, sellingPrice: 11900, rating: 4.7, reviewCount: 221, badge: 'Fast moving', soldLabel: '610+ reserved' }),
  buildProduct({ _id: 'travel-backpack', image: backpackImage, productName: 'Everyday Utility Backpack', brandName: 'CarryMode', category: 'accessories', subCategory: 'bags', price: 48000, sellingPrice: 39900, rating: 4.8, reviewCount: 151, badge: 'Editor pick', soldLabel: '430+ reserved', hotDeal: true }),
  buildProduct({ _id: 'bathroom-rug', image: bathroomRugImage, productName: 'Soft Touch Bathroom Rug', brandName: 'HomeNest', category: 'home', subCategory: 'bath', price: 18500, sellingPrice: 14900, rating: 4.3, reviewCount: 73, badge: 'New drop', soldLabel: '88+ reserved' }),
  buildProduct({ _id: 'black-toaster', image: toasterImage, productName: 'Black 2-Slot Toaster', brandName: 'HeatCo', category: 'kitchen', subCategory: 'appliances', price: 29000, sellingPrice: 23900, rating: 4.4, reviewCount: 112, badge: 'Kitchen favorite', soldLabel: '170+ reserved' }),
  buildProduct({ _id: 'beige-blackout-curtain', image: beigeCurtainImage, productName: 'Blackout Curtain Set Beige', brandName: 'Luma Home', category: 'home', subCategory: 'decor', price: 36000, sellingPrice: 30500, rating: 4.6, reviewCount: 132, badge: 'Most wished', soldLabel: '250+ reserved' }),
  buildProduct({ _id: 'black-blackout-curtain', image: blackCurtainImage, productName: 'Blackout Curtains Black', brandName: 'Luma Home', category: 'home', subCategory: 'decor', price: 36500, sellingPrice: 30900, rating: 4.5, reviewCount: 101, badge: 'Popular finish', soldLabel: '180+ reserved' }),
  buildProduct({ _id: 'coffee-maker-glass-carafe', image: coffeeMakerImage, productName: 'Coffee Maker With Glass Carafe', brandName: 'BrewVista', category: 'kitchen', subCategory: 'appliances', price: 52000, sellingPrice: 44900, rating: 4.7, reviewCount: 144, badge: 'Morning essential', soldLabel: '290+ reserved', hotDeal: true }),
  buildProduct({ _id: 'cotton-bath-towels-teal', image: bathTowelsImage, productName: 'Cotton Bath Towels Teal', brandName: 'SoftWeave', category: 'home', subCategory: 'bath', price: 16000, sellingPrice: 12900, rating: 4.3, reviewCount: 81, badge: 'Value pack', soldLabel: '110+ reserved' }),
  buildProduct({ _id: 'countertop-blender', image: blenderImage, productName: 'Countertop Blender 64 oz', brandName: 'BlendWorks', category: 'kitchen', subCategory: 'appliances', price: 61000, sellingPrice: 52900, rating: 4.6, reviewCount: 129, badge: 'Family size', soldLabel: '210+ reserved' }),
  buildProduct({ _id: 'twist-wire-earrings', image: earringsTwistImage, productName: 'Twist French Wire Earrings', brandName: 'Aurielle', category: 'accessories', subCategory: 'jewelry', price: 14000, sellingPrice: 10900, rating: 4.4, reviewCount: 55, badge: 'Gift pick', soldLabel: '90+ reserved' }),
  buildProduct({ _id: 'duvet-cover-blue-twin', image: duvetImage, productName: 'Blue Twin Duvet Cover Set', brandName: 'DreamLinen', category: 'home', subCategory: 'bedding', price: 43000, sellingPrice: 36900, rating: 4.5, reviewCount: 94, badge: 'Fresh arrival', soldLabel: '130+ reserved' }),
  buildProduct({ _id: 'electric-kettle-glass-steel', image: kettleImage, productName: 'Electric Glass and Steel Kettle', brandName: 'HeatCo', category: 'kitchen', subCategory: 'appliances', price: 31000, sellingPrice: 25900, rating: 4.6, reviewCount: 163, badge: 'Quick boil', soldLabel: '350+ reserved' }),
  buildProduct({ _id: 'facial-tissue-18-boxes', image: tissueImage, productName: 'Facial Tissue 2-Ply 18 Boxes', brandName: 'PureSoft', category: 'essentials', subCategory: 'household', price: 12500, sellingPrice: 9900, rating: 4.2, reviewCount: 88, badge: 'Bulk buy', soldLabel: '400+ reserved' }),
  buildProduct({ _id: 'floral-mixing-bowl-set', image: mixingBowlImage, productName: 'Floral Mixing Bowl Set', brandName: 'KitchenCraft', category: 'kitchen', subCategory: 'serveware', price: 27000, sellingPrice: 21900, rating: 4.5, reviewCount: 74, badge: 'Bright pick', soldLabel: '115+ reserved' }),
  buildProduct({ _id: 'composite-basketball', image: basketballImage, productName: 'Intermediate Composite Basketball', brandName: 'CourtPlay', category: 'sports', subCategory: 'team-sports', price: 28000, sellingPrice: 22900, rating: 4.8, reviewCount: 117, badge: 'Athlete choice', soldLabel: '205+ reserved', hotDeal: true }),
  buildProduct({ _id: 'kitchen-paper-towels', image: kitchenTowelImage, productName: 'Kitchen Paper Towels 30 Pack', brandName: 'PureSoft', category: 'essentials', subCategory: 'household', price: 21000, sellingPrice: 16900, rating: 4.4, reviewCount: 93, badge: 'Stock-up deal', soldLabel: '260+ reserved' }),
  buildProduct({ _id: 'gray-knit-sneakers', image: graySneakerImage, productName: 'Knit Athletic Sneakers Gray', brandName: 'StrideLab', category: 'footwear', subCategory: 'sneakers', price: 52000, sellingPrice: 43900, rating: 4.7, reviewCount: 201, badge: 'Top pick', soldLabel: '520+ reserved', hotDeal: true }),
  buildProduct({ _id: 'pink-knit-sneakers', image: pinkSneakerImage, productName: 'Knit Athletic Sneakers Pink', brandName: 'StrideLab', category: 'footwear', subCategory: 'sneakers', price: 51000, sellingPrice: 42900, rating: 4.6, reviewCount: 148, badge: 'Trending', soldLabel: '280+ reserved' }),
  buildProduct({ _id: 'liquid-laundry-detergent', image: detergentImage, productName: 'Liquid Laundry Detergent Plain', brandName: 'FreshWash', category: 'essentials', subCategory: 'laundry', price: 19000, sellingPrice: 14900, rating: 4.3, reviewCount: 69, badge: 'Home staple', soldLabel: '170+ reserved' }),
  buildProduct({ _id: 'luxury-towel-set', image: luxuryTowelSetImage, productName: 'Luxury Towel Set 6 Piece', brandName: 'SoftWeave', category: 'home', subCategory: 'bath', price: 33500, sellingPrice: 27900, rating: 4.7, reviewCount: 126, badge: 'Premium feel', soldLabel: '195+ reserved' }),
  buildProduct({ _id: 'green-men-athletic-shoes', image: greenAthleticShoeImage, productName: 'Men Athletic Shoes Green', brandName: 'RunMode', category: 'footwear', subCategory: 'running', price: 56000, sellingPrice: 46900, rating: 4.7, reviewCount: 189, badge: 'Sporty pick', soldLabel: '340+ reserved' }),
  buildProduct({ _id: 'beige-chino-pants', image: chinoPantsImage, productName: 'Men Chino Pants Beige', brandName: 'Urban Fit', category: 'apparel', subCategory: 'bottoms', price: 31000, sellingPrice: 25900, rating: 4.5, reviewCount: 115, badge: 'Workwear', soldLabel: '220+ reserved' }),
  buildProduct({ _id: 'red-fleece-hoodie', image: fleeceHoodieImage, productName: 'Men Cozy Fleece Zip-Up Hoodie', brandName: 'Urban Fit', category: 'apparel', subCategory: 'outerwear', price: 39000, sellingPrice: 32900, rating: 4.6, reviewCount: 177, badge: 'Cold weather', soldLabel: '305+ reserved' }),
  buildProduct({ _id: 'blue-golf-polo', image: golfPoloImage, productName: 'Men Golf Polo T-Shirt Blue', brandName: 'ClubLine', category: 'apparel', subCategory: 'tops', price: 26000, sellingPrice: 20900, rating: 4.4, reviewCount: 82, badge: 'Smart casual', soldLabel: '150+ reserved' }),
  buildProduct({ _id: 'brown-navigator-sunglasses', image: navigatorSunglassesImage, productName: 'Men Navigator Sunglasses Brown', brandName: 'ShadeLab', category: 'accessories', subCategory: 'eyewear', price: 18000, sellingPrice: 14500, rating: 4.5, reviewCount: 61, badge: 'Sun ready', soldLabel: '120+ reserved' }),
  buildProduct({ _id: 'gray-summer-shorts', image: summerShortsImage, productName: 'Men Slim Fit Summer Shorts Gray', brandName: 'Urban Fit', category: 'apparel', subCategory: 'bottoms', price: 23000, sellingPrice: 18900, rating: 4.3, reviewCount: 71, badge: 'Warm weather', soldLabel: '110+ reserved' }),
  buildProduct({ _id: 'non-stick-cooking-set', image: cookingSetImage, productName: 'Non-Stick Cooking Set 15 Pieces', brandName: 'KitchenCraft', category: 'kitchen', subCategory: 'cookware', price: 69000, sellingPrice: 57900, rating: 4.8, reviewCount: 205, badge: 'Most wanted', soldLabel: '460+ reserved', hotDeal: true }),
  buildProduct({ _id: 'yellow-fleece-sweatshirt', image: yellowSweatshirtImage, productName: 'Plain Hooded Fleece Sweatshirt Yellow', brandName: 'Daily Basics', category: 'apparel', subCategory: 'outerwear', price: 34000, sellingPrice: 28900, rating: 4.5, reviewCount: 104, badge: 'Bright pick', soldLabel: '175+ reserved' }),
  buildProduct({ _id: 'airtight-food-storage-containers', image: foodStorageImage, productName: 'Round Airtight Food Storage Containers', brandName: 'FreshKeep', category: 'kitchen', subCategory: 'storage', price: 21500, sellingPrice: 17500, rating: 4.4, reviewCount: 79, badge: 'Pantry favorite', soldLabel: '142+ reserved' }),
  buildProduct({ _id: 'round-sunglasses-black', image: blackSunglassesImage, productName: 'Round Sunglasses Black', brandName: 'ShadeLab', category: 'accessories', subCategory: 'eyewear', price: 17000, sellingPrice: 13600, rating: 4.3, reviewCount: 58, badge: 'Everyday style', soldLabel: '95+ reserved' }),
  buildProduct({ _id: 'sky-flower-earrings', image: flowerEarringsImage, productName: 'Sky Flower Stud Earrings', brandName: 'Aurielle', category: 'accessories', subCategory: 'jewelry', price: 13500, sellingPrice: 9900, rating: 4.4, reviewCount: 47, badge: 'Lightweight', soldLabel: '84+ reserved' }),
  buildProduct({ _id: 'straw-sunhat', image: sunhatImage, productName: 'Straw Sunhat', brandName: 'Coastline', category: 'accessories', subCategory: 'hats', price: 16500, sellingPrice: 12900, rating: 4.5, reviewCount: 65, badge: 'Vacation pick', soldLabel: '102+ reserved' }),
  buildProduct({ _id: 'trash-can-50-liter', image: trashCanImage, productName: 'Trash Can With Foot Pedal 50 Liter', brandName: 'HomeNest', category: 'home', subCategory: 'utility', price: 33000, sellingPrice: 27900, rating: 4.6, reviewCount: 88, badge: 'Neat space', soldLabel: '138+ reserved' }),
  buildProduct({ _id: 'umbrella-classic', image: umbrellaImage, productName: 'Classic Everyday Umbrella', brandName: 'WeatherWay', category: 'accessories', subCategory: 'weather', price: 14500, sellingPrice: 11200, rating: 4.3, reviewCount: 77, badge: 'Rain ready', soldLabel: '164+ reserved' }),
  buildProduct({ _id: 'vanity-mirror-silver', image: vanityMirrorImage, productName: 'Vanity Mirror Silver', brandName: 'GlowSpace', category: 'beauty', subCategory: 'tools', price: 25000, sellingPrice: 20900, rating: 4.4, reviewCount: 52, badge: 'Desk essential', soldLabel: '73+ reserved' }),
  buildProduct({ _id: 'women-beach-sandals', image: beachSandalsImage, productName: 'Women Beach Sandals', brandName: 'Coastline', category: 'footwear', subCategory: 'sandals', price: 22000, sellingPrice: 17600, rating: 4.5, reviewCount: 84, badge: 'Easy wear', soldLabel: '145+ reserved' }),
  buildProduct({ _id: 'women-beachwear-coverup', image: beachwearImage, productName: 'Women Chiffon Beachwear Coverup', brandName: 'Coastline', category: 'apparel', subCategory: 'resortwear', price: 28000, sellingPrice: 22900, rating: 4.6, reviewCount: 91, badge: 'Seasonal favorite', soldLabel: '132+ reserved' }),
  buildProduct({ _id: 'women-chunky-beanie', image: beanieImage, productName: 'Women Chunky Beanie Gray', brandName: 'WarmForm', category: 'accessories', subCategory: 'hats', price: 15000, sellingPrice: 11900, rating: 4.4, reviewCount: 56, badge: 'Cozy pick', soldLabel: '96+ reserved' }),
  buildProduct({ _id: 'women-jogger-camo', image: joggerImage, productName: 'Women French Terry Fleece Jogger', brandName: 'MoveDaily', category: 'apparel', subCategory: 'bottoms', price: 29500, sellingPrice: 24500, rating: 4.5, reviewCount: 86, badge: 'Lounge fit', soldLabel: '118+ reserved' }),
  buildProduct({ _id: 'women-knit-ballet-flat', image: balletFlatImage, productName: 'Women Knit Ballet Flat Black', brandName: 'SoleEase', category: 'footwear', subCategory: 'flats', price: 26000, sellingPrice: 21500, rating: 4.4, reviewCount: 74, badge: 'Office ready', soldLabel: '109+ reserved' }),
  buildProduct({ _id: 'women-popover-hoodie-black', image: blackHoodieImage, productName: 'Women Stretch Popover Hoodie Black', brandName: 'MoveDaily', category: 'apparel', subCategory: 'outerwear', price: 36000, sellingPrice: 29900, rating: 4.7, reviewCount: 141, badge: 'Trending fit', soldLabel: '240+ reserved', hotDeal: true }),
];

export const productCategoryOptions = Array.from(
  new Set(localProducts.map((product) => product.category))
).map((category, index) => ({
  id: index + 1,
  label: category.charAt(0).toUpperCase() + category.slice(1),
  value: category,
}));

export const getAllLocalProducts = () => [...localProducts];

export const getLocalProductById = (id) =>
  localProducts.find((product) => product._id === id);

export const getLocalProductsByCategory = (category) => {
  if (!category || category === 'all') {
    return getAllLocalProducts();
  }

  return localProducts.filter((product) => product.category === category);
};

export const getLocalProductsBySubCategory = (subCategory) =>
  localProducts.filter((product) => product.subCategory === subCategory);

export const getLocalHotDealProducts = () =>
  localProducts.filter((product) => product.hotDeal);

export const searchLocalProducts = (query = '') => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getAllLocalProducts();
  }

  return localProducts.filter((product) =>
    [product.productName, product.brandName, product.category, product.subCategory]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  );
};

export const getLocalCategorySummaries = () =>
  productCategoryOptions.map(({ value, label }) => {
    const matchedProduct = localProducts.find((product) => product.category === value);

    return {
      category: value,
      label,
      productImage: matchedProduct?.productImage || [],
    };
  });
