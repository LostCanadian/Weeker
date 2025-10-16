export const DEFAULT_FOCUS_ICON = '🗂️';

type KeywordIconEntry = {
  icon: string;
  keywords: string[];
};

const sportsEntries: KeywordIconEntry[] = [
  { icon: '🚶', keywords: ['walk', 'walking', 'stroll', 'steps'] },
  { icon: '🏃', keywords: ['run', 'running', 'jog', 'sprint'] },
  { icon: '🏃‍♂️', keywords: ['marathon', 'race', 'training', 'tempo'] },
  { icon: '🥾', keywords: ['hike', 'hiking', 'trail', 'summit'] },
  { icon: '🚴', keywords: ['bike', 'biking', 'cycling', 'ride'] },
  { icon: '🚴‍♂️', keywords: ['road', 'peloton', 'training', 'cadence'] },
  { icon: '🚵', keywords: ['mountain', 'trail', 'mtb', 'downhill'] },
  { icon: '🚲', keywords: ['bicycle', 'commute', 'pedal', 'cycle'] },
  { icon: '🏊', keywords: ['swim', 'swimming', 'pool', 'laps'] },
  { icon: '🧗', keywords: ['climb', 'climbing', 'boulder', 'crag'] },
  { icon: '🧘', keywords: ['yoga', 'stretch', 'balance', 'pose'] },
  { icon: '🧘‍♀️', keywords: ['meditation', 'mindfulness', 'breath', 'calm'] },
  { icon: '🏋️', keywords: ['lift', 'lifting', 'strength', 'weights'] },
  { icon: '🥊', keywords: ['boxing', 'spar', 'punch', 'bag'] },
  { icon: '🛹', keywords: ['skateboard', 'skateboarding', 'ollie', 'park'] },
  { icon: '⛸️', keywords: ['skating', 'ice', 'figure', 'rink'] },
  { icon: '🏌️', keywords: ['golf', 'swing', 'putt', 'fairway'] },
  { icon: '⛳', keywords: ['golfing', 'green', 'handicap', 'links'] },
  { icon: '🏄', keywords: ['surf', 'surfing', 'waves', 'ocean'] },
  { icon: '🥋', keywords: ['martial', 'karate', 'dojo', 'sparring'] },
  { icon: '🤸', keywords: ['gymnastics', 'cartwheel', 'tumble', 'routine'] },
];

const creativeEntries: KeywordIconEntry[] = [
  { icon: '🎨', keywords: ['art', 'painting', 'canvas', 'creative'] },
  { icon: '✏️', keywords: ['sketch', 'drawing', 'doodle', 'illustration'] },
  { icon: '🖌️', keywords: ['brush', 'watercolor', 'acrylic', 'palette'] },
  { icon: '🧵', keywords: ['sewing', 'stitch', 'fabric', 'thread'] },
  { icon: '🧶', keywords: ['knit', 'crochet', 'yarn', 'pattern'] },
  { icon: '🧩', keywords: ['puzzle', 'brainteaser', 'solve', 'logic'] },
  { icon: '🎼', keywords: ['composition', 'score', 'theory', 'arrange'] },
  { icon: '🎹', keywords: ['piano', 'keyboard', 'scales', 'arpeggio'] },
  { icon: '🎸', keywords: ['guitar', 'strings', 'riff', 'chords'] },
  { icon: '🎻', keywords: ['violin', 'cello', 'orchestra', 'bow'] },
  { icon: '🥁', keywords: ['drums', 'percussion', 'rhythm', 'beat'] },
  { icon: '🎤', keywords: ['singing', 'vocals', 'choir', 'solo'] },
  { icon: '🎧', keywords: ['mixing', 'sound', 'music', 'engineer'] },
  { icon: '🎙️', keywords: ['podcast', 'recording', 'audio', 'microphone'] },
  { icon: '🎬', keywords: ['filming', 'film', 'scene', 'director'] },
  { icon: '🎥', keywords: ['video', 'editing', 'footage', 'clip'] },
  { icon: '📸', keywords: ['photo', 'photography', 'camera', 'shoot'] },
];

