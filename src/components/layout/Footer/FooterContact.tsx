import { ContactButtons } from "./ContactButtons";
import { FooterSocial } from "./FooterSocial";

export const FooterContact = () => {
  return (
    <div className="mt-4">
      <p className="text-regular-normal md:text-regular-medium mb-4">
        شركة مصرية رائدة ومتخصصة في مجال المواشي.
      </p>

      <ContactButtons />

      <FooterSocial />
    </div>
  );
};