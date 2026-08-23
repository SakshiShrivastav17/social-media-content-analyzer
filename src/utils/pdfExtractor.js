import * as pdfjsLib from 'pdfjs-dist';

// Configure the worker explicitly for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      let pageText = '';
      let lastY = null;

      textContent.items.forEach(item => {
        // The 6th element in the transform array is the Y coordinate
        const currentY = item.transform[5];
        
        if (lastY !== null && Math.abs(lastY - currentY) > 5) {
          // Significant change in Y coordinate implies a new line
          pageText += '\n';
        } else if (lastY !== null) {
          // Same line, just add a space
          pageText += ' ';
        }
        
        pageText += item.str;
        lastY = currentY;
      });
        
      fullText += `--- Page ${i} ---\n${pageText}\n\n`;
    }

    return fullText;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw new Error("Failed to extract text from PDF. Please ensure it's a valid PDF file.");
  }
};
