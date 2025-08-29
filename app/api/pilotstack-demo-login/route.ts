import { NextRequest, NextResponse } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { createDemoUser, type DemoTokenPayload } from '@/lib/auth';



const JWKS = createRemoteJWKSet(new URL('https://pilotstack.app/api/jwks'));

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('x-ps-demo-token') || 
                 req.headers.get('authorization')?.replace('Bearer ', '') || '';
                 
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWKS);
    
    // Fix: Use the actual field names from PilotStack's JWT
    if (!payload.buyerEmail || !payload.sessionId || !payload.listingId || !payload.exp) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 });
    }
    
    // Fix: Use the correct field names
    const demoPayload: DemoTokenPayload = {
      buyerEmail: payload.buyerEmail as string,
      demoSessionId: payload.sessionId as string,  // ← Changed from demoSessionId to sessionId
      listingId: payload.listingId as string,
      exp: payload.exp
    };
    
    const demoUser = createDemoUser(demoPayload);
    
    const headers = new Headers();
    headers.append('Set-Cookie', `pilotstack-user=${JSON.stringify(demoUser)}; Path=/; HttpOnly; Secure; SameSite=None`);
    headers.append('Location', '/');
    
    return new NextResponse(null, { status: 302, headers });
  } catch (e) {
    console.error('JWT verification error:', e); // Add logging
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
