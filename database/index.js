const { Client } = require("pg");
const DB_NAME = "localhost:5432/speedomeeter";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

async function createUser({ username, password, name, email, location }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO users(username, password, name, email, location)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [username, password, name, email, location]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userId) {
  await client.query(
    `
      DELETE FROM users
      WHERE id=${userId}
      RETURNING *`
  );
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM users;
      `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
        SELECT *
        FROM users
        WHERE id=${userId}
      `);

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createGroup({ name, public, creatorId }) {
  try {
    const { rows } = await client.query(
      `
          INSERT INTO groups(name, public, creatorId)
          VALUES($1, $2, $3)
          RETURNING *;
        `,
      [name, public, creatorId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createTodo({ eventId, entries }) {
  try {
    const { rows } = await client.query(
      `
          INSERT INTO todos(eventId, entries)
          VALUES($1, $2)
          RETURNING *;
        `,
      [eventId, entries]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getTodos(eventId) {
  try {
    const { rows } = await client.query(`
        SELECT entries FROM todos
        WHERE eventId=${eventId};
      `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllGroups() {
  try {
    const { rows } = await client.query(`
          SELECT * FROM groups;
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicGroups() {
  try {
    const { rows } = await client.query(`
            SELECT * FROM groups
            WHERE public = true;
          `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createEvent({
  name,
  start_time,
  end_time,
  location,
  details,
  attending,
  maybe,
  public,
  creatorId,
}) {
  try {
    const { rows } = await client.query(
      `
          INSERT INTO events( name, start_time, end_time, location, details, attending, maybe, public, creatorId )
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *;
        `,
      [
        name,
        start_time,
        end_time,
        location,
        details,
        attending,
        maybe,
        public,
        creatorId,
      ]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllEvents() {
  try {
    const { rows } = await client.query(`
          SELECT * FROM events;
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getEventById(eventId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
        SELECT *
        FROM events
        WHERE id=${eventId}
      `);

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getPublicEvents() {
  try {
    const { rows } = await client.query(`
            SELECT * FROM events
            WHERE public = true;
          `);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createGroup,
  getAllGroups,
  getPublicGroups,
  createEvent,
  getAllEvents,
  getEventById,
  getPublicEvents,
  createTodo,
  getTodos,
  deleteUser,
};
