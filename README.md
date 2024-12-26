# crypto-alert

This is a monorepo to manage the crypto-alert project.

Crypto alert is a project that aims to provide a simple way to monitor the price of cryptocurrencies and send alerts when the price reaches a certain threshold.

## Notification services

- Email (working)
- SMS (not implemented yet)
- Push notification (not implemented yet)

## Running the project

```bash
# Install dependencies
yarn install
```

### Backend

#### All backend services

```bash
# Run all backend services
yarn be:all
```

#### Worker

```bash
# Run backend worker
yarn be:worker
```

#### Scheduler

```bash
# Run backend scheduler
yarn be:scheduler
```

#### Api

```bash
# Run backend api
yarn be:api
```

### Frontend

#### Mobile IOS

```bash
# Run mobile ios
yarn fe:mobile:ios
```
