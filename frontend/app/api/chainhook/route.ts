import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // 1. Get the raw body if needed for signature verification in the future
        // const rawBody = await request.text(); 

        // 2. Parse the JSON body
        const body = await request.json();

        // 3. Log the event for debugging
        console.log('[Chainhook] Event Received:', {
            timestamp: new Date().toISOString(),
            type: body.apply ? 'rollback' : 'apply', // naive check, actual payload depends on config
            payload: JSON.stringify(body, null, 2).slice(0, 500) + '...' // truncate for logs
        });

        // 4. Process the event (e.g., update database, trigger frontend update via websocket)
        // TODO: Implement specific logic based on user requirements
        // if (body.apply) { ... }

        return NextResponse.json({ status: 'success', message: 'Chainhook processed' }, { status: 200 });
    } catch (error) {
        console.error('[Chainhook] Error processing request:', error);
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}
