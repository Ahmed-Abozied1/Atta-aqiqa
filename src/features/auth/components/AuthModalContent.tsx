"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AtaaLogo } from "@/components/ui/icons/AtaaLogo";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { useModalStore } from "@/store/useModalStore";
import LoginForm from "../forms/LoginForm";
import { RegisterForm } from "../forms/RegisterForm";
import { SocialAuth } from "./user/SocialAuth";
import { AuthDivider } from "./user/AuthDivider";


export const AuthModalContent = () => {
    const { view, setView } = useModalStore();

    const activeTab = view === "REGISTER" ? "register" : "login";

    return (
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            <div className="mt-6! md:mt-8! shrink-0">
                <AtaaLogo />
            </div>

            <AuthHeader
                title="مرحباً بك في عطاء"
                subtitle="سجّل دخولك وابدأ خطواتك للأضحية"
            />
            <SocialAuth />
            <AuthDivider />

            <Tabs
                value={activeTab}
                onValueChange={(val) => setView(val.toUpperCase() as any)}
                className="w-full! flex flex-col! items-center!"
                dir="rtl"
            >
                <TabsList className="flex! items-center! justify-center! bg-card! rounded-2xl! h-auto! p-1!">
                    <TabsTrigger
                        value="login"
                        className="cursor-pointer! px-6! py-3! text-small-bold! md:text-regular-bold! data-[state=active]:bg-primary! data-[state=active]:text-bg! rounded-2xl! transition-all!"
                    >
                        تسجيل الدخول
                    </TabsTrigger>

                    <TabsTrigger
                        value="register"
                        className="cursor-pointer! px-6! py-3! text-small-bold! md:text-regular-bold! text-paragraph! data-[state=active]:bg-primary! data-[state=active]:text-bg! rounded-2xl! transition-all!"
                    >
                        إنشاء حساب جديد
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="w-full! mt-6! md:mt-8! focus-visible:outline-none!">
                    <LoginForm role="USER" />
                </TabsContent>

                <TabsContent value="register" className="w-full! mt-6! md:mt-8! focus-visible:outline-none!">
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </div>
    );
};