export const MovieView = ({ movie }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Synopsis: </span>
                <span>(movie.synopsis)</span>
            </div>
            <div>
                <span>Poster Image: </span>
                <span>(movie.image)</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>(movie.genre)</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <button>Back</button>
        </div>
    );
};