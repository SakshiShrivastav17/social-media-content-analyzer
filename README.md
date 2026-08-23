# Social Media Content Analyzer

A web application designed to analyze social media posts from uploaded documents and suggest engagement improvements. This project was built for the Software Engineer Technical Assessment.

## Project Overview

This tool allows users to upload PDF files or scanned images (PNG, JPG) containing social media content. It extracts text from these documents using browser-based PDF parsing and Optical Character Recognition (OCR), and provides insights for engagement optimization based on the extracted content.

## Features

- **Document Upload:** Drag-and-drop or click-to-browse interface for uploading `.pdf`, `.png`, `.jpg`, and `.jpeg` files.
- **Text Extraction (PDF):** Extracts text from PDF files natively in the browser while maintaining basic structure.
- **Text Extraction (OCR):** Uses Tesseract to extract text from images natively in the browser.
- **Engagement Analysis:** Provides mock, rule-based suggestions to improve content engagement (e.g., word count analysis, hashtag and mention detection).
- **Responsive UI:** A premium, modern UI with loading states and graceful error handling.

## Approach Write-up

To meet all technical requirements seamlessly and allow straightforward deployment, I opted for a purely **Frontend (Client-Side) Architecture**. Instead of building a traditional client-server app (which requires managing a backend, file storage, and APIs), I leveraged browser-compatible libraries (`pdfjs-dist` for PDFs and `tesseract.js` for images via WebAssembly).

This serverless approach means the heavy lifting (parsing and OCR) happens directly on the user's device. It significantly reduces hosting complexity, ensuring the application can be served statically on Vercel or Netlify with a single click. For styling, I implemented a custom Vanilla CSS "glassmorphism" design system within a Vite/React scaffold to fulfill the requirement for premium, production-quality UI without relying on heavy CSS frameworks. The state is cleanly managed in React, orchestrating asynchronous tasks with clear progress indicators to ensure an excellent user experience.

*(154 words)*

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd analyzer-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Tech Stack
- **Framework:** React 18, Vite
- **Styling:** Vanilla CSS
- **PDF Extraction:** `pdfjs-dist`
- **OCR:** `tesseract.js`
- **Icons:** `lucide-react`
