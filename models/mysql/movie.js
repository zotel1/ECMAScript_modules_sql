import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '*ingresa-tu-contraseña*',
    database: 'moviesdb'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)


export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            // get genre ids from database table using genre names
            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
            )

            // no genre found
            if (genre.length === 0) return []

            // get the id from the first genre result
            const [{ id }] = genres

            // get all movies ids from database table 
            const [movieIds] = await connection.query(
                'SELECT movie_id FROM movie_genres WHERE genre_id = ?;', [id]
            )
            // no movies found
            if (movieIds.length === 0) return []

            //get all movies from database table
            const [movies] = await connection.query(
                'SELECT title, year, director, duration, poster, rate BIN_TO_UUID(id) id FROM movie WHERE id IN (?);', [movieIds.map(movie => movie.movie_id)]
            )
            return movies
        } 

        const[movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )
        return movies
    }


    static async getById ({ id }) {
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )
        if (movies.length === 0) return null

        return movies[0]
    }

    static async create({ object }) {
        const {
            title,
            year,
            duration,
            director,
            rate,
            poster,
            genres
        } = object

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        // Inserta la pelicula en la base de datos
        const result = await connection.query(
            `INSERT INTO movie (id, title, year, duration, director, rate, poster) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
            [title, year, duration, director, rate, poster]
        )

        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        // Obtiene el ID de la pelicula recien ingresada
        const movieId = result.insertId

        // Para cada genero en el array de géneros
        for (const genre of genres) {
            // Obtiene el ID del género de la base de datos
            const [[{ id: genre_id }]] = await connection.query(
                `SELECT id FROM genre WHERE name = ?;`,
                [genre]
            )

            // Inserta una nueva fila en la tabla movie_genres
            await connection.query(
                `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?);`,
                [movieId, genre_id]
            )
        }

        return movies[0]
    }



    static async update ({ id, object }) {
        const {
            title,
            year,
            duration,
            director,
            rate,
            poster,
            genres
        } = object

        // Actualiza la pelicula en la base de datos
        const result = await connection.query(
            `UPDATE movie SET title = ?, year = ?, duration = ?, director = ?, rate = ?, poster = ? WHERE id = UUID_TO_BIN(?);`,
            [title, year, duration, director, rate, poster, id]
        )

        // Elimina los géneros existentes de la pelicula
        await connection.query(
            `DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);`,
            [id]
        )

        // Inserta los nuevos géneros de la pelicula en la tabla movie_genres
        for (const genre of genres) {
            // Obtiene el ID del género de la base de datos
            const [[{ id: genre_id }]] = await connection.query(
                `SELECT id FROM genre WHERE name = ?;`,
                [genre]
            )

            // Inserta una nueva fila en la tabla movie_genres
            await connection.query(
                `INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);`,
                [id, genre_id]
            )
        }

        return result[0].affectedRows
    }

    static async delete ({ id }) {

        // Elimina la pelicula de la base de datos
        const result = await connection.query(
            `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )

        if (result[0].affectedRows === 0) {
            throw new Error('Movie not found')
        }

        return result[0].affectedRows
    }
}