const workEntries: KeywordIconEntry[] = [
  { icon: '💡', keywords: ['idea', 'innovation', 'concept', 'spark'] },
  { icon: '🧠', keywords: ['brainstorm', 'ideas', 'concept', 'ideation'] },
  { icon: '📝', keywords: ['writing', 'draft', 'notes', 'essay'] },
  { icon: '📚', keywords: ['study', 'studying', 'homework', 'revision'] },
  { icon: '📖', keywords: ['reading', 'literature', 'novel', 'chapters'] },
  { icon: '🎓', keywords: ['education', 'college', 'degree', 'campus'] },
  { icon: '🧑‍🏫', keywords: ['teaching', 'lesson', 'class', 'students'] },
  { icon: '🧑‍🎓', keywords: ['student', 'study', 'exam', 'graduate'] },
  { icon: '💼', keywords: ['work', 'briefcase', 'office', 'career'] },
  { icon: '🧑‍💼', keywords: ['manager', 'executive', 'business', 'office'] },
  { icon: '💻', keywords: ['coding', 'software', 'programming', 'development'] },
  { icon: '🧑‍💻', keywords: ['debugging', 'refactor', 'commit', 'review'] },
  { icon: '🖥️', keywords: ['computer', 'desktop', 'workstation', 'monitor'] },
  { icon: '📊', keywords: ['analytics', 'dashboard', 'metrics', 'report'] },
  { icon: '📈', keywords: ['strategy', 'growth', 'plan', 'roadmap'] },
  { icon: '🗂️', keywords: ['organize', 'files', 'folders', 'index'] },
  { icon: '🗄️', keywords: ['archive', 'filing', 'records', 'cabinet'] },
  { icon: '📅', keywords: ['schedule', 'calendar', 'planning', 'agenda'] },
  { icon: '⏰', keywords: ['deadline', 'reminder', 'alarm', 'timer'] },
  { icon: '📞', keywords: ['call', 'phone', 'client', 'dial'] },
  { icon: '💬', keywords: ['chat', 'message', 'discussion', 'update'] },
  { icon: '🤝', keywords: ['partner', 'agreement', 'deal', 'network'] },
  { icon: '🧾', keywords: ['accounting', 'receipts', 'ledger', 'invoices'] },
  { icon: '💵', keywords: ['budget', 'finance', 'expenses', 'cash'] },
  { icon: '🧮', keywords: ['calculation', 'math', 'spreadsheet', 'formula'] },
  { icon: '📦', keywords: ['shipping', 'delivery', 'orders', 'logistics'] },
];

const homeEntries: KeywordIconEntry[] = [
  { icon: '🧹', keywords: ['cleaning', 'tidy', 'sweep', 'dust'] },
  { icon: '🧺', keywords: ['laundry', 'washing', 'clothes', 'fold'] },
  { icon: '🧽', keywords: ['scrub', 'sponge', 'wash', 'shine'] },
  { icon: '🪣', keywords: ['bucket', 'mop', 'rinse', 'chores'] },
  { icon: '🛠️', keywords: ['repair', 'fix', 'tools', 'maintenance'] },
  { icon: '🔧', keywords: ['wrench', 'adjust', 'tinker', 'tighten'] },
  { icon: '⚙️', keywords: ['settings', 'config', 'mechanic', 'gear'] },
  { icon: '🪛', keywords: ['hardware', 'assembly', 'screw', 'build'] },
  { icon: '🔨', keywords: ['hammer', 'nails', 'carpentry', 'remodel'] },
  { icon: '🧰', keywords: ['toolbox', 'tools', 'organize', 'workshop'] },
];

