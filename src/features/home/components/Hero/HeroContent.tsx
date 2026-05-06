"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HERO_CONTENT } from "@/features/home/constants/hero-data";
import { AppButton } from "@/components/common/AppButton";

export const HeroContent = () => {
    const [firstProductId, setFirstProductId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFirstProduct = async () => {
            try {
                const response = await fetch("/api/products/first");
                const data = await response.json();
                
                if (data.id) {
                    setFirstProductId(data.id);
                }
            } catch (error) {
                console.error("Failed to fetch first product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFirstProduct();
    }, []);

    if (loading) {
        return (
            <div className="container flex flex-col items-center md:items-start justify-center gap-4 max-[399px]:-mt-60 min-[400px]:max-md:-mt-45 sm:-mt-45 md:mt-0">
                <h1 className="heading-5-bold sm:heading-4-semibold md:heading-2 text-center md:text-right">
                    {HERO_CONTENT.title}
                </h1>
                <p className="heading-6-normal sm:heading-5-normal text-center md:text-right max-w-xl mb-4">
                    {HERO_CONTENT.description}
                </p>
                <AppButton asChild appVariant="secondary" className="px-8" disabled>
                    <span>{HERO_CONTENT.cta.label}</span>
                </AppButton>
            </div>
        );
    }

    return (
        <div className="container flex flex-col items-center md:items-start justify-center gap-4 max-[399px]:-mt-60 min-[400px]:max-md:-mt-45 sm:-mt-45 md:mt-0">
            <h1 className="heading-5-bold sm:heading-4-semibold md:heading-2 text-center md:text-right">
                {HERO_CONTENT.title}
            </h1>

            <p className="heading-6-normal sm:heading-5-normal text-center md:text-right max-w-xl mb-4">
                {HERO_CONTENT.description}
            </p>

            {firstProductId && (
                <AppButton asChild appVariant="secondary" className="px-8">
                    <Link href={`/product/${firstProductId}`}>
                        {HERO_CONTENT.cta.label}
                    </Link>
                </AppButton>
            )}
        </div>
    );
};