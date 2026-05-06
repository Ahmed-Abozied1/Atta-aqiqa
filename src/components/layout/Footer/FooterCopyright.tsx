export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center text-regular-normal pt-8 mt-8 border-t border-border">
     الحقوق محفوظة &copy; عطاء  {currentYear}
    </div>
  );
};