const foodEntries: KeywordIconEntry[] = [
  { icon: '🍽️', keywords: ['dinner', 'meal', 'supper', 'serve'] },
  { icon: '🍳', keywords: ['cooking', 'kitchen', 'chef', 'skillet'] },
  { icon: '🧑‍🍳', keywords: ['chef', 'restaurant', 'cuisine', 'apron'] },
  { icon: '🥘', keywords: ['stew', 'simmer', 'casserole', 'family'] },
  { icon: '🍲', keywords: ['soup', 'broth', 'comfort', 'ladle'] },
  { icon: '🍜', keywords: ['ramen', 'noodles', 'broth', 'bowl'] },
  { icon: '🍝', keywords: ['pasta', 'italian', 'sauce', 'linguine'] },
  { icon: '🍕', keywords: ['pizza', 'slice', 'cheese', 'pepperoni'] },
  { icon: '🍔', keywords: ['burger', 'hamburger', 'grill', 'patty'] },
  { icon: '🌭', keywords: ['hotdog', 'sausage', 'bun', 'cookout'] },
  { icon: '🍟', keywords: ['fries', 'fastfood', 'potato', 'side'] },
  { icon: '🌮', keywords: ['taco', 'mexican', 'salsa', 'tortilla'] },
  { icon: '🌯', keywords: ['burrito', 'wrap', 'beans', 'rice'] },
  { icon: '🥙', keywords: ['gyro', 'pita', 'mediterranean', 'shawarma'] },
  { icon: '🥪', keywords: ['sandwich', 'deli', 'lunch', 'bread'] },
  { icon: '🥗', keywords: ['salad', 'greens', 'healthy', 'veggies'] },
  { icon: '🍱', keywords: ['bento', 'lunch', 'meal', 'packed'] },
  { icon: '🍣', keywords: ['sushi', 'nigiri', 'wasabi', 'roll'] },
  { icon: '🍤', keywords: ['shrimp', 'tempura', 'seafood', 'fry'] },
  { icon: '🦞', keywords: ['lobster', 'seafood', 'boil', 'butter'] },
  { icon: '🦐', keywords: ['prawn', 'shrimp', 'seafood', 'grill'] },
  { icon: '🦪', keywords: ['oyster', 'shellfish', 'raw', 'bar'] },
  { icon: '🦑', keywords: ['squid', 'calamari', 'seafood', 'tentacle'] },
  { icon: '🦀', keywords: ['crab', 'shellfish', 'beach', 'claw'] },
  { icon: '🍖', keywords: ['bbq', 'ribs', 'grill', 'smoker'] },
  { icon: '🍗', keywords: ['chicken', 'poultry', 'roast', 'drumstick'] },
  { icon: '🥩', keywords: ['steak', 'beef', 'grill', 'medium'] },
  { icon: '🧀', keywords: ['cheese', 'dairy', 'platter', 'fondue'] },
  { icon: '🥞', keywords: ['pancakes', 'breakfast', 'brunch', 'syrup'] },
  { icon: '🍞', keywords: ['bread', 'bakery', 'loaf', 'fresh'] },
  { icon: '🧁', keywords: ['cupcake', 'dessert', 'pastry', 'frosting'] },
  { icon: '🍰', keywords: ['cake', 'birthday', 'celebrate', 'frosting'] },
  { icon: '🍩', keywords: ['donut', 'breakfast', 'glaze', 'bakery'] },
  { icon: '🍪', keywords: ['cookie', 'treat', 'bake', 'batch'] },
  { icon: '🍫', keywords: ['chocolate', 'candy', 'sweet', 'treat'] },
  { icon: '🍦', keywords: ['icecream', 'dessert', 'cone', 'treat'] },
  { icon: '🍨', keywords: ['sundae', 'dessert', 'scoop', 'toppings'] },
  { icon: '🍧', keywords: ['shaved', 'ice', 'dessert', 'summer'] },
  { icon: '🍎', keywords: ['apple', 'fruit', 'snack', 'orchard'] },
  { icon: '🍌', keywords: ['banana', 'smoothie', 'potassium', 'snack'] },
  { icon: '🍇', keywords: ['grapes', 'fruit', 'vine', 'snack'] },
  { icon: '🍓', keywords: ['berries', 'strawberry', 'jam', 'dessert'] },
  { icon: '🍍', keywords: ['pineapple', 'tropical', 'fruit', 'sweet'] },
  { icon: '🥥', keywords: ['coconut', 'tropical', 'hydration', 'island'] },
  { icon: '🥝', keywords: ['kiwi', 'fruit', 'tart', 'tropical'] },
  { icon: '🥭', keywords: ['mango', 'tropical', 'fruit', 'smoothie'] },
  { icon: '🍑', keywords: ['peach', 'fruit', 'juicy', 'summer'] },
  { icon: '🍉', keywords: ['melon', 'picnic', 'summer', 'refresh'] },
  { icon: '☕', keywords: ['coffee', 'espresso', 'brew', 'latte'] },
  { icon: '🫖', keywords: ['tea', 'brew', 'steep', 'herbal'] },
  { icon: '🥤', keywords: ['drink', 'soda', 'refresh', 'beverage'] },
  { icon: '🍺', keywords: ['beer', 'brewery', 'cheers', 'pint'] },
  { icon: '🍷', keywords: ['wine', 'vineyard', 'tasting', 'grape'] },
  { icon: '🍾', keywords: ['champagne', 'celebrate', 'toast', 'sparkling'] },
  { icon: '🥂', keywords: ['cheers', 'celebration', 'toast', 'party'] },
];

