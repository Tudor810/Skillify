import catImgI from "../../images/cat-img-1.png";
import catImgII from "../../images/cat-img-2.png";
import catImgIII from "../../images/cat-img-3.png";
import ai from '../../images/Ai.jpg'
import learningCommunity from '../../images/learning-community.jpg'
import skillyFriend from '../../images/skillyfriend.png'
import User1 from '../../images/User1.jpg'
import User2 from '../../images/User2.jpg'
import User3 from '../../images/User3.jpg'
import editLesson from '../../images/editLesson.mp4'
import flashcards from '../../images/flashcards.mp4'
import generateLesson from '../../images/generateLesson.mp4'
import getCredits from '../../images/getCredits.mp4'
import lessonGenerated from '../../images/lessonGenerated.mp4'
import tool from '../../images/tool.mp4'
import wordDefinition from '../../images/wordDefinition.mp4'
import tutorial from '../../images/tutorial.webp'
import mission from '../../images/mission.jpg'
import attention from '../../images/attention.jpg'
import worldwide from '../../images/worldwide.jpg'
import community from '../../images/community.jpg'
import more from '../../images/more.jpg'
import neural from '../../images/neural.jpg'
import global from '../../images/global.jpg'

const reviewsData = [
{
  username: "Lucaci Vlad",
  image: User1,
  content: "I recently tried out an app called Skillify and was thoroughly impressed with its ability to teach new skills. The app offers a wide variety of subjects, ranging from how to work out to coding and everything in between, even high-income skills.",
  rating:4,
  createdAt: "2023-05-24T14:30:00.000Z"
},
{
  username: "William Johnson",
  image: User2,
  content: "One thing that stood out to me about Skillify was its user-friendly interface. It was easy to navigate and find the skill I wanted to learn. Once I selected my desired subject, the app provided me with a structured curriculum to follow,  daily tasks, complete with everything I needed to ensure I was truly understanding the material.",
  rating:5,
  createdAt: "2023-05-18T12:00:00.000Z"
},
{
  username: "Christopher Wilson",
  image: User3,
  content: "I would highly recommend Skillify to anyone looking to expand their skill set. The app's combination of clear instructions and plans with daily tasks make it an excellent resource for anyone looking to learn something new.",
  rating:5,
  createdAt: "2023-05-25T12:18:15.703+00:00" 
},
]

const freePlan = {
  title:'Skillify Free',
  description: "Skillify basic experience",
  price: 0,
  benefits:[
    "500 free credits",
    "200 credits daily if you have under 400",
    "Community Access on Discord",
    "Basic Lessons and Tools",
    "Lesson saver"
  ],
  notAvaible: [
    "Unlimited acces",
    "Learning techniques",
    "Prioritized customer support",
    "Prioritized acces to new updates and features",
    "Edit lessons",
    "GPT-4"
  ],
   discount: 0,
}
const categoryPlan = {
  title: "Skillify Category",
  description: "Become the best at the thing you want",
  price:2.99,
  priceCode: "price_1NUqUIHFEnZBGAyLz3WprjaK",
  priceCodeYearly: "price_1N6xGZHFEnZBGAyLZjBBCeo5",
  benefits:[
    "Unlimited Access to Your Favorite Category!",
    "Accelerate Your Learning with Powerful Tools!",
    "Prioritized customer support",
    "Prioritized acces to new updates and features",
    "Pro lessons",
    "Free Learning Techniques Guide",
    "GPT-4",
  ],
  notAvaible: [
    "Unlimited acces to all categories"
  ],
  discount: 20
}

const lessonPlan = {
  title:"Skillify Lesson",
  description: "Simple to use, hard to replace",
  price:6.99,
  priceCode: "price_1Ns691HFEnZBGAyLZ2sS6eU6",
  priceCodeYearly: "price_1NUu7oHFEnZBGAyL2wctefxx",
  benefits:[
    "Unlimited lessons in every category",
    "Tests in every category",
    "Flashcards in every category",
    "Homework in every category",
    "Unlimited acces to chat in every category",
    "Free Learning Techniques Guide",
    "Pro Lessons",
    "Prioritized customer support",
    "Prioritized acces to new updates and features",
  ],
  notAvaible: [
    "Unlimited acces to Tools"
  ],
  specialBenefit: [
    "GPT-4"
  ],
  discount: 0
}

const toolPlan = {
  title:"Skillify Tool",
  description: "Exacly how to learn any thing",
  price:6.99,
  priceCode: "price_1Ns69yHFEnZBGAyLXTs6EX22",
  priceCodeYearly: "price_1NUuKjHFEnZBGAyLEC7LzrJJ",
   benefits: [
    "All the tools Skillify has to offer",
    "Videos and documents summary tool",
    "Free Learning Techniques Guide",
    "Prioritized customer support",
    "Prioritized acces to new updates and features",
   ],
   notAvaible: [
    "Unlimited acces to Lessons",
    "Unlimited acces to homework, flashcards and tests",
    "Unlimited acces to chat"
  ],
  specialBenefit: [
    "GPT-4"
  ],
  discount: 0
} 

const fullPlan = {
  title:"Skillify Full Experience",
  description: "Exacly how to master any skill",
  price:9.99,
  priceCode: "price_1Ns67HHFEnZBGAyLnsHu8qii",
  priceCodeYearly:"price_1NUuOxHFEnZBGAyLWNQvX7Is",
  benefits:[
    "Unlimited lessons in every category",
    "Tests in every category",
    "Flashcards in every category",
    "Unlimited acces to chat in every category",
    "Homework in every category",
    "All the tools Skillify has to offer",
    "Free Learning Techniques Guide",
    "Pro Lessons",
    "Prioritized customer support",
    "Prioritized acces to new updates and features",
  ],
  specialBenefit: [
    "GPT-4"
  ],
  discount: 0 
}


const questions = [
  {
    question: "What's the difference between the Lesson Plan and Tool Plan?",
    answear: "The Lesson Plan enables acces to the: Chat, Lesson, Homework, Flashcards and Tests without using credits, while the Tool Plan enables acces to everything else."
  },
  {
    question: "Will there be new updates?",
    answear: "Yes, if you have some ideea about new features, please contact us or leave us a suggestion!"
  },
  {
    question: "What AI are you using?",
    answear: "We are using the latest AI technology in order for our customers to have the best learning experience."
  },
  {
    question: "What is the difference between the standard and premium plan?",
    answear: "The premium plan enables acces to GPT-4, which is considerably better at helping you learn faster!"
  },
  {
    question: "Why would I join the Discord server?",
    answear: "On the Discord server there are channels for every category where you can discuss your favourite topic with people that are trying to learn the same thing as you."
  },
  {
    question: "What audience does your company target?",
    answear: "Skillify is made for everyone, if you are adventurous and want to try a new way of learning, this is your place!"
  },
  {
    question: "How often are you adding new features to the app?",
    answear : "We are continuously improving our app, in order for our users to have the best learning experience!"
  },
  {
    question:"What kind of skills does the app teach?",
    answear:"The app provides a wide range of topics, including high-income skills and everything in between, from how to exercise to coding and can even help you in school."
  },
  {
    question:"Is the app suitable for beginners or more advanced learners?",
    answear:"The lesson provided by the app can take you from a beginner to an expert, thus the app can be used by everyone."
  },
  {
    question:"Are the lessons taught through video or text-based instruction?",
    answear:"The lessons are taught through text-based instructions, based on the category and the information you provide, making the lessons personalized"
  },
  {
    question:"What kind of customer support is available if I encounter any issues or have questions about the app?",
    answear:"You can email us at skillify.ai7@gmail.com or write on our Discord server."
  },
  {
    question:"Is there a trial period before I have to pay for the app?",
    answear:"No, but you get 500 free credits everyday, that can be used to generate anything."
  },
  {
    question:"Is the app suitable for children or is it intended for adults only?",
    answear:"The app can be used by children too."
  },
  {
    question:"Can I use the app on multiple devices, or do I need to purchase a separate subscription for each one?",
    answear:"You can use our app on any device with the same account."
  },

]


