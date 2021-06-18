# Zenklub Back-end Challenge

### 📜 Description
ZBC also known as Zenklub Back-end Challenge is a simple API Restful project to simulate (in an easy way) the relation between professionals and customers in Zenklub's context. Inside this nerd stuff below we have routes and services written with typescript, an in-memory database (even tho we're not in 2010 anymore) and something about 5.5 coffee hours. Enjoy it!

### 🔥 Running the project
1. First of all, make sure you have [Node.js (LTS)](https://nodejs.org/en/) installed already :)
2. Clone this repository running `git clone https://github.com/josecls/zbc.git`
3. Install all dependencies with the command `npm install` inside the project folder
4. Run the project with the following command `npm run start` and have fun!
5. See how to test using postman/insomnia (optional but easier)

### 🤖 Requests examples
I organized sample data for request tests. In case you use Postman or Insomnia you're gonna enjoy it. The import file is available in the email I sent and you can load it inside Postman or Insomnia and request all endpoints by one click. Feel free to modify the data.

### 💡 Scripts
- `npm run start` starts the application (production mode)
- `npm run dev` starts the application (development mode)
- `npm run build` builds the entire application
- `npm run test` runs the test battery

### 🧱 Project Structure
```
├── dist
├── src
    ├── routes
        ├── customers.ts
        └── professionals.ts
    ├── services
        ├── database.ts
        ├── helper.ts
        └── types.ts
    ├── tests
        ├── customers.spec.ts
        └── professionals.spec.ts
    └── server.ts
├── .gitignore
├── package-lock.json
└── package.json
```

### 👨🏻‍💻 Technology
- [express](https://expressjs.com/) for the web application
- [date-fns](https://date-fns.org/) for date manipulation (this is beautiful 😍)
- [Mocha.js](https://mochajs.org/) and [Chai.js](https://www.chaijs.com/) for tests (extra feature 😋)
