# Rate Flow

**Rate Flow** is an open-source, high-performance currency conversion API service that provides real-time exchange rates for multiple currencies. Designed as a versatile alternative to popular services like Open Exchange Rates, it offers precise and efficient currency conversion while minimizing API call usage through optimized caching and data management.

## Features

- **Real-time currency exchange rates**
- **Support for multiple base currencies**
- **Precise currency conversions**
- **Historical exchange rates lookup**
- **Intelligent rate caching with hourly updates**
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
   - `symbols`: Comma-separated list of target currency codes

2. **Multiple Base Rates**
   ```bash
   GET /api/latest.json?base=USD,NGN,GBP&symbols={"USD": ["EUR", "GBP"], "NGN": ["USD", "GBP"]}
   ```
   **Description:** Returns rates for multiple specified base currencies, and if teh symbols are not provided it returns all the available rates for the specified currency

3. **Historical Rates**
   ```bash
   GET /api/history/:date.json?base=USD&symbols=EUR,GBP,JPY
   ```
   **Parameters:**
   - `date`: Date in `YYYY-MM-DD` format
   - `base`: Base currency code (default: USD)
   - `symbols`: Comma-separated list of target currency codes

4. **Currency Conversion**
   ```bash
   GET /api/convert?from=USD&to=EUR&amount=100
   ```
   **Parameters:**
   - `from`: Source currency code
   - `to`: Target currency code
   - `amount`: Amount to convert

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

Rate Flow uses API key-based authentication. Include your API key in the request header:

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
- Secret words (for account management)

### API Key Management

Users can:
- Create up to 5 API keys
- Enable or disable existing keys
- Delete unused keys
- Track usage per key

### Rate Limits

- **Free tier:** 1000 API calls per day, resetting monthly
- **Notifications:** Email alerts when approaching the usage limit

## Technical Implementation

### Technology Stack
- **TypeScript:** Primary language with strict typing
- **Node.js:** Runtime environment
- **Express.js:** REST API framework
- **MongoDB:** Database for rates and user data storage
- **Nodemailer:** Email notifications
- **Node-cron:** Scheduled tasks for rate updates

### Data Management
- Hourly rate updates from Open Exchange Rates
- Caching for efficient data retrieval
- Historical data storage for past rate lookups

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
   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/rate-flow
   EMAIL_USERNAME=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   OER_APP_ID=your_open_exchange_rates_app_id
   OER_BASE_URL=https://openexchangerates.org/api/
   ```

4. **Build and run:**
   ```bash
   npm run build
   npm start
   ```

5. **Development mode:**
   ```bash
   npm run dev
   ```

## Error Handling

The API returns standard HTTP status codes for clear troubleshooting:

- **200**: Success
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Server Error

Error responses include messages for improved debugging.

## Security Features

- API key authentication
- Rate limiting for controlled access
- Email verification for account security
- Secret words for sensitive account actions
- Secure password storage
- Strict request validation

## Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.