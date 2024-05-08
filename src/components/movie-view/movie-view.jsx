export const MovieView = ({ movie }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>synopsis: </span>
        <span>(movie.synopsis)</span>
      </div>
      <div>
        <span>release year: </span>
        <span>(movie.year)</span>
      </div>
      <div>
        <span>director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>genre: </span>
        <span>(movie.genre)</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
