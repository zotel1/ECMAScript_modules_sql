import assert from 'assert';
import { MovieModel } from '../models/mysql/movie.js';

describe('MovieModel', () => {
    describe('#getAll', () => {
        it('should return an array of movies', async () => {
            const movies = await MovieModel.getAll({});
            assert(Array.isArray(movies));
        });

        it('should return movies with valid properties', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(typeof movie.title === 'string');
                assert(typeof movie.year === 'number');
                assert(typeof movie.director === 'string');
                assert(typeof movie.duration === 'number');
                assert(typeof movie.poster === 'string');
                assert(typeof movie.rate === 'number');
                assert(typeof movie.id === 'string');
            });
        });

        it('should return movies with valid genres', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(Array.isArray(movie.genres));
                movie.genres.forEach(genre => {
                    assert(typeof genre === 'string');
                });
            });
        });

        it('should return movies with valid ratings', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(movie.rate >= 0 && movie.rate <= 10);
            });
        });

        it('should return movies with valid years', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(movie.year >= 1900 && movie.year <= new Date().getFullYear());
            });
        });

        it('should return movies with valid durations', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(movie.duration >= 0 && movie.duration <= 300);
            });
        });

        it('should return movies with valid posters', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(movie.poster.startsWith('http'));
            });
        });

        it('should return movies with valid IDs', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(movie.id.length === 36);
            });
        });

        it('should return movies with valid titles', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(movie.title.length > 0);
            });
        });

        it('should return movies with valid directors', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(movie.director.length > 0);
            });
        });

        it('should return movies with valid genres', async () => {
            const movies = await MovieModel.getAll({});
            movies.forEach(movie => {
                assert(Array.isArray(movie.genres));
                movie.genres.forEach(genre => {
                    assert(genre.length > 0);
                });
            });
        });

        it('should return movies with valid properties when filtered by genre', async () => {
            const movies = await MovieModel.getAll({ genre: 'action' });
            movies.forEach(movie => {
                assert(typeof movie.title === 'string');
                assert(typeof movie.year === 'number');
                assert(typeof movie.director === 'string');
                assert(typeof movie.duration === 'number');
                assert(typeof movie.poster === 'string');
                assert(typeof movie.rate === 'number');
                assert(typeof movie.id === 'string');
            });
        });

        it('should return movies with valid genres when filtered by genre', async () => {
            const movies = await MovieModel.getAll({ genre: 'action' });
            movies.forEach(movie => {
                assert(Array.isArray(movie.genres));
                movie.genres.forEach(genre => {
                    assert(genre === 'action');
                });
            });
        });

        it('should return an empty array when filtered by an invalid genre', async () => {
            const movies = await MovieModel.getAll({ genre: 'invalid' });
            assert(Array.isArray(movies));
            assert(movies.length === 0);
        });

        it('should return an empty array when filtered by an empty genre', async () => {
            const movies = await MovieModel.getAll({ genre: '' });
            assert(Array.isArray(movies));
            assert(movies.length === 0);
        });

        it('should return an empty array when filtered by a non-string genre', async () => {
            const movies = await MovieModel.getAll({ genre: 123 });
            assert(Array.isArray(movies));
            assert(movies.length === 0);
        });

        it('should return an empty array when filtered by a null genre', async () => {
            const movies = await MovieModel.getAll({ genre: null });
            assert(Array.isArray(movies));
            assert(movies.length === 0);
        });
    });
});


        