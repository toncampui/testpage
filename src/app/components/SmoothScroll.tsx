"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

function LenisWindowBridge() {
    const lenis = useLenis();
    useEffect(() => {
        if (lenis) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).lenis = lenis;
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (window as any).lenis;
        };
    }, [lenis]);
    return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (typeof window === "undefined") return;

        let startY = 0;
        let startX = 0;
        let startScrollTop = 0;
        let isTouching = false;
        let isSwipeDirectionDetermined = false;
        let isVerticalSwipe = false;
        let activeScrollContainer: HTMLElement | Window | null = null;
        let touchHistory: { y: number; time: number }[] = [];
        let momentumFrameId: number | null = null;

        const checkMobile = () => window.innerWidth < 768;

        const getScrollLimit = (container: HTMLElement | Window) => {
            if (container === window) {
                return document.documentElement.scrollHeight - window.innerHeight;
            } else {
                const el = container as HTMLElement;
                return el.scrollHeight - el.clientHeight;
            }
        };

        const getScrollTop = (container: HTMLElement | Window) => {
            if (container === window) {
                return window.scrollY;
            } else {
                return (container as HTMLElement).scrollTop;
            }
        };

        const setScrollTop = (container: HTMLElement | Window, value: number) => {
            const limit = getScrollLimit(container);
            const clamped = Math.max(0, Math.min(limit, value));
            if (container === window) {
                window.scrollTo(0, clamped);
            } else {
                (container as HTMLElement).scrollTop = clamped;
            }
            return clamped;
        };

        function getScrollableParent(el: HTMLElement | null): HTMLElement | Window {
            if (!el || el === document.body || el === document.documentElement) {
                return window;
            }
            const style = window.getComputedStyle(el);
            const overflowY = style.overflowY;
            const isScrollable = overflowY === "auto" || overflowY === "scroll";
            const canScroll = el.scrollHeight > el.clientHeight;
            if (isScrollable && canScroll) {
                return el;
            }
            return getScrollableParent(el.parentElement);
        }

        const handleTouchStart = (e: TouchEvent) => {
            if (!checkMobile()) return;

            if (momentumFrameId) {
                cancelAnimationFrame(momentumFrameId);
                momentumFrameId = null;
            }

            isTouching = true;
            isSwipeDirectionDetermined = false;
            isVerticalSwipe = false;
            const touch = e.touches[0];
            startY = touch.clientY;
            startX = touch.clientX;
            activeScrollContainer = getScrollableParent(e.target as HTMLElement);
            startScrollTop = getScrollTop(activeScrollContainer);

            touchHistory = [{ y: touch.clientY, time: performance.now() }];
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!checkMobile() || !isTouching || !activeScrollContainer) return;

            const touch = e.touches[0];
            const currentY = touch.clientY;
            const currentX = touch.clientX;
            const now = performance.now();

            if (!isSwipeDirectionDetermined) {
                const dx = Math.abs(currentX - startX);
                const dy = Math.abs(currentY - startY);
                if (dx + dy > 5) {
                    isSwipeDirectionDetermined = true;
                    isVerticalSwipe = dy > dx;
                }
            }

            if (isSwipeDirectionDetermined && !isVerticalSwipe) {
                return;
            }

            // Track touch history for velocity calculation
            touchHistory.push({ y: currentY, time: now });
            if (touchHistory.length > 20) {
                touchHistory.shift();
            }

            const dy = currentY - startY;

            // Dampen manual drag distance by 50%
            const targetScrollTop = startScrollTop - dy * 0.5;
            setScrollTop(activeScrollContainer, targetScrollTop);

            if (e.cancelable) {
                e.preventDefault();
            }
        };

        const handleTouchEnd = () => {
            if (!checkMobile()) return;
            isTouching = false;

            if (touchHistory.length > 1 && activeScrollContainer) {
                const now = performance.now();
                const recentTouches = touchHistory.filter(t => now - t.time < 100);
                if (recentTouches.length > 1) {
                    const first = recentTouches[0];
                    const last = recentTouches[recentTouches.length - 1];
                    const dt = last.time - first.time;
                    if (dt > 10) {
                        const dy = last.y - first.y;
                        // Initial velocity scaled down by 50%
                        let velocity = (dy / dt) * 0.5;

                        let lastTime = performance.now();
                        const container = activeScrollContainer;

                        const step = (time: number) => {
                            const deltaTime = time - lastTime;
                            lastTime = time;

                            const scrollStep = velocity * deltaTime;
                            const currentScrollTop = getScrollTop(container);
                            const limit = getScrollLimit(container);

                            const target = currentScrollTop - scrollStep;
                            const actual = setScrollTop(container, target);

                            // Stop if we hit top or bottom boundary
                            if (actual <= 0 || actual >= limit) {
                                velocity = 0;
                            }

                            // Apply friction decay
                            velocity *= Math.pow(0.92, deltaTime / 16.6);

                            if (Math.abs(velocity) > 0.05) {
                                momentumFrameId = requestAnimationFrame(step);
                            } else {
                                momentumFrameId = null;
                            }
                        };
                        momentumFrameId = requestAnimationFrame(step);
                    }
                }
            }
            touchHistory = [];
        };

        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("touchcancel", handleTouchEnd);
            if (momentumFrameId) {
                cancelAnimationFrame(momentumFrameId);
            }
        };
    }, []);

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <LenisWindowBridge />
            {children}
        </ReactLenis>
    );
}
