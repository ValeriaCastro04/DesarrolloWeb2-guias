export function WatchedMoviesContainer({ children }) {
    return (
        <>
            {children}
        </>
    )
}

export function WatchedMoviesList({ watched, setWatched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} watched={watched} setWatched={setWatched} />
            ))}
        </ul>
    );
}


/*
Profe, honestamente no sé como lo hice jajaja. Pero gracias a dios funcionó. 
*/

function eliminarPelicula({ selectedId, setWatched, watched }) {
    setWatched(watched.filter((movie) => movie.imdbID != selectedId))
}

export function WatchedMovie({ movie, setWatched, watched }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{calcularPropiedad(movie.imdbRating)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{calcularPropiedad(movie.userRating)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{calcularPropiedad(movie.runtime)} min</span>
                </p>
                <button className="btn-delete" onClick={() => eliminarPelicula({ selectedId: movie.imdbID, setWatched, watched })}>
                    X
                </button>
            </div>
        </li>
    )
}


/*
le puse esto para que no me diera el NaN
*/
const calcularPropiedad = (propiedad) => {
    if (propiedad === "N/A") {
        return 0;
    } else {
        return parseInt(propiedad, 10) || 0;
    }
};

/**
* Calcula el promedio de un arreglo de números.
* @param {number[]} arr - Arreglo de valores numéricos.
* @returns {number} Promedio de los valores.
*/
const calculateAverage = (arr) =>
    arr.length ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length : 0;
export function WatchedSummary({ watched }) {
    const avgImdbRating = calculateAverage(watched.map((movie) => calcularPropiedad(movie.imdbRating)));
    const avgUserRating = calculateAverage(watched.map((movie) => calcularPropiedad(movie.userRating)));
    const avgRuntime = calculateAverage(watched.map((movie) => calcularPropiedad(movie.runtime)));
    return (
        <div className="summary">
            <h2>Películas que has visto</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} películas</span>
                </p>
                <p>
                    <span>⭐</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                </p>
            </div>
        </div>
    );
}
