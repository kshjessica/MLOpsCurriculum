# API Documentation

## URI

> POST /deposit

## Parameter

| Name      | Type   | Description | Required |
| --------- | ------ | ----------- | -------- |
| payee_id  | number | 지급인 id   | [x]      |
| drawee_id | number | 수취인 id   | [x]      |
| amount    | number | 이체 금액   | [x]      |

## Response

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| success   | boolean | 성공 여부   |
| timestamp | string  | 이체 시각   |

## Error Message

| Error Code | Message        | Description                        |
| ---------- | -------------- | ---------------------------------- |
| 404        | User Not Found | 지급인 또는 수취인이 존재하지 않음 |
| 400        | Invalid Amount | 이체 금액이 올바르지 않음          |
