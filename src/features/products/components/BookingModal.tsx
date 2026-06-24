"use client";

import { useState, useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import { BookingStepper } from "./BookingStepper";
import { BookingNavigation } from "./BookingNavigation";
import { UserDataForm } from "./UserDataForm";
import { OrderSummary } from "./OrderSummary";
import { toast } from "sonner";
import { useSession } from "@/features/auth/hooks/useAuth";
import { BookingModalData, PhoneObject } from "../types/product.types";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { BOOKING_STEPS } from "../constants";
import { purchase } from "@/lib/pixel";

export const BookingModal = () => {
  const { isOpen, close, data, open } = useModalStore();
  const modalData = data as BookingModalData | null;
  const { data: session } = useSession();
  const { createOrder, isSubmitting, error } = useCreateOrder();

  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<PhoneObject>({ country: "+20", number: "" });
  const [quantity, setQuantity] = useState<number>(1);

  const activeSteps = BOOKING_STEPS;

  useEffect(() => {
    if (session?.user) setName(session.user.name || "");
    if (session?.user?.phone) {
      const userPhone =
        typeof session.user.phone === "string"
          ? { country: "+20", number: session.user.phone.replace(/[^0-9]/g, '') }
          : session.user.phone || { country: "+20", number: "" };
      setPhone(userPhone);
    }
  }, [session]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setName("");
      setPhone({ country: "+20", number: "" });
      setQuantity(1);
    } else {
      setQuantity(modalData?.quantity ?? 1);
    }
  }, [isOpen, modalData]);

  const handleSubmitOrder = async () => {
    if (!modalData) return;

    const phoneString = `${phone.country}${phone.number}`;
    const safeQuantity = Math.max(1, Math.floor(quantity));

    const payload = {
      productId: modalData.productId,
      intent: modalData.intent || "ADHIYA",
      beneficiaryName: name,
      phone: phoneString,
      quantity: safeQuantity,
      price: modalData.price,
    };

    const result = await createOrder(payload);

    if (result) {
      purchase({
        content_name: modalData.productName,
        content_ids: [modalData.productId],
        value: modalData.price * safeQuantity,
        num_items: safeQuantity,
      });
      close();
      open("BOOKING_SUCCESS");
    } else {
      toast.error(error || "فشل في إنشاء الطلب");
    }
  };

  const handleNext = async () => {
    const isDataStep = currentStep === 1;
    const isSummaryStep = currentStep === 2;

    if (isDataStep && (!name || !phone.number)) {
      toast.error("يرجى ملء جميع البيانات المطلوبة");
      return;
    }

    if (isDataStep && phone.number.length < 8) {
      toast.error("رقم الهاتف يجب أن يكون 8 أرقام على الأقل");
      return;
    }

    if (isSummaryStep) {
      await handleSubmitOrder();
      return;
    }

    const lastStep = 2;
    if (currentStep < lastStep) setCurrentStep((p) => p + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((p) => p - 1);
  };

  const isNextDisabled = () => {
    if (isSubmitting) return true;
    if (currentStep === 1) return !name || !phone.number || phone.number.length < 8;
    return false;
  };

  const getCurrentStepContent = () => {
    if (currentStep === 1) {
      return (
        <UserDataForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
        />
      );
    }

    return (
      <OrderSummary
        data={modalData}
        name={name}
        quantity={quantity}
        phone={phone}
      />
    );
  };

  return (
    <div className="flex flex-col">
      <BookingStepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={activeSteps}
      />

      {getCurrentStepContent()}

      <BookingNavigation
        currentStep={currentStep}
        handleBack={handleBack}
        handleNext={handleNext}
        isDisabledNext={isNextDisabled()}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};