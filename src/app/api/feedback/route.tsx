import { type NextRequest } from 'next/server';

const parse_mode: string = 'Markdown';
const disable_web_page_preview: boolean = true;

export async function GET(request: NextRequest) {
    const {searchParams} = request.nextUrl;

    const text = searchParams.get('text');
    if (text) {
        const encodedText = encodeURIComponent(text);
        await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=162676802&parse_mode=${parse_mode}&disable_web_page_preview=${disable_web_page_preview}&text=${encodedText}`)
        return Response.json({success: 'Sent'});
    } else {
        return Response.json({error: 'No text params'});
    }
}
