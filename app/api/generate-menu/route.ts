import { NextResponse } from 'next/server';
import { generateMenu } from '@/lib/google-ai';

export async function POST(request: Request) {
  try {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      return NextResponse.json(
        { error: "Google AI API key not configured" },
        { status: 500 }
      );
    }

    const { subject } = await request.json();

    if (!subject) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    const menuText = await generateMenu(subject);

    return NextResponse.json({ 
      success: true,
      menu: menuText 
    });

  } catch (error: any) {
    console.error('Error generating menu:', error);
    
    return NextResponse.json(
      { 
        error: "Failed to generate menu",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