const natureEntries: KeywordIconEntry[] = [
  { icon: '🌱', keywords: ['garden', 'gardening', 'seed', 'sprout'] },
  { icon: '🪴', keywords: ['plants', 'houseplant', 'watering', 'repot'] },
  { icon: '🌿', keywords: ['herb', 'planter', 'green', 'windowsill'] },
  { icon: '🌳', keywords: ['tree', 'forest', 'shade', 'park'] },
  { icon: '🌲', keywords: ['evergreen', 'pine', 'woodland', 'hike'] },
  { icon: '🌵', keywords: ['cactus', 'succulent', 'desert', 'arid'] },
  { icon: '🌻', keywords: ['sunflower', 'bloom', 'flowers', 'garden'] },
  { icon: '🌷', keywords: ['tulip', 'bulb', 'spring', 'garden'] },
  { icon: '🌾', keywords: ['harvest', 'grain', 'farm', 'field'] },
  { icon: '🍂', keywords: ['autumn', 'leaves', 'fall', 'rake'] },
];

const animalEntries: KeywordIconEntry[] = [
  { icon: '🐶', keywords: ['dog', 'canine', 'puppy', 'walk'] },
  { icon: '🐕', keywords: ['hound', 'retriever', 'training', 'fetch'] },
  { icon: '🐺', keywords: ['wolf', 'pack', 'howl', 'wild'] },
  { icon: '🐱', keywords: ['cat', 'feline', 'kitty', 'purr'] },
  { icon: '🐈', keywords: ['kitten', 'tabby', 'nap', 'whisker'] },
  { icon: '🦊', keywords: ['fox', 'clever', 'wild', 'forest'] },
  { icon: '🐰', keywords: ['rabbit', 'bunny', 'hop', 'burrow'] },
  { icon: '🐻', keywords: ['bear', 'wildlife', 'forest', 'camp'] },
  { icon: '🐼', keywords: ['panda', 'bamboo', 'conservation', 'zoo'] },
  { icon: '🐨', keywords: ['koala', 'australia', 'eucalyptus', 'nap'] },
  { icon: '🦁', keywords: ['lion', 'pride', 'safari', 'king'] },
  { icon: '🐯', keywords: ['tiger', 'stripes', 'predator', 'jungle'] },
  { icon: '🦓', keywords: ['zebra', 'savanna', 'stripes', 'herd'] },
  { icon: '🦒', keywords: ['giraffe', 'savanna', 'tall', 'browse'] },
  { icon: '🐘', keywords: ['elephant', 'safari', 'herd', 'trunk'] },
  { icon: '🦏', keywords: ['rhino', 'conservation', 'horn', 'grassland'] },
  { icon: '🐭', keywords: ['mouse', 'rodent', 'lab', 'pet'] },
  { icon: '🐹', keywords: ['hamster', 'pet', 'wheel', 'cage'] },
  { icon: '🐢', keywords: ['turtle', 'reptile', 'shell', 'slow'] },
  { icon: '🦎', keywords: ['lizard', 'reptile', 'gecko', 'desert'] },
  { icon: '🐍', keywords: ['snake', 'serpent', 'reptile', 'coil'] },
  { icon: '🐸', keywords: ['frog', 'amphibian', 'pond', 'leap'] },
  { icon: '🐧', keywords: ['penguin', 'arctic', 'waddle', 'colony'] },
  { icon: '🐦', keywords: ['bird', 'aviary', 'chirp', 'feeder'] },
  { icon: '🦅', keywords: ['eagle', 'raptor', 'soar', 'freedom'] },
  { icon: '🦉', keywords: ['owl', 'nocturnal', 'wise', 'forest'] },
  { icon: '🦆', keywords: ['duck', 'pond', 'waterfowl', 'quack'] },
  { icon: '🐓', keywords: ['rooster', 'farm', 'crow', 'dawn'] },
  { icon: '🐔', keywords: ['chicken', 'poultry', 'coop', 'egg'] },
  { icon: '🐣', keywords: ['chick', 'hatchling', 'spring', 'brood'] },
  { icon: '🦋', keywords: ['butterfly', 'wings', 'garden', 'metamorph'] },
  { icon: '🐝', keywords: ['bee', 'pollinator', 'hive', 'honey'] },
  { icon: '🐞', keywords: ['ladybug', 'beetle', 'garden', 'spots'] },
  { icon: '🐛', keywords: ['caterpillar', 'larva', 'leaf', 'munch'] },
  { icon: '🐙', keywords: ['octopus', 'tentacle', 'cephalopod', 'ink'] },
  { icon: '🦑', keywords: ['squid', 'cephalopod', 'ocean', 'deep'] },
  { icon: '🐠', keywords: ['fish', 'aquarium', 'reef', 'swim'] },
  { icon: '🐟', keywords: ['fishing', 'freshwater', 'stream', 'catch'] },
  { icon: '🐬', keywords: ['dolphin', 'ocean', 'marine', 'swim'] },
  { icon: '🐳', keywords: ['whale', 'ocean', 'marine', 'breach'] },
  { icon: '🦈', keywords: ['shark', 'ocean', 'predator', 'fin'] },
  { icon: '🦦', keywords: ['otter', 'river', 'playful', 'swim'] },
  { icon: '🐊', keywords: ['crocodile', 'reptile', 'swamp', 'jaws'] },
  { icon: '🐉', keywords: ['dragon', 'fantasy', 'scale', 'myth'] },
];

