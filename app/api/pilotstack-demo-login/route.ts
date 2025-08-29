import { NextRequest, NextResponse } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { createDemoUser, type DemoTokenPayload } from '@/lib/auth';

const JWKS = createRemoteJWKSet(new URL('https://pilotstack.app/api/jwks'));

export async function POST(req: NextRequest) {
  try {
    // Check for token in x-ps-demo-token header first, then fallback to Authorization
    const token = req.headers.get('x-ps-demo-token') || 
                 req.headers.get('authorization')?.replace('Bearer ', '') || '';
                 
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWKS);
    
    // Validate required fields in payload
    if (!payload.buyerEmail || !payload.demoSessionId || !payload.listingId || !payload.exp) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 });
    }
    
    // Create a demo user session
    const demoPayload: DemoTokenPayload = {
      buyerEmail: payload.buyerEmail as string,
      demoSessionId: payload.demoSessionId as string,
      listingId: payload.listingId as string,
      exp: payload.exp
    };
    const demoUser = createDemoUser(demoPayload);
    
    // Set the user session in a cookie
    const headers = new Headers();
    headers.append('Set-Cookie', `pilotstack-user=${JSON.stringify(demoUser)}; Path=/; HttpOnly; Secure; SameSite=None`);
    headers.append('Location', '/');
    
    return new NextResponse(null, { status: 302, headers });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
