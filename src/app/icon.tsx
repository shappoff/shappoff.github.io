import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'
export const dynamic = 'force-static';
// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                }}
            >
                Ш
            </div>
        ),
        {
            width: 32,
            height: 32
        }
    )
}
