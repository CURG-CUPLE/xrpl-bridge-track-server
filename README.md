## Description

- XRPL <-> EVM Sidechain 브릿지 트랜잭션을 수집하고,
- 수집된 브릿지 데이터 API 를 제공합니다.

## Envirenment
- Node: v20.11.1
- NestJs: v.10.3.2
- MySQL: mysql:8.0 (docker)

## Installation

```bash
$ pnpm install
```

## Running the app
###### 의존성 실행
```bash
$ docker-compose up
````
###### 서버 실행
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Convention
#### Commit Message
```
feat: 기능 추가
fix: 버그 수정
refactor: 리팩토링
test: 테스트 코드 추가, 테스트 리팩토링
style: 코드 포맷팅
chore: 코드 수정 없는 변경
docs: 문서 수정
```
