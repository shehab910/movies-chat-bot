import StarRating from './RatingStars';
import LinkButton from './LinkButton';
import './MovieCard.css';

const MovieCard = ({movieDetails}) => {
    const { title, desc, posterUrl, genres, id, voteAvg, voteCount, trailerURL} = movieDetails;

    const formattedGenres = genres.map(genre => {
        let genreName = '';
        genreName += genre[0].toUpperCase();
        genreName += genre.slice(1);
        return genreName;
    }).join(', ');

    return (
        <li key={id} className="movie-card-list-item">
            <div className="movie-card">
                <img className='poster' alt='poster' src={posterUrl} />
                <div className="details">
                    <div className='movie-title'>{title}</div>
                    <p>{desc.slice(0, desc.indexOf('.')+1)}</p>
                    <span className='movie-genres'>{formattedGenres}</span>
                    <StarRating value={voteAvg/2} />
                    <div className='movie-genres'>{voteCount} votes</div>
                    <LinkButton href={trailerURL}>Watch Trailer</LinkButton>
                </div>
            </div>
        </li>
    )
    
}

export default MovieCard;