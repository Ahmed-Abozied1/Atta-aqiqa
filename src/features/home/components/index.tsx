"use client";

import { useState } from "react";
import { Hero } from "@/features/home/components/Hero";
import { Products } from "@/features/home/components/Products";
import { Testimonials } from "@/features/home/components/Testimonials";
import { Stats } from "@/features/home/components/Stats";
import { FAQ } from "@/features/home/components/FAQ";
import { useProducts } from "../hooks/useProducts";
import { useTestimonial } from "../hooks/useTestimonial";
import { Loading } from "@/components/common/Loading";


export default function Home() {
  const [activeTab, setActiveTab] = useState<'inside' | 'outside'>('outside');
  
  const { products, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts(activeTab);
  const { testimonials = [], loading: testimonialsLoading, error: testimonialsError, refetch: refetchTestimonials } = useTestimonial();

  if (productsLoading || testimonialsLoading) {
    return <Loading />;
  }

  const handleTabChange = (value: 'inside' | 'outside') => {
    setActiveTab(value);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Hero />
      <Products 
        products={products}
        loading={productsLoading}
        error={productsError}
        refetch={refetchProducts}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <Stats />
      <Testimonials 
        testimonials={testimonials}
        loading={testimonialsLoading}
        error={testimonialsError}
        refetch={refetchTestimonials}
      />
      <FAQ />
    </main>
  );
}