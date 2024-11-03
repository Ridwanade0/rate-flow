# Rate Flow

**Rate Flow** is an open-source, high-performance currency conversion API that provides real-time exchange rates for multiple currencies. It serves as a versatile alternative to popular services like Open Exchange Rates, offering precise currency conversion while optimizing API call usage through effective caching and data management.

## Features

- **Real-time currency exchange rates**
- **Multiple base currency support**
- **Precise currency conversions**
- **Historical exchange rates lookup**
- **Intelligent caching with hourly updates**
- **API key authentication**
- **Email notifications for account actions**

## API Endpoints


## Base url of this api is ```https://onrender.com ```


### Currency Rates

1. **Latest Rates**
   ```bash
   GET /api/latest.json?base=USD&symbols=EUR,GBP,JPY
   ```
   - **Parameters:**
     - `base`: Base currency code (default: USD)
     - `symbols`: Comma-separated list of target currency codes

2. **Multiple Base Rates**
   ```bash
   GET /api/latest.json?base=USD,NGN,GBP&symbols={"USD": ["EUR", "GBP"], "NGN": ["USD", "GBP"]}
   ```
   - **Description:** Returns rates for multiple specified base currencies. If `symbols` are not provided, all available rates for the specified currency are returned.

3. **Historical Rates**
   ```bash
   GET /api/history/:date.json?base=USD&symbols=EUR,GBP,JPY
   ```
   - **Parameters:**
     - `date`: Date in `YYYY-MM-DD` format
     - `base`: Base currency code (default: USD)
     - `symbols`: Comma-separated list of target currency codes

4. **Currency Conversion**
   ```bash
   GET /api/convert?from=USD&to=EUR&amount=100
   ```
   - **Parameters:**
     - `from`: Source currency code
     - `to`: Target currency code
     - `amount`: Amount to convert

### Authentication Endpoints

1. **Create New User**
   ```bash
   POST /auth/new-user
   ```
   - **Request Body:**
     ```json
     {
         "email": "user@example.com"
     }
     ```
   - **Response:**
     ```json
     {
         "success": true,
         "message": "API key generated successfully, check your email.",
         "data": {
             "uid": "uuid-string",
             "email": "user@example.com",
             "apiKeys": ["rf_xxxxxxxxxxxxx", "rf_xxxxxxxxxxxxx"],
             "secretWords": ["word1", "word2", "word3"]
         }
     }
     ```
   > **Note:** Save the UID and secret words securely as they are required for account management.

2. **Create New API Key**
   ```bash
   POST /auth/create-new-api-key
   ```
   - **Request Body:**
     ```json
     {
         "uid": "your-account-uid",
         "secretWords": "word1,word2,word3"
     }
     ```
   - **Response:**
     ```json
     {
         "success": true,
         "message": "API key created successfully",
         "apiKey": "rf_xxxxxxxxxxxxx"
     }
     ```

3. **Disable API Key**
   ```bash
   POST /auth/disable-api-key
   ```
   - **Request Body:**
     ```json
     {
         "uid": "your-account-uid",
         "secretWords": "word1,word2,word3",
         "apiKey": "rf_xxxxxxxxxxxxx"
     }
     ```
   - **Response:**
     ```json
     {
         "success": true,
         "message": "API Key disabled"
     }
     ```

4. **Enable API Key**
   ```bash
   POST /auth/enable-api-key
   ```
   - **Request Body:**
     ```json
     {
         "uid": "your-account-uid",
         "secretWords": "word1,word2,word3",
         "apiKey": "rf_xxxxxxxxxxxxx"
     }
     ```
   - **Response:**
     ```json
     {
         "success": true,
         "message": "API key enabled successfully"
     }
     ```

5. **Delete API Key**
   ```bash
   POST /auth/delete-api-key
   ```
   - **Request Body:**
     ```json
     {
         "uid": "your-account-uid",
         "secretWords": "word1,word2,word3",
         "apiKey": "rf_xxxxxxxxxxxxx"
     }
     ```
   - **Response:**
     ```json
     {
         "success": true,
         "message": "API Key deleted, check your email for more information"
     }
     ```

6. **Disable Account**
   ```bash
   POST /auth/disable-account
   ```
   - **Request Body:**
     ```json
     {
         "uid": "your-account-uid",
         "secretWords": "word1,word2,word3"
     }
     ```
   - **Response:**
     ```json
     {
         "success": true,
         "message": "Account disabled, check your email for more information"
     }
     ```

7. **Enable Account**
   ```bash
   POST /auth/enable-account
   ```
   - **Request Body:**
     ```json
     {
         "uid": "your-account-uid",
         "secretWords": "word1,word2,word3"
     }
     ```
   - **Response:**
     ```json
     {
         "success": true,
         "message": "Account enabled, check your email for more information"
     }
     ```

8. **Delete Account**
   ```bash
   POST /auth/delete-account
   ```
   - **Request Body:**
     ```json
     {
         "uid": "your-account-uid",
         "secretWords": "word1,word2,word3"
     }
     ```
   - **Response:**
     ```json
     {
         "success": true,
         "message": "Account deleted, check your email for more information"
     }
     ```

### Important Notes
- All endpoints require secret words to be comma-separated.
- Email notifications are sent for significant account actions.
- API keys format: `rf_` followed by 32 hexadecimal characters.
- Maximum 5 API keys per account.
- Keep your UID and secret words secure as they are required for all account management actions.
- All responses include a `success` boolean and a `message` string.
- Error responses will return `success: false` along with an appropriate error message.

### Common Error Responses
```json
{
    "success": false,
    "message": "Invalid uid"
}
```
```json
{
    "success": false,
    "message": "Secret words required"
}
```
```json
{
    "success": false,
    "message": "User not found or invalid secret words"
}
```

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

3. **Create a `.env` file:**
   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/rate-flow
   EMAIL_USERNAME=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   OER_APP_ID=your_open_exchange_rates_app_id
   OER_BASE_URL=https://openexchangerates.org/api/
   ```

4. **Build and run the application:**
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
- Email verification for

 account creation
- Secure password storage (hashed)

## Contributions

Contributions are welcome! Please submit issues and pull requests to improve the API.

## License

[MIT License](LICENSE)