const categories = [
  {
    title: "Videos and Documents Summarization Tool",
    secondaryTitle: "Summary",
    description: "Makes learning with YouTube videos and documents easier.",
    canDo: ["Documents Summary", "Youtube Video Summary", "Photo Summary"],
    icon: "fa-solid fa-file-lines"
  },
  {
  title: "Sport",
  description: "Any sport you can name",
  canDo: ["Open chat", "Engaging Lessons", "Sport Equipment", "Exercises"],
  icon: "fa-person-running"
  },
  {
  title: "School",
  description: "Academic assistance for your assignments and exams",
  canDo: ["Open chat", "Engaging Lessons", "Essay writer", "Book summary", "Test generator"],
  icon: 'fa-school'
  },
  {
  title: "Coding",
  description: "Excel in the realm of coding.",
  canDo: ["Open chat", "Engaging Lessons", "Code completion", "Code revision"],
  icon: 'fa-laptop'
  },
  {
  title: "High-income",
  description: "Elevate earning potential with diverse high-income skills",
  canDo: ["Open chat", "Engaging Lessons", "Business plan", "Email template"],
  icon: 'fa-piggy-bank'
  },
  {
  title: "Survival skills",
  description: "Be prepared, learn essential survival techniques and strategies ",
  canDo: ["Open chat", "Engaging Lessons", "Survival equipment", "Survive any situation"],
  icon: 'fa-campground'
  },
  {
  title: "Cooking",
  description: "There is a Gordon Ramsay in all of us",
  canDo: ["Open chat", "Engaging Lessons", "CulinaryMatch (add ingredients and get a recipe)", "Chef assistant"],
  icon: 'fa-utensils'
  },
  {
  title: "Video games",
  description: "Improve you combat in the virtual battle field",
  canDo: ["Open chat", "Engaging Lessons", "Improve at video games", "Pass a difficult level"],
  icon: 'fa-gamepad'
  },
  {
  title: "Gym",
  description: "Everything you need to know about working out",
  canDo: ["Open chat", "Engaging Lessons", "Personalized split", "Personalized diet", "Recovery"],
  icon: 'fa-dumbbell'
  },
  {
  title: "Social media",
  description: "Strategic Social Media Mastery: Accelerate Your Goals",
  canDo: ["Open chat", "Engaging Lessons", "Post description", "Daily post plan"],
  icon: 'fa-photo-film'
  },
  {
  title: "Fighting",
  description: "Empower Yourself: Master the Art of Self-Defense",
  canDo: ["Open chat", "Engaging Lessons", "Insider Secrets"],
  icon: 'fa-shield-halved'
  },
  {
    title: "Social skills",
    description: "Master social skills: confidence, charm, communication. Thrive in any setting",
    canDo: ["Open chat", "Engaging Lessons", "Message generator", "Icebreakers"],
    icon: 'fa-people-group'
  },
  {
    title: "Self improvement",
    description: "Embrace growth, take purposeful action, and unleash your potential to create a fulfilling life.",
    canDo: ["Open chat", "Engaging Lessons", "Book recommendation", "Obtain good habits"],
    icon: 'fa-stairs'
  },
  {
    title: "Mindfulness",
    description: "Embrace serenity and inner peace with our Mindfulness category, where you'll find resources to nurture your mind, body, and soul.",
    canDo: ["Open chat", "Engaging Lessons", "Meditation plan", "Try out yoga"],
    icon: 'fa-place-of-worship'
  },
  {
    title: "Anything Else",
    description:"Let your imagination run loose.",
    canDo: ["Open chat", "Engaging Lessons"],
    icon: 'fa-question'
  }
  ];

const schoolSubject = 
[
  {
  "subject": "Mathematics",
  "icon": "fa-calculator"
  },
  {
  "subject": "Physics",
  "icon": "fa-atom"
  },
  {
  "subject": "Chemistry",
  "icon": "fa-flask"
  },
  {
  "subject": "Biology",
  "icon": "fa-dna"
  },
  {
  "subject": "History",
  "icon": "fa-scroll"
  },
  {
  "subject": "Geography",
  "icon": "fa-globe"
  },
  {
  "subject": "Art",
  "icon": "fa-paint-brush"
  },
  {
  "subject": "Music",
  "icon": "fa-music"
  },
  {
  "subject": "Foreign Languages",
  "icon": "fa-language"
  },
  {
  "subject": "Computer Science",
  "icon": "fa-laptop-code"
  },
  {
  "subject": "Social Studies",
  "icon": "fa-users"
  },
  {
  "subject": "Geography",
  "icon": "fa-globe"
  },
  {
  "subject": "Economics",
  "icon": "fa-chart-line"
  },
  {
  "subject": "Psychology",
  "icon": "fa-brain"
  },
  {
  "subject": "Sociology",
  "icon": "fa-users"
  },
  {
  "subject": "Philosophy",
  "icon": "fa-balance-scale"
  },
  {
  "subject": "Literature",
  "icon": "fa-book"
  },
  {
  "subject": "Health Education",
  "icon": "fa-heart"
  },
  {
  "subject": "Civics",
  "icon": "fa-landmark"
  },
  {
  "subject": "Government",
  "icon": "fa-university"
  },
  {
  "subject": "Environmental Science",
  "icon": "fa-leaf"
  },
  {
  "subject": "Geology",
  "icon": "fa-mountain"
  },
  {
  "subject": "Drama",
  "icon": "fa-theater-masks"
  },
  {
  "subject": "Media Studies",
  "icon": "fa-film"
  },
  {
  "subject": "Information Technology",
  "icon": "fa-desktop"
  }
]

const selectStyle = {
  backgroundColor: 'var(--card-background)',
  color: "white",
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--primary-color)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--primary-color)',
  },
  '.MuiSvgIcon-root ': {
    fill: "white !important",
  }
}