const weatherEntries: KeywordIconEntry[] = [
  { icon: '☀️', keywords: ['sun', 'sunshine', 'clear', 'weather'] },
  { icon: '🌤️', keywords: ['partly', 'cloud', 'sun', 'forecast'] },
  { icon: '⛅', keywords: ['cloudy', 'overcast', 'sky', 'grey'] },
  { icon: '🌥️', keywords: ['mostly', 'cloud', 'gloom', 'forecast'] },
  { icon: '🌦️', keywords: ['sunshower', 'rainbow', 'showers', 'mix'] },
  { icon: '🌧️', keywords: ['rain', 'drizzle', 'storm', 'wet'] },
  { icon: '⛈️', keywords: ['thunder', 'storm', 'lightning', 'weather'] },
  { icon: '🌩️', keywords: ['lightning', 'electric', 'thunder', 'bolt'] },
  { icon: '🌨️', keywords: ['snow', 'flurries', 'winter', 'cold'] },
  { icon: '❄️', keywords: ['snowflake', 'frost', 'ice', 'chilly'] },
  { icon: '🌬️', keywords: ['wind', 'gust', 'breeze', 'draft'] },
  { icon: '🌫️', keywords: ['fog', 'mist', 'haze', 'low'] },
  { icon: '🌪️', keywords: ['tornado', 'twister', 'cyclone', 'funnel'] },
  { icon: '🌈', keywords: ['rainbow', 'color', 'spectrum', 'hope'] },
  { icon: '🌙', keywords: ['night', 'moon', 'evening', 'sleep'] },
  { icon: '⭐', keywords: ['star', 'night', 'sparkle', 'goal'] },
  { icon: '🌟', keywords: ['highlight', 'feature', 'shine', 'sparkle'] },
  { icon: '🔥', keywords: ['fire', 'bonfire', 'campfire', 'blaze'] },
  { icon: '💧', keywords: ['water', 'drop', 'hydrate', 'drip'] },
  { icon: '🌊', keywords: ['ocean', 'wave', 'tide', 'surf'] },
];

