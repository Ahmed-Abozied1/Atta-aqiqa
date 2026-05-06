"use client";

import Link from "next/link";
import { useModalStore } from "@/store/useModalStore";
import { User } from "@/lib/auth";
import { UserOutline } from "@/components/ui/icons/UserOutline";
import { useProfileStore } from "@/store/profileStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
    user: User | null;
}

export const NavbarUser = ({ user }: Props) => {
    const { open } = useModalStore();
    const { user: profileUser } = useProfileStore();
    const displayUser = profileUser || user;

    if (displayUser) {
        return (
            <Link href="/profile" className="flex items-center gap-2 justify-end">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={displayUser.image || undefined} alt={displayUser.name || "User"} />
                    <AvatarFallback className="bg-secondary text-bg font-bold">
                        {displayUser.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <span className="text-medium-bold text-white hidden md:block">
                    {displayUser.name?.split(" ").slice(0, 2).join(" ")}
                </span>
            </Link>
        );
    }

    return (
        <button
            onClick={() => open("AUTH")}
            aria-label="فتح حساب المستخدم"
            className="p-3  bg-secondary w-10 h-10 md:w-12 md:h-12 rounded-2xl text-bg flex items-center justify-end cursor-pointer"
        >
            <UserOutline className="w-5 h-5 md:w-6 md:h-6" />
        </button>
    );
};