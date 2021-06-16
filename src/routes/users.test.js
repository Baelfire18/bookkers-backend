const supertest = require('supertest');
const app = require('../app');

const request = supertest(app.callback());

describe('User API routes', () => {
  let auth;
  const userFields = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@gmail.com',
    password: 'testPassword',
    admin: 0,
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

  describe('GET /users/me', () => {
    let response;
    const authorizedGetUser = () => request
    .get(`/users/me`)
    .auth(auth.access_token, { type: 'bearer' });

    describe('when passed id corresponds to logged user', () => {
      beforeAll(async () => {
        response = await authorizedGetUser();
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
  });

  describe('GET /users/:id', () => {
    let user;
    let response;
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'afro@uc.cl',
      password: '123456',
      admin: 0,
    };
    const authorizedGetUser = (id) => request
      .get(`/users/${id}`)
      .auth(auth.access_token, { type: 'bearer' });
    const unauthorizedGetUser = (id) => request.get(`/users/${id}`);

    beforeAll(async () => {
      user = await app.context.orm.user.create(userData);
    });

    describe('when passed id corresponds to an existing user', () => {
      beforeAll(async () => {
        response = await authorizedGetUser(user.id);
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

    describe('when passed id does not correspond to any user', () => {
      test('responds with 404 status code', async () => {
        response = await authorizedGetUser(user.id * -1);
        expect(response.status).toBe(404);
      });
    });

    describe('when request is unauthorized because user is not logged in', () => {
      test('responds with 401 status code', async () => {
        response = await unauthorizedGetUser(user.id);
        expect(response.status).toBe(401);
      });
    });
  });

  describe('POST /users', () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'cacunazhe@uc.cl',
      password: '123456',
      admin: 0,
    };
    const authorizedPostUser = (body) => request
      .post('/users')
      .auth(auth.access_token, { type: 'bearer' })
      .set('Content-type', 'application/json')
      .send(body);
    const unauthorizedPostUser = (body) => request
      .post('/users')
      .set('Content-type', 'application/json')
      .send(body);

    describe('user data is valid', () => {
      let response;

      beforeAll(async () => {
        response = await authorizedPostUser(userData);
      });

      test('responds with 201 (created) status code', () => {
        expect(response.status).toBe(201);
      });

      test('responds with a JSON body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('response for POST user has an id (user has an id)', () => {
        expect(response.body.data.id).toBeDefined();
      });

      test('response body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });

      test('post request actually created the given user', async () => {
        const user = await app.context.orm.user.findByPk(response.body.data.id);
        const {
          firstName, lastName, email, admin,
        } = user.dataValues;
        const sanitizedUser = {
          firstName, lastName, email, admin,
        };
        const userDataPassword = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'cacunazhe@uc.cl',
          admin: 0,
        };
        expect(sanitizedUser).toEqual(userDataPassword);
      });
    });

    describe('user data is invalid', () => {
      test('responds with 400 status code', async () => {
        const invalidBodies = [
          {},
          { firstName: 'John' },
          { lastName: 'Doe' },
          { firstName: 'John', lastName: 'Doe', email: '345678987654' },
          {
            firstName: 'John', last_name: 'Doe', email: 'nazhe@uc.cl', password: '123456', admin: 6,
          },
        ];
        await Promise.all(invalidBodies.map(authorizedPostUser))
          .then((responses) => {
            responses.forEach((response) => expect(response.status).toBe(400));
          });
      });
    });

    describe('user data is valid but request is unauthorized', () => {
      test('responds with 401 status code', async () => {
        const response = await unauthorizedPostUser(userData);
        expect(response.status).toBe(400);
      });
    });
  });

  describe('PATCH /users/:id', () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'afro7e@uc.cl',
      password: '123456'
    };
    const authorizedPatchUser = (body, id) => request
      .patch(`/users/${id}`)
      .auth(auth.access_token, { type: 'bearer' })
      .set('Content-type', 'application/json')
      .send(body);
    describe('when patched correctly', () => {
      let response;
      beforeAll(async () => {
        response = await authorizedPatchUser(userData, 1);
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
