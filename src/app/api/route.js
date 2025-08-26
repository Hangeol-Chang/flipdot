import { NextResponse } from 'next/server';

export async function GET(request) {
    // SVG API로 리다이렉트
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text') || 'FLIP DOT';
    
    const svgUrl = new URL('/api/svg', request.url);
    svgUrl.searchParams.set('text', text);
    svgUrl.searchParams.set('style', 'basic');
    svgUrl.searchParams.set('dotSize', '20');
    svgUrl.searchParams.set('spacing', '2');
    
    return NextResponse.redirect(svgUrl);
}