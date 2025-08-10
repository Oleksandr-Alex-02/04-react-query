
import css from './MovieModal.module.css'
import { createPortal } from 'react-dom'

import { Movie } from '../../types/movie'
import { useEffect } from 'react';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.code === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) }
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    });

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    }

    return createPortal(
        <>
            <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
                <div className={css.modal} aria-label="Close modal">
                    <button className={css.closeButton} onClick={onClose}>
                        &times;
                    </button>
                    <img
                        className={css.image}
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                    />
                    <div className={css.content}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <p>
                            <strong>Release Date:</strong> {movie.release_date}
                        </p>
                        <p>
                            <strong>Rating:</strong> {movie.vote_average}/10
                        </p>
                    </div>
                </div>
            </div>
        </>,
        document.body
    )
}