const {
  client,
  createUser,
  getAllUsers,
  createGroup,
  getAllGroups,
  getPublicGroups,
  createEvent,
  getAllEvents,
  getPublicEvents,
  createTodo,
  getTodos,
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    await client.query(
      ` 
      DROP TABLE IF EXISTS todos;
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS groups;
      DROP TABLE IF EXISTS users;
      `
    );
    await client.query(
      `
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          location varchar(255) NOT NULL
        );
        CREATE TABLE groups (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL,
          public BOOLEAN DEFAULT true,
          creatorId INTEGER REFERENCES users(id)
        );
        CREATE TABLE events (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL,
          start_time TIMESTAMP NOT NULL,
          end_time TIMESTAMP NOT NULL,
          location varchar(255) NOT NULL,
          details varchar(255) NOT NULL,
          attending INTEGER DEFAULT 0,
          maybe INTEGER DEFAULT 0,
          public BOOLEAN DEFAULT true,
          creatorId INTEGER REFERENCES users(id)
        );
        CREATE TABLE todos (
          eventId INTEGER REFERENCES events(id),
          entries TEXT []
        )

      `
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function initialData() {
  // create useful starting data
  try {
    /*--------------------------USERS----------------------------*/
    await createUser({
      username: "dunkerzach",
      password: "zach123",
      name: "Zach",
      email: "Zach@gmail.com",
      location: "Chicago, IL",
    });
    await createUser({
      username: "kd35",
      password: "okcthunder",
      name: "Kevin",
      email: "kd35@yahoo.com",
      location: "Jacksonville, FL",
    });
    await createUser({
      username: "beth1978",
      password: "lizzie",
      name: "Elizabeth",
      email: "beth@gmail.com",
      location: "Brooklyn, NY",
    });
    await createUser({
      username: "phxdbook",
      password: "seventypt",
      name: "Devin",
      email: "dbook@aol.com",
      location: "Phoenix, AZ",
    });
    await createUser({
      username: "tomthemailman",
      password: "tommygun",
      name: "Thomas",
      email: "tom@gmail.com",
      location: "Queens, NY",
    });
    await createUser({
      username: "spicyp43",
      password: "2020champ",
      name: "Pascal",
      email: "ps43@gmail.com",
      location: "Harlem, NY",
    });

    const users = await getAllUsers();
    console.log("---USERS:", users);
    /*--------------------------GROUPS----------------------------*/

    await createGroup({
      name: "Hoopers",
      public: true,
      creatorId: 1,
    });

    await createGroup({
      name: "Jax Car Meets!",
      public: false,
      creatorId: 5,
    });

    await createGroup({
      name: "Girls On the Run!",
      public: true,
      creatorId: 3,
    });

    const groups = await getAllGroups();
    console.log("---GROUPS:", groups);

    const publicgroups = await getPublicGroups();
    console.log("---PUBLIC GROUPS:", publicgroups);
    /*--------------------------EVENTS----------------------------*/

    await createEvent({
      name: "Rucker Park Basketball Tournament",
      start_time: "2020-9-25:17:30",
      end_time: "2020-9-25:8:00",
      location: "Rucker Park",
      details: "Rucker Park charity event",
      attending: 22,
      maybe: 7,
      public: true,
      creatorId: 2,
    });

    await createEvent({
      name: "2020 Abstract Art Gallery",
      start_time: "2020-12-20:11:00",
      end_time: "2020-12-20:16:00",
      location: "Narnia Ave",
      details: "placeholderfornow",
      attending: 35,
      maybe: 12,
      public: true,
      creatorId: 4,
    });

    await createEvent({
      name: "Tommy B-Day Party 01/15/21!",
      start_time: "2021-01-15:12:00",
      end_time: "2021-01-15:16:00",
      location: "8743 Mountain Drive",
      details: "My cousin Tommy's 21st birthday party",
      attending: 8,
      maybe: 6,
      public: false,
      creatorId: 5,
    });

    const events = await getAllEvents();
    console.log("---EVENTS:", events);

    const pubevents = await getPublicEvents();
    console.log("---PUBLIC EVENTS:", pubevents);
    /*--------------------------TODOS----------------------------*/

    await createTodo({
      eventId: 1,
      entries: ["todo1", "todo2", "todo3", "todo4"],
    });

    await createTodo({
      eventId: 2,
      entries: [
        "Buy decorations",
        "Get food and drinks",
        "Buy cleaning supplies",
        "Rent tables and chairs",
      ],
    });

    const todos = await getTodos(1);
    console.log("---todo:", todos);
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(initialData)
  .catch(console.error)
  .finally(() => client.end());