const travelEntries: KeywordIconEntry[] = [
  { icon: '🚗', keywords: ['car', 'drive', 'road', 'commute'] },
  { icon: '🚙', keywords: ['suv', 'roadtrip', 'family', 'drive'] },
  { icon: '🚕', keywords: ['taxi', 'cab', 'hail', 'ride'] },
  { icon: '🚐', keywords: ['van', 'shuttle', 'carpool', 'camper'] },
  { icon: '🚚', keywords: ['delivery', 'freight', 'shipping', 'logistics'] },
  { icon: '🚛', keywords: ['semi', 'longhaul', 'logistics', 'trucker'] },
  { icon: '🛻', keywords: ['truck', 'pickup', 'haul', 'cargo'] },
  { icon: '🚲', keywords: ['commuter', 'bike', 'cycle', 'pedal'] },
  { icon: '🛴', keywords: ['scooter', 'commute', 'micro', 'mobility'] },
  { icon: '🛵', keywords: ['moped', 'vespa', 'scooter', 'city'] },
  { icon: '🏍️', keywords: ['motorcycle', 'ride', 'motorbike', 'cruise'] },
  { icon: '🚍', keywords: ['bus', 'transit', 'commute', 'route'] },
  { icon: '🚎', keywords: ['trolley', 'streetcar', 'commute', 'city'] },
  { icon: '🚆', keywords: ['train', 'rail', 'station', 'commute'] },
  { icon: '🚇', keywords: ['subway', 'metro', 'underground', 'transit'] },
  { icon: '🚈', keywords: ['tram', 'light', 'rail', 'transit'] },
  { icon: '🚂', keywords: ['locomotive', 'railway', 'steam', 'historic'] },
  { icon: '✈️', keywords: ['flight', 'airplane', 'travel', 'depart'] },
  { icon: '🛩️', keywords: ['aviation', 'pilot', 'acrobatics', 'airshow'] },
  { icon: '🛫', keywords: ['departure', 'airport', 'board', 'gate'] },
  { icon: '🛬', keywords: ['arrival', 'landing', 'airport', 'runway'] },
  { icon: '🚁', keywords: ['helicopter', 'airlift', 'chopper', 'rotor'] },
  { icon: '🚀', keywords: ['rocket', 'launch', 'space', 'mission'] },
  { icon: '🛰️', keywords: ['satellite', 'orbit', 'signal', 'space'] },
  { icon: '🛸', keywords: ['ufo', 'alien', 'sighting', 'mystery'] },
  { icon: '⛵', keywords: ['sail', 'sailing', 'regatta', 'boat'] },
  { icon: '🛶', keywords: ['canoe', 'paddle', 'river', 'lake'] },
  { icon: '🚤', keywords: ['speedboat', 'wake', 'water', 'lake'] },
  { icon: '🛥️', keywords: ['yacht', 'cruise', 'marina', 'luxury'] },
  { icon: '⚓', keywords: ['anchor', 'nautical', 'harbor', 'moor'] },
  { icon: '🧭', keywords: ['direction', 'orient', 'heading', 'scout'] },
  { icon: '🗺️', keywords: ['mapping', 'route', 'navigation', 'atlas'] },
  { icon: '🧳', keywords: ['travel', 'packing', 'luggage', 'suitcase'] },
  { icon: '🎒', keywords: ['backpack', 'travel', 'hike', 'trek'] },
];

