# API Documentation - JobAlert Portal

Complete API reference with examples and request/response formats.

## Base URL

### Development
```
http://localhost:5000/api
```

### Production
```
https://your-backend-url.render.com/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

## 🔐 Authentication Endpoints

### Login
Create a new JWT session with admin credentials.

**Endpoint:** `POST /auth/login`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmail.com",
    "password": "admin123"
  }'
```

**Request Body:**
```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "email": "admin@gmail.com"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Admin email address |
| password | string | Yes | Admin password |

---

## 💼 Job Endpoints

### Get All Jobs
Retrieve a paginated list of all jobs with optional filters.

**Endpoint:** `GET /jobs`

**Request:**
```bash
# Get all jobs
curl http://localhost:5000/api/jobs

# With filters and pagination
curl "http://localhost:5000/api/jobs?search=react&category=Frontend&page=1&limit=12"

# Featured jobs only
curl "http://localhost:5000/api/jobs?featured=true"

# Filter by location and experience
curl "http://localhost:5000/api/jobs?location=New York&experience=Senior"
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| search | string | - | Search by title, company, or description |
| category | string | - | Filter by job category |
| location | string | - | Filter by location |
| experience | string | - | Filter by experience level |
| featured | boolean | - | Show featured jobs only |
| page | number | 1 | Page number for pagination |
| limit | number | 12 | Items per page |

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Senior React Developer",
      "company": "Google",
      "location": "San Francisco, USA",
      "salary": "$120,000 - $150,000",
      "experience": "Senior",
      "category": "Frontend",
      "description": "We are looking for an experienced React developer...",
      "apply_link": "https://google.com/careers",
      "company_logo": "https://via.placeholder.com/150?text=Google",
      "featured": true,
      "created_at": "2024-05-16T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 12
  }
}
```

---

### Get Single Job
Retrieve detailed information about a specific job.

**Endpoint:** `GET /jobs/:id`

**Request:**
```bash
curl http://localhost:5000/api/jobs/1
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | number | Job ID |

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "title": "Senior React Developer",
    "company": "Google",
    "location": "San Francisco, USA",
    "salary": "$120,000 - $150,000",
    "experience": "Senior",
    "category": "Frontend",
    "description": "We are looking for an experienced React developer to join our team...",
    "apply_link": "https://google.com/careers",
    "company_logo": "https://via.placeholder.com/150?text=Google",
    "featured": true,
    "created_at": "2024-05-16T10:00:00Z",
    "updated_at": "2024-05-16T10:00:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Job not found"
}
```

---

### Create Job ⚡ Protected
Create a new job listing. Requires authentication.

**Endpoint:** `POST /jobs`

**Request:**
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer",
    "company": "Microsoft",
    "location": "New York, USA",
    "salary": "$100,000 - $130,000",
    "experience": "Mid Level",
    "category": "Full Stack",
    "description": "Join our dynamic team...",
    "apply_link": "https://microsoft.com/careers",
    "company_logo": "https://example.com/microsoft.png",
    "featured": true
  }'
```

**Request Body:**
```json
{
  "title": "Full Stack Developer",
  "company": "Microsoft",
  "location": "New York, USA",
  "salary": "$100,000 - $130,000",
  "experience": "Mid Level",
  "category": "Full Stack",
  "description": "Join our dynamic team as a Full Stack Developer...",
  "apply_link": "https://microsoft.com/careers",
  "company_logo": "https://example.com/microsoft.png",
  "featured": true
}
```

**Required Fields:**
- title
- company
- location
- salary
- experience
- category
- description
- apply_link

**Optional Fields:**
- company_logo
- featured (default: false)

**Response (201 Created):**
```json
{
  "message": "Job created successfully",
  "data": {
    "id": 42,
    "title": "Full Stack Developer",
    "company": "Microsoft",
    "location": "New York, USA",
    "salary": "$100,000 - $130,000",
    "experience": "Mid Level",
    "category": "Full Stack",
    "description": "Join our dynamic team as a Full Stack Developer...",
    "apply_link": "https://microsoft.com/careers",
    "company_logo": "https://example.com/microsoft.png",
    "featured": true,
    "created_at": "2024-05-16T12:00:00Z"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "No token provided"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Missing required fields"
}
```

