export const DEFAULT_FOCUS_ICON = '🗓️';

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
  { icon: '🚴‍♂️', keywords: ['road', 'peloton', 'training', 'cadence', 'pedal', 'pedalling', 'bike', 'biking', 'ride'] },
  { icon: '🚵', keywords: ['mountain', 'trail', 'mtb', 'downhill', 'biking', 'bike', 'pedal', 'pedalling', 'ride'] },
  { icon: '🚲', keywords: ['bicycle', 'commute', 'pedal', 'cycle', 'bike'] },
  { icon: '🏊', keywords: ['swim', 'swimming', 'pool', 'laps'] },
  { icon: '🧗', keywords: ['climb', 'climbing', 'boulder', 'crag', 'bouldering'] },
  { icon: '🧘', keywords: ['yoga', 'stretch', 'balance', 'pose'] },
  { icon: '🧘‍♀️', keywords: ['meditation', 'mindfulness', 'breath', 'calm'] },
  { icon: '🏋️', keywords: ['lift', 'lifting', 'strength', 'weights'] },
  { icon: '🥊', keywords: ['boxing', 'spar', 'punch', 'bag'] },
  { icon: '🛹', keywords: ['skateboard', 'skateboarding', 'ollie', 'park'] },
  { icon: '⛸️', keywords: ['skating', 'ice', 'figure', 'rink'] },
  { icon: '🏂', keywords: ['snowboarding', 'snowboard', 'snowboarder'] },
  { icon: '⛷️', keywords: ['skiing', 'ski', 'skier'] },
  { icon: '🏌️', keywords: ['golf', 'swing', 'putt', 'fairway'] },
  { icon: '⛳', keywords: ['golfing', 'green', 'handicap', 'links'] },
  { icon: '🏄', keywords: ['surf', 'surfing', 'waves', 'ocean'] },
  { icon: '🥋', keywords: ['martial', 'karate', 'dojo', 'sparring'] },
  { icon: '🤸', keywords: ['gymnastics', 'cartwheel', 'tumble', 'routine'] },
  { icon: '🎳', keywords: ['bowling'] },
  { icon: '💪', keywords: ['workout', 'lift', 'strong', 'strength'] },
  { icon: '🕺', keywords: ['dancer', 'dancing'] },
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
  { icon: '🎷', keywords: ['saxophone', 'sax', 'jazz', 'blues'] },
  { icon: '🥁', keywords: ['drums', 'percussion', 'rhythm', 'beat'] },
  { icon: '🎤', keywords: ['singing', 'vocals', 'choir', 'solo'] },
  { icon: '🎧', keywords: ['mixing', 'sound', 'music', 'engineer'] },
  { icon: '🎙️', keywords: ['podcast', 'recording', 'audio', 'microphone'] },
  { icon: '🎬', keywords: ['filming', 'film', 'scene', 'director'] },
  { icon: '🎥', keywords: ['video', 'editing', 'footage', 'clip'] },
  { icon: '📸', keywords: ['photo', 'photography', 'camera', 'shoot'] },
  { icon: '🪩', keywords: ['disco', 'dj'] },
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
  { icon: '🧑‍💼', keywords: ['manager', 'executive', 'business', 'office', 'manage'] },
  { icon: '💻', keywords: ['coding', 'software', 'programming', 'development', 'dev', 'program', 'technology', 'tech'] },
  { icon: '🧑‍💻', keywords: ['debugging', 'refactor', 'commit', 'review'] },
  { icon: '🖥️', keywords: ['computer', 'desktop', 'workstation', 'monitor'] },
  { icon: '📊', keywords: ['analytics', 'dashboard', 'metrics', 'report', 'graph'] },
  { icon: '📈', keywords: ['strategy', 'growth', 'plan', 'roadmap', 'chart'] },
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
  { icon: '🔍', keywords: ['search', 'find', 'discover', 'look'] },
  { icon: '🧑‍🍳', keywords: ['cook', 'recipe', 'food'] },
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
  { icon: '🦋', keywords: ['butterfly', 'wings', 'garden', 'metamorph', 'butterflies', 'chaos'] },
  { icon: '🐝', keywords: ['bee', 'pollinator', 'hive', 'honey'] },
  { icon: '🐞', keywords: ['ladybug', 'beetle', 'garden', 'spots'] },
  { icon: '🐛', keywords: ['caterpillar', 'larva', 'leaf', 'munch'] },
  { icon: '🐙', keywords: ['octopus', 'tentacle', 'cephalopod', 'ink'] },
  { icon: '🦑', keywords: ['squid', 'cephalopod', 'ocean', 'deep'] },
  { icon: '🐟', keywords: ['fish', 'fishing', 'freshwater', 'stream', 'catch'] },
  { icon: '🐠', keywords: ['fish', 'aquarium', 'reef', 'swim', 'tropical'] },
  { icon: '🐬', keywords: ['dolphin', 'ocean', 'marine', 'swim'] },
  { icon: '🐳', keywords: ['whale', 'ocean', 'marine', 'breach'] },
  { icon: '🦈', keywords: ['shark', 'ocean', 'predator', 'fin'] },
  { icon: '🦦', keywords: ['otter', 'river', 'playful', 'swim'] },
  { icon: '🐊', keywords: ['crocodile', 'reptile', 'swamp', 'jaws'] },
  { icon: '🐉', keywords: ['dragon', 'fantasy', 'scale', 'myth'] },
];