const selectSkill = 
[
  {
    category: "sport",
    skills: [
      "Soccer (Football)",
      "Basketball",
      "Tennis",
      "Cricket",
      "Baseball",
      "Rugby",
      "Golf",
      "American Football",
      "Ice Hockey",
      "Volleyball",
      "Badminton",
      "Table Tennis (Ping Pong)",
      "Swimming",
      "Athletics (Track and Field)",
      "Cycling",
      "Boxing",
      "Martial Arts (Karate, Judo, Taekwondo, etc.)",
      "Wrestling",
      "Gymnastics",
      "Figure Skating",
      "Skiing",
      "Snowboarding",
      "Surfing",
      "Sailing",
      "Rowing",
      "Canoeing/Kayaking",
      "Horse Riding (Equestrian)",
      "Fencing",
      "Archery",
      "Weightlifting",
      "Triathlon",
      "CrossFit",
      "Ultimate Frisbee",
      "Skateboarding",
      "Rollerblading/Roller Skating",
      "Bouldering/Rock Climbing",
      "Pole Vault",
      "Water Polo",
      "Lacrosse",
      "Handball",
      "Field Hockey",
      "Softball",
      "Other"
    ]
  },
  {
    category: "school",
    skills: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "History",
      "Geography",
      "Art",
      "Music",
      "Foreign Languages",
      "Computer Science",
      "Social Studies",
      "Geography",
      "Economics",
      "Psychology",
      "Sociology",
      "Philosophy",
      "Literature",
      "Health Education",
      "Civics",
      "Government",
      "Environmental Science",
      "Geology",
      "Drama",
      "Media Studies",
      "Information Technology",
      "Other"
    ]
  },
  {
    category: "survival-skills",
    skills: [
      "Fire-Making",
      "Shelter Building",
      "Water Procurement",
      "Foraging and Edible Plant Identification",
      "Navigation",
      "First Aid and Medical Skills",
      "Knot Tying",
      "Hunting and Trapping",
      "Signal Communication",
      "Wilderness Navigation",
      "Fishing",
      "Campcraft",
      "Knife Skills",
      "Basic DIY Repairs",
      "Wildlife Awareness",
      "Cold Weather Survival",
      "Hot Weather Survival",
      "Emergency Shelter Improvisation",
      "Rope and Cordage Skills",
      "Mental Resilience",
      "Other"
    ]
  },
  {
    category: 'high-income',
    skills: [
      "Software Development/Programming",
      "Data Science and Analytics",
      "Artificial Intelligence/Machine Learning",
      "Digital Marketing",
      "Sales and Negotiation",
      "Copywriting and Content Marketing",
      "Graphic Design and Multimedia",
      "Video Editing and Production",
      "Web Design and Development",
      "Mobile App Development",
      "Cybersecurity and Ethical Hacking",
      "Financial Analysis and Investment Management",
      "Project Management",
      "UI/UX Design",
      "Photography/Videography",
      "Social Media Marketing and Management",
      "Search Engine Optimization (SEO)",
      "Online Course Creation/Instructional Design",
      "E-commerce and Dropshipping",
      "Real Estate Investing and Sales",
      "Cryptocurrency and Blockchain Development",
      "Management Consulting",
      "Voiceover and Audio Production",
      "Personal Branding and Influencer Marketing",
      "Public Speaking and Presentation Skills",
      "Coaching and Training",
      "Health and Wellness Coaching",
      "Software Testing and Quality Assurance",
      "Business Strategy and Planning",
      "Mobile Game Development",
      "Network and Systems Administration",
      "Renewable Energy Technology",
      "Environmental Engineering and Sustainability Consulting",
      "Biotechnology and Bioinformatics",
      "User Research and Usability Testing",
      "Data Engineering and Database Administration",
      "Aviation and Aircraft Maintenance",
      "Industrial Automation and Robotics",
      "Legal Consulting and Intellectual Property Law",
      "User Experience Research and Design",
      "Crisis Management and Security Consulting",
      "Solar Energy Technology and Installation",
      "3D Modeling and Animation",
      "Event Management and Planning",
      "Leadership Development and Training",
      "Market Research and Data Analysis",
      "Fitness and Personal Training",
      "Foreign Language Translation and Interpretation",
      "Human Resources Management",
      "Online Business Coaching and Entrepreneurship",
      "Prompt Engineering",
      "Other"
    ]
  },
  {
    category: "coding",
    skills: [
      "Web Development",
      "Mobile App Development",
      "Data Science and Analytics",
      "Artificial Intelligence/Machine Learning",
      "Game Development",
      "Front-end Development",
      "Back-end Development",
      "Full-stack Development",
      "DevOps",
      "Database Development and Management",
      "Cloud Computing and Serverless",
      "Embedded Systems and IoT (Internet of Things)",
      "Blockchain Development",
      "Cybersecurity and Ethical Hacking",
      "Test Automation and Quality Assurance",
      "Robotics Programming",
      "Augmented Reality (AR) and Virtual Reality (VR) Development",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "Algorithm Development and Optimization",
      "GUI (Graphical User Interface) Development",
      "Scripting and Automation",
      "Operating System Development",
      "Mobile Game Development",
      "Data Visualization",
      "Geospatial Programming (GIS)",
      "Bioinformatics and Computational Biology",
      "Financial Programming",
      "Cryptography and Security Programming",
      "Web Scraping and Data Mining",
      "Other"
    ]
  },
  {
    category: 'cooking',
    skills: [
      "Baking",
      "Desserts and Pastry",
      "Cooking Basics and Techniques",
      "International Cuisine",
      "Healthy and Nutritious Cooking",
      "Vegetarian and Vegan Cooking",
      "Grilling and Barbecue",
      "Soups and Stews",
      "Pasta and Noodles",
      "Seafood",
      "Meat and Poultry",
      "Salads and Dressings",
      "Breakfast and Brunch",
      "Appetizers and Snacks",
      "Side Dishes",
      "Beverages and Cocktails",
      "Slow Cooker and Crockpot Recipes",
      "Pressure Cooker and Instant Pot Recipes",
      "One-Pot Meals",
      "Gluten-Free Cooking",
      "Dairy-Free Cooking",
      "Budget-Friendly Meals",
      "Family-Friendly Recipes",
      "Gourmet and Fine Dining",
      "Holiday and Seasonal Cooking",
      "Comfort Foods",
      "Fusion and Experimental Cooking",
      "Quick and Easy Recipes",
      "Breads and Rolls",
      "Cakes and Cupcakes",
      "Cookies and Brownies",
      "Pies and Tarts",
      "Ice Cream and Frozen Desserts",
      "Chocolate and Confections",
      "Grains and Rice Dishes",
      "Cheese and Dairy Dishes",
      "Pickling and Fermentation",
      "Preserves and Jams",
      "Dressings and Sauces",
      "Canning and Food Preservation",
      "Other"
    ]
  },
  {
    category: "video-games",
    skills: [
      "Action",
      "Adventure",
      "Role-Playing Games (RPG)",
      "First-Person Shooter (FPS)",
      "Third-Person Shooter (TPS)",
      "Platformer",
      "Puzzle",
      "Strategy",
      "Simulation",
      "Sports",
      "Racing",
      "Fighting",
      "Horror",
      "Survival",
      "Stealth",
      "Open-World",
      "Sandbox",
      "Massively Multiplayer Online (MMO)",
      "Battle Royale",
      "Real-Time Strategy (RTS)",
      "Turn-Based Strategy (TBS)",
      "Visual Novel",
      "Educational",
      "Music and Rhythm",
      "Casual and Hyper-Casual",
      "Tactical Shooter",
      "Metroidvania",
      "Beat 'em up",
      "Card and Board Games",
      "Party Games",
      "Cooperative Games (Co-op)",
      "Competitive Games",
      "Sports Simulation",
      "Roguelike and Roguelite",
      "Racing Simulation",
      "Horror Adventure",
      "Mystery and Detective",
      "Exploration",
      "Science Fiction (Sci-Fi)",
      "Fantasy",
      "Historical",
      "Superhero",
      "Anime and Manga",
      "Steampunk",
      "Cyberpunk",
      "Post-Apocalyptic",
      "Western",
      "Military",
      "Space",
      "Medieval",
      "Other"
    ]
  },
  {
    category: "gym",
    skills: [
      "Cardio Equipment: Treadmills, Stationary Bikes, Ellipticals, etc.",
      "Strength Training: Free Weights, Weight Machines, Resistance Bands, etc.",
      "Group Fitness Classes: Yoga, Zumba, Spinning, Pilates, etc.",
      "Functional Training: TRX, Kettlebells, Medicine Balls, etc.",
      "CrossFit: High-Intensity Functional Fitness Workouts.",
      "Circuit Training: Rotating through various exercise stations.",
      "Bodyweight Training: Calisthenics, Bodyweight Exercises.",
      "HIIT (High-Intensity Interval Training): Intense, Short Workouts.",
      "Powerlifting: Squats, Bench Press, Deadlifts.",
      "Olympic Weightlifting: Clean and Jerk, Snatch.",
      "Cardio Kickboxing: Cardio and Kickboxing Techniques.",
      "Dance Fitness: Dance-Based Workouts.",
      "Aqua Fitness: Workouts in the Water.",
      "Stretching and Flexibility: Yoga, Pilates, Stretching Routines.",
      "Spin Cycling: Indoor Cycling Workouts.",
      "Boot Camp: Intensive Group Workouts.",
      "Martial Arts: Karate, Taekwondo, Jiu-Jitsu, etc.",
      "Swimming: Pool Workouts.",
      "Bodybuilding: Focused on Muscle Development.",
      "Rowing: Rowing Machine Workouts.",
      "Senior Fitness: Tailored for Older Adults.",
      "Boxing: Boxing Workouts and Techniques.",
      "Core Strengthening: Abdominal and Core Exercises.",
      "Barre Fitness: Ballet-Inspired Workouts.",
      "Suspension Training: TRX and Similar Systems.",
      "Plyometrics: Explosive, Jumping Exercises.",
      "Spinning: Indoor Cycling with Music and Motivation.",
      "Sports-Specific Training: Focused on Specific Sports.",
      "Pilates: Core-Strengthening Exercises.",
      "Yoga: Mind-Body Practices and Poses.",
      "Other"
    ]
  },
  {
    category: "social-media",
    skills: [
      "Social Networking Platforms: Facebook, Twitter, LinkedIn, etc.",
      "Photo and Video Sharing: Instagram, Snapchat, TikTok, etc.",
      "Microblogging: Twitter, Tumblr, etc.",
      "Professional Networking: LinkedIn, Xing, etc.",
      "Social Bookmarking: Pinterest, Flipboard, etc.",
      "Live Streaming: Facebook Live, Instagram Live, Twitch, etc.",
      "Messaging Apps: WhatsApp, Facebook Messenger, WeChat, etc.",
      "Discussion Forums: Reddit, Quora, etc.",
      "Video Sharing and Hosting: YouTube, Vimeo, etc.",
      "Blogging and Microblogging: Tumblr, Blogger, etc.",
      "Review and Recommendation Platforms: Yelp, TripAdvisor, etc.",
      "Location-Based Social Networking: Foursquare, Swarm, etc.",
      "Social News and Aggregation: Reddit, Digg, etc.",
      "Social Gaming: Facebook Games, Steam, etc.",
      "Dating Apps: Tinder, Bumble, etc.",
      "Interest-Based Social Networks: Goodreads, Strava, etc.",
      "Lifestyle and Hobby Communities: Meetup, MyFitnessPal, etc.",
      "Professional Portfolio and Creative Platforms: Behance, Dribbble, etc.",
      "Audio and Podcast Platforms: SoundCloud, Spotify, etc.",
      "Niche Social Media Platforms: Amino, Wattpad, etc.",
      "Other"
    ]
  },
  {
    category: "fighting",
    skills:[
      "Boxing: Punching and Defensive Techniques.",
      "Karate: Striking and Blocking Techniques.",
      "Taekwondo: High Kicks and Fast Strikes.",
      "Brazilian Jiu-Jitsu (BJJ): Ground Grappling and Submission Holds.",
      "Judo: Throws and Takedowns.",
      "Muay Thai: Elbow and Knee Strikes, Clinching.",
      "Kickboxing: Kicking and Punching Techniques.",
      "Mixed Martial Arts (MMA): A Combination of Various Fighting Styles.",
      "Wrestling: Takedowns and Ground Control.",
      "Capoeira: Acrobatic and Dance-Like Movements.",
      "Kung Fu: Various Chinese Martial Arts Styles.",
      "Krav Maga: Practical Self-Defense Techniques.",
      "Savate: French Kickboxing with Shoes.",
      "Eskrima/Kali/Arnis: Filipino Stick and Knife Fighting.",
      "Sambo: Russian Martial Art with Throws and Groundwork.",
      "Wing Chun: Close-Range Striking and Trapping.",
      "Hapkido: Joint Locks and Throws.",
      "Aikido: Redirecting the Opponent's Energy.",
      "Shotokan: Traditional Japanese Karate.",
      "Systema: Russian Martial Art with Emphasis on Fluidity and Adaptability.",
      "Other"
    ]
  },
  {
    category: "social-skills",
    skills: [
      "Communication Skills",
      "Emotional Intelligence",
      "Empathy and Compassion",
      "Conflict Resolution",
      "Interpersonal Skills",
      "Assertiveness and Boundary Setting",
      "Active Listening",
      "Collaboration and Teamwork",
      "Social Awareness",
      "Problem-Solving and Decision Making",
      "Self-Awareness and Self-Reflection",
      "Adaptability and Flexibility",
      "Leadership and Influence",
      "Networking and Relationship Building",
      "Emotional Regulation",
      "Empathetic Communication",
      "Resilience and Coping Skills",
      "Social Confidence",
      "Cross-Cultural Communication",
      "Social Etiquette and Manners",
      "Other"
    ]
  },
  {
    category: 'self-improvement',
    skills: [
      "Goal Setting",
      "Time Management",
      "Productivity",
      "Mindfulness and Meditation",
      "Emotional Intelligence",
      "Personal Growth and Development",
      "Self-Reflection",
      "Positive Thinking and Gratitude",
      "Stress Management",
      "Communication Skills",
      "Confidence Building",
      "Resilience",
      "Healthy Habits",
      "Financial Management",
      "Physical Fitness and Health",
      "Sleep Optimization",
      "Learning and Skill Development",
      "Creativity and Innovation",
      "Relationship Building",
      "Personal Effectiveness",
      "Other"
    ]
  },
  {
    category: 'mindfulness',
    skills:[
      "Mindful Breathing",
      "Body Scan",
      "Meditation",
      "Mindful Eating",
      "Mindful Walking",
      "Mindful Yoga",
      "Mindful Listening",
      "Loving-Kindness Meditation",
      "Mindful Observation",
      "Mindful Journaling",
      "Mindful Communication",
      "Mindful Self-Compassion",
      "Mindful Stress Reduction",
      "Mindful Parenting",
      "Mindful Digital Detox",
      "Mindful Gratitude",
      "Mindful Interactions",
      "Mindful Work",
      "Mindful Sleep",
      "Mindful Appreciation",
      "Other"
    ]
  }
 
] 

