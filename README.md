# Coin98 ExpressJS - Typescript

## ❯ Table of Contents

![divider](./divider.png)

### Feature

-

### Structure
```markdown
├── src/
│   ├── controllers/
│   │   ├── user.controllers.ts
│   │   ├── PostController.ts
│   │   └── ...
│   ├── models/
│   │   ├── CardModel.ts
│   │   ├── Post.ts
│   │   └── ...
│   ├── repositories/
│   │   ├── BaseRepository.ts
│   │   ├── UserRepository.ts
│   │   ├── PostRepository.ts
│   │   └── ...
│   ├── services/
│   │   ├── ElasticSearchService.ts
│   │   └── RedisService.ts
│   ├── middleware/
│   │   ├── authenticate.ts
│   │   └── logger.ts
│   ├── config/
│   │   ├── db.ts
│   │   ├── elasticSearch.ts
│   │   ├── redis.ts
│   │   └── ...
│   ├── app.ts
│   └── index.ts
├── tests/
│   ├── controllers/
│   │   ├── UserControllers.test.ts
│   │   ├── PostController.test.ts
│   │   └── ...
│   ├── repositories/
│   │   ├── UserRepository.test.ts
│   │   ├── PostRepository.test.ts
│   │   └── ...
│   ├── services/
│   │   ├── ElasticSearchService.test.ts
│   │   └── RedisService.test.ts
│   └── utils/
│       ├── mockData.ts
│       └── ...
├── tsconfig.json
├── package.json
├── .eslintrc.json
└── README.md

```