'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import MovieDetails from '@/components/MovieDetails';
import VideoPlayer from '@/components/VideoPlayer';
import { Movie } from '@/types';
import styles from './page.module.css';

export default function MoviePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated' && params.id) {
      fetchMovie(params.id as string);
    }
  }, [status, router, params.id]);

  const fetchMovie = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/movies/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Movie not found');
        } else {
          setError('Failed to load movie details');
        }
        return;
      }

      const movieData = await response.json();
      setMovie(movieData);
    } catch (error) {
      console.error('Error fetching movie:', error);
      setError('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayMovie = () => {
    if (movie) {
      setIsVideoPlayerOpen(true);
    }
  };

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false);
  };

  if (status === 'loading' || loading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect to login
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.error}>
          <h1>Oops!</h1>
          <p>{error}</p>
          <button 
            onClick={() => router.push('/')}
            className={styles.backButton}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.error}>
          <h1>Movie not found</h1>
          <p>The requested movie could not be found.</p>
          <button 
            onClick={() => router.push('/')}
            className={styles.backButton}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <MovieDetails movie={movie} onPlayClick={handlePlayMovie} />
      
      {/* Video Player */}
      {movie && (
        <VideoPlayer
          movie={movie}
          isOpen={isVideoPlayerOpen}
          onClose={closeVideoPlayer}
        />
      )}
    </div>
  );
}