const learningTechniques = 
[
  {
    "title": "Exam Past Paper Technique",
    "whatIs": "The Exam Past Paper Technique involves obtaining and working through previous years' exam papers that are related to the subject you're studying. These papers could come from a variety of sources, such as textbooks, teachers, online repositories, or educational institutions. By solving these papers under timed conditions, you gain insights into the exam's structure, question patterns, and the depth of knowledge required.",
    "howUse": [
      "Gather Materials: Collect a selection of past exam papers relevant to your subject. These can often be found online or obtained from teachers.",
      "Simulate Exam Conditions: Find a quiet, distraction-free environment to work in. Set a timer to match the allotted time for the actual exam.",
      "Solve the Paper: Start working on the exam paper as if you were taking the real test. Answer questions, solve problems, and write essays according to the instructions.",
      "Self-Assessment: Once the time is up, review your answers. Compare them to the model answers if available. Identify areas where you've made mistakes or need improvement.",
      "Analyze Patterns: Look for patterns in the types of questions that appear frequently, as well as the format of the questions. This can help you anticipate what to expect in the actual exam.",
      "Identify Weaknesses: Take note of the topics or types of questions where you struggled. These are the areas you need to focus on during your further study sessions.",
      "Review and Improve: Use the feedback from your self-assessment to review the topics you found challenging. Study the relevant material and practice similar questions until you feel confident.",
      "Repeat the Process: Regularly practice with different past papers to reinforce your understanding, track your progress, and refine your time management skills."
    ],
    "benefits": [
      "Familiarity: You become familiar with the structure, format, and nature of questions in the actual exam.",
      "Time Management: Practicing under timed conditions improves your ability to manage time effectively during the real exam.",
      "Identification of Weaknesses: You can identify your areas of weakness and target them for improvement.",
      "Confidence Boost: As you successfully answer past exam questions, your confidence in your knowledge and abilities increases.",
      "Adaptation: You learn to adapt your study strategies based on the types of questions that typically appear.",
      "Progress Tracking: Regular practice with past papers allows you to track your improvement over time.",
      "Comprehensive Preparation: The technique provides a comprehensive approach to studying by covering various question types and topics.",
      "Reduced Exam Anxiety: Familiarity with the exam format and content can help reduce anxiety during the actual exam."
    ]
  },
  {
    "title": "Active Recall Technique",
    "whatIs": "The Active Recall Technique is a potent study method that focuses on actively engaging with the material to improve memory retention and enhance learning. It centers around the idea that actively recalling information from memory is more effective for long-term understanding than passive re-reading or reviewing. This process forces your brain to retrieve information from your memory, strengthening neural connections and making the information more accessible.",
    "howUse": [
      "Study Actively: Instead of merely reading through notes or textbooks, study actively by covering up the content and trying to recall key points, concepts, or details.",
      "Question-Answer Format: Convert your study material into questions. Then, attempt to answer those questions from memory. This simulates the way you'll need to retrieve information during exams.",
      "Use Flashcards: Create flashcards with questions on one side and answers on the other. Regularly go through the flashcards, answering the questions before flipping them to check your accuracy.",
      "Spacing and Repetition: Space out your active recall sessions over time. Revisit the same material at increasing intervals to strengthen memory retention. Tools like spaced repetition apps can help with this.",
      "Variation: Change the order of questions or rephrase them to prevent relying on memorizing a specific order of information. This promotes deeper understanding.",
      "Testing Effect: The process of actively recalling information replicates the testing effect, where being tested on material leads to better retention than passive studying.",
      "Feedback and Correction: After attempting to recall, check the correct answers. Pay attention to where you made mistakes or had difficulty, and focus more on those areas during subsequent study sessions.",
      "Apply to Real-World Examples: Whenever possible, relate the information you're studying to real-world examples or experiences. This aids in making the material more memorable and relatable."
    ],
    "benefits": [
      "Improved Retrieval Strength: The more you actively recall information, the stronger your memory pathways become, making it easier to recall the information later.",
      "Efficient Learning: Active recall requires more effort than passive reading, leading to deeper understanding and efficient learning.",
      "Long-Term Retention: The technique promotes long-term retention of knowledge due to the enhanced neural connections.",
      "Effective Study Sessions: Active recall makes study sessions more engaging and productive, maximizing the value of your study time.",
      "Enhanced Problem Solving: The technique helps you apply learned concepts to various scenarios, improving your ability to solve problems.",
      "Adaptability: Actively recalled information is easier to adapt to different contexts, enhancing your flexibility in using your knowledge.",
      "Enhanced Critical Thinking: Engaging with the material actively encourages critical thinking and a deeper exploration of concepts.",
    ]
  },
  {
    "title": "Feynman Technique",
    "whatIs": "The Feynman Technique is a learning strategy that focuses on simplifying complex concepts to deepen understanding and accelerate the learning process. Named after physicist Richard Feynman, this technique involves breaking down difficult topics into simpler terms and explaining them as if you were teaching someone else.",
    "howUse": [
      "Choose a Concept: Select a topic, idea, or concept you want to learn better. This could be a scientific principle, historical event, mathematical theorem, or any subject you find challenging.",
      "Explain in Simple Terms: Pretend you're teaching the chosen concept to a complete novice who has no prior knowledge of the subject. Use plain language, analogies, and simple examples to explain the idea step by step.",
      "Identify Gaps and Clarify: While explaining, you may encounter areas where your understanding falters or your explanation becomes confusing. These gaps in your knowledge highlight areas that need further study and clarification.",
      "Study and Simplify Further: Return to your learning materials, textbooks, or resources and delve deeper into the areas where you identified gaps. Break down complex information into simpler terms, using analogies and examples to make connections and enhance comprehension."
    ],
    "benefits": [
      "Deep Understanding: The technique forces you to truly understand the material before moving on.",
      "Efficient Learning: Simplifying concepts makes them more memorable and easier to grasp, leading to faster learning.",
      "Identifying Gaps: The gaps in your explanations highlight areas where further study is needed.",
      "Long-Term Retention: By focusing on understanding over rote memorization, you're more likely to remember the information in the long run.",
      "Enhanced Critical Thinking: The technique encourages you to grasp the 'why' behind concepts, enhancing your critical thinking and problem-solving skills.",
      "Active Engagement: Explaining concepts actively engages you with the material, promoting a deeper connection.",
      "Effective Communication: The ability to simplify complex ideas is a valuable skill that can improve your communication abilities.",
      "Continuous Improvement: Revisiting and refining your explanations helps you iteratively deepen your understanding."
    ]
  },
  {
    "title": "Pomodoro Technique",
    "whatIs": "The Pomodoro Technique is a time management method designed to enhance productivity and focus by breaking work or study sessions into intervals of focused work followed by short breaks. Developed by Francesco Cirillo, the technique aims to improve concentration, reduce burnout, and increase overall efficiency.",
    "howUse": [
      "Choose a Task: Select a task or topic you want to study or work on.",
      "Set a Timer: Set a timer for 25 minutes (one Pomodoro) and start working on the task with full focus.",
      "Work Intensely: During the Pomodoro, give your complete attention to the task, avoiding distractions and interruptions.",
      "Take a Short Break: When the timer goes off, take a 5-minute break. Use this time to relax, stretch, or do something enjoyable to recharge.",
      "Repeat the Cycle: Begin another Pomodoro session, working on the task again for 25 minutes. After completing four Pomodoros, take a longer break of 15-30 minutes.",
      "Track Progress: Keep track of completed Pomodoros. This can motivate you to stay focused and provide a sense of accomplishment."
    ],
    "benefits": [
      "Enhanced Focus: Breaking work into short intervals improves focus and prevents burnout.",
      "Time Management: The technique encourages better time allocation for tasks.",
      "Reduced Procrastination: Knowing that a break is coming can help you avoid procrastination.",
      "Incremental Progress: Even challenging tasks become manageable in short intervals.",
      "Preventing Overwhelm: Breaking tasks into smaller parts reduces feelings of overwhelm.",
      "Improved Efficiency: Alternating between work and breaks helps you stay refreshed and maintain high productivity.",
      "Enhanced Learning: Applying the technique to studying optimizes your learning process and understanding.",
      "Adaptable: You can adjust the Pomodoro durations based on your preference and task requirements."
    ]
  },
  {
    "title": "5-Second Technique",
    "whatIs": "The 5-Second Technique is a simple yet effective learning method that involves taking a brief 5-second break immediately after studying a single lesson or piece of information. This short break allows your brain to process the information and can lead to faster learning and improved retention.",
    "howUse": [
      "Learn a Lesson: Study a lesson or piece of information with focus and intent.",
      "Pause for 5 Seconds: As soon as you finish studying the material, pause for a mere 5 seconds. During this break, refrain from any mental or physical activity.",
      "Do Nothing: The key during these 5 seconds is to do absolutely nothing. Let your mind rest and absorb the information you just learned.",
      "Proceed to the Next Lesson: After the 5-second pause, continue with your learning routine, whether that's moving on to the next lesson, practicing problems, or reviewing notes."
    ],
    "benefits": [
      "Memory Consolidation: The short break allows your brain to consolidate and process the information you just studied, enhancing memory retention.",
      "Reduced Overload: Micro-breaks prevent cognitive overload by giving your brain a moment to rest and absorb before moving on to new material.",
      "Faster Learning: By providing your brain with short pauses for reflection, you can potentially accelerate the learning process.",
      "Enhanced Focus: Knowing a brief break is imminent can improve your focus during the learning phase.",
      "Improved Comprehension: This technique can aid in better understanding complex or challenging concepts.",
      "Adaptable Approach: You can experiment with the length of these breaks, making them slightly longer or shorter depending on your preference.",
      "Effective Review: Longer breaks between study sessions can be used for review and reflection, reinforcing your understanding."
    ]
  },
  {
    "title": "Blurring Method",
    "whatIs": "The Blurring Method is a learning technique that involves repeated exposure to information with slight variations. This technique leverages the principles of spaced repetition and deliberate practice to accelerate learning and improve memory retention. It's a versatile approach that can be applied to various types of learning materials.",
    "howUse": [
      "Select the Material: Choose the piece of information you want to learn or remember. This could be a definition, a concept, a mathematical formula, or any type of content.",
      "Repeat with Variation: Start by reviewing the material in its original form. Then, introduce a slight variation. This could involve rephrasing, using synonyms, changing the order of elements, or applying the information in a different context.",
      "Repeat Again: After introducing the variation, repeat the process with the original material once more. This reinforces the initial learning while allowing your brain to adapt to the variation.",
      "Continue Iteratively: Repeat the cycle of exposure to the original and varied versions of the material at spaced intervals. Gradually increase the time between repetitions to align with the principles of spaced repetition."
    ],
    "benefits": [
      "Enhanced Understanding: The variations encourage your brain to process the material more deeply, leading to better comprehension.",
      "Improved Retention: The repeated exposure, coupled with variations, strengthens memory pathways, making the information easier to recall.",
      "Adaptive Learning: The technique allows you to grasp the material from different angles, fostering adaptability in applying knowledge.",
      "Active Engagement: The process of recognizing variations and connecting them to the original material keeps you actively engaged with the content.",
      "Efficient Use of Time: By integrating repetition and variation, you make the most of your study time, promoting effective learning.",
      "Enhanced Problem Solving: The ability to understand and apply concepts from various perspectives enhances your problem-solving skills.",
      "Deeper Insights: Analyzing variations can provide deeper insights into the nuances and applications of the material.",
      "Versatility: The Blurring Method can be applied to a wide range of subjects and types of learning materials."
    ]
  },
  {
    "title": "Association Technique",
    "whatIs": "The Association Technique is a mnemonic strategy that leverages the power of connecting new information with existing knowledge or memorable cues. By creating strong mental associations between unrelated concepts, you can accelerate learning and improve memory retention. This method capitalizes on the brain's natural inclination to remember vivid and interconnected information.",
    "howUse": [
      "Identify New Information: Determine the information you want to learn. It could be facts, terms, concepts, or any type of content.",
      "Choose Associations: Select existing knowledge or memorable cues that are already stored in your mind. These could be personal experiences, vivid imagery, pop culture references, or anything that sticks out to you.",
      "Create Associations: Form connections between the new information and your chosen associations. This can involve creating vivid mental images, crafting analogies, or weaving the new material into a story involving the memorable cues.",
      "Review and Reinforce: Regularly revisit the associations you've created. With repetition, the connections will become stronger and more ingrained in your memory.",
      "Practice Retrieval: Test your memory by recalling the associations and the linked information. This reinforces the connections and enhances long-term retention."
    ],
    "benefits": [
      "Enhanced Memorization: Strong associations create powerful memory triggers, making it easier to recall the linked information.",
      "Personalization: You can tailor associations to your own experiences and interests, increasing their effectiveness.",
      "Active Engagement: Creating mental connections requires active engagement, promoting better understanding of the material.",
      "Efficiency: By using existing mental cues, you streamline the learning process and optimize memory recall.",
      "Improved Comprehension: Forming associations helps you see relationships and connections within the content.",
      "Versatility: The Association Technique can be applied to a wide range of subjects and types of learning materials.",
      "Creative Thinking: Developing associations fosters creative thinking as you link seemingly unrelated concepts.",
      "Long-Term Retention: The strong memory triggers established by associations contribute to better long-term retention."
    ]
  },
  {
    "title": "Evenly Distribute Technique",
    "whatIs": "The Evenly Distribute Technique, often referred to as spaced repetition or spaced practice, is a powerful learning strategy that involves reviewing and practicing material at regular intervals over time. This technique capitalizes on the spacing effect, which suggests that information is better retained when it's revisited periodically rather than through massed cramming.",
    "howUse": [
      "Divide Material: Break the material you need to learn into manageable sections, such as chapters, topics, or concepts.",
      "Create a Schedule: Plan a study schedule that allows you to review each section at spaced intervals. The intervals can range from hours to days or weeks, depending on the complexity of the material.",
      "First Review: Start by studying the first section. Focus on understanding the core concepts and ideas.",
      "Review at Intervals: After the initial review, revisit the same material at regular intervals, spacing the sessions apart. Each subsequent review strengthens your memory.",
      "Active Recall: During each review, practice active recall by attempting to recall the material without looking at your notes. This reinforces memory retention.",
      "Gradually Expand Intervals: As you become more confident in your recall, gradually increase the intervals between reviews. This aligns with the spacing effect's principles."
    ],
    "benefits": [
      "Improved Retention: Regularly revisiting the material enhances memory consolidation, leading to better long-term retention.",
      "Long-Term Learning: Spaced repetition promotes learning that lasts, as opposed to short-term memorization.",
      "Reduced Forgetting: The technique counteracts the forgetting curve, where information is forgotten rapidly without repetition.",
      "Optimized Study Time: By focusing on spaced intervals, you make the most of your study time and avoid last-minute cramming.",
      "Deeper Understanding: Repetition with spacing allows you to grasp the material at a deeper level.",
      "Enhanced Problem Solving: Spaced repetition encourages critical thinking and application of knowledge in different contexts.",
      "Adaptive Learning: Regular review allows you to adapt and apply the material in various scenarios.",
      "Increased Confidence: The technique boosts your confidence in your understanding and recall of the material."
    ]
  },
  {
    "title": "Chunking Learning Technique",
    "whatIs": "The Chunking Learning Technique is a cognitive strategy that involves breaking down complex information into smaller, organized groups or 'chunks.' By organizing information into meaningful clusters, you can improve memory retention and learning speed. This technique leverages the brain's capacity to handle a limited amount of information at once and enhances your ability to process and understand material efficiently.",
    "howUse": [
      "Identify Content: Determine the content you need to learn, such as a list of facts, a sequence of steps, or data points.",
      "Divide into Chunks: Break the content into smaller, manageable chunks. These could be related concepts, steps in a process, or key terms.",
      "Grouping Logic: Organize the chunks based on logical connections or patterns. Create groups that make sense to you, aiding recall.",
      "Understand Each Chunk: Focus on understanding the meaning and significance of each chunk. This promotes deeper comprehension.",
      "Practice Active Recall: Test yourself by trying to recall the information within each chunk without looking at your notes.",
      "Review and Repeat: Regularly review the chunks you've created. Over time, your brain will develop stronger memory connections."
    ],
    "benefits": [
      "Enhanced Memory: Chunks are easier to remember than individual pieces of information.",
      "Faster Learning: Chunking speeds up the learning process by focusing on meaningful clusters.",
      "Reduced Cognitive Load: Organized chunks lower cognitive load, making it easier to process information.",
      "Improved Comprehension: By understanding the relationships between chunks, you gain a better grasp of the material.",
      "Effective Recall: Chunking promotes more effective recall during tests or application of knowledge.",
      "Adaptive Learning: Chunking allows you to apply the technique to various subjects and types of information.",
      "Visual Representation: Chunking can be supported by visual aids like diagrams or mind maps to enhance understanding.",
      "Application: Use chunking to study vocabulary, mathematical formulas, historical events, and more."
    ]
  },
  {
    "title": "Second Brain Technique",
    "whatIs": "The Second Brain Technique, also known as external brain or external cognition, is a method of enhancing learning by utilizing external tools, such as notebooks, digital apps, or organizational systems, to store and organize information. This approach offloads cognitive load from your mind, allowing you to focus on comprehension and critical thinking. It leverages the idea that an organized external repository serves as a 'second brain' to support your learning process. This technique is especially valuable for managing complex information, projects, or tasks.",
    "howUse": [
      "Choose Your Tools: Select the tools you'll use for your 'second brain.' These could include note-taking apps, digital notebooks, task management tools, or physical notebooks.",
      "Capture Information: As you learn, read, or research, use your chosen tools to capture important points, ideas, summaries, quotes, or any relevant information.",
      "Organize and Categorize: Create a system for organizing the captured information. This might involve using tags, folders, categories, or other organizational structures.",
      "Link and Connect: Establish connections between related pieces of information within your second brain. This can help you see patterns and relationships.",
      "Review and Revise: Regularly revisit and review your second brain to reinforce your memory and keep the information fresh.",
      "Search and Retrieve: When you need to recall specific information, use the search or navigation features of your tools to retrieve it quickly."
    ],
    "benefits": [
      "Reduced Cognitive Load: Offloading information to external tools frees up mental resources for understanding and critical thinking.",
      "Efficient Organization: The second brain method allows for structured organization and easy retrieval of information.",
      "Long-Term Retention: Regular review and organization support long-term memory retention.",
      "Adaptive Learning: You can adapt your second brain to various subjects or projects, enhancing versatility in your learning.",
      "Enhanced Focus: By not relying on memory, you can focus more intently on understanding and analyzing content.",
      "Personalization: Tailor your second brain's organization and tools to match your learning preferences.",
      "Workflow Optimization: Apply the second brain technique to manage tasks, projects, and personal notes effectively.",
      "Minimized Overwhelm: Complex subjects become more manageable with organized external resources."
    ]
  },
  {
    "title": "Inversion Learning Technique",
    "whatIs": "The Inversion Learning Technique is a cognitive strategy that involves approaching a topic or problem by flipping it around and looking at it from the opposite perspective. This technique encourages critical thinking, creative problem-solving, and a deeper understanding of complex subjects. By examining the reverse side of a concept, you can uncover hidden insights and gain a more comprehensive grasp of the material.",
    "howUse": [
      "Identify the Topic: Choose a concept, theory, or problem you want to deepen your understanding of.",
      "State the Reverse: Define the opposite or reverse scenario of the chosen topic. What would happen if the situation were inverted?",
      "Analyze Implications: Consider the implications, consequences, and insights that arise from the reversed perspective. What new insights emerge?",
      "Contrast with Reality: Compare and contrast the real scenario with the inverted scenario. This can lead to a more comprehensive understanding of the subject.",
      "Ask Questions: Generate questions that challenge the assumptions of the original concept based on the insights from inversion.",
      "Apply Insights: Apply the insights gained from inversion to your study or problem-solving process. This can lead to a more creative and comprehensive approach."
    ],
    "benefits": [
      "Deeper Understanding: Inversion prompts you to explore a subject from multiple angles, leading to a more holistic comprehension.",
      "Creative Thinking: This technique fosters creative problem-solving and thinking outside the box.",
      "Enhanced Critical Analysis: By examining assumptions and implications, you refine your critical analysis skills.",
      "Uncover Hidden Insights: Inversion often reveals insights that are not readily apparent from the conventional perspective.",
      "Adaptive Learning: Applying inversion to different subjects enhances your adaptability and diverse thinking.",
      "Improved Problem Solving: Inversion equips you with a tool to approach complex problems from unconventional angles.",
      "Enhanced Synthesis: The technique helps you synthesize information from different perspectives, leading to richer understanding.",
      "Versatility: Inversion is applicable across various subjects and scenarios, making it a versatile skill.",
      "Cognitive Agility: Regular use of inversion enhances your cognitive flexibility and agility."
    ]
  },
  {
    "title": "Changing Environments Technique",
    "whatIs": "The Changing Environments Technique is a learning strategy that involves studying or practicing in different physical environments. By altering your study setting, you can enhance memory recall, deepen comprehension, and accelerate learning. This technique leverages the context-dependent memory phenomenon, where information is better remembered in the same environment where it was learned.",
    "howUse": [
      "Identify Material: Choose the content or subject you want to learn or practice.",
      "Select Environments: Identify multiple environments where you can study or practice. These could include different rooms, libraries, cafes, parks, or any other settings.",
      "Assign Content to Environments: Distribute the content you're learning across the different environments. For example, you might study a specific topic in one location and another topic in a different location.",
      "Rotate Locations: Rotate between the selected environments for your study sessions. Assign different subjects or topics to each environment.",
      "Activate Sensory Cues: Each environment has unique sensory cues (smells, sounds, visuals) that associate with the material. These cues aid recall when encountered later.",
      "Review and Repeat: After studying in different environments, review the material in any location to reinforce your memory."
    ],
    "benefits": [
      "Enhanced Memory Recall: Associating material with different environments strengthens memory retrieval cues.",
      "Deeper Comprehension: Varying settings enhances your ability to view material from different perspectives.",
      "Faster Learning: The technique accelerates learning by utilizing context-dependent memory cues.",
      "Avoiding Plateaus: Changing environments combats boredom or plateaus in learning productivity.",
      "Versatile Application: This technique works well for diverse subjects, tasks, and types of learning.",
      "Adaptive Thinking: By changing settings, you develop adaptability and the ability to learn in various contexts.",
      "Improved Focus: Novel environments can help break monotony and maintain focus during study sessions.",
      "Memory Consolidation: Revisiting material in different environments enhances memory consolidation and recall."
    ]
  },
  {
    "title": "4-Step Technique",
    "whatIs": "The 4-Step Technique is a comprehensive learning strategy that involves engaging with study material through multiple sensory channels: reading silently, reading aloud, reciting without visual aid, and writing from memory. By incorporating visual, auditory, and kinesthetic modes of learning, this technique enhances memory retention, comprehension, and overall learning efficiency.",
    "howUse": [
      "Step 1: Read Silently: Begin by reading the material silently. Focus on comprehension and understanding of the content. Highlight key points or take brief notes if needed.",
      "Step 2: Read Aloud: Read the material aloud. Engaging your auditory sense adds an extra layer of reinforcement to the information. Pay attention to your pronunciation and intonation.",
      "Step 3: Recite Without Notes: Put your notes or study material aside and recite the information from memory. This step assesses how well you understand and remember the material.",
      "Step 4: Write From Memory: Without referring to your notes, write down what you've learned. This step strengthens memory pathways and enhances long-term retention."
    ],
    "benefits": [
      "Multisensory Engagement: Engaging different senses promotes deeper understanding and stronger memory connections.",
      "Active Involvement: Each step requires active participation, enhancing comprehension and retention.",
      "Layered Learning: The process of reading, speaking, reciting, and writing adds layers of reinforcement.",
      "Varied Cognitive Processing: Different cognitive processes are involved in each step, enhancing overall learning efficiency.",
      "Enhanced Recall: The combined effects of the four steps improve your ability to recall the material.",
      "Comprehensive Learning: The 4-step process covers various aspects of learning, from absorption to recall.",
      "Adaptive Learning: The technique can be adapted to different subjects, making it versatile.",
      "Transferable Skills: Skills learned from this technique, such as memory reinforcement, can apply to other areas."
    ]
  }
]

