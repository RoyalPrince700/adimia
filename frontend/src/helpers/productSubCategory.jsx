const productSubCategoryMap = {
  tops: [
    { label: 'T-shirts', value: 't_shirts' },
    { label: 'Polos', value: 'polos' },
    { label: 'Long Sleeves', value: 'long_sleeves' },
  ],
  hoodies_sweatshirts: [
    { label: 'Hoodies', value: 'hoodies' },
    { label: 'Sweatshirts', value: 'sweatshirts' },
  ],
  outerwear: [
    { label: 'Jackets', value: 'jackets' },
    { label: 'Coats', value: 'coats' },
    { label: 'Windbreakers', value: 'windbreakers' },
  ],
  bottoms: [
    { label: 'Jeans', value: 'jeans' },
    { label: 'Cargos', value: 'cargos' },
    { label: 'Joggers', value: 'joggers' },
    { label: 'Shorts', value: 'shorts' },
  ],
  sets: [
    { label: 'Matching Fits', value: 'matching_fits' },
    { label: 'Two Piece Sets', value: 'two_piece_sets' },
  ],
  activewear: [
    { label: 'Gym Wear', value: 'gym_wear' },
    { label: 'Athleisure', value: 'athleisure' },
  ],
  graphic_tees: [
    { label: 'Printed Tees', value: 'printed_tees' },
    { label: 'Statement Tees', value: 'statement_tees' },
  ],
  oversized_fits: [
    { label: 'Oversized Tees', value: 'oversized_tees' },
    { label: 'Oversized Hoodies', value: 'oversized_hoodies' },
  ],
  cargos_utility_wear: [
    { label: 'Utility Cargos', value: 'utility_cargos' },
    { label: 'Utility Shorts', value: 'utility_shorts' },
  ],
  essential_basics: [
    { label: 'Plain Tees', value: 'plain_tees' },
    { label: 'Plain Hoodies', value: 'plain_hoodies' },
    { label: 'Basic Bottoms', value: 'basic_bottoms' },
  ],
  limited_drops_exclusive: [
    { label: 'Limited Drop', value: 'limited_drop' },
    { label: 'Exclusive Release', value: 'exclusive_release' },
  ],
  vintage_washed_collection: [
    { label: 'Vintage Wash', value: 'vintage_wash' },
    { label: 'Washed Tees', value: 'washed_tees' },
    { label: 'Washed Hoodies', value: 'washed_hoodies' },
  ],
  caps_beanies: [
    { label: 'Caps', value: 'caps' },
    { label: 'Beanies', value: 'beanies' },
  ],
  bags: [
    { label: 'Crossbody Bags', value: 'crossbody_bags' },
    { label: 'Backpacks', value: 'backpacks' },
  ],
  socks: [
    { label: 'Ankle Socks', value: 'ankle_socks' },
    { label: 'Crew Socks', value: 'crew_socks' },
  ],
  jewelry: [
    { label: 'Chains', value: 'chains' },
    { label: 'Rings', value: 'rings' },
  ],
  belts: [
    { label: 'Classic Belts', value: 'classic_belts' },
    { label: 'Statement Belts', value: 'statement_belts' },
  ],
  summer_collection: [
    { label: 'Summer Essentials', value: 'summer_essentials' },
    { label: 'Lightweight Fits', value: 'lightweight_fits' },
  ],
  winter_collection: [
    { label: 'Cold Weather Layers', value: 'cold_weather_layers' },
    { label: 'Heavyweight Pieces', value: 'heavyweight_pieces' },
  ],
  drop_series: [
    { label: 'Drop 001', value: 'drop_001' },
    { label: 'Drop 002', value: 'drop_002' },
  ],
  collabs: [
    { label: 'Brand Collabs', value: 'brand_collabs' },
    { label: 'Artist Collabs', value: 'artist_collabs' },
  ],
  men: [
    { label: 'Men', value: 'men' },
  ],
  women: [
    { label: 'Women', value: 'women' },
  ],
  unisex: [
    { label: 'Unisex', value: 'unisex' },
  ],
  smartphones: [
    { label: 'iPhone', value: 'iphone' },
    { label: 'Samsung', value: 'samsung' },
  ],
  tablets_ipads: [
    { label: 'Tablets', value: 'tablets' },
    { label: 'iPads', value: 'ipads' },
  ],
  laptops: [
    { label: 'Windows Laptops', value: 'windows_laptops' },
    { label: 'MacBooks', value: 'macbooks' },
    { label: 'Gaming Laptops', value: 'gaming_laptops' },
  ],
  smartwatches_wearables: [
    { label: 'Smartwatches', value: 'smartwatches' },
    { label: 'Fitness Bands', value: 'fitness_bands' },
    { label: 'Wearables', value: 'wearables' },
  ],
  gaming: [
    { label: 'Consoles', value: 'consoles' },
    { label: 'Controllers', value: 'controllers' },
    { label: 'Gaming Accessories', value: 'gaming_accessories' },
  ],
  chargers_adapters: [
    { label: 'Chargers', value: 'chargers' },
    { label: 'Adapters', value: 'adapters' },
  ],
  power_banks: [
    { label: 'Power Banks', value: 'power_banks' },
  ],
  phone_cases_screen_protectors: [
    { label: 'Phone Cases', value: 'phone_cases' },
    { label: 'Screen Protectors', value: 'screen_protectors' },
  ],
  earphones_headphones: [
    { label: 'Earphones', value: 'earphones' },
    { label: 'Headphones', value: 'headphones' },
  ],
  cables: [
    { label: 'USB Cables', value: 'usb_cables' },
    { label: 'Type-C Cables', value: 'type_c_cables' },
    { label: 'Lightning Cables', value: 'lightning_cables' },
  ],
  smart_home_devices: [
    { label: 'Smart Bulbs', value: 'smart_bulbs' },
    { label: 'Smart Plugs', value: 'smart_plugs' },
    { label: 'CCTV Cameras', value: 'cctv_cameras' },
  ],
  bluetooth_devices: [
    { label: 'Bluetooth Speakers', value: 'bluetooth_speakers' },
    { label: 'Bluetooth Earbuds', value: 'bluetooth_earbuds' },
  ],
  streaming_devices: [
    { label: 'TV Sticks', value: 'tv_sticks' },
    { label: 'Streaming Boxes', value: 'streaming_boxes' },
  ],
  keyboards_mouse: [
    { label: 'Keyboards', value: 'keyboards' },
    { label: 'Mouse', value: 'mouse' },
  ],
  storage_devices: [
    { label: 'Flash Drives', value: 'flash_drives' },
    { label: 'SSDs', value: 'ssds' },
    { label: 'Memory Cards', value: 'memory_cards' },
  ],
  routers_networking: [
    { label: 'Routers', value: 'routers' },
    { label: 'Networking Gear', value: 'networking_gear' },
  ],
  car_accessories: [
    { label: 'Car Chargers', value: 'car_chargers' },
    { label: 'Phone Holders', value: 'phone_holders' },
  ],
  fitness_gadgets: [
    { label: 'Fitness Gadgets', value: 'fitness_gadgets' },
  ],
  portable_fans_mini_gadgets: [
    { label: 'Portable Fans', value: 'portable_fans' },
    { label: 'Mini Gadgets', value: 'mini_gadgets' },
  ],
  led_lights_room_setup: [
    { label: 'LED Lights', value: 'led_lights' },
    { label: 'Room Setup', value: 'room_setup' },
  ],
  new_arrivals: [
    { label: 'New Arrivals', value: 'new_arrivals' },
  ],
  best_sellers: [
    { label: 'Best Sellers', value: 'best_sellers' },
  ],
  hot_deals_discounts: [
    { label: 'Hot Deals', value: 'hot_deals' },
    { label: 'Discounts', value: 'discounts' },
  ],
  budget_picks: [
    { label: 'Under ₦20k', value: 'under_20k' },
    { label: 'Under ₦50k', value: 'under_50k' },
  ],
  premium_devices: [
    { label: 'Premium Devices', value: 'premium_devices' },
  ],
};

const productSubCategory = Object.entries(productSubCategoryMap).flatMap(([category, items]) =>
  items.map((item, index) => ({
    id: `${category}-${index + 1}`,
    category,
    ...item,
  }))
);

export const getProductSubCategoryOptions = (category) =>
  productSubCategory.filter((item) => item.category === category);

export default productSubCategory;
