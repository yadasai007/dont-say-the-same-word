// Question pool, part 1: food, drink, animals, colors, home, clothing.
// Format per line: Question|answer;answer=alias=alias;answer  (aliases count as the same word)
window.POOL_DATA.push(`
Name a color|red;blue;green;yellow;purple=violet;orange;pink;black;white;brown
Name a color of the rainbow|red;orange;yellow;green;blue;indigo;violet=purple
Name a shade of blue|navy;sky blue;royal blue;teal;turquoise;cobalt;azure;baby blue
Name a shade of red|crimson;scarlet;maroon;burgundy;cherry;ruby;brick red;wine
Name a shade of green|lime;olive;emerald;mint;forest green;sage;jade;teal
Name a metallic color|gold;silver;bronze;copper;platinum;rose gold;chrome
Name a fruit|apple;banana;mango;orange;grapes=grape;strawberry;pineapple;watermelon;kiwi;papaya
Name a red fruit|apple;strawberry;cherry;raspberry;watermelon;pomegranate;cranberry
Name a yellow fruit|banana;lemon;mango;pineapple;papaya;starfruit;yellow apple
Name a citrus fruit|orange;lemon;lime;grapefruit;tangerine=mandarin;kumquat;pomelo
Name a tropical fruit|mango;pineapple;papaya;coconut;banana;guava;passion fruit;lychee
Name a berry|strawberry;blueberry;raspberry;blackberry;cranberry;gooseberry;mulberry
Name a fruit with seeds inside|apple;watermelon;papaya;pomegranate;orange;grapes;guava
Name a fruit with a pit or stone|mango;peach;cherry;plum;apricot;olive;date;avocado
Name a vegetable|carrot;potato;tomato;onion;cabbage;broccoli;spinach;cauliflower;peas;beans
Name a green vegetable|spinach;broccoli;peas;cabbage;lettuce;cucumber;beans;okra=ladyfinger=bhindi
Name a root vegetable|carrot;potato;beetroot=beet;radish;turnip;sweet potato;ginger
Name a leafy green|spinach;lettuce;kale;cabbage;fenugreek=methi;coriander=cilantro;mint
Name a vegetable you eat raw in a salad|cucumber;tomato;lettuce;onion;carrot;bell pepper=capsicum;radish
Name a spice|turmeric;cumin;pepper;cinnamon;cardamom;clove;chili powder;coriander;nutmeg
Name an herb|basil;mint;coriander=cilantro;parsley;rosemary;thyme;oregano;dill
Name a nut|almond;cashew;peanut;walnut;pistachio;hazelnut;macadamia;pecan
Name a type of bread|naan;roti=chapati;baguette;sourdough;bun;croissant;paratha;bagel;pita
Name a breakfast food|eggs;toast;cereal;pancakes;idli;dosa;poha;oatmeal;upma;paratha
Name a lunch food|sandwich;rice;salad;burger;biryani;wrap;noodles;soup;thali
Name a pizza topping|cheese;pepperoni;mushroom;onion;olives;pineapple;paneer;chicken;corn;capsicum
Name a sandwich filling|cheese;ham;chicken;egg;tuna;veggies;peanut butter;jam;paneer
Name a dessert|ice cream;cake;gulab jamun;brownie;pie;pudding;cheesecake;rasgulla;kheer;jalebi
Name an Indian sweet|gulab jamun;jalebi;rasgulla;ladoo;barfi;kheer;halwa;kaju katli;rasmalai
Name an Indian dish|biryani;butter chicken;dosa;idli;samosa;dal;paneer tikka;chole;pav bhaji;rajma
Name a South Indian dish|dosa;idli;vada;sambar;uttapam;upma;rasam;pongal;appam
Name a street food|samosa;pani puri=golgappa=puchka;pav bhaji;vada pav;chaat;momos;bhel puri;hot dog;tacos
Name a fast food item|burger;fries;pizza;hot dog;nuggets;fried chicken;taco;sandwich;wrap
Name a snack|chips;popcorn;cookies;nuts;crackers;samosa;pretzels;biscuits;namkeen
Name a flavor of ice cream|vanilla;chocolate;strawberry;mango;butterscotch;pistachio;mint;cookies and cream;coffee
Name a flavor of chips|salted;sour cream and onion;masala;barbecue;cheese;salt and vinegar;peri peri
Name a type of cheese|cheddar;mozzarella;parmesan;paneer;feta;swiss;brie;gouda;cottage cheese
Name a type of pasta|spaghetti;penne;macaroni;lasagna;fettuccine;ravioli;fusilli;linguine
Name a soup|tomato;chicken;sweet corn;mushroom;minestrone;hot and sour;lentil;manchow;pumpkin
Name a type of rice dish|biryani;fried rice;pulao;khichdi;risotto;paella;curd rice;lemon rice
Name a type of curry|butter chicken;paneer butter masala;korma;vindaloo;dal makhani;chole;rogan josh;green curry
Name a Chinese dish|fried rice;noodles=chow mein=hakka noodles;dumplings;manchurian;spring rolls;chilli chicken;sweet and sour
Name an Italian food|pizza;pasta;lasagna;risotto;tiramisu;gelato;spaghetti;bruschetta
Name a Mexican food|taco;burrito;nachos;quesadilla;guacamole;enchilada;salsa;churros
Name a Japanese food|sushi;ramen;tempura;miso soup;teriyaki;udon;sashimi;mochi
Name a hot drink|tea=chai;coffee;hot chocolate;green tea;soup;milk;cappuccino;latte
Name a cold drink|lemonade;cola;iced tea;juice;milkshake;lassi;smoothie;cold coffee;water
Name a juice|orange;apple;mango;grape;pineapple;watermelon;sugarcane;pomegranate;lemon
Name a soft drink brand|coca-cola=coke;pepsi;sprite;fanta;thums up;7up;mountain dew;limca;maaza
Name a type of tea|green tea;black tea;masala chai;lemon tea;herbal tea;milk tea;oolong;earl grey
Name a coffee drink|espresso;cappuccino;latte;americano;mocha;filter coffee;cold brew;macchiato
Name a milkshake flavor|chocolate;strawberry;vanilla;mango;banana;oreo;butterscotch;coffee
Name something you put on toast|butter;jam;honey;peanut butter;nutella;cheese;avocado;egg
Name a condiment|ketchup;mustard;mayonnaise;soy sauce;chutney;hot sauce;vinegar;relish
Name a sauce|tomato sauce=ketchup;soy sauce;barbecue;pesto;alfredo;white sauce;hot sauce;mint chutney
Name a cereal grain|rice;wheat;corn=maize;oats;barley;millet;rye;quinoa
Name a dal or lentil|toor dal;moong dal;masoor dal;chana dal;urad dal;rajma;chickpeas
Name a dairy product|milk;cheese;butter;yogurt=curd=dahi;paneer;cream;ghee;buttermilk
Name something made from milk|cheese;butter;yogurt=curd;paneer;ghee;ice cream;cream;khoa
Name a kind of egg dish|omelette;boiled egg;scrambled eggs;fried egg;egg curry;poached egg;bhurji
Name a type of meat|chicken;mutton=lamb;beef;pork;fish;turkey;duck;goat
Name a seafood|fish;prawns=shrimp;crab;lobster;squid;oyster;mussels;salmon
Name a type of fish you can eat|salmon;tuna;pomfret;rohu;cod;sardine;mackerel;tilapia
Name a birthday party food|cake;pizza;chips;sandwiches;samosa;ice cream;cupcakes;candy
Name a food that is crunchy|chips;apple;carrot;popcorn;nuts;crackers;papad;cookies
Name a food that is sweet|cake;candy;chocolate;honey;ice cream;sugar;mango;jalebi
Name a food that is sour|lemon;tamarind;lime;yogurt;pickle;raw mango;vinegar;green apple
Name a food that is spicy|chili;curry;wasabi;salsa;jalapeno;pickle;biryani;hot wings
Name a food that is salty|chips;pretzels;fries;popcorn;pickles;soy sauce;cheese;olives
Name a food you eat with your hands|pizza;burger;sandwich;samosa;fries;roti;tacos;fried chicken
Name a food you eat with a spoon|soup;ice cream;cereal;rice;yogurt;pudding;dal;kheer
Name a food that comes in a can|beans;tuna;soup;corn;soda;peas;tomatoes;fruit cocktail
Name something you bake|cake;bread;cookies;muffins;pie;brownies;pizza;cupcakes
Name a cake flavor|chocolate;vanilla;red velvet;black forest;pineapple;strawberry;butterscotch;carrot
Name a candy or chocolate brand|cadbury dairy milk;kitkat;snickers;mars;ferrero rocher;5 star;m&ms;twix
Name something you find in a lunch box|sandwich;fruit;roti;rice;juice;chips;cookies;paratha
Name a kitchen appliance|fridge=refrigerator;microwave;oven;mixer=blender;toaster;stove;dishwasher;kettle
Name a kitchen utensil|spoon;knife;fork;ladle;spatula;whisk;tongs;peeler;rolling pin
Name something in the fridge|milk;eggs;butter;vegetables;fruit;water;cheese;leftovers;curd
Name something in a bathroom|toothbrush;soap;towel;shampoo;mirror;toilet;bucket;comb;toothpaste
Name something in a bedroom|bed;pillow;blanket;wardrobe;lamp;mirror;clock;curtains;dresser
Name something in a living room|sofa=couch;tv;table;lamp;carpet=rug;cushion;bookshelf;fan;clock
Name a piece of furniture|chair;table;bed;sofa;wardrobe;desk;shelf;stool;cabinet
Name something you sit on|chair;sofa;stool;bench;bed;floor;swing;bean bag;bike seat
Name something with a cord or cable|phone charger;lamp;tv;laptop;iron;hair dryer;headphones;kettle
Name a cleaning tool|broom;mop;vacuum;duster;sponge;bucket;scrubber;dustpan;cloth
Name a household chore|washing dishes;laundry;sweeping;mopping;cooking;dusting;ironing;taking out trash
Name something you find in a drawer|spoons;socks;pens;papers;keys;batteries;scissors;tape;clothes
Name something made of glass|window;mirror;bottle;glass=cup;bulb;spectacles;vase;jar;screen
Name something made of wood|table;chair;door;pencil;bat;bed;floor;spoon;shelf
Name something made of plastic|bottle;bag;bucket;toy;comb;chair;straw;container;pen
Name something made of metal|spoon;key;coin;car;knife;nail;can;scissors;ring
Name something made of paper|book;notebook;newspaper;money;tissue;envelope;bag;cards;box
Name something made of rubber|tyre=tire;eraser;balloon;ball;gloves;rubber band;slippers;duck
Name something made of cotton|t-shirt;socks;towel;bedsheet;jeans;pillow;bandage;handkerchief
Name something that is round|ball;coin;plate;wheel;clock;pizza;sun;ring;orange
Name something that is square|box;dice;window;tile;napkin;chessboard;sandwich;cushion
Name something that is soft|pillow;cotton;teddy bear;blanket;bread;cushion;cat;feather
Name something that is hard|rock;diamond;wood;metal;brick;ice;bone;table
Name something that is sticky|glue;honey;tape;gum;syrup;jam;candy;slime
Name something that is hot|sun;fire;stove;tea;coffee;oven;chili;iron
Name something that is cold|ice;snow;fridge;ice cream;freezer;cold drink;winter;antarctica
Name something that is white|snow;milk;paper;cloud;salt;sugar;rice;teeth;swan
Name something that is black|coal;night;crow;tyre;ink;hair;panther;tar;pepper
Name something that is yellow|banana;sun;lemon;turmeric;corn;mango;taxi;yolk;sunflower
Name something that is green|grass;leaf;tree;frog;parrot;cucumber;lime;broccoli;emerald
Name something that is red|apple;blood;rose;tomato;fire truck;strawberry;chili;heart;cherry
Name something that is blue|sky;sea=ocean;blueberry;jeans;sapphire;whale;peacock;bluebird
Name something that is pink|flamingo;rose;bubble gum;pig;candy floss;lotus;watermelon;lips
Name something that is orange|orange;carrot;pumpkin;tiger;mango;marigold;sunset;fanta
Name a farm animal|cow;goat;sheep;pig;horse;hen=chicken;duck;buffalo;donkey
Name a pet|dog;cat;fish;parrot;rabbit;hamster;turtle;guinea pig;budgie
Name a wild animal|lion;tiger;elephant;bear;wolf;giraffe;zebra;leopard;deer;fox
Name a big cat|lion;tiger;leopard;cheetah;jaguar;panther;snow leopard;cougar=puma
Name a bird|crow;sparrow;parrot;eagle;pigeon;peacock;owl;penguin;duck;hen
Name a bird that cannot fly|penguin;ostrich;emu;kiwi;dodo;cassowary;chicken
Name a sea animal|shark;whale;dolphin;octopus;jellyfish;starfish;seal;crab;turtle
Name an insect|ant;bee;butterfly;fly;mosquito;cockroach;grasshopper;beetle;ladybug
Name a reptile|snake;lizard;crocodile;turtle;tortoise;chameleon;iguana;alligator;gecko
Name a snake|cobra;python;king cobra;viper;anaconda;rattlesnake;krait;mamba
Name an animal with stripes|zebra;tiger;skunk;raccoon;bee;chipmunk;squirrel;okapi
Name an animal with spots|leopard;cheetah;giraffe;dalmatian;ladybug;jaguar;deer;hyena
Name an animal with a long neck|giraffe;ostrich;swan;camel;flamingo;llama;goose
Name an animal with horns|cow;goat;rhino;deer;buffalo;bull;ram;antelope
Name an animal with a trunk or long nose|elephant;anteater;tapir;elephant shrew;proboscis monkey
Name an animal that lives in water|fish;whale;dolphin;shark;octopus;frog;crocodile;seal
Name an animal that hops|kangaroo;rabbit;frog;grasshopper;wallaby;toad;kangaroo rat
Name an animal that is very slow|sloth;snail;tortoise=turtle;koala;slug;starfish
Name an animal that is very fast|cheetah;horse;falcon;greyhound;antelope;ostrich;sailfish
Name a nocturnal animal|owl;bat;cat;raccoon;hedgehog;fox;moth;firefly
Name an animal in a zoo|lion;elephant;monkey;giraffe;tiger;zebra;bear;penguin;hippo
Name an animal from Africa|lion;elephant;giraffe;zebra;hippo;rhino;cheetah;gorilla
Name an animal from Australia|kangaroo;koala;emu;wombat;platypus;dingo;kookaburra;tasmanian devil
Name an animal found in India|tiger;elephant;peacock;cobra;rhino;monkey;cow;leopard
Name a baby animal name|puppy;kitten;calf;cub;chick;lamb;foal;kid;duckling
Name an animal that makes a good mascot|lion;tiger;eagle;bear;bull;panther;wolf;shark
Name a dog breed|labrador;german shepherd;golden retriever;pug;beagle;husky;poodle;bulldog
Name a cat breed|persian;siamese;maine coon;bengal;sphynx;ragdoll;british shorthair
Name a monkey or ape|chimpanzee;gorilla;orangutan;baboon;gibbon;langur;macaque;lemur
Name an animal that eats grass|cow;goat;sheep;horse;deer;rabbit;zebra;buffalo
Name an animal that eats meat|lion;tiger;wolf;shark;eagle;crocodile;leopard;hyena
Name something a dog does|bark;wag tail;fetch;sit;sleep;run;bite;dig;lick
Name an animal sound|moo;bark=woof;meow;roar;quack;hiss;oink;baa;neigh
Name something with wings|bird;airplane;butterfly;bee;bat;angel;helicopter;dragon
Name something with eight legs|spider;octopus;scorpion;tick;crab;mite
Name an animal with a shell|turtle;tortoise;snail;crab;lobster;clam;oyster;armadillo
Name a type of clothing|shirt;t-shirt;jeans;dress;saree;kurta;jacket;skirt;shorts
Name something you wear on your feet|shoes;socks;sandals;slippers=flip flops=chappals;boots;sneakers;heels
Name something you wear on your head|cap;hat;helmet;turban;crown;scarf;headband;bandana
Name something you wear in winter|sweater;jacket;scarf;gloves;cap;coat;socks;boots;shawl
Name something you wear in summer|t-shirt;shorts;sunglasses;hat;sandals;cotton dress;cap;flip flops
Name something you wear to a wedding|saree;sherwani;suit;lehenga;kurta;tie;jewelry;dress
Name a piece of jewelry|ring;necklace;earrings;bracelet;bangles;anklet;chain;watch;nose ring
Name a traditional Indian outfit|saree;kurta;lehenga;sherwani;dhoti;salwar kameez;churidar;lungi
Name an accessory|watch;belt;sunglasses;bag;wallet;scarf;tie;hat;bracelet
Name something with pockets|jeans;jacket;shirt;bag;shorts;coat;apron;cargo pants
Name something with buttons|shirt;remote;phone;keyboard;coat;calculator;elevator;jacket
Name something with a zipper|jacket;bag;jeans;wallet;pencil case;tent;suitcase;hoodie
Name a fabric|cotton;silk;wool;denim;linen;polyester;velvet;nylon;leather
Name a type of shoe|sneakers;sandals;boots;heels;loafers;slippers;flip flops;formal shoes
Name a type of bag|backpack;handbag;suitcase;purse;tote;duffel bag;laptop bag;sling bag
Name something you carry in your wallet|money=cash;cards;id card;photo;coins;receipts;license;bills
Name something you carry in your bag|phone;wallet;keys;water bottle;books;pen;charger;umbrella
Name something people collect|stamps;coins;cards;shells;books;toys;autographs;comics
Name a toy|ball;doll;teddy bear;car;puzzle;lego;yo-yo;kite;top
Name a board game|chess;ludo;monopoly;snakes and ladders;carrom;scrabble;checkers;uno
Name a card game|poker;rummy;uno;solitaire;go fish;bridge;blackjack;teen patti
Name a party game|musical chairs;charades;truth or dare;passing the parcel;treasure hunt;pictionary;hide and seek
Name a playground thing|swing;slide;see-saw;sandbox;monkey bars;merry-go-round;jungle gym
Name something you do on a rainy day|watch tv;read;sleep;play indoors;drink tea;eat pakoras;jump in puddles;stay home
Name something with a lid|box;jar;bottle;pot;dustbin;laptop;pen;tiffin
Name something that holds water|bottle;bucket;glass;tank;jug;pot;bathtub;pool
Name something that has a handle|cup;door;bag;suitcase;pan;bucket;knife;umbrella
Name something that has teeth|comb;saw;zipper;shark;dog;gear;fork;crocodile
Name something that has keys|keyboard;piano;laptop;lock;typewriter;map;phone;car
Name something that has a screen|phone;tv;laptop;computer;tablet;watch;atm;calculator
Name something that rings|phone;bell;alarm;doorbell;school bell;temple bell;bicycle bell
Name something that ticks|clock;watch;timer;bomb;metronome;time bomb
Name something you plug in|phone charger;tv;fridge;laptop;iron;fan;lamp;kettle
Name something that runs on batteries|remote;clock;toy car;torch=flashlight;watch;phone;calculator;mouse
Name something you open and close|door;window;book;box;eyes;mouth;umbrella;laptop
Name something you fold|clothes;paper;umbrella;chair;letter;napkin;map;blanket
Name something you light|candle;lamp;fire;matchstick;diya;cigarette;stove;firecracker
Name something you wrap|gift;sandwich;roti;baby;scarf;bandage;present;food
Name something you blow|balloon;candles;whistle;nose;bubbles;horn;kiss;trumpet
Name something you shake|hands;bottle;salt;head;rattle;milkshake;tree;dice
Name something you squeeze|lemon;toothpaste;orange;sponge;hand;ketchup bottle;stress ball
Name something you peel|banana;orange;potato;apple;onion;sticker;egg;carrot
Name something you cut|paper;vegetables;cake;hair;nails;cloth;ribbon;fruit
Name something you pour|water;milk;tea;juice;cereal;sauce;oil;coffee
Name something you sharpen|pencil;knife;axe;scissors;skills;sword;blade
Name something you can recycle|paper;plastic;glass;cans;bottles;cardboard;metal;newspaper
Name something you throw away|garbage=trash;wrapper;peel;old clothes;broken things;paper;bottle
Name something that smells good|flowers;perfume;food;rain;coffee;cake;soap;incense
Name something that smells bad|garbage;socks;rotten eggs;skunk;sewer;fish;onions;feet
Name something that is shiny|gold;diamond;mirror;star;silver;glitter;car;coin
Name something that is heavy|elephant;truck;rock;car;building;anvil;whale;furniture
Name something that is light|feather;paper;balloon;cotton;leaf;bubble;air;tissue
Name something that is tiny|ant;atom;grain of sand;seed;dust;cell;flea;bacteria
Name something that is huge|elephant;whale;mountain;building;ocean;sun;planet;ship
Name something that is long|snake;road;train;river;rope;hair;giraffe neck;bridge
Name something that is loud|thunder;drum;horn;siren;firecracker;speaker;lion;baby crying
Name something that is quiet|library;mouse;night;whisper;snow;cat;feather;temple
Name something that is fragile|glass;egg;mirror;vase;bulb;phone screen;bubble;china
Name something that grows|plant;tree;hair;nails;baby;flower;child;grass
Name something that melts|ice;ice cream;butter;chocolate;snow;candle;cheese;wax
Name something that floats|boat;wood;duck;balloon;ice;leaf;ball;bubble
Name something that bounces|ball;rubber ball;trampoline;kangaroo;basketball;tennis ball;spring
Name something that spins|top;fan;wheel;earth;washing machine;merry-go-round;dancer;tornado
Name something that flies|bird;plane;kite;butterfly;helicopter;bee;rocket;drone
Name something that rolls|ball;wheel;dice;marble;coin;log;bowling ball;eyes
Name something that has stripes|zebra;tiger;flag;barcode;crosswalk;candy cane;shirt;bee
Name something with a tail|dog;cat;monkey;kite;comet;airplane;fish;horse
Name something that comes in pairs|shoes;socks;earrings;gloves;eyes;chopsticks;twins;dice
Name something sold by the dozen|eggs;bananas;donuts;roses;cookies;cupcakes;pencils
Name something that has a lot of seeds|watermelon;papaya;pomegranate;sunflower;guava;tomato;strawberry;kiwi
Name a flower|rose;lotus;sunflower;jasmine;tulip;lily;marigold;daisy;orchid;hibiscus
Name a tree|mango;neem;banyan;oak;pine;coconut;peepal;palm;maple;teak
Name a houseplant|money plant;tulsi;aloe vera;snake plant;cactus;fern;spider plant;bamboo
Name something in a garden|flowers;grass;tree;hose;bench;butterfly;pots;swing;soil
Name a garden tool|shovel=spade;rake;hose;watering can;lawn mower;shears;trowel;hoe
Name something you find in a picnic basket|sandwiches;fruit;juice;chips;blanket;plates;cake;water
Name a meal of the day|breakfast;lunch;dinner;brunch;snacks;supper;tea time
Name something in a restaurant|menu;table;waiter;chef;bill;chairs;plates;food;kitchen
Name something on a dinner table|plate;spoon;glass;salt;napkin;food;fork;water jug
Name something you add to tea|sugar;milk;ginger;cardamom;lemon;honey;tea leaves;mint
Name something you add to coffee|sugar;milk;cream;ice;caramel;chocolate;cinnamon;foam
Name a popular cooking method|frying;boiling;baking;grilling;roasting;steaming;sauteing;tandoor
Name a breakfast cereal|cornflakes;muesli;oats;chocos;froot loops;granola;wheat flakes
Name a sweet drink|lemonade;milkshake;soda;juice;falooda;rooh afza;hot chocolate;sweet lassi
Name a fruit that is green|kiwi;green apple;grapes;lime;guava;avocado;pear;watermelon
Name a vegetable that is red|tomato;red pepper;beetroot;radish;red onion;red chili;red cabbage
Name a food made from potato|fries;chips;mashed potatoes;aloo paratha;samosa;vada pav;hash brown;aloo tikki
Name a food made from corn|popcorn;cornflakes;tortilla;corn on the cob;cornbread;nachos;bhutta
Name a food made from rice|biryani;idli;dosa;kheer;fried rice;sushi;pulao;poha
Name a food made from wheat|bread;roti;pasta;noodles;cake;biscuits;paratha;samosa
Name something made with eggs|omelette;cake;mayonnaise;pancakes;egg curry;custard;french toast;quiche
Name something made with chocolate|cake;brownie;cookies;ice cream;hot chocolate;mousse;milkshake;truffle
Name a popular food delivery order|pizza;biryani;burger;chinese;momos;shawarma;rolls;dosa
Name something you eat at the movies|popcorn;nachos;soda;hot dog;candy;samosa;ice cream;fries
Name something you eat at a fair|cotton candy;popcorn;ice cream;corn;pani puri;jalebi;hot dog;churros
Name a food associated with Diwali|ladoo;barfi;kaju katli;chakli;gulab jamun;namak pare;jalebi;sweets
Name a food associated with Christmas|plum cake;cookies;turkey;candy cane;gingerbread;pudding;chocolate
`);
