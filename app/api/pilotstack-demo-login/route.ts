// app/api/pilotstack-demo-login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('=== Demo Login Endpoint Hit ===');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  console.log('Request headers:', Object.fromEntries(req.headers.entries()));
  
  try {
    const token = req.headers.get('x-ps-demo-token');
    console.log('Demo token received:', !!token);
    
    if (!token) {
      console.error('Missing demo token');
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    console.log('Creating demo user...');
    const demoUser = {
      id: 'demo-' + Date.now(),
      email: 'demo@pilotstack.app',
      name: 'Demo User',
      role: 'buyer',
      isDemo: true,
      demoSessionId: 'session-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    
    console.log('Demo user created:', demoUser);
    
    const headers = new Headers();
    headers.append(
      'Set-Cookie', 
      `pilotstack-demo-session=${JSON.stringify(demoUser)}; `+
      `Path=/; `+
      `HttpOnly; `+
      `Secure; `+
      `SameSite=None; `+
      `Max-Age=3600`
    );
    headers.append('Location', '/dashboard/buyer');
    
    console.log('Returning 302 redirect with headers:', Object.fromEntries(headers.entries()));
    
    return new NextResponse(null, { 
      status: 302, 
      headers 
    });
    
  } catch (error) {
    console.error('Demo login error:', error);
    
    const headers = new Headers();
    headers.append(
      'Set-Cookie', 
      'pilotstack-demo-session=fallback; '+
      'Path=/; '+
      'HttpOnly; '+
      'Secure; '+
      'SameSite=None; '+
      'Max-Age=3600'
    );
    headers.append('Location', '/dashboard/buyer');
    
    return new NextResponse(null, { 
      status: 302, 
      headers 
    });
  }
}