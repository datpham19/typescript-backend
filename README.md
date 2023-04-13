# Coin98 ExpressJS - Typescript

## ❯ Table of Contents

[__TOC__]

![divider](./divider.png)

### Tech Stack

- Language: [NodeJS](https://nodejs.org/en/), [TypeScripts](https://www.typescriptlang.org/)
- Database: [Redis](https://redis.io/), [MongoDB](https://www.mongodb.com/), [PostgreSQL](https://www.postgresql.org/), [ElasticSearch](https://www.elastic.co/)
- Container: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- Package manager: [Yarn](https://yarnpkg.com/en/)
- Linter: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- Package and library:
    - Framework: [express](https://expressjs.com/)
    - Logger: [winston](https://npmjs.com/package/winston), [morgan](https://www.npmjs.com/package/morgan)
    - ORM: [Sequelize](https://sequelize.org/), [Mongoose](https://mongoosejs.com/)
    - Cache: [redis](https://www.npmjs.com/package/redis)
    - Search: [elasticsearch](https://www.npmjs.com/package/elasticsearch)

### Coding Principle and Convention

- Group related files by directory, it's easy to focusing on small portions and
  avoid complexity
    + Organize files by feature not by function.
    + Store the test files next to the code.
- Be pragmatic modules: the node philosophy about **small modules** and **single
  purpose modules**
    + Only build modules as needed follow YANGI principle
- Place Your Test Files Next to The Implementation
- Put your long npm scripts in a scripts directory
- Reduce cross-cutting coupling with Events
- Code flow is followable - magic directories in the filesystem. The app starts at **app/server.js** and you can see everything it loads and executes by following the code.
    + Don't do magic things
    + Don't autoload files from
    + Don't do silly metaprogramming
- Be easy to locate code
    + Name are meaningful and accurate
    + Crufty code is fully removed, not left around in a orphan file or just
      commented out
- Use simple and obvious naming
- Use lower-kebab-case filenames
    + Npm forbids uppercase in new package names.
    + This format avoids filesystem case sensitivity issues across platforms
- Variable name must be camelCase
- For more detail, please refer to [styleguide.md](./styleguide.md)

### Structure

| Name                                        | Description                                                |
|---------------------------------------------|------------------------------------------------------------|
| **.vscode/**                                | VSCode tasks, launch configuration and some other settings |
| **dist/**                                   | Compiled source files will be placed here                  |
| **src/**                                    | Source files                                               |
| **src/config/**                             | Configure environment and swagger                          |
| **src/feature/<feat>/<feat>.controller.ts** | REST feature Controllers                                   |
| **src/feature/<feat>/<feat>.router.ts**     | Router include endpoint and middleware                     |
| **src/feature/<feat>/<feat>.schema.ts**     | Schema of request and response                             |
| **src/feature/<feat>/<feat>.test.ts**       | Unit test                                                  |
| **src/lib/**                                | Connection of databases                                    |
| **src/models/**                             | Model entities of database                                 |
| **src/utils/**                              | Additional function                                        |
| .env.example                                | Example Environment configurations                         |
| .env.test                                   | Test environment configurations                            |

### Installation

#### Create config file

Create `.env` file. Copy content from `.evn.default` into `.env`. Change config in `.env` corresponding to your environment

#### Install package

```bash
yarn install
```

#### Run

```bash
yarn dev
```

#### Testing

```bash
yarn run test
```