const placeEntries: KeywordIconEntry[] = [
  { icon: '🏠', keywords: ['home', 'house', 'residence', 'realestate'] },
  { icon: '🏡', keywords: ['garden', 'yard', 'cottage', 'suburb'] },
  { icon: '🏘️', keywords: ['community', 'neighborhood', 'block', 'homes'] },
  { icon: '🏚️', keywords: ['renovation', 'fixer', 'cottage', 'restore'] },
  { icon: '🏢', keywords: ['office', 'corporate', 'headquarters', 'building'] },
  { icon: '🏬', keywords: ['mall', 'retail', 'shopping', 'department'] },
  { icon: '🏪', keywords: ['store', 'convenience', 'shop', 'retail'] },
  { icon: '🏦', keywords: ['bank', 'finance', 'branch', 'savings'] },
  { icon: '🏨', keywords: ['hotel', 'stay', 'checkin', 'travel'] },
  { icon: '🏩', keywords: ['hospitality', 'inn', 'lodging', 'suite'] },
  { icon: '🏥', keywords: ['hospital', 'clinic', 'medical', 'care'] },
  { icon: '🏛️', keywords: ['government', 'civic', 'policy', 'council'] },
  { icon: '🏗️', keywords: ['construction', 'crane', 'build', 'site'] },
  { icon: '🏭', keywords: ['manufacturing', 'factory', 'plant', 'industry'] },
  { icon: '🏯', keywords: ['castle', 'heritage', 'history', 'tour'] },
  { icon: '🏰', keywords: ['castle', 'fantasy', 'kingdom', 'fairytale'] },
  { icon: '🕌', keywords: ['mosque', 'worship', 'prayer', 'community'] },
  { icon: '⛪', keywords: ['church', 'worship', 'service', 'chapel'] },
  { icon: '🕍', keywords: ['synagogue', 'worship', 'temple', 'community'] },
  { icon: '🛕', keywords: ['temple', 'shrine', 'worship', 'ritual'] },
  { icon: '⛩️', keywords: ['torii', 'shrine', 'japan', 'tradition'] },
  { icon: '🏞️', keywords: ['park', 'nature', 'outdoors', 'scenic'] },
  { icon: '🏜️', keywords: ['desert', 'sand', 'dunes', 'arid'] },
  { icon: '🏝️', keywords: ['island', 'tropical', 'beach', 'vacation'] },
  { icon: '🏖️', keywords: ['beach', 'vacation', 'umbrella', 'sand'] },
  { icon: '🏔️', keywords: ['mountain', 'peak', 'summit', 'alpine'] },
  { icon: '🏕️', keywords: ['camping', 'tent', 'outdoor', 'overnight'] },
  { icon: '🏟️', keywords: ['stadium', 'sports', 'arena', 'event'] },
  { icon: '🎡', keywords: ['festival', 'fair', 'amusement', 'rides'] },
  { icon: '🎢', keywords: ['rollercoaster', 'thrill', 'themepark', 'ride'] },
  { icon: '🎠', keywords: ['carousel', 'fair', 'horses', 'ride'] },
  { icon: '🌁', keywords: ['bridge', 'fog', 'skyline', 'landmark'] },
  { icon: '🌉', keywords: ['bridge', 'night', 'lights', 'river'] },
  { icon: '🌆', keywords: ['twilight', 'city', 'lights', 'buildings'] },
  { icon: '🌇', keywords: ['sunset', 'evening', 'city', 'skyline'] },
  { icon: '🏙️', keywords: ['city', 'downtown', 'urban', 'skyline'] },
];

const KEYWORD_ICON_ENTRIES: KeywordIconEntry[] = [
  ...sportsEntries,
  ...creativeEntries,
  ...workEntries,
  ...homeEntries,
  ...foodEntries,
  ...natureEntries,
  ...animalEntries,
  ...weatherEntries,
  ...travelEntries,
  ...placeEntries,
];

type NormalizedEntry = {
  icon: string;
  keywords: string[];
};

const normalizeForMatch = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const NORMALIZED_ENTRIES: NormalizedEntry[] = KEYWORD_ICON_ENTRIES.map(
  (entry) => {
    const normalizedKeywords = entry.keywords
      .map((keyword) => normalizeForMatch(keyword))
      .filter((keyword) => keyword.length > 0);

    const uniqueKeywords = Array.from(new Set(normalizedKeywords));

    return {
      icon: entry.icon,
      keywords: uniqueKeywords,
    };
  },
);

export const getFocusIcon = (title: string): string => {
  const normalizedTitle = normalizeForMatch(title);
  if (!normalizedTitle) {
    return DEFAULT_FOCUS_ICON;
  }

  const words = new Set(normalizedTitle.split(' '));

  let bestIcon = DEFAULT_FOCUS_ICON;
  let bestMatchCount = 0;

  for (const entry of NORMALIZED_ENTRIES) {
    let matchCount = 0;
    for (const keyword of entry.keywords) {
      if (words.has(keyword)) {
        matchCount += 1;
      }
    }

    if (matchCount > bestMatchCount) {
      bestMatchCount = matchCount;
      bestIcon = entry.icon;
    }
  }

  return bestIcon;
};
