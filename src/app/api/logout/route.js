import { NextResponse } from 'next/server';

export async function POST(req) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('adminAuth');
  return response;
}