import { ResetPasswordContent } from "@/features/auth/components/admin/ResetPasswordContent";

interface Props {
  searchParams: Promise<{ token: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { token } = await searchParams; 

  return (
    <ResetPasswordContent token={token} />
  );
};

export default page;