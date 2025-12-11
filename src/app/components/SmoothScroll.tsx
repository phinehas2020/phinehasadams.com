'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

type ReactLenisChildren = Parameters<typeof ReactLenis>[0]['children'];

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children as unknown as ReactLenisChildren}
        </ReactLenis>
    );
}
