const mongoose = require('mongoose');

// Sample movies with video URLs
const sampleMovies = [
  {
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    genre: ['Sci-Fi', 'Drama', 'Horror'],
    releaseYear: 2016,
    duration: 51,
    rating: 8.7,
    imageUrl: 'https://images.unsplash.com/photo-1489599517389-fb3d067f4993?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'series',
    featured: true,
    trending: true,
  },
  {
    title: 'The Crown',
    description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    genre: ['Drama', 'Biography', 'History'],
    releaseYear: 2016,
    duration: 58,
    rating: 8.7,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'series',
    featured: true,
    trending: false,
  },
  {
    title: 'Black Mirror',
    description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
    genre: ['Sci-Fi', 'Thriller', 'Drama'],
    releaseYear: 2011,
    duration: 60,
    rating: 8.8,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'series',
    featured: false,
    trending: true,
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    genre: ['Action', 'Crime', 'Drama'],
    releaseYear: 2008,
    duration: 152,
    rating: 9.0,
    imageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'movie',
    featured: true,
    trending: false,
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    releaseYear: 2010,
    duration: 148,
    rating: 8.8,
    imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'movie',
    featured: false,
    trending: true,
  },
  {
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.',
    genre: ['Crime', 'Drama', 'Thriller'],
    releaseYear: 2008,
    duration: 47,
    rating: 9.5,
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'series',
    featured: true,
    trending: false,
  },
  {
    title: 'The Office',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    genre: ['Comedy'],
    releaseYear: 2005,
    duration: 22,
    rating: 8.9,
    imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'series',
    featured: false,
    trending: false,
  },
  {
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    genre: ['Action', 'Crime', 'Drama'],
    releaseYear: 2017,
    duration: 70,
    rating: 8.3,
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'series',
    featured: false,
    trending: true,
  },
  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.',
    genre: ['Action', 'Adventure', 'Drama'],
    releaseYear: 2019,
    duration: 181,
    rating: 8.4,
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'movie',
    featured: true,
    trending: false,
  },
  {
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    genre: ['Crime', 'Drama'],
    releaseYear: 1994,
    duration: 154,
    rating: 8.9,
    imageUrl: 'https://images.unsplash.com/photo-1489599517389-fb3d067f4993?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'movie',
    featured: false,
    trending: false,
  }
];

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  genre: [{
    type: String,
    required: true,
  }],
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 10,
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  trailerUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  category: {
    type: String,
    enum: ['movie', 'series'],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  trending: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

async function seedDatabase() {
  try {
    // Get MongoDB URI from environment variables
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/netflix-app';
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!');

    // Clear existing movies
    console.log('🗑️  Clearing existing movies...');
    const deleteResult = await Movie.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing movies`);
    
    // Insert sample movies
    console.log('📽️  Inserting sample movies...');
    const insertedMovies = await Movie.insertMany(sampleMovies);
    
    console.log(`✅ Successfully inserted ${insertedMovies.length} movies!`);
    
    // Log summary
    const featuredCount = insertedMovies.filter(movie => movie.featured).length;
    const trendingCount = insertedMovies.filter(movie => movie.trending).length;
    const moviesCount = insertedMovies.filter(movie => movie.category === 'movie').length;
    const seriesCount = insertedMovies.filter(movie => movie.category === 'series').length;
    const withVideoCount = insertedMovies.filter(movie => movie.videoUrl).length;
    
    console.log('\n📊 Database Summary:');
    console.log(`   Total movies: ${insertedMovies.length}`);
    console.log(`   Featured: ${featuredCount}`);
    console.log(`   Trending: ${trendingCount}`);
    console.log(`   Movies: ${moviesCount}`);
    console.log(`   Series: ${seriesCount}`);
    console.log(`   With video URLs: ${withVideoCount}`);
    
    console.log('\n🎬 Featured Movies:');
    insertedMovies.filter(movie => movie.featured).forEach(movie => {
      console.log(`   - ${movie.title} (${movie.category}) - ${movie.releaseYear}`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
    console.log('🎉 Database re-seeding completed successfully!');
  }
}

// Run the seeding function
seedDatabase();
