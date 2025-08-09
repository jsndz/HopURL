# URL Shortener Backend

A robust URL shortener API built with Node.js, Express, and MongoDB. This service provides URL shortening capabilities with visit tracking, admin management, and comprehensive error handling.

## Features

- ✅ **URL Shortening**: Convert long URLs into short, shareable links
- ✅ **Visit Tracking**: Monitor click counts for each shortened URL
- ✅ **Admin Dashboard**: Comprehensive admin API for managing URLs
- ✅ **Rate Limiting**: Protect against abuse with intelligent rate limiting
- ✅ **URL Validation**: Robust URL format validation
- ✅ **MongoDB Integration**: Scalable data storage with Mongoose
- ✅ **CORS Support**: Ready for frontend integration
- ✅ **Production Ready**: Environment-based configuration

## API Endpoints

### 1. Shorten URL
```
POST /api/shorten
Content-Type: application/json

{
  "original_url": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "short_code": "abc123x",
    "short_url": "http://localhost:3000/abc123x"
  }
}
```

### 2. Redirect to Original URL
```
GET /:shortcode
```

Redirects to the original URL and increments visit count.

### 3. Admin - List All URLs
```
GET /api/admin/list
X-Admin-Key: your-super-secret-admin-key-here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "urls": [
      {
        "original_url": "https://example.com",
        "short_code": "abc123x",
        "short_url": "http://localhost:3000/abc123x",
        "visit_count": 42,
        "created_at": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_urls": 1,
      "per_page": 50
    }
  }
}
```

### 4. Admin - System Statistics
```
GET /api/admin/stats
X-Admin-Key: your-super-secret-admin-key-here
```

### 5. Health Check
```
GET /health
```

## Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Update the `.env` file with your settings:
   ```env
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   PORT=3000
   NODE_ENV=development
   ADMIN_KEY=your-super-secret-admin-key-here
   BASE_URL=http://localhost:3000
   ```

3. **Start MongoDB:**
   
   Make sure MongoDB is running on your system.

4. **Run the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/url-shortener` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `ADMIN_KEY` | Secret key for admin endpoints | Required |
| `BASE_URL` | Base URL for shortened links | `http://localhost:3000` |

## Rate Limiting

- **URL Shortening**: 20 requests per 15 minutes per IP
- **URL Redirects**: 100 requests per minute per IP
- **Admin Endpoints**: No rate limiting (protected by admin key)

## Database Schema

```javascript
{
  original_url: String,     // The original long URL
  short_code: String,       // Generated short code (unique)
  visit_count: Number,      // Number of times accessed
  created_at: Date,         // Creation timestamp
  updated_at: Date          // Last update timestamp
}
```

## Security Features

- Input validation and sanitization
- Rate limiting to prevent abuse
- Admin endpoints protected with secret key
- CORS configuration for frontend integration
- Comprehensive error handling

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Update `BASE_URL` to your production domain
3. Configure CORS origins for your frontend domain
4. Use a production-grade MongoDB instance
5. Set a strong `ADMIN_KEY`

## Testing the API

Use the root endpoint (`GET /`) to see comprehensive API documentation with example requests and responses.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: valid-url library
- **Short Code Generation**: nanoid
- **Rate Limiting**: express-rate-limit
- **CORS**: cors middleware