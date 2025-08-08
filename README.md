# AWS Contact Book — Serverless Project

This project is a serverless contact book application using AWS Lambda, API Gateway, DynamoDB, S3, and CloudFront. It allows users to submit contact details and view saved messages.

---

## Project Architecture

User → CloudFront → S3 (HTML/JS) → API Gateway → Lambda → DynamoDB

![Architecture diagram](architecture.png)

 CloudFront → S3 → API Gateway → Lambda → DynamoDB.

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

![Step 1 — Frontend mockup](FONTEND.png)

screenshot of the form UI or a wireframe showing form fields and buttons.

---

### Step 2: Create DynamoDB Table
- Open the AWS Console → DynamoDB → Create table.
- Table name: `Serverless`
- Primary key: `msg` (String)
- Use on-demand capacity mode for simplicity.

![Step 2 — DynamoDB Create Table](DynamoDB-Table.png)

capture the "Create table" page showing the table name and primary key.

---

### Step 3: Create Lambda Functions
- Create two Lambda functions:
  - POST Lambda — receives form data and stores it in DynamoDB with a unique ID.
  - GET Lambda — retrieves saved contact entries from DynamoDB.
- Assign the Lambda execution role the necessary DynamoDB permissions and test using sample payloads.
  
-GET Lambda 

![Step 3 — Lambda functions](GETLAMBDAFUNCTION.png)

-POST Lambda

![Step 3 — Lambda functions](POSTLAMBDAFUNCTION.png)

the Lambda console with the function list or the function configuration page.

---

### Step 4: Set Up API Gateway
- Create an HTTP API in API Gateway.
- Create two routes:
  - POST /contacts → POST Lambda
  - GET /contacts → GET Lambda
- Enable CORS for your frontend origin (or `*` for testing), deploy the API, and copy the invoke URL(s).

![Step 4 — API Gateway routes](APIGATEWAYPOST,GET.png)

 API Gateway routes or the deployed API overview with the invoke URL visible.

---

### Step 5: Deploy Frontend to S3
- Create an S3 bucket (globally unique name).
- Enable static website hosting in the bucket properties.
- Upload the frontend files (index.html, script.js, and any assets).
- Configure public read (or use CloudFront).

![Step 5 — S3 static website hosting](S3BUCKETUPLOAD.png)

show the S3 bucket static website hosting settings and the uploaded files.

---

### Step 6: Create CloudFront Distribution
- Create a CloudFront distribution using the S3 website or S3 origin.
- Set Default Root Object to `index.html`.
- Configure caching, HTTPS, and (optionally) an origin access identity.
- Use the CloudFront domain name as the public URL for the app (or map a custom domain).

![Step 6 — CloudFront distribution](Cloudfont-S3-Link.png)

capture CloudFront distribution settings and the distribution domain name.

---

### Step 7: (Optional) Configure a Custom Domain with Route 53
- Register or use an existing domain in Route 53.
- Create an Alias record pointing to the CloudFront distribution.
- Request/attach an ACM certificate (us-east-1 for CloudFront) and enable HTTPS.

![Step 7 — Route 53 record](Route53.png)

show the Hosted Zone and the Alias record pointing to CloudFront.

---

## Testing and Verification
- Visit the CloudFront URL (or custom domain) in a browser.
- Submit the contact form and confirm the entry appears in the DynamoDB table (or check Lambda logs).
- Click "View Messages" in the frontend and confirm GET returns stored messages.



---



## License
Open Source to use
