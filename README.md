# Rate Flow

A RESTful API for retrieving real-time currency exchange rates and currency codes.

## Description

This Currency Exchange API provides access to up-to-date currency exchange rates and codes. It's designed to be simple and easy to integrate into any application that requires currency conversion.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ridwanade0/rate-flow.git
   cd currency-exchange-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:
   ```
PORT = 3000
OER_API_KEY = ***************************
OER_BASE_URL = https://openexchangerates.org/api
MONGODB_URI = mongodb://localhost:27017/rate-flow
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Usage

### Get Currency Codes

**Endpoint:** `GET /api/v1/currencies`

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/v1/codes.json
```

**Response:**
```json
{
    "currencies": {
        "USD": "United States Dollar",
        "EUR": "Euro",
        // other currencies...
    }
}
```

### Get Exchange Rates

**Endpoint:** `GET /api/v1/latest.json`

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/v1/latest.json
```

**Response:**
```json
{
    "base": "USD",
    "date": "2024-10-02",
    "rates": {
        "EUR": 0.85,
        // other rates...
    }
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/MyFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/MyFeature`).
5. Open a pull request.

