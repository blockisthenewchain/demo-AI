// app/api/pilotstack-demo-login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get the token from x-ps-demo-token header
    const token = req.headers.get('x-ps-demo-token');
    
    if (!token) {
      console.error('Missing demo token');
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    // Create demo session with more detailed user info
    const demoUser = {
      id: 'demo-' + Date.now(),
      email: 'demo@pilotstack.app',
      name: 'Demo User',
      role: 'buyer',
      isDemo: true,
      demoSessionId: 'session-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    
    // Set session cookie and redirect headers
    const headers = new Headers();
    
    // Set a more detailed session cookie
    headers.append(
      'Set-Cookie', 
      `pilotstack-demo-session=${JSON.stringify(demoUser)}; `+
      `Path=/; `+
      `HttpOnly; `+
      `Secure; `+
      `SameSite=None; `+
      `Max-Age=3600`  // 1 hour expiry
    );
    
    // Redirect to buyer dashboard since the demo user is a buyer
    headers.append('Location', '/dashboard/buyer');
    
    // Important: Return 302 redirect status
    return new NextResponse(null, { 
      status: 302, 
      headers 
    });
    
  } catch (error) {
    console.error('Demo login error:', error);
    
    // Fallback: still redirect with a basic session
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