'use client';

import { useModalStore } from '@/store/useModalStore';
import { AuthModalContent } from '@/features/auth/components/AuthModalContent';
import { UserForgotPassword } from '@/features/auth/components/user/UserForgotPassword';
import { UserResetPassword } from '@/features/auth/components/user/UserResetPassword';
import { UserVerification } from '@/features/auth/components/user/UserVerification';
import { VerifySuccess } from '@/features/auth/components/VerifySuccess';
import { UpdatePasswordSuccess } from '@/features/auth/components/UpdatePasswordSuccess';
import { BookingModal } from '@/features/products/components/BookingModal';
import { ReviewModal } from '@/features/products/components/ReviewModal';
import { AddProductModal } from "@/features/admin-products/components/AddProductModal";
import { EditProductModal } from "@/features/admin-products/components/EditProductModal";
import { DeleteProductModal } from "@/features/admin-products/components/DeleteProductModal";
import { AppModal } from './AppModal';

const viewMap = {
  AUTH: AuthModalContent,
  LOGIN: AuthModalContent,
  REGISTER: AuthModalContent,
  OTP_VERIFICATION: UserVerification,
  FORGOT_PASSWORD: UserForgotPassword,
  RESET_PASSWORD: UserResetPassword,
  VERIFICATION_SUCCESS: VerifySuccess,
  PASSWORD_UPDATED_SUCCESS: UpdatePasswordSuccess,
  BOOKING: BookingModal,
  REVIEW: ReviewModal, 
  ADMIN_PRODUCT_CREATE: AddProductModal,
  ADMIN_PRODUCT_EDIT: EditProductModal,
  ADMIN_PRODUCT_DELETE: DeleteProductModal,
} as const;

type ViewKey = keyof typeof viewMap;

export const GlobalModalContainer = () => {
  const { isOpen, view, close, data } = useModalStore();

  if (!isOpen || !view) return null;

  const Component = viewMap[view as ViewKey] as any;
  
  const getModalClasses = () => {
if (view === "ADMIN_PRODUCT_DELETE")
  return "w-[280px] min-h-[160px] sm:w-[320px] md:w-[380px] lg:w-[420px]";
  };
  
  const getModalTitle = () => {
    if (view === 'BOOKING') return "أحجز أضحيتك";
    if (view === 'REVIEW') return "اكتب تقييمًا";
    if (view === "ADMIN_PRODUCT_CREATE") return "إضافة منتج جديد";
    if (view === "ADMIN_PRODUCT_EDIT") return "تعديل المنتج";
    if (view === "ADMIN_PRODUCT_DELETE") return "حذف المنتج";
    return undefined;
  };
  
  const modalTitle = getModalTitle();
  const modalClasses = getModalClasses();
  
  if (!Component) return null;

  return (
    <AppModal
      isOpen={isOpen}
      onClose={close}
      title={modalTitle}
      className={modalClasses}
    >
      <Component data={data} />
    </AppModal>
  );
};