---

### Update Job ⚡ Protected
Update an existing job listing. Requires authentication.

**Endpoint:** `PUT /jobs/:id`

**Request:**
```bash
curl -X PUT http://localhost:5000/api/jobs/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior React Developer",
    "company": "Google",
    "location": "San Francisco, USA",
    "salary": "$130,000 - $160,000",
    "experience": "Senior",
    "category": "Frontend",
    "description": "Updated job description...",
    "apply_link": "https://google.com/careers",
    "company_logo": "https://example.com/google.png",
    "featured": true
  }'
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | number | Job ID |

**Request Body:**
```json
{
  "title": "Senior React Developer",
  "company": "Google",
  "location": "San Francisco, USA",
  "salary": "$130,000 - $160,000",
  "experience": "Senior",
  "category": "Frontend",
  "description": "Updated job description...",
  "apply_link": "https://google.com/careers",
  "company_logo": "https://example.com/google.png",
  "featured": true
}
```

**Response (200 OK):**
```json
{
  "message": "Job updated successfully",
  "data": {
    "id": 1,
    "title": "Senior React Developer",
    "company": "Google",
    "location": "San Francisco, USA",
    "salary": "$130,000 - $160,000",
    "experience": "Senior",
    "category": "Frontend",
    "description": "Updated job description...",
    "apply_link": "https://google.com/careers",
    "company_logo": "https://example.com/google.png",
    "featured": true,
    "created_at": "2024-05-16T10:00:00Z",
    "updated_at": "2024-05-16T13:00:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Job not found"
}
```

---

### Delete Job ⚡ Protected
Delete a job listing. Requires authentication.

**Endpoint:** `DELETE /jobs/:id`

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/jobs/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | number | Job ID |

**Response (200 OK):**
```json
{
  "message": "Job deleted successfully"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "No token provided"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Job not found"
}
```

---

## 📊 Valid Values

### Categories
```
- Frontend
- Backend
- Full Stack
- DevOps
- Data Science
- UI/UX
- Mobile
- Other
```

### Experience Levels
```
- Entry Level
- Mid Level
- Senior
- Executive
```

---

## 🔄 Usage Examples

### Complete Job Creation Flow

**Step 1: Login**
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmail.com",
    "password": "admin123"
  }'
```

Response includes `token`. Save it.

**Step 2: Create Job**
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Developer",
    "company": "Tech Corp",
    "location": "Remote",
    "salary": "$80,000 - $100,000",
    "experience": "Mid Level",
    "category": "Frontend",
    "description": "Build amazing UIs",
    "apply_link": "https://techcorp.com/apply",
    "featured": false
  }'
```

---

## 🛟 Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Job successfully created |
| 400 | Bad Request | Missing/invalid parameters |
| 401 | Unauthorized | Invalid/missing token |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## 📝 Response Format

All responses follow this format:

**Success:**
```json
{
  "data": {},
  "message": "Success message"
}
```

**Error:**
```json
{
  "message": "Error message"
}
```

---

## 🧪 Testing with Postman

1. Open Postman
2. Create new collection: "JobAlert Portal"
3. Set base URL: `http://localhost:5000/api`
4. Create requests for each endpoint
5. In Auth tab, select "Bearer Token"
6. Use token from login response

---

## 🔗 Health Check

Quick test to verify backend is running:

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "message": "Backend is running"
}
```

---

## 📚 SDK Usage (Frontend)

```javascript
import { authService, jobService } from './services/api';

// Login
const { token } = await authService.login('admin@gmail.com', 'admin123');

// Get all jobs
const jobs = await jobService.getAllJobs({ page: 1, limit: 12 });

// Get single job
const job = await jobService.getJobById(1);

// Create job
const newJob = await jobService.createJob({
  title: "Developer",
  company: "Tech Corp",
  location: "Remote",
  salary: "$80k-$100k",
  experience: "Mid Level",
  category: "Frontend",
  description: "Build UIs",
  apply_link: "https://example.com"
});

// Update job
const updated = await jobService.updateJob(1, jobData);

// Delete job
await jobService.deleteJob(1);

// Logout
authService.logout();
```

---

This API documentation should help you integrate and test the JobAlert Portal backend!