const dashboardData = [
  {
    title: "Learning Community",
    description: "Join vibrant discussions on diverse learning topics with fellow users. Share insights, grow together, and inspire learning journeys.",
    image: learningCommunity,
    button: "Coming soon",
  },
  {
    title: "Supercharge Your Learning: 3x Faster",
    description: "Accelerate your learning threefold. Explore easier, quicker ways to gain knowledge with our tool.",
    image : ai,
    button: "Start learning",
    link: "/categories"
  },
  {
    title: "SkillyFriend: Your Learning Ally",
    description: "Connect with SkillyFriend, your AI learning companion, for personalized learning advice and guidance on your educational journey.",
    image: skillyFriend,
    button: "Coming soon"
  }
]

const tutorialData = 
[
  { 
    video: tutorial,
    title: "Learn the basics",
    description: "Complete this quick, built-in tutorial to learn how to use Skillify at it's full potential."
  },
  {
    video: tutorial,
    title: "How credits work",
    description: "When you join our website, you'll kickstart your experience with 1000 credits. If your balance is less than 500, it will be topped up to 500 each day.",
  },
  { 
    video: generateLesson,
    title: "Generate lessons",
    description: "First thing first, learn how to generate lessons. Fill in the fields to generate your lesson.",
    cost: 100
  },
  { 
    video: editLesson,
    title: "Edit lessons",
    description: "Modify the lesson titles for the desired outcome."
  },
  { 
    video: lessonGenerated,
    title: "Generate content",
    description: "Open your tailored lesson, in order to start learning your chosen subject.",
    cost: 200
  },
  { 
    video: wordDefinition,
    title: "Get definition for words",
    description: "Confused about a specific key word? Simply click on it to generate its definition!"
  },
  { 
    video: flashcards,
    title: "Flashcards",
    description: "Ready to challenge your knowledge? Explore Skillify's flashcards!",
    cost: 200
  },
  { 
    video: getCredits,
    title: "Get credits",
    description: "Out of credits? Get 800 free credits by doing 4 simple tasks."
  },
  { 
    video: tool,
    title: "What are tools?",
    description: "Learning tools make studying easier, adapt to your needs, and help you complete some tasks faster.",
    cost: 200
  }
]

