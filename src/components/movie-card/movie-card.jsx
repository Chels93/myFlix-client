export const MovieCard = ({props, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
            >
            {props.movie.title}
            </div>
    );
};