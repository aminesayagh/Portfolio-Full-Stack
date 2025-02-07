import { useState, useCallback } from 'react';

interface UsePdfDownloadResult {
  isLoading: boolean;
  error: string | null;
  downloadPdf: (url: string, filename?: string) => Promise<void>;
}

const usePdfDownload = (): UsePdfDownloadResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadPdf = useCallback(async (url: string, filename?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate URL format
      const validUrl = new URL(url);
      if (!validUrl.pathname.endsWith('.pdf')) {
        throw new Error('URL must point to a PDF file');
      }

      // Fetch the PDF file
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }

      // Convert response to blob
      const blob = await response.blob();

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      // Set filename - either provided or from URL
      link.download = filename || url.split('/').pop() || 'download.pdf';
      
      // Append to document, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup blob URL
      window.URL.revokeObjectURL(downloadUrl);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download PDF';
      setError(errorMessage);
      console.error('PDF download error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    downloadPdf,
  };
};

export default usePdfDownload;
