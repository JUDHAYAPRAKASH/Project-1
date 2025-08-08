# AWS Contact Book — Serverless Application

A fully serverless contact book built with **AWS Lambda**, **DynamoDB**, **API Gateway**, **S3**, and **CloudFront**.  
This project allows users to submit contact details via a web form, store them in DynamoDB, and retrieve all saved contacts.

---

## 📌 Architecture

**Flow:**
```
User → CloudFront → S3 (HTML/JS) → API Gateway → Lambda → DynamoDB
```

---

## 🚀 Features

- **Serverless** — No servers to manage.
- **Secure & Scalable** — Uses AWS-managed services.
- **Two Lambda Functions**:
  - **POST**: Save contact details to DynamoDB.
  - **GET**: Retrieve all saved contacts.
- **Static Hosting** with S3 + CloudFront for global delivery.

---

## 🛠️ Step-by-Step Setup

### **1️⃣ Design the Contact Form (Frontend)**

1. Create `index.html` with:
   - Name
   - Email
   - Message
   - **Save** button → Adds data
   - **View Messages** button → Fetches all data
2. Create `script.js`:
   - Send **POST** request to API Gateway URL when saving data.
   - Send **GET** request to API Gateway URL when viewing messages.

Example:
```javascript
fetch('<API_GATEWAY_POST_URL>', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

fetch('<API_GATEWAY_GET_URL>')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### **2️⃣ Create DynamoDB Table**

1. Go to **AWS DynamoDB** → Create Table:
   - **Table name**: `ContactBook`
   - **Primary key**: `id` (String)
2. Use **On-Demand capacity mode**.
3. Note **table name** and **region**.

---

### **3️⃣ Create Lambda Functions**

You’ll need two functions:

#### POST Lambda (Save Contact)
- Inserts data into DynamoDB using `putItem` / `PutCommand`.

#### GET Lambda (Fetch Contacts)
- Retrieves all items using `scan` / `ScanCommand`.

**Setup Steps:**
1. **Create Function** → Author from scratch.
2. **Runtime**: Node.js or Python.
3. **IAM Role**: Attach `AmazonDynamoDBFullAccess` (or minimal permissions).
4. Test with sample payload.

---

### **4️⃣ Create API Gateway Endpoints**

1. Go to **Amazon API Gateway** → Create **HTTP API**.
2. Routes:
   - `POST /contacts` → POST Lambda
   - `GET /contacts` → GET Lambda
3. Enable **CORS**:
   - Allow origins: `*` (or your S3 domain)
   - Methods: `GET, POST`
4. Deploy API → Copy **Invoke URL**.
5. Update `script.js` with POST and GET URLs.

---

### **5️⃣ Upload Frontend to S3**

1. Create **S3 bucket** (globally unique name).
2. Enable **Static website hosting**.
3. Upload `index.html` and `script.js`.
4. Make files public (bucket policy).
5. Test via **S3 static website URL**.

---

### **6️⃣ Create CloudFront Distribution**

1. Go to **CloudFront** → Create Distribution.
2. Origin → Select your S3 bucket.
3. Default Root Object → `index.html`.
4. Copy **CloudFront URL** → Test app.

---

### **7️⃣ (Optional) Route 53 Custom Domain**

1. Buy or use an existing domain in **Route 53**.
2. Create **Alias A Record** → CloudFront Distribution.
3. Access via `https://yourdomain.com`.

---

## ✅ Final Result

- **Frontend**: HTML/JS in S3 served via CloudFront.
- **Backend**: Lambda functions triggered by API Gateway.
- **Database**: DynamoDB storing contact data.

---

## 📂 Project Structure
```
.
├── index.html      # Frontend UI
├── script.js       # API calls to AWS
├── lambda-post.js  # Lambda function to save contact
├── lambda-get.js   # Lambda function to fetch contacts
└── README.md       # Documentation
```

---

## 🖥️ Example Lambda Code

**POST Lambda (Node.js)**
```javascript
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const item = {
    id: uuidv4(),
    name: body.name,
    email: body.email,
    message: body.message,
    createdAt: new Date().toISOString()
  };
  await dynamo.put({ TableName: TABLE_NAME, Item: item }).promise();
  return { statusCode: 200, body: JSON.stringify({ message: 'Contact saved successfully' }) };
};
```

**GET Lambda (Node.js)**
```javascript
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async () => {
  const result = await dynamo.scan({ TableName: TABLE_NAME }).promise();
  return { statusCode: 200, body: JSON.stringify(result.Items) };
};
```

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).