const weatherEntries: KeywordIconEntry[] = [
  { icon: '☀️', keywords: ['sun', 'sunshine', 'clear', 'weather', 'sunrise'] },
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
  { icon: '✈️', keywords: ['flight', 'airplane', 'travel', 'depart', 'flying', 'fly'] },
  { icon: '🛩️', keywords: ['aviation', 'pilot', 'acrobatics', 'airshow'] },
  { icon: '🛫', keywords: ['departure', 'airport', 'board', 'gate'] },
  { icon: '🛬', keywords: ['arrival', 'landing', 'airport', 'runway'] },
  { icon: '🚁', keywords: ['helicopter', 'airlift', 'chopper', 'rotor'] },
  { icon: '🚀', keywords: ['rocket', 'launch', 'space', 'mission'] },
  { icon: '🛰️', keywords: ['satellite', 'orbit', 'signal', 'space'] },
  { icon: '🛸', keywords: ['ufo', 'alien', 'sighting', 'mystery'] },
  { icon: '⛵', keywords: ['sail', 'sailing', 'regatta', 'boat'] },
  { icon: '🛶', keywords: ['canoe', 'paddle', 'river', 'lake', 'canoeing', 'canoes', 'kayak', 'kayaking', 'kayaks', 'paddling'] },
  { icon: '🚤', keywords: ['speedboat', 'wake', 'water', 'lake'] },
  { icon: '🛥️', keywords: ['yacht', 'cruise', 'marina', 'luxury', 'ship'] },
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

const SYNONYM_GROUPS: string[][] = [
  // Sports & Fitness
  ['walk', 'walking', 'stroll', 'stride', 'saunter', 'amble', 'footstep', 'steps'],
  ['run', 'runner', 'jog', 'sprint', 'dash', 'race', 'tempo', 'interval'],
  ['marathon', 'endurance', 'ultra', 'distance', 'road'],
  ['hike', 'hiking', 'trek', 'backpack', 'summit', 'trail', 'ramble'],
  ['bike', 'bicycle', 'cycling', 'ride', 'spin', 'cadence', 'peloton'],
  ['mountain', 'mtb', 'downhill', 'singletrack', 'offroad'],
  ['swim', 'swimming', 'freestyle', 'backstroke', 'laps', 'pool'],
  ['climb', 'climbing', 'boulder', 'bouldering', 'crag', 'belay'],
  ['yoga', 'stretch', 'asana', 'pose', 'balance', 'namaste', 'pilates'],
  ['meditation', 'mindfulness', 'breath', 'breathing', 'calm', 'zen'],
  ['lift', 'lifting', 'strength', 'weights', 'weightlifting', 'powerlifting', 'barbell'],
  ['boxing', 'spar', 'punch', 'kickboxing', 'fight', 'ring'],
  ['skateboard', 'skateboarding', 'skate', 'ollie', 'kickflip', 'longboard'],
  ['skating', 'ice', 'figure', 'rink', 'glide', 'hockey'],
  ['golf', 'golfing', 'swing', 'putt', 'fairway', 'links', 'green', 'handicap'],
  ['surf', 'surfing', 'wave', 'waves', 'ocean', 'surfboard', 'break'],
  ['martial', 'karate', 'dojo', 'sparring', 'taekwondo', 'judo', 'jiujitsu'],
  ['gymnastics', 'gymnast', 'cartwheel', 'tumble', 'routine', 'acrobatics', 'handstand'],

  // Creative
  ['art', 'painting', 'painter', 'canvas', 'creative', 'acrylic', 'oil'],
  ['sketch', 'drawing', 'draw', 'doodle', 'illustration', 'pencil'],
  ['brush', 'watercolor', 'palette', 'paintbrush'],
  ['sewing', 'stitch', 'fabric', 'thread', 'needle', 'tailor', 'quilting'],
  ['knit', 'knitting', 'crochet', 'crocheting', 'yarn', 'loom', 'pattern'],
  ['puzzle', 'brainteaser', 'solve', 'logic', 'riddle', 'crossword'],
  ['composition', 'score', 'theory', 'arrange', 'arrangement', 'sheetmusic'],
  ['piano', 'keyboard', 'keys', 'scales', 'arpeggio', 'pianist'],
  ['guitar', 'strings', 'riff', 'chords', 'strum', 'pick'],
  ['violin', 'fiddle', 'cello', 'orchestra', 'bow', 'viola'],
  ['drums', 'drum', 'percussion', 'rhythm', 'beat', 'drummer'],
  ['singing', 'vocals', 'choir', 'solo', 'vocal', 'song'],
  ['mixing', 'sound', 'music', 'audio', 'engineer', 'producer', 'dj'],
  ['podcast', 'recording', 'microphone', 'broadcast', 'studio', 'podcasting'],
  ['filming', 'film', 'scene', 'director', 'cinema', 'movie'],
  ['video', 'editing', 'footage', 'clip', 'videography'],
  ['photo', 'photography', 'photograph', 'picture', 'image', 'snapshot', 'camera', 'photographer'],

  // Work & Productivity
  ['idea', 'ideas', 'innovation', 'concept', 'spark', 'insight', 'brainwave'],
  ['brainstorm', 'ideation', 'workshop', 'mindmap'],
  ['writing', 'write', 'draft', 'notes', 'essay', 'author', 'manuscript'],
  ['study', 'studying', 'homework', 'revision', 'exam', 'prep'],
  ['reading', 'literature', 'novel', 'book', 'chapter'],
  ['education', 'college', 'degree', 'campus', 'university', 'school'],
  ['teaching', 'lesson', 'class', 'students', 'lecture', 'instructor'],
  ['student', 'students', 'exam', 'graduate', 'learner', 'pupil'],
  ['work', 'job', 'career', 'office', 'professional', 'business'],
  ['manager', 'executive', 'leadership', 'supervisor', 'management'],
  ['coding', 'software', 'programming', 'development', 'dev', 'technology', 'engineer'],
  ['debugging', 'debug', 'refactor', 'commit', 'review', 'testing', 'bugfix'],
  ['computer', 'desktop', 'workstation', 'monitor', 'pc', 'screen'],
  ['analytics', 'dashboard', 'metrics', 'report', 'analysis', 'statistics', 'data'],
  ['strategy', 'strategic', 'growth', 'plan', 'roadmap', 'vision'],
  ['organize', 'organization', 'files', 'folders', 'index', 'arrange'],
  ['archive', 'archiving', 'filing', 'records', 'cabinet', 'catalog'],
  ['schedule', 'calendar', 'planning', 'agenda', 'planner', 'timeline'],
  ['deadline', 'reminder', 'alarm', 'timer', 'duedate'],
  ['call', 'phone', 'dial', 'client', 'teleconference'],
  ['chat', 'message', 'discussion', 'update', 'conversation', 'text'],
  ['partner', 'agreement', 'deal', 'network', 'collaborate'],
  ['accounting', 'receipts', 'ledger', 'invoices', 'bookkeeping'],
  ['budget', 'finance', 'expenses', 'cash', 'spending', 'financial'],
  ['calculation', 'math', 'spreadsheet', 'formula', 'compute'],
  ['shipping', 'delivery', 'orders', 'logistics', 'fulfillment', 'freight'],
  ['search', 'find', 'discover', 'lookup', 'research'],
  ['cook', 'cooking', 'chef', 'recipe', 'kitchen', 'culinary'],

  // Home & Maintenance
  ['cleaning', 'clean', 'tidy', 'sweep', 'dust', 'declutter', 'sanitize'],
  ['laundry', 'wash', 'washing', 'clothes', 'fold', 'launder'],
  ['scrub', 'sponge', 'wash', 'shine', 'polish'],
  ['bucket', 'mop', 'rinse', 'chores', 'pail'],
  ['repair', 'fix', 'tools', 'maintenance', 'mend'],
  ['wrench', 'adjust', 'tinker', 'tighten', 'spanner'],
  ['settings', 'config', 'mechanic', 'gear', 'preferences'],
  ['hardware', 'assembly', 'screw', 'build', 'fastener'],
  ['hammer', 'nails', 'carpentry', 'remodel', 'woodwork'],
  ['toolbox', 'tools', 'organize', 'workshop', 'toolkit'],

  // Food & Drink
  ['dinner', 'meal', 'supper', 'serve', 'entree'],
  ['stew', 'simmer', 'casserole', 'family', 'braise'],
  ['soup', 'broth', 'comfort', 'ladle', 'stock'],
  ['ramen', 'noodles', 'broth', 'bowl', 'udon', 'pho'],
  ['pasta', 'italian', 'sauce', 'linguine', 'spaghetti'],
  ['pizza', 'slice', 'cheese', 'pepperoni', 'pizzeria'],
  ['burger', 'hamburger', 'grill', 'patty', 'burgerjoint'],
  ['hotdog', 'sausage', 'bun', 'cookout', 'frank'],
  ['fries', 'fastfood', 'potato', 'side', 'chips'],
  ['taco', 'mexican', 'salsa', 'tortilla', 'quesadilla'],
  ['burrito', 'wrap', 'beans', 'rice', 'mission'],
  ['gyro', 'pita', 'mediterranean', 'shawarma', 'doner'],
  ['sandwich', 'deli', 'lunch', 'bread', 'sub'],
  ['salad', 'greens', 'healthy', 'veggies', 'vegetable'],
  ['bento', 'lunch', 'packed', 'meal', 'lunchbox'],
  ['sushi', 'nigiri', 'wasabi', 'roll', 'sashimi'],
  ['shrimp', 'tempura', 'seafood', 'prawn'],
  ['lobster', 'seafood', 'boil', 'butter', 'crustacean'],
  ['oyster', 'shellfish', 'raw', 'bar', 'shucker'],
  ['squid', 'calamari', 'seafood', 'tentacle', 'cephalopod'],
  ['crab', 'shellfish', 'beach', 'claw', 'crustacean'],
  ['bbq', 'barbecue', 'ribs', 'grill', 'smoker'],
  ['chicken', 'poultry', 'roast', 'drumstick', 'fried'],
  ['steak', 'beef', 'grill', 'medium', 'sirloin'],
  ['cheese', 'dairy', 'platter', 'fondue', 'cheddar'],
  ['pancakes', 'breakfast', 'brunch', 'syrup', 'flapjack'],
  ['bread', 'bakery', 'loaf', 'fresh', 'bake'],
  ['cupcake', 'dessert', 'pastry', 'frosting', 'cupcakes'],
  ['cake', 'birthday', 'celebrate', 'frosting', 'bakeshop'],
  ['donut', 'doughnut', 'breakfast', 'glaze', 'cruller'],
  ['cookie', 'treat', 'bake', 'batch', 'biscuit'],
  ['chocolate', 'candy', 'sweet', 'treat', 'cocoa'],
  ['icecream', 'dessert', 'cone', 'treat', 'gelato'],
  ['sundae', 'dessert', 'scoop', 'toppings', 'parfait'],
  ['shaved', 'dessert', 'summer', 'snowcone', 'iceshave'],
  ['apple', 'fruit', 'snack', 'orchard', 'cider'],
  ['banana', 'smoothie', 'potassium', 'snack', 'plantain'],
  ['grapes', 'vine', 'fruit', 'snack', 'vineyard'],
  ['berries', 'strawberry', 'jam', 'dessert', 'blueberry'],
  ['pineapple', 'tropical', 'fruit', 'sweet', 'island'],
  ['coconut', 'tropical', 'hydration', 'island', 'cocos'],
  ['kiwi', 'fruit', 'tart', 'tropical', 'kiwifruit'],
  ['mango', 'tropical', 'smoothie', 'fruit', 'mangosteen'],
  ['peach', 'fruit', 'juicy', 'summer', 'stonefruit'],
  ['melon', 'picnic', 'summer', 'refresh', 'watermelon'],
  ['coffee', 'espresso', 'brew', 'latte', 'cappuccino'],
  ['tea', 'brew', 'steep', 'herbal', 'chai'],
  ['drink', 'soda', 'refresh', 'beverage', 'juice'],
  ['beer', 'brewery', 'cheers', 'pint', 'lager'],
  ['wine', 'vineyard', 'tasting', 'grape', 'vino'],
  ['champagne', 'celebrate', 'toast', 'sparkling', 'bubbly'],
  ['cheers', 'celebration', 'toast', 'party', 'clink'],

  // Nature
  ['garden', 'gardening', 'seed', 'sprout', 'planting'],
  ['plants', 'houseplant', 'watering', 'repot', 'botanical'],
  ['herb', 'planter', 'green', 'windowsill', 'herbal'],
  ['tree', 'forest', 'shade', 'park', 'woodland'],
  ['evergreen', 'pine', 'woodland', 'conifer', 'fir'],
  ['cactus', 'succulent', 'desert', 'arid', 'cacti'],
  ['sunflower', 'bloom', 'flowers', 'garden', 'blossom'],
  ['tulip', 'bulb', 'spring', 'garden', 'flower'],
  ['harvest', 'grain', 'farm', 'field', 'crops'],
  ['autumn', 'leaves', 'fall', 'rake', 'foliage'],

  // Animals & Wildlife
  ['dog', 'canine', 'puppy', 'walk', 'hound', 'doggo'],
  ['wolf', 'pack', 'howl', 'wild', 'canid'],
  ['cat', 'feline', 'kitty', 'purr', 'meow'],
  ['kitten', 'tabby', 'nap', 'whisker', 'kitty'],
  ['fox', 'clever', 'wild', 'forest', 'vulpine'],
  ['rabbit', 'bunny', 'hop', 'burrow', 'hare'],
  ['bear', 'wildlife', 'forest', 'camp', 'grizzly'],
  ['panda', 'bamboo', 'conservation', 'zoo', 'bear'],
  ['koala', 'australia', 'eucalyptus', 'nap', 'marsupial'],
  ['lion', 'pride', 'safari', 'king', 'bigcat'],
  ['tiger', 'stripes', 'predator', 'jungle', 'bigcat'],
  ['zebra', 'savanna', 'stripes', 'herd', 'equine'],
  ['giraffe', 'savanna', 'tall', 'browse', 'neck'],
  ['elephant', 'safari', 'herd', 'trunk', 'pachyderm'],
  ['rhino', 'conservation', 'horn', 'grassland', 'rhinoceros'],
  ['mouse', 'rodent', 'lab', 'pet', 'mice'],
  ['hamster', 'pet', 'wheel', 'cage', 'rodent'],
  ['turtle', 'reptile', 'shell', 'slow', 'terrapin'],
  ['lizard', 'reptile', 'gecko', 'desert', 'iguana'],
  ['snake', 'serpent', 'reptile', 'coil', 'viper'],
  ['frog', 'amphibian', 'pond', 'leap', 'toad'],
  ['penguin', 'arctic', 'waddle', 'colony', 'antarctic'],
  ['bird', 'aviary', 'chirp', 'feeder', 'songbird'],
  ['eagle', 'raptor', 'soar', 'freedom', 'hawk'],
  ['owl', 'nocturnal', 'wise', 'forest', 'hoot'],
  ['duck', 'pond', 'waterfowl', 'quack', 'mallard'],
  ['rooster', 'farm', 'crow', 'dawn', 'chicken'],
  ['chicken', 'poultry', 'coop', 'egg', 'hen'],
  ['chick', 'hatchling', 'spring', 'brood', 'fledgling'],
  ['butterfly', 'wings', 'garden', 'metamorph', 'monarch'],
  ['bee', 'pollinator', 'hive', 'honey', 'beekeeping'],
  ['ladybug', 'beetle', 'garden', 'spots', 'ladybird'],
  ['caterpillar', 'larva', 'leaf', 'munch', 'inchworm'],
  ['octopus', 'tentacle', 'cephalopod', 'ink', 'kraken'],
  ['squid', 'cephalopod', 'ocean', 'deep', 'calamari'],
  ['fish', 'fishing', 'freshwater', 'stream', 'angler'],
  ['reef', 'aquarium', 'tropical', 'swim', 'coral'],
  ['dolphin', 'ocean', 'marine', 'swim', 'porpoise'],
  ['whale', 'ocean', 'marine', 'breach', 'cetacean'],
  ['shark', 'ocean', 'predator', 'fin', 'jaws'],
  ['otter', 'river', 'playful', 'swim', 'raft'],
  ['crocodile', 'reptile', 'swamp', 'jaws', 'alligator'],
  ['dragon', 'fantasy', 'scale', 'myth', 'wyrm'],

  // Weather & Environment
  ['sun', 'sunshine', 'clear', 'daylight', 'sunny'],
  ['partly', 'suncloud', 'partlysunny', 'partlycloudy'],
  ['cloudy', 'overcast', 'sky', 'grey', 'gray'],
  ['mostly', 'gloom', 'dreary', 'clouded'],
  ['sunshower', 'rainbow', 'showers', 'mix', 'sprinkle'],
  ['rain', 'drizzle', 'storm', 'wet', 'rainy'],
  ['thunder', 'lightning', 'storm', 'weather', 'thunderstorm'],
  ['lightning', 'electric', 'bolt', 'strike'],
  ['snow', 'flurries', 'winter', 'cold', 'blizzard'],
  ['snowflake', 'frost', 'ice', 'chilly', 'flake'],
  ['wind', 'gust', 'breeze', 'draft', 'windy'],
  ['fog', 'mist', 'haze', 'low', 'foggy'],
  ['tornado', 'twister', 'cyclone', 'funnel', 'whirlwind'],
  ['rainbow', 'color', 'spectrum', 'hope', 'prism'],
  ['night', 'moon', 'evening', 'sleep', 'midnight'],
  ['star', 'sparkle', 'goal', 'celestial', 'starlight'],
  ['highlight', 'feature', 'shine', 'spotlight', 'notable'],
  ['fire', 'bonfire', 'campfire', 'blaze', 'flame'],
  ['water', 'drop', 'hydrate', 'drip', 'splash'],
  ['ocean', 'wave', 'tide', 'surf', 'sea'],

  // Travel & Places
  ['car', 'drive', 'road', 'commute', 'vehicle', 'automobile'],
  ['suv', 'roadtrip', 'family', 'crossover'],
  ['taxi', 'cab', 'hail', 'rideshare', 'uber'],
  ['van', 'shuttle', 'carpool', 'camper', 'minivan'],
  ['delivery', 'freight', 'shipping', 'logistics', 'courier'],
  ['semi', 'longhaul', 'trucker', 'eighteenwheeler'],
  ['pickup', 'haul', 'cargo', 'ute', 'truck'],
  ['commuter', 'bike', 'cycle', 'pedal', 'bicycle'],
  ['scooter', 'commute', 'micro', 'mobility', 'kickscooter'],
  ['moped', 'vespa', 'scooter', 'city', 'motorscooter'],
  ['motorcycle', 'motorbike', 'ride', 'cruise', 'chopper'],
  ['bus', 'transit', 'route', 'coach', 'public'],
  ['trolley', 'streetcar', 'commute', 'city', 'tram'],
  ['train', 'rail', 'station', 'commute', 'railway'],
  ['subway', 'metro', 'underground', 'transit', 'tube'],
  ['tram', 'lightrail', 'streetcar', 'transit', 'tramway'],
  ['locomotive', 'railway', 'steam', 'historic', 'engine'],
  ['flight', 'airplane', 'travel', 'depart', 'flying'],
  ['aviation', 'pilot', 'acrobatics', 'airshow', 'aircraft'],
  ['departure', 'airport', 'board', 'gate', 'takeoff'],
  ['arrival', 'landing', 'airport', 'runway', 'touchdown'],
  ['helicopter', 'airlift', 'chopper', 'rotor', 'heli'],
  ['rocket', 'launch', 'space', 'mission', 'spaceflight'],
  ['satellite', 'orbit', 'signal', 'space', 'telemetry'],
  ['ufo', 'alien', 'sighting', 'mystery', 'spaceship'],
  ['sail', 'sailing', 'regatta', 'boat', 'yachting'],
  ['canoe', 'paddle', 'river', 'lake', 'kayak'],
  ['speedboat', 'wake', 'water', 'lake', 'powerboat'],
  ['yacht', 'cruise', 'marina', 'luxury', 'sailboat'],
  ['anchor', 'nautical', 'harbor', 'moor', 'anchorage'],
  ['direction', 'orient', 'heading', 'scout', 'compass'],
  ['mapping', 'route', 'navigation', 'atlas', 'map'],
  ['luggage', 'travel', 'packing', 'suitcase', 'baggage'],
  ['backpack', 'travel', 'hike', 'trek', 'rucksack'],

  // Locations & Landmarks
  ['home', 'house', 'residence', 'realestate', 'dwelling'],
  ['garden', 'yard', 'cottage', 'suburb', 'landscape'],
  ['community', 'neighborhood', 'block', 'homes', 'neighbors'],
  ['renovation', 'fixer', 'restore', 'remodel', 'rehab'],
  ['office', 'corporate', 'headquarters', 'building', 'workplace'],
  ['mall', 'retail', 'shopping', 'department', 'plaza'],
  ['store', 'convenience', 'shop', 'retail', 'market'],
  ['bank', 'finance', 'branch', 'savings', 'creditunion'],
  ['hotel', 'stay', 'checkin', 'travel', 'lodging'],
  ['hospitality', 'inn', 'lodging', 'suite', 'guesthouse'],
  ['hospital', 'clinic', 'medical', 'care', 'healthcare'],
  ['government', 'civic', 'policy', 'council', 'municipal'],
  ['construction', 'crane', 'build', 'site', 'development'],
  ['manufacturing', 'factory', 'plant', 'industry', 'production'],
  ['castle', 'heritage', 'history', 'tour', 'fortress'],
  ['fantasy', 'kingdom', 'fairytale', 'storybook', 'magic'],
  ['mosque', 'worship', 'prayer', 'community', 'masjid'],
  ['church', 'service', 'chapel', 'worship', 'cathedral'],
  ['synagogue', 'temple', 'worship', 'community', 'shul'],
  ['temple', 'shrine', 'worship', 'ritual', 'mandir'],
  ['torii', 'shrine', 'japan', 'tradition', 'gate'],
  ['park', 'nature', 'outdoors', 'scenic', 'greenspace'],
  ['desert', 'sand', 'dunes', 'arid', 'badlands'],
  ['island', 'tropical', 'beach', 'vacation', 'isle'],
  ['beach', 'vacation', 'umbrella', 'sand', 'seaside'],
  ['mountain', 'peak', 'summit', 'alpine', 'range'],
  ['camping', 'camp', 'tent', 'outdoor', 'overnight'],
  ['stadium', 'sports', 'arena', 'event', 'ballpark'],
  ['festival', 'fair', 'amusement', 'rides', 'carnival'],
  ['rollercoaster', 'thrill', 'themepark', 'ride', 'coaster'],
  ['carousel', 'fair', 'horses', 'ride', 'merrygoround'],
  ['bridge', 'fog', 'skyline', 'landmark', 'suspension'],
  ['nightscape', 'lights', 'river', 'illuminated', 'skyline'],
  ['twilight', 'city', 'buildings', 'dusk', 'evening'],
  ['sunset', 'evening', 'city', 'skyline', 'dusk'],
  ['city', 'downtown', 'urban', 'skyline', 'metropolis'],
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

const createSynonymLookup = (): Map<string, Set<string>> => {
  const lookup = new Map<string, Set<string>>();

  for (const group of SYNONYM_GROUPS) {
    const normalizedGroup = group
      .map((word) => normalizeForMatch(word))
      .filter((word) => word.length > 0);

    for (const word of normalizedGroup) {
      let synonyms = lookup.get(word);
      if (!synonyms) {
        synonyms = new Set<string>();
        lookup.set(word, synonyms);
      }

      for (const synonym of normalizedGroup) {
        if (synonym !== word) {
          synonyms.add(synonym);
        }
      }
    }
  }

  return lookup;
};

const SYNONYM_LOOKUP = createSynonymLookup();

const isConsonant = (character: string): boolean =>
  /^[bcdfghjklmnpqrstvwxyz]$/.test(character);

const addPluralVariants = (
  keyword: string,
  addVariant: (variant: string) => boolean,
) => {
  if (!keyword || keyword.length < 2 || keyword.includes(' ')) {
    return;
  }

  const length = keyword.length;

  if (keyword.endsWith('ies') && length > 3) {
    addVariant(`${keyword.slice(0, -3)}y`);
  } else if (keyword.endsWith('ves') && length > 3) {
    addVariant(`${keyword.slice(0, -3)}f`);
    addVariant(`${keyword.slice(0, -3)}fe`);
  } else if (/(ches|shes|xes|zes|ses)$/u.test(keyword) && length > 3) {
    addVariant(keyword.slice(0, -2));
  } else if (keyword.endsWith('s') && length > 1 && !keyword.endsWith('ss')) {
    addVariant(keyword.slice(0, -1));
  }

  if (keyword.endsWith('s')) {
    return;
  }

  if (
    keyword.endsWith('y') &&
    length > 1 &&
    isConsonant(keyword[length - 2])
  ) {
    addVariant(`${keyword.slice(0, -1)}ies`);
  } else if (/(s|x|z|ch|sh)$/u.test(keyword)) {
    addVariant(`${keyword}es`);
  } else {
    addVariant(`${keyword}s`);
  }
};

const createKeywordToIconsMap = (): Map<string, Set<string>> => {
  const map = new Map<string, Set<string>>();

  for (const entry of KEYWORD_ICON_ENTRIES) {
    for (const keyword of entry.keywords) {
      const normalized = normalizeForMatch(keyword);
      if (!normalized) {
        continue;
      }

      let icons = map.get(normalized);
      if (!icons) {
        icons = new Set<string>();
        map.set(normalized, icons);
      }

      icons.add(entry.icon);
    }
  }

  return map;
};

const KEYWORD_TO_ICONS = createKeywordToIconsMap();

const expandKeyword = (keyword: string, entryIcon: string): string[] => {
  const normalizedKeyword = normalizeForMatch(keyword);
  if (!normalizedKeyword) {
    return [];
  }

  const variants = new Set<string>([normalizedKeyword]);

  const addVariant = (variant: string): boolean => {
    if (!variant || variants.has(variant)) {
      return false;
    }

    const iconsForKeyword = KEYWORD_TO_ICONS.get(variant);
    if (iconsForKeyword && !iconsForKeyword.has(entryIcon)) {
      return false;
    }

    variants.add(variant);
    return true;
  };

  addPluralVariants(normalizedKeyword, addVariant);

  const synonyms = SYNONYM_LOOKUP.get(normalizedKeyword);
  if (synonyms) {
    for (const synonym of synonyms) {
      if (addVariant(synonym)) {
        addPluralVariants(synonym, addVariant);
      }
    }
  }

  return Array.from(variants);
};

const expandKeywords = (icon: string, keywords: string[]): string[] => {
  const variants = new Set<string>();

  for (const keyword of keywords) {
    for (const variant of expandKeyword(keyword, icon)) {
      if (variant.length > 0) {
        variants.add(variant);
      }
    }
  }

  return Array.from(variants);
};

const NORMALIZED_ENTRIES: NormalizedEntry[] = KEYWORD_ICON_ENTRIES.map(
  (entry) => {
    const expandedKeywords = expandKeywords(entry.icon, entry.keywords);

    return {
      icon: entry.icon,
      keywords: expandedKeywords,
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
