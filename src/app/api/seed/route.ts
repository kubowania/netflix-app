import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Movie from '@/models/Movie';
import { sampleMovies } from '@/lib/sampleData';

export async function POST() {
  try {
    await connectToDatabase();
    
    // Check if movies already exist
    const existingMovies = await Movie.countDocuments();
    
    if (existingMovies > 0) {
      return NextResponse.json({ 
        message: 'Database already seeded',
        count: existingMovies 
      });
    }
    
    // Insert sample movies
    const createdMovies = await Movie.insertMany(sampleMovies);
    
    return NextResponse.json({ 
      message: 'Database seeded successfully',
      count: createdMovies.length,
      movies: createdMovies
    }, { status: 201 });
    
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
