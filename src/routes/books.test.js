const supertest = require('supertest');
const app = require('../app');

const request = supertest(app.callback());

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue(),
  }),
}));

describe('Book API routes', () => {
  let auth;
  const userFields = {
    firstName: 'TestBook',
    lastName: 'UserBook',
    email: 'testbook@gmail.com',
    password: 'testbookPassword',
    admin: 0,
  };
  const bookFields = {
    title: 'Test Book3',
    isbn: '97861244970993',
    author: 'Testman3',
    genre: 'Test3',
    userId: 1,
    description: 'testbook3',
  };
  const reviewFields = {
    content: 'nazhe el libro',
    userId: 1,
    bookId: 1,
    score: 5,
  };

  beforeAll(async () => {
    await app.context.orm.sequelize.sync({ force: true });
    await app.context.orm.user.create(userFields);
    const authResponse = await request
      .post('/auth')
      .set('Content-type', 'application/json')
      .send({ email: userFields.email, password: userFields.password });
    auth = authResponse.body;
    await app.context.orm.book.create(bookFields);
    await app.context.orm.review.create(reviewFields);
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
      description: 'testbook',
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

  describe('GET /books', () => {
    let response;
    const authorizedGetBooks = () => request
      .get('/books')
      .auth(auth.access_token, { type: 'bearer' });

    describe('route response is valid', () => {
      beforeAll(async () => {
        response = await authorizedGetBooks();
      });

      test('responds with 200', () => {
        expect(response.status).toBe(200);
      });

      test('responds with a JSON body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('response body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
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
      description: 'testbook2',
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
        const {
          title, isbn, author, genre, userId, description,
        } = book.dataValues;
        const sanitizedBook = {
          title, isbn, author, genre, userId, description,
        };
        expect(sanitizedBook).toEqual(bookData);
      });
    });

    describe('book data is valid but request is unauthorized', () => {
      test('responds with 401 status code', async () => {
        const response = await unauthorizedPostBook(bookData);
        expect(response.status).toBe(401);
      });
    });
  });

  describe('PATCH /books/:id', () => {
    const bookData = {
      title: 'Test Book4',
      isbn: '97861244974993',
      author: 'Testman4',
      genre: 'Test4',
      userId: 1,
      description: 't4stbook3',
    };
    const authorizedPatchBook = (body, id) => request
      .patch(`/books/${id}`)
      .auth(auth.access_token, { type: 'bearer' })
      .set('Content-type', 'application/json')
      .send(body);

    describe('when patched correctly', () => {
      let response;
      beforeAll(async () => {
        response = await authorizedPatchBook(bookData, 1);
      });

      test('responds with 201 status code', () => {
        expect(response.status).toBe(201);
      });

      test('responds with a json body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('GET /books/:book_id/reviews', () => {
    let response;
    const authorizedGetReviews = (bookid) => request
      .get(`/books/${bookid}/reviews`)
      .auth(auth.access_token, { type: 'bearer' });

    describe('route response is valid', () => {
      beforeAll(async () => {
        response = await authorizedGetReviews(1);
      });

      test('responds with 200', () => {
        expect(response.status).toBe(200);
      });

      test('responds with a JSON body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('response body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('POST /books/:book:id/reviews', () => {
    let response;
    const reviewFieldsPost = {
      content: 'nazhe el libro hermanitoooo',
      userId: 1,
      bookId: 1,
      score: 4,
    };

    const authorizedPostReview = (body, bookid) => request
      .post(`/books/${bookid}/reviews`)
      .auth(auth.access_token, { type: 'bearer' })
      .send(body);

    describe('route response is valid', () => {
      beforeAll(async () => {
        response = await authorizedPostReview(reviewFieldsPost, 1);
      });

      test('responds with 201', () => {
        expect(response.status).toBe(201);
      });

      test('responds with a JSON body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('response body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('GET /books/:book_id/reviews/:review_id', () => {
    let response;
    const authorizedGetOneReview = (bookid, reviewid) => request
      .get(`/books/${bookid}/reviews/${reviewid}`)
      .auth(auth.access_token, { type: 'bearer' });

    describe('route response is valid', () => {
      beforeAll(async () => {
        response = await authorizedGetOneReview(1, 1);
      });

      test('responds with 200', () => {
        expect(response.status).toBe(200);
      });

      test('responds with a JSON body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('response body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('PATCH /books/:book_id/reviews/:review_id', () => {
    const reviewData = {
      content: 'nazhe el libro jajajaja',
      userId: 1,
      bookId: 1,
      score: 3,
    };
    const authorizedPatchReview = (body, bookid, reviewid) => request
      .patch(`/books/${bookid}/reviews/${reviewid}`)
      .auth(auth.access_token, { type: 'bearer' })
      .set('Content-type', 'application/json')
      .send(body);

    describe('when patched correctly', () => {
      let response;
      beforeAll(async () => {
        response = await authorizedPatchReview(reviewData, 1, 1);
      });

      test('responds with 201 status code', () => {
        expect(response.status).toBe(201);
      });

      test('responds with a json body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });
    });
  });
});
