import { Scene, SceneCategory } from './types';

export const SCENE_CATEGORIES: SceneCategory[] = [
  {
    name: 'Thiên nhiên',
    scenes: [
      { id: 'nature-1', name: 'Rừng nhiệt đới', prompt: 'in a lush tropical rainforest with sunlight filtering through the canopy' },
      { id: 'nature-2', name: 'Thảo nguyên gió lộng', prompt: 'on a vast, windswept savanna with golden grass' },
      { id: 'nature-3', name: 'Núi tuyết', prompt: 'on a majestic snow-capped mountain peak under a clear blue sky' },
      { id: 'nature-4', name: 'Rừng mùa thu lá vàng', prompt: 'in a vibrant autumn forest with golden and red leaves' },
      { id: 'nature-5', name: 'Sa mạc cát vàng', prompt: 'in a vast golden sand desert with rolling dunes' },
      { id: 'nature-6', name: 'Cánh đồng hoa oải hương', prompt: 'in a beautiful field of lavender under the sun' },
      { id: 'nature-7', name: 'Bờ biển xanh', prompt: 'on a pristine beach with turquoise water and white sand' },
      { id: 'nature-8', name: 'Thác nước hùng vĩ', prompt: 'standing near a majestic, powerful waterfall with mist in the air' },
      { id: 'nature-9', name: 'Đồi trà buổi sáng', prompt: 'on a green tea hill in the early morning mist' },
      { id: 'nature-10', name: 'Hoàng hôn rực rỡ', prompt: 'during a brilliant and colorful sunset over the ocean' },
    ],
  },
  {
    name: 'Thành phố và đời sống',
    scenes: [
      { id: 'city-1', name: 'Phố Sài Gòn sáng sớm', prompt: 'on a busy Saigon street in the early morning with motorbikes and vendors' },
      { id: 'city-2', name: 'Thành phố về đêm', prompt: 'in a bustling city at night with glowing neon signs and skyscrapers' },
      { id: 'city-3', name: 'Cà phê vỉa hè', prompt: 'at a rustic sidewalk cafe in a charming alley' },
      { id: 'city-4', name: 'Ga tàu điện ngầm', prompt: 'inside a modern, bustling subway station with trains arriving' },
      { id: 'city-5', name: 'Cầu vượt hiện đại', prompt: 'on a modern architectural overpass with light trails from cars' },
      { id: 'city-6', name: 'Chợ đêm đông đúc', prompt: 'in a crowded and lively night market with food stalls' },
      { id: 'city-7', name: 'Khu chung cư cũ', prompt: 'in front of an old, atmospheric apartment complex with lots of character' },
      { id: 'city-8', name: 'Sân thượng nhìn thành phố', prompt: 'on a rooftop overlooking a sparkling city skyline at dusk' },
      { id: 'city-9', name: 'Trường học tan lớp', prompt: 'outside a school as students are leaving for the day' },
      { id: 'city-10', name: 'Công viên trung tâm', prompt: 'in a peaceful central park with benches, trees, and a fountain' },
    ],
  },
  {
    name: 'Thế giới tưởng tượng',
    scenes: [
      { id: 'fantasy-1', name: 'Lâu đài bay giữa mây', prompt: 'on a magnificent flying castle floating among the clouds' },
      { id: 'fantasy-2', name: 'Rừng cổ tích phát sáng', prompt: 'in a magical, glowing fairytale forest at night' },
      { id: 'fantasy-3', name: 'Thành phố tương lai', prompt: 'in a futuristic city with flying vehicles and advanced technology' },
      { id: 'fantasy-4', name: 'Hành tinh xa xôi', prompt: 'on a strange and beautiful alien planet with two moons' },
      { id: 'fantasy-5', name: 'Đại dương dưới lòng biển', prompt: 'in an underwater kingdom with glowing coral and merfolk' },
      { id: 'fantasy-6', name: 'Làng người tí hon', prompt: 'in a miniature village of tiny people living in mushrooms' },
      { id: 'fantasy-7', name: 'Thế giới kẹo ngọt', prompt: 'in a whimsical world made entirely of candy and sweets' },
      { id: 'fantasy-8', name: 'Bầu trời có rồng bay', prompt: 'in a sky filled with majestic dragons flying between mountains' },
      { id: 'fantasy-9', name: 'Cổng dịch chuyển năng lượng', prompt: 'standing before a swirling, energetic portal to another dimension' },
      { id: 'fantasy-10', name: 'Cánh đồng mây bông', prompt: 'walking on a field of soft, fluffy clouds like cotton' },
    ],
  },
  {
    name: 'Văn hoá & truyền thống',
    scenes: [
      { id: 'culture-1', name: 'Làng quê Việt Nam', prompt: 'in a peaceful Vietnamese countryside village with rice paddies and buffalo' },
      { id: 'culture-2', name: 'Hội chợ Tết', prompt: 'at a vibrant Tet holiday fair with apricot blossoms and traditional decorations' },
      { id: 'culture-3', name: 'Chùa cổ trong sương', prompt: 'at an ancient, mossy pagoda shrouded in morning mist' },
      { id: 'culture-4', name: 'Làng cổ Nhật Bản', prompt: 'in a traditional ancient Japanese village with wooden houses' },
      { id: 'culture-5', name: 'Phố cổ Trung Hoa', prompt: 'in a classic old Chinese town with red lanterns and traditional architecture' },
      { id: 'culture-6', name: 'Lễ hội đèn lồng', prompt: 'during a beautiful lantern festival at night' },
      { id: 'culture-7', name: 'Phố cổ Hội An', prompt: 'on a charming street in Hoi An ancient town with yellow walls and lanterns' },
      { id: 'culture-8', name: 'Đình làng bên sông', prompt: 'at a village communal house next to a peaceful river' },
      { id: 'culture-9', name: 'Cổng thành cổ', prompt: 'at the gate of an ancient, historic citadel' },
      { id: 'culture-10', name: 'Làng chài miền biển', prompt: 'in a rustic coastal fishing village with colorful boats' },
    ],
  },
  {
    name: 'Không gian sáng tạo & nghệ thuật',
    scenes: [
      { id: 'creative-1', name: 'Không gian ảo', prompt: 'in a surreal virtual reality space with geometric shapes' },
      { id: 'creative-2', name: 'Phòng nghệ thuật trừu tượng', prompt: 'in an abstract art gallery with colorful, expressive paintings' },
      { id: 'creative-3', name: 'Bầu trời đa chiều', prompt: 'under a multidimensional sky with swirling colors and patterns' },
      { id: 'creative-4', name: 'Thành phố pha lê', prompt: 'in a city made of sparkling crystal and light' },
      { id: 'creative-5', name: 'Hành tinh màu tím', prompt: 'on a mysterious purple planet with glowing flora' },
      { id: 'creative-6', name: 'Không gian âm nhạc', prompt: 'in a surreal space where musical notes are visible and floating' },
      { id: 'creative-7', name: 'Vườn năng lượng', prompt: 'in a garden of glowing, energetic plants at night' },
      { id: 'creative-8', name: 'Phòng thí nghiệm AI', prompt: 'in a futuristic AI laboratory with holographic displays' },
      { id: 'creative-9', name: 'Thế giới robot', prompt: 'in a world inhabited by friendly and futuristic robots' },
      { id: 'creative-10', name: 'Không gian mơ', prompt: 'in a dreamlike, surreal landscape that defies logic' },
    ],
  },
];

export const ALL_SCENES: Scene[] = SCENE_CATEGORIES.flatMap(category => category.scenes);