const universitySubjects = [
    "Business and Management",
    "Computer Science and Information Technology",
    "Medicine and Healthcare",
    "Engineering",
    "Social Sciences",
    "Natural Sciences",
    "Humanities",
    "Education",
    "Law",
    "Art and Design",
    "Environmental Science",
    "Mathematics",
    "Communication and Media Studies",
    "Agriculture and Environmental Studies",
    "Architecture"
  ]

  const languagesArray = [
    { label: "Afrikaans", value: "/auto/af" },
    { label: "Albanian", value: "/auto/sq" },
    { label: "Amharic", value: "/auto/am" },
    { label: "Arabic", value: "/auto/ar" },
    { label: "Armenian", value: "/auto/hy" },
    { label: "Assamese", value: "/auto/as" },
    { label: "Aymara", value: "/auto/ay" },
    { label: "Azerbaijani", value: "/auto/az" },
    { label: "Bambara", value: "/auto/bm" },
    { label: "Basque", value: "/auto/eu" },
    { label: "Belarusian", value: "/auto/be" },
    { label: "Bengali", value: "/auto/bn" },
    { label: "Bhojpuri", value: "/auto/bho" },
    { label: "Bosnian", value: "/auto/bs" },
    { label: "Bulgarian", value: "/auto/bg" },
    { label: "Catalan", value: "/auto/ca" },
    { label: "Cebuano", value: "/auto/ceb" },
    { label: "Chinese (Simplified)", value: "/auto/zh-CN" },
    { label: "Chinese (Traditional)", value: "/auto/zh-TW" },
    { label: "Corsican", value: "/auto/co" },
    { label: "Croatian", value: "/auto/hr" },
    { label: "Czech", value: "/auto/cs" },
    { label: "Danish", value: "/auto/da" },
    { label: "Dhivehi", value: "/auto/dv" },
    { label: "Dogri", value: "/auto/doi" },
    { label: "Dutch", value: "/auto/nl" },
    { label: "English", value: "/auto/en" },
    { label: "Esperanto", value: "/auto/eo" },
    { label: "Estonian", value: "/auto/et" },
    { label: "Ewe", value: "/auto/ee" },
    { label: "Filipino", value: "/auto/fil" },
    { label: "Finnish", value: "/auto/fi" },
    { label: "French", value: "/auto/fr" },
    { label: "Frisian", value: "/auto/fy" },
    { label: "Galician", value: "/auto/gl" },
    { label: "Gaelic (Scots)", value: "/auto/gd" },
    { label: "Galician", value: "/auto/gl" },
    { label: "German", value: "/auto/de" },
    { label: "Greek", value: "/auto/el" },
    { label: "Georgian", value: "/auto/ka" },
    { label: "Guarani", value: "/auto/gn" },
    { label: "Gujarati", value: "/auto/gu" },
    { label: "Haitian Creole", value: "/auto/ht" },
    { label: "Hausa", value: "/auto/ha" },
    { label: "Hawaiian", value: "/auto/haw" },
    { label: "Hebrew", value: "/auto/iw" },
    { label: "Hindi", value: "/auto/hi" },
    { label: "Hmong", value: "/auto/hmn" },
    { label: "Yiddish", value: "/auto/yi" },
    { label: "Igbo", value: "/auto/ig" },
    { label: "Ilocano", value: "/auto/ilo" },
    { label: "Indonesian", value: "/auto/id" },
    { label: "Irish", value: "/auto/ga" },
    { label: "Italian", value: "/auto/it" },
    { label: "Japanese", value: "/auto/ja" },
    { label: "Javanese", value: "/auto/jv" },
    { label: "Kannada", value: "/auto/kn" },
    { label: "Kazakh", value: "/auto/kk" },
    { label: "Kyrgyz", value: "/auto/ky" },
    { label: "Khmer", value: "/auto/km" },
    { label: "Kinyarwanda", value: "/auto/rw" },
    { label: "Konkani", value: "/auto/gom" },
    { label: "Krio", value: "/auto/kri" },
    { label: "Kurdish (Kurmanji)", value: "/auto/ku" },
    { label: "Kurdish (Sorani)", value: "/auto/ckb" },
    { label: "Lao", value: "/auto/lo" },
    { label: "Latin", value: "/auto/la" },
    { label: "Latvian", value: "/auto/lv" },
    { label: "Lingala", value: "/auto/ln" },
    { label: "Lithuanian", value: "/auto/lt"},
    {label: "Luganda", value: "/auto/lg"},
    { label: "Luxembourgish", value: "/auto/lb" },
  { label: "Macedonian", value: "/auto/mk" },
  { label: "Maithili", value: "/auto/mai" },
  { label: "Malay", value: "/auto/ms" },
  { label: "Malayalam", value: "/auto/ml" },
  { label: "Malagasy", value: "/auto/mg" },
  { label: "Maltese", value: "/auto/mt" },
  { label: "Maori", value: "/auto/mi" },
  { label: "Marathi", value: "/auto/mr" },
  { label: "Meiteilon (Manipuri)", value: "/auto/mni-Mtei" },
  { label: "Mizo", value: "/auto/lus" },
  { label: "Mongolian", value: "/auto/mn" },
  { label: "Dutch", value: "/auto/nl" },
  { label: "Nepali", value: "/auto/ne" },
  { label: "Norwegian", value: "/auto/no" },
  { label: "Odia (Oriya)", value: "/auto/or" },
  { label: "Oromo", value: "/auto/om" },
  { label: "Pashto", value: "/auto/ps" },
  { label: "Persian", value: "/auto/fa" },
  { label: "Polish", value: "/auto/pl" },
  { label: "Portuguese", value: "/auto/pt" },
  { label: "Punjabi", value: "/auto/pa" },
  { label: "Quechua", value: "/auto/qu" },
  { label: "Romanian", value: "/auto/ro" },
  { label: "Russian", value: "/auto/ru" },
  { label: "Samoan", value: "/auto/sm" },
  { label: "Sanskrit", value: "/auto/sa" },
  { label: "Scots Gaelic", value: "/auto/gd" },
  { label: "Serbian", value: "/auto/sr" },
  { label: "Sesotho", value: "/auto/st" },
  { label: "Shona", value: "/auto/sn" },
  { label: "Sindhi", value: "/auto/sd" },
  { label: "Sinhala (Sinhalese)", value: "/auto/si" },
  { label: "Slovak", value: "/auto/sk" },
  { label: "Slovenian", value: "/auto/sl" },
  { label: "Somali", value: "/auto/so" },
  { label: "Spanish", value: "/auto/es" },
  { label: "Sundanese", value: "/auto/su" },
  { label: "Swahili", value: "/auto/sw" },
  { label: "Swedish", value: "/auto/sv" },
  { label: "Tagalog (Filipino)", value: "/auto/tl" },
  { label: "Tajik", value: "/auto/tg" },
  { label: "Tamil", value: "/auto/ta" },
  { label: "Tatar", value: "/auto/tt" },
  { label: "Telugu", value: "/auto/te" },
  { label: "Thai", value: "/auto/th" },
  { label: "Chinese (Taiwan)", value: "/auto/zh-TW" },
  { label: "Turkish", value: "/auto/tr" },
  { label: "Turkmen", value: "/auto/tk" },
  { label: "Twi (Akan)", value: "/auto/ak" },
  { label: "Ukrainian", value: "/auto/uk" },
  { label: "Urdu", value: "/auto/ur" },
  { label: "Uyghur", value: "/auto/ug" },
  { label: "Uzbek", value: "/auto/uz" },
  { label: "Vietnamese", value: "/auto/vi" },
  { label: "Welsh", value: "/auto/cy" },
  { label: "Xhosa", value: "/auto/xh" },
  { label: "Yiddish", value: "/auto/yi" },
  { label: "Yoruba", value: "/auto/yo" },
  { label: "Zulu", value: "/auto/zu" }
];

