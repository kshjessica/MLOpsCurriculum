# Performance Test

## EC2

- Number of users: 100
- Spawn rate: 1
- Host: http://13.124.253.28:3000
- Duration: apx 3 minutes

### GET /user

| Method | Max Num of Users | Avg Res Time(ms) | Max RPS |
| ------ | ---------------- | ---------------- | ------- |
| GET    | 100              | 37               | 41.6    |

### POST /user

| Method | Max Num of Users | Avg Res Time(ms) | Max RPS |
| ------ | ---------------- | ---------------- | ------- |
| POST   | 100              | 39               | 40.9    |

<!-- ## ECS

- Number of users: 100
- Spawn rate: 1
- Host: http://
- Duration: apx 3 minutes

### GET /user

| Method | Max Num of Users | Avg Res Time(ms) | Max RPS |
| ------ | ---------------- | ---------------- | ------- |
| GET    | 100              |                  |         |

### POST /user

| Method | Max Num of Users | Avg Res Time(ms) | Max RPS |
| ------ | ---------------- | ---------------- | ------- |
| POST   | 100              |                  |         | -->
