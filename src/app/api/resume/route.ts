import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_DRIVE_PDF_URL = "https://drive.usercontent.google.com/u/0/uc?id=1rhQdSeDsF9sdg_Fp7wqrGnlF1KR4X2km&export=download";

export async function GET(req: NextRequest, ) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const response = await fetch(GOOGLE_DRIVE_PDF_URL, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="resume.pdf"',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch PDF');
    }

    // const pdfBuffer = await response.arrayBuffer();

    // // Set CORS headers
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // // Set PDF content type
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'inline; filename="resume.pdf"');
    
    // Send PDF content
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return NextResponse.json({ message: 'Error fetching PDF' }, { status: 500 });
  }
}

// Configure the API route to handle larger files
export const config = {
  api: {
    responseLimit: false,
    bodyParser: false,
  },
};