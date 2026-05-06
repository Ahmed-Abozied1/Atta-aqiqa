"use client";
import { Button } from '@/components/ui/button'
import { GoogleIcon } from '@/components/ui/icons/GoogleIcon'
import { Loader2 } from 'lucide-react';
import { useSocialAuth } from '../../hooks/useSocialAuth';

export const SocialAuth = () => {
    const { signInWithGoogle, isLoading } = useSocialAuth();

    return (
        <Button
            type="button"
            onClick={signInWithGoogle}
            disabled={isLoading}
            className="bg-card flex items-center justify-center transform transition-transform duration-200 hover:scale-105 hover:bg-card/90 cursor-pointer h-10 md:h-12 px-2.5 py-2.5 md:px-4 md:py-3 gap-2 rounded-lg md:rounded-2xl text-small-bold md:text-regular-bold"
        >
            <GoogleIcon />

            <span className="flex items-center gap-2">
                تسجيل دخول عبر جوجل
                {isLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}
            </span>
        </Button>
    );
};