const skillifyData = [
  {
    text: `Skillify redefines the learning experience, introducing an innovative learning that not only enriches your knowledge but also saves you precious time.
    We've discovered that many individuals face challenges when it comes to learning, making the process both difficult and time-consuming for them
    Recognizing this common struggle, Skillify has stepped in to transform the learning landscape. Through our innovative approach, we've making learning both enjoyable and also time efficient. Saving thousands of users precious time. 
    `,
    image: mission,
    title: "Our misssion"
  },
  {
    title: "Attention span",
    text: `In today's world, where attention spans are fleeting, Skillify emerges as a solution to 
    the concentration problem. Recognizing the challenge of maintaining focus, Skillify employs engaging
     lessons and interactive tools to captivate learners. By integrating dynamic content, gamified challenges, 
     and real-world simulations, Skillify ensures that every moment spent learning is both educational 
     and enthralling. Say goodbye to distraction and hello to sustained engagement. 
     Skillify not only equips you with valuable skills but also keeps you immersed in the learning process, 
     effectively overcoming the attention span hurdle prevalent in today's fast-paced environment
    `,
    image: attention

  }
]

const solutionsData = [
  {
    title: "Our lessons",
    text:`Experience Skillify's captivating lessons powered by the latest AI technology. 
    Our innovative lessons not only maximizes learning efficiency, 
    saving you time, but also ensures engagement. Enjoy top-notch education,
    where advanced learning meets affordability, 
    creating a seamless and enriching educational journey for everyone.`,
    image: catImgI,
  },
  {
    title: "Our tools",
    text: `Skillify's versatile tools transcend boundaries, 
    aiding you in everything from business plans and coding to cooking.
     With unique features like the document and youtube video summarizer, 
     effortlessly distill information from YouTube videos or any document. 
    Skillify empowers you with a comprehensive toolkit, ensuring success in diverse endeavors with ease`,
    image: catImgII
  },
  {
    title: "Our learning techniques",
    text: `Skillify's revolutionary learning techniques accelerate mastery by allowing users to 
    learn anything three times faster. Through adaptive learning, gamified challenges, 
    and dynamic content, Skillify optimizes the educational journey. 
    Unlock your potential with a transformative approach that propels you towards expertise at an 
    unprecedented pace`,
    image: catImgIII
  }
]

