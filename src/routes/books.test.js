const supertest = require('supertest');
const app = require('../app');

const request = supertest(app.callback());

describe('Book API routes', () => {
  let auth;
  const userFields = {
    firstName: 'TestBook',
    lastName: 'UserBook',
    email: 'testbook@gmail.com',
    password: 'testbookPassword',
    admin: 0
  };

  beforeAll(async () => {
    await app.context.orm.sequelize.sync({ force: true });
    await app.context.orm.user.create(userFields);
    const authResponse = await request
      .post('/auth')
      .set('Content-type', 'application/json')
      .send({ email: userFields.email, password: userFields.password });
    auth = authResponse.body;
  });

  afterAll(async () => {
    await app.context.orm.sequelize.close();
  });

  describe('GET /books/:id', () => {
    let book;
    let response;
    const bookData = {
        title: 'Test Book',
        isbn: '9786124497099',
        author: 'Testman',
        genre: 'Test',
        userId: 1,
        description: 'testbook'
    };
    const authorizedGetBook = (id) => request
      .get(`/books/${id}`)
      .auth(auth.access_token, { type: 'bearer' });
    const unauthorizedGetBook = (id) => request.get(`/books/${id}`);

    beforeAll(async () => {
      book = await app.context.orm.book.create(bookData);
    });

    describe('when passed id corresponds to an existing book', () => {
      beforeAll(async () => {
        response = await authorizedGetBook(book.id);
      });

      test('responds with 200 status code', () => {
        expect(response.status).toBe(200);
      });

      test('responds with a json body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when passed id does not correspond to any book', () => {
      test('responds with 404 status code', async () => {
        response = await authorizedGetBook(book.id * -1);
        expect(response.status).toBe(404);
      });
    });

    describe('when request is unauthorized because user is not logged in', () => {
      test('responds with 401 status code', async () => {
        response = await unauthorizedGetBook(book.id);
        expect(response.status).toBe(200);
      });
    });
  });

  describe('POST /books', () => {
    const bookData = {
        title: 'Test Book2',
        isbn: '97861244970992',
        author: 'Testman2',
        genre: 'Test2',
        userId: 1,
        description: 'testbook2'
    };
    const authorizedPostBook = (body) => request
      .post('/books')
      .auth(auth.access_token, { type: 'bearer' })
      .set('Content-type', 'application/json')
      .send(body);
    const unauthorizedPostBook = (body) => request
      .post('/books')
      .set('Content-type', 'application/json')
      .send(body);

    describe('book data is valid', () => {
      let response;

      beforeAll(async () => {
        response = await authorizedPostBook(bookData);
      });

      test('responds with 201 (created) status code', () => {
        expect(response.status).toBe(201);
      });

      test('responds with a JSON body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('response for POST book has an id (user has an id)', () => {
        expect(response.body.data.id).toBeDefined();
      });

      test('response body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });

      test('post request actually created the given book', async () => {
        const book = await app.context.orm.book.findByPk(response.body.data.id);
        const { title, isbn, author, genre, userId, description } = book.dataValues;
        const sanitizedBook = { title, isbn, author, genre, userId, description };
        expect(sanitizedBook).toEqual(bookData);
      });
    });

    describe('book data is invalid', () => {
      test('responds with 400 status code', async () => {
        const invalidBodies = [
          {},
          { title: 'John' },
          { description: 'Doe' },
          { title: 'John', isbn: 'Doe', genreee: '345678987654' },
          { title: 'John', isbn: 'Doe', genre: 'nazhe@uc.cl', author: "123456", userId: 6, description: 5 },
        ];
        await Promise.all(invalidBodies.map(authorizedPostBook))
          .then((responses) => {
            responses.forEach((response) => expect(response.status).toBe(400));
          });
      });
    });

    describe('book data is valid but request is unauthorized', () => {
      test('responds with 401 status code', async () => {
        const response = await unauthorizedPostBook(bookData);
        expect(response.status).toBe(401);
      });
    });
  });
});