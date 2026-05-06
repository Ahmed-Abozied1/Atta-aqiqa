import { ShoppingCart } from "@/components/ui/icons/ShoppingCart";
import { Dashboard } from "@/components/ui/icons/Dashboard";
import { UserMultiple } from "@/components/ui/icons/UserMultiple";
import { Facebook } from "@/components/ui/icons/Facebook";
import { Instagram } from "@/components/ui/icons/Instagram";
import { Package,Star } from "lucide-react";

export const NAV_LINKS = [
  { name: "الرئيسية", href: "/" },
  { name: "الأسئلة الشائعة", href: "/#faq" },
  { name: "آراء العملاء", href: "/#testimonials" },
  { name: "تواصل معنا", href: "https://wa.me/201287548945", isExternal: true },
];

export const SOCIAL_LINKS = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1JSu2aUtE7/",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/ataa.aqiqa?igsh=M2tpbjU3aTBldzcz",
  },
];

export const PRODUCTS_DATA = {
  inside: [
    {
      id: "1",
      name: "كبش",
      description: "كبش (صدقة، عقيقة، أضحية) مع توثيق فيديو باسمك",
      type: "كبش",
      beneficiaries: "10-20",
      price: 20000,
      image: "/images/products/sheep.webp",
      category: "خروف",
      location: "INSIDE_EGYPT"
    },
    {
      id: "2",
      name: "بقرة",
      description: "كبش (صدقة، عقيقة، أضحية) مع توثيق فيديو باسمك",
      type: "بقرة",
      beneficiaries: "100-120",
      price: 100000,
      image: "/images/products/cow.webp",
      category: "بقرة",
      location: "INSIDE_EGYPT"
    },
  ],
  outside: [
    {
      id: "3",
      name: "كبش",
      description: "كبش (صدقة، عقيقة، أضحية) مع توثيق فيديو باسمك",
      type: "كبش",
      beneficiaries: "10-20",
      price: 25000,
      image: "/images/products/sheep.webp",
      category: "خروف",
      location: "OUTSIDE_EGYPT"
    },
    {
      id: "4",
      name: "بقرة",
      description: "كبش (صدقة، عقيقة، أضحية) مع توثيق فيديو باسمك",
      type: "بقرة",
      beneficiaries: "100-120",
      price: 120000,
      image: "/images/products/cow.webp",
      category: "بقرة",
      location: "OUTSIDE_EGYPT"
    },
  ],
} as const;

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "أحمد خالد",
    initial: "A",
    rating: 3,
    content: "لوريم ايبسوم دولور سيت أميت، كونيسيكتيتور أديبايسينغ إيليت، سيد دو إيوسمود تيمبور إنسيديدونت ات لابوري ات دولوري ماجنا أليكوا. لوريم ايبسوم."
  },
  {
    id: 2,
    name: "أحمد خالد",
    initial: "A",
    rating: 3,
    content: "لوريم ايبسوم دولور سيت أميت، كونيسيكتيتور أديبايسينغ إيليت، سيد دو إيوسمود تيمبور إنسيديدونت ات لابوري ات دولوري ماجنا أليكوا. لوريم ايبسوم."
  },
  {
    id: 3,
    name: "أحمد خالد",
    initial: "A",
    rating: 3,
    content: "لوريم ايبسوم دولور سيت أميت، كونيسيكتيتور أديبايسينغ إيليت، سيد دو إيوسمود تيمبور إنسيديدونت ات لابوري ات دولوري ماجنا أليكوا. لوريم ايبسوم."
  }
]

export const STATS_DATA = [
  { value: "10-20,000+", label: "أضحية تم تنفيذها" },
  { value: "12,000+", label: "أسرة مستفيدة" },
  { value: "98%", label: "رضا المتبرعين" },
  { value: "15+", label: "مناطق التوزيع" }
]

export const FAQ_DATA = [
  {
    id: "fq-1",
    question: "1. هل أنتم جهة خيرية أم شركة ربحية؟",
    answer: "نحن شركة ربحية نوفر خدمة النيابة بالذبح والتوزيع للعميل من مزرعتنا الخاصه ."
  },
  {
    id: "fq-2",
    question: "2. هل انتم شركة مرخصة رسميا ؟",
    answer: "- نعم نحن شركة مرخصة بسجل تجارى وبطاقة ضريبية من وزارة الاستثمار ب جمهورية مصر العربية.\n- بالاضافه لترخيص من المجلس الأعلى لشؤون المسلمين داخل دولة تنزانيا."
  },
  {
    id: "fq-3",
    question: "3. كيف يتم التنفيذ؟",
    answer: "المرحله الأولى نبدأ فى استقبال حجوزات العقيقة والصدقه والنذر ثم يتم الذبح فى خلال 48  ساعه وتوثيق كل مراحل الذبح والتوزيع ب اسم العميل ثم المرحله الاخيره تبدأ ب إرسال الفيديوهات والصور الموثقه للعميل ."
  },
  {
    id: "fq-4",
    question: "4. هل يمكن إلغاء الحجز او التعديل؟",
    answer: " نعم يمكن إلغاء الحجز او التعديل  بشرط عدم البدء فى تنفيذ الذبيحة وتوزيعها ولكن فى اوقات المواسم (عيد الاضحى لايمكن إلغاء الحجوزات) ."
  }
]

export const MENU_ITEMS = [
  { name: "لوحة التحكم", icon: Dashboard, href: "/admin", active: true },
  { name: "إدارة الحسابات", icon: UserMultiple, href: "/admin/accounts" },
  { name: "إدارة الطلبات", icon: ShoppingCart, href: "/admin/orders" },
  { name: "إدارة المنتجات", icon: Package, href: "/admin/products" },
  { name: "إدارة التقييمات", icon: Star, href: "/admin/reviews" },
];

export const HIDDEN_PATHS = ["/product", "/profile"];




export const FOOTER_LINK1 = [
    { name: "من نحن", href: "/about" },
    { name: "سياسة الاستخدام والخصوصية", href: "/privacy" },
    { name: "سياسة الاسترجاع", href: "/returns" },
    { name: "الأسئلة الشائعة", href: "/faq" },
  ];

  export const FOOTER_LINK2 = [
    { name: "للشكاوى والاقتراحات", href: "https://wa.me/201287548945" },
    { name: "دليلك لاختيار الأضحية والعقيقة", href: "/guide" },
    { name: "تواصل معنا", href: "https://wa.me/201287548945" },
  ];