const communityData = [
  {
    title: "Our community",
    text: `Skillify's vibrant community comprises individuals who despise spending endless hours on 
    learning and value efficiency to reclaim more free time. United by a common goal, 
    our community leverages Skillify's innovative learning techniques to master skills swiftly. 
    Join a like-minded network where efficient learning isn't just a preference but a shared ethos, empowering members to achieve proficiency in less time and enjoy the freedom to pursue their passions. Skillify's community redefines learning as a means to enhance life, 
    emphasizing effectiveness and time-saving strategies for a more balanced and fulfilling existence.`,
    image: community
  },
  { 
    title: "Worldwide movement",
    text:`Skillify's transformative view of learning is spreading worldwide, enabling individuals globally to learn more efficiently. Breaking free from traditional constraints. Join the global movement, 
    revolutionizing education and making efficient learning accessible to everyone, everywhere!`,
    image: worldwide
  }
]

const moreData = [
  {
    title: "Our effort",
    text: `Skillify's dedicated team works hard to enhance the app and elevate the learning experience.
     Through continuous innovation, we refine features, integrate cutting-edge technologies, and gather user feedback to create a dynamic, 
     user-friendly platform. Committed to excellence, Skillify ensures a constantly evolving and enriching educational journey for all users`,
    image: more
  },
  {
    title: "Development targets",
    text: `Skillify is committed to enriching learning experiences through innovative tools.
     One of our primary goals is the development of video and audio lessons,
      harnessing multimedia for effective education. Stay tuned as we advance, 
      providing dynamic content to enhance the way individuals acquire new skills and knowledge.`,
    image: neural
  },
  {
    title: "Worldwide goals",
    text: `Skillify envisions a future dedicated to global educational success. 
    Our goals include specializing in supporting students worldwide, 
    ensuring they excel in their critical exams. By tailoring resources and strategies,
     Skillify is committed to becoming a key ally in the academic journey, fostering success for students around the globe.`,
    image: global
  }
]
export {
  reviewsData,
  freePlan,
  categoryPlan,
  lessonPlan,
  toolPlan,
  fullPlan,
  questions,
  categories,
  schoolSubject,
  selectStyle,
  selectSkill,
  learningTechniques,
  dashboardData,
  tutorialData,
  universitySubjects,
  languagesArray,
  skillifyData,
  solutionsData,
  communityData,
  moreData
};