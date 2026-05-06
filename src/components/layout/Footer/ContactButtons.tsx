import { Email } from "@/components/ui/icons/Email";
import { Phone } from "@/components/ui/icons/Phone";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";

export const ContactButtons = () => {
const contacts = [
    { 
      name: "واتس اب", 
      icon: WhatsApp, 
      href: "https://wa.me/201287548945" 
    },
    { 
      name: "الهاتف", 
      icon: Phone, 
  href: "tel:+201287548945"      },
    { 
      name: "إيميل", 
      icon: Email, 
      href: "mailto:atta.aqiqa@outlook.com" 
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {contacts.map((contact, i) => (
        <a
          key={i}
          href={contact.href}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-small-medium hover:text-secondary! hover:border-secondary transition"
        >
          <contact.icon />
          <span >{contact.name}</span>
        </a>
      ))}
    </div>
  );
};