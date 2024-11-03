# Rate Flow

Rate Flow is a open-source robust currency conversion API service that provides real-time exchange rates for multiple currencies. Built as an alternative to popular services like Open Exchange Rates, it offers efficient currency conversion capabilities while optimizing API call usage through smart caching and data management.

## Features

- **Real-time currency exchange rates**
- **Support for multiple base currencies**
- **Currency conversion with precise rates**
- **Historical exchange rates lookup**
- **Rate caching and hourly updates**
- **API key authentication**
- **Email notifications for account actions**

## API Endpoints

### Currency Rates

1. **Latest Rates**
   ```bash
   GET /api/latest.json?base=USD&symbols=EUR,GBP,JPY
   ```
   **Parameters:**
   - `base`: Base currency code (default: USD)
   - `symbols`: Comma-separated list of currency codes

2. **Historical Rates**
   ```bash
   GET /api/history/:date.json?base=USD&symbols=EUR,GBP,JPY
   ```
   **Parameters:**
   - `date`: Date in YYYY-MM-DD format
   - `base`: Base currency code (default: USD)
   - `symbols`: Comma-separated list of currency codes

3. **Currency Conversion**
   ```bash
   GET /api/convert?from=USD&to=EUR&amount=100
   ```
   **Parameters:**
   - `from`: Source currency code (default: USD)
   - `to`: Target currency code (default: NGN)
   - `amount`: Amount to convert (default: 1)

### Authentication Endpoints

- `POST /auth/new-user`
- `POST /auth/create-new-api-key`
- `POST /auth/disable-api-key`
- `POST /auth/enable-api-key`
- `POST /auth/delete-api-key`
- `POST /auth/disable-account`
- `POST /auth/enable-account`
- `POST /auth/delete-account`

### Authentication

Rate Flow uses API key authentication. Include your API key in the request header:

```bash
Authorization: Bearer your_api_key_here
```

### Account Management

**Creating a New Account**
```bash
POST /auth/new-user
Content-Type: application/json

{
    "email": "user@example.com"
}
```
**Response includes:**
- Account ID (UID)
- API Keys
- Secret Words (important for account management)

### API Key Management

Users can:
- Create up to 5 API keys
- Enable/disable existing keys
- Delete unused keys
- Track usage per key

### Rate Limits

- Free tier: 1000 API calls per day
- API calls reset monthly
- Email notifications for limit warnings

## Technical Implementation

### Technologies Used
- **TypeScript**: Primary programming language with strict type safety
- **Node.js**: JavaScript runtime environment
- **Express.js**: REST API framework
- **MongoDB**: Database for storing rates and user data
- **Nodemailer**: Email notification service
- **Node-cron**: Scheduled tasks for rate updates

### Data Management
- Hourly rate updates from Open Exchange Rates
- Efficient caching system
- Smart conversion calculations
- Historical data storage

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ridwanade0/rate-flow.git
   ```

2. **Install dependencies:**
   ```bash
   cd rate-flow
   npm install
   ```

3. **Create `.env` file:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/rate-flow
   EMAIL_PASSWORD=your_email_password
   EMAIL_USERNAME=your_email@example.com
   OER_APP_ID=your_open_exchange_rates_app_id
   OER_BASE_URL=https://openexchangerates.org/api/
   ```

4. **Build and run:**
   ```bash
   npm run build
   npm start
   ```

5. **For development:**
   ```bash
   npm run dev
   ```

## Error Handling

The API returns standard HTTP status codes:

- **200**: Success
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Server Error

Error responses include detailed messages for debugging.

## Security Features

- API key authentication
- Rate limiting
- Email verification
- Secret words for account management
- Secure password storage
- Request validation

## Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.
