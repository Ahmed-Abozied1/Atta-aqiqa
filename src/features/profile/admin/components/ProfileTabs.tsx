// features/profile/admin/components/ProfileTabs.tsx
"use client";

interface ProfileTabsProps {
  activeTab: "info" | "password";
  onTabChange: (tab: "info" | "password") => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="flex gap-2 md:gap-4">
      <button
        onClick={() => onTabChange("info")}
        className={`py-2 rounded-lg md:rounded-2xl h-10 md:h-12 px-2 md:px-6 text-small-bold md:text-regular-bold w-full md:w-fit ${
          activeTab === "info"
            ? "bg-secondary text-bg"
            : "bg-transparent border-[1.5px] border-disabled text-paragraph"
        }`}
      >
        بيانات الحساب
      </button>
      <button
        onClick={() => onTabChange("password")}
        className={`py-2 rounded-lg md:rounded-2xl h-10 md:h-12 px-2 md:px-6 text-small-bold md:text-regular-bold w-full md:w-fit ${
          activeTab === "password"
            ? "bg-secondary text-bg"
            : "bg-transparent border-[1.5px] border-disabled text-paragraph"
        }`}
      >
        كلمة المرور
      </button>
    </div>
  );
};

export default ProfileTabs;