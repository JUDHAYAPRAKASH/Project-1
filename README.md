# AWS Contact Book — Serverless Project

This project is a serverless contact book application using AWS Lambda, API Gateway, DynamoDB, S3, and CloudFront. It allows users to submit contact details and view saved messages.

---

## Project Architecture

User → CloudFront → S3 (HTML/JS) → API Gateway → Lambda → DynamoDB

![Architecture diagram](architecture.jpg)

Suggested image: `assets/images/architecture.png` — a simple diagram showing CloudFront → S3 → API Gateway → Lambda → DynamoDB.

---

## Features

- Fully serverless design, no traditional backend server.
- Save contact details (Name, Email, Message) in DynamoDB.
- View all saved messages via the frontend.
- IAM-based security for Lambda / DynamoDB access.
- Global delivery via CloudFront.

---

## Step-by-Step Setup (each step includes an image)

### Step 1: Prepare the Frontend
- Create an HTML page with a form containing fields for name, email, and message and include "Save" and "View Messages" controls.
- Add JavaScript that sends a POST request to save contact details and a GET request to retrieve messages.
- Place a screenshot or wireframe showing the form and UI interaction.

![Step 1 — Frontend mockup](assets/images/step1-frontend.png)

Suggested image: `assets/images/step1-frontend.png` — screenshot of the form UI or a wireframe showing form fields and buttons.

---

### Step 2: Create DynamoDB Table
- Open the AWS Console → DynamoDB → Create table.
- Table name: `ContactBook`
- Primary key: `id` (String)
- Use on-demand capacity mode for simplicity.

![Step 2 — DynamoDB Create Table](assets/images/step2-dynamodb.png)

Suggested image: `assets/images/step2-dynamodb.png` — capture the "Create table" page showing the table name and primary key.

---

### Step 3: Create Lambda Functions
- Create two Lambda functions:
  - POST Lambda — receives form data and stores it in DynamoDB with a unique ID.
  - GET Lambda — retrieves saved contact entries from DynamoDB.
- Assign the Lambda execution role the necessary DynamoDB permissions and test using sample payloads.

![Step 3 — Lambda functions](assets/images/step3-lambda.png)

Suggested image: `assets/images/step3-lambda.png` — show the Lambda console with the function list or the function configuration page.

---

### Step 4: Set Up API Gateway
- Create an HTTP API in API Gateway.
- Create two routes:
  - POST /contacts → POST Lambda
  - GET /contacts → GET Lambda
- Enable CORS for your frontend origin (or `*` for testing), deploy the API, and copy the invoke URL(s).

![Step 4 — API Gateway routes](assets/images/step4-apigateway.png)

Suggested image: `assets/images/step4-apigateway.png` — screenshot of API Gateway routes or the deployed API overview with the invoke URL visible.

---

### Step 5: Deploy Frontend to S3
- Create an S3 bucket (globally unique name).
- Enable static website hosting in the bucket properties.
- Upload the frontend files (index.html, script.js, and any assets).
- Configure public read (or use CloudFront + OAI for a private origin).

![Step 5 — S3 static website hosting](assets/images/step5-s3.png)

Suggested image: `assets/images/step5-s3.png` — show the S3 bucket static website hosting settings and the uploaded files.

---

### Step 6: Create CloudFront Distribution
- Create a CloudFront distribution using the S3 website or S3 origin.
- Set Default Root Object to `index.html`.
- Configure caching, HTTPS, and (optionally) an origin access identity.
- Use the CloudFront domain name as the public URL for the app (or map a custom domain).

![Step 6 — CloudFront distribution](assets/images/step6-cloudfront.png)

Suggested image: `assets/images/step6-cloudfront.png` — capture CloudFront distribution settings and the distribution domain name.

---

### Step 7: (Optional) Configure a Custom Domain with Route 53
- Register or use an existing domain in Route 53.
- Create an Alias record pointing to the CloudFront distribution.
- Request/attach an ACM certificate (us-east-1 for CloudFront) and enable HTTPS.

![Step 7 — Route 53 record](assets/images/step7-route53.png)

Suggested image: `assets/images/step7-route53.png` — show the Hosted Zone and the Alias record pointing to CloudFront.

---

## Testing and Verification
- Visit the CloudFront URL (or custom domain) in a browser.
- Submit the contact form and confirm the entry appears in the DynamoDB table (or check Lambda logs).
- Click "View Messages" in the frontend and confirm GET returns stored messages.

![Testing and verification](assets/images/testing.png)

Suggested image: `assets/images/testing.png` — screenshot of the live site with a sample saved message and a DynamoDB console item.

---

## Where to put images
Create an `assets/images/` directory in the repository and add these files:
- `architecture.png`
- `step1-frontend.png`
- `step2-dynamodb.png`
- `step3-lambda.png`
- `step4-apigateway.png`
- `step5-s3.png`
- `step6-cloudfront.png`
- `step7-route53.png`
- `testing.png`

Commit those images to your repo so the README renders them in place.

---

## License
MIT License
