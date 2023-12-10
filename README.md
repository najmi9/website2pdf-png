# Web Capture Service

The Web Capture Service is a Node.js application that utilizes Puppeteer and Express to capture screenshots and PDFs of specified websites. Additionally, it logs website details and IP addresses to a JSON file.

## Getting Started

### Prerequisites

- Node.js installed on your machine. [Download Node.js](https://nodejs.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/web-capture-service.git
   ```

2. Navigate to the project directory:

   ```bash
   cd web-capture-service
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

   The server will be running at [http://localhost:3000](http://localhost:3000).

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the home page.

3. Use the API endpoint to capture screenshots and PDFs. Example:

   ```bash
   GET http://localhost:3000/api/make?website=https://example.com
   ```

   This will capture a screenshot and PDF of the specified website and provide download links.

### API Endpoint

- **Endpoint**: `/api/make`
- **Method**: `GET`
- **Parameters**:
  - `website` (required): The URL of the website you want to capture.

### Response

The API response includes download links for the captured screenshot and PDF:

```json
{
  "screenshot_path": "http://localhost:3000/download/capture-website.png",
  "pdf_path": "http://localhost:3000/download/capture-website.pdf"
}
```

## Configuration

- The `public` directory contains captured images and PDFs.
- The `data.json` file logs website details and IP addresses.

## Contributing

Feel free to contribute to this project. Submit bug reports, feature requests, or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Puppeteer](https://pptr.dev/)
- [Express](https://expressjs.com/)
