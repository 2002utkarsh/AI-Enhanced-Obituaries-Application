# AI-Enhanced Obituaries Application

A serverless, full-stack web application that generates personalized, multimedia obituaries using AI and cloud services. The system integrates multiple AWS components and third-party APIs to deliver an automated, dynamic user experience from minimal user input.

---

## Project Overview

This project leverages artificial intelligence and cloud infrastructure to simplify and modernize obituary creation. Users provide key personal details, and the application automatically generates high-quality written content, voice narration, and media assets.  
The backend orchestrates generative text, text-to-speech, and media management services in a scalable, serverless environment.

Key capabilities include:
- Automated obituary text generation using the ChatGPT API  
- AI-generated speech output through Amazon Polly  
- Cloud-based media storage and optimization with Cloudinary  
- Terraform-based infrastructure provisioning and CI/CD automation on AWS  
- Serverless architecture for efficient cost scaling and minimal maintenance

---

## Features

- End-to-end automation: from user input to AI-generated output  
- Fully serverless deployment on AWS S3 and Lambda  
- Text-to-speech generation using Amazon Polly  
- Dynamic media management with Cloudinary  
- Infrastructure defined and deployed with Terraform  
- Continuous deployment pipeline for consistent updates  
- React-based frontend delivering a responsive and intuitive UI

---

## Tech Stack

- **Frontend:** React (TypeScript)  
- **Backend:** AWS Lambda (Node.js)  
- **Infrastructure:** Terraform  
- **AI Integration:** OpenAI / ChatGPT API  
- **Speech Synthesis:** Amazon Polly  
- **Media Storage:** Cloudinary and AWS S3  
- **Deployment:** AWS CI/CD with Terraform automation  

---

## Build and Setup

### Prerequisites
- Node.js 18+  
- Terraform v1.3+  
- AWS account with access credentials configured  
- Cloudinary API credentials  
- OpenAI API key  
- Amazon Polly IAM permissions  

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/ai-obituaries-app.git
cd ai-obituaries-app
