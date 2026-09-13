import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowUpLeft, Banknote, Check, Minus, Plus, ShieldCheck, Sparkles, X
} from 'lucide-react';
import repayLogo from '@assets/image_1788211428352.png';
import paymentImage from '@assets/Group_239_1789259468437.png';
import privacyPolicyPdf from '@assets/سياسة_الخصوصية_ري_باي_المالية_1788215944892.pdf';

const queryClient = new QueryClient();

function apiEndpoint(path: string): string {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
  }

  return `${configuredBaseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

type Lang = 'ar' | 'en';
const copy = {
  ar: {
    nav: ['حلول الدفع', 'كيف تعمل', 'المزايا', 'الأسئلة الشائعة'],
    start: 'تسجيل',
    eyebrow: 'Live',
    hero: 'تجربة مالية بلا حدود',
    heroSub: 'بيدك تختار الطريقة الأنسب لك. ادفع، حوّل واستقبل بشكل بسيط وسهل',
    paymentTitle: 'كل طرق الدفع في تجربة واحدة',
    paymentSub: 'اختر الطريقة الأنسب لك في كل مرة. ادفع مباشرة من حسابك البنكي، أو استخدم إحدى طرق الدفع المحفوظة لديك، بتجربة سريعة وبسيطة',
    seeHow: 'تجربة الديمو',
    talk: 'تواصل معنا',
    trusted: 'كل ما تحتاجه لتجربة دفع أفضل',
    trustedSub: 'امنح عملاءك حرية الدفع بالطريقة التي تناسبهم — ابل باي، مدى، فيزا، ماستركارد والدفع المباشر من الحساب البنكي، بتجربة سريعة وبسيطة، ومكمّلة لخيارات الدفع المتاحة لديك',
    one: 'متكامل مع كل المدفوعات',
    oneSub: 'امنح عملاءك حرية الدفع بالطريقة التي تناسبهم — ابل باي، مدى، فيزا، ماستركارد والدفع المباشر من الحساب البنكي، بتجربة سريعة وبسيطة، ومكمّلة لخيارات الدفع المتاحة لديك',
    two: 'تكاليف أقل',
     twoSub: 'قلّل اعتمادك على البطاقات، واستفد من الدفع المباشر من الحسابات البنكية لتقليل تكاليف معالجة المدفوعات',
    three: 'تسوية فورية',
     threeSub: 'احصل على تأكيد فوري للمدفوعات، مع وصول أسرع للأموال وتقليل فترات الانتظار والتسوية، بدعم من تقنيات المصرفية المفتوحة',
    flowLabel: 'تجربة الدفع',
    flowTitle: 'من الدفع إلى التأكيد في ثوانٍ',
    choose: 'اختر البنك',
    approve: 'أكد من تطبيق البنك',
    done: 'اكتمل الدفع',
    continue: 'متابعة الدفع',
    processing: 'جارٍ تأكيد العملية',
    paid: 'تم الدفع بنجاح',
    amount: 'المبلغ',
    seller: 'مستحق لـ',
    bankPayment: 'الدفع من حسابك البنكي',
    manualEntry: 'بدون إدخال يدوي',
    featureEyebrow: 'حلول دفع مصممة لأعمالك',
    featureTitle: 'كل حساباتك البنكية والرقمية في مكان واحد',
     featureSub: 'تابع عمليات الدفع والتسوية بسهولة من خلال إشعارات فورية ومطابقة تلقائية للعمليات، لتقليل العمل اليدوي',
    feature1: 'اربط حساباتك',
    feature1Sub: 'حساباتك البنكية والرقمية بسهولة في مكان واحد',
    feature2: 'احفظ طرق دفعك',
    feature2Sub: 'احفظ طريقة الدفع المفضلة وخليها جاهزة وقت ما تحتاجها',
    feature3: 'تابع عملياتك',
    feature3Sub: 'مدفوعاتك وتحويلاتك وكل عملياتك بشكل واضح وبسيط',
    bnpmEyebrow: 'Soon',
    bnpmTitle: 'ادفع الآن، وقد تسترد 100% من قيمة عمليتك',
    bnpmSub: 'تجربة جديدة تجمع بين الدفع والمكافآت، مع فرصة لاسترداد ما يصل إلى 100% من قيمة عمليتك',
    points: 'نقطة مكتسبة',
    earned: 'رصيد المكافآت',
    learn: 'اكتشف BNPM',
    demoTitle: 'من ضغطة إلى تأكيد خلال ثوانٍ',
    demoSub: 'اضغط RePay عند الدفع، واختر الطريقة الأنسب لك من حساباتك وطرق الدفع المحفوظة، وأكمل العملية بخطوات بسيطة وسريعة',
    demoButtonTitle: 'جرّب الديمو',
    faqEyebrow: 'أسئلة واضحة',
    faqTitle: 'الأسئلة الشائعة',
    finalEyebrow: 'REPAY FOR BUSINESS',
    finalTitle: 'تجربة أفضل لعملائك. ونمو أكبر لأعمالك',
     finalSub: 'أضف RePay إلى تجربة الدفع، وسهّل على عملائك إكمال مشترياتهم باستخدام حساباتهم وطرق الدفع المفضلة، بخطوات أقل وتجربة أسرع',
    request: 'تواصل معنا',
    nameLabel: 'الاسم',
    companyLabel: 'اسم الشركة',
    mobileLabel: 'رقم الجوال',
    send: 'إرسال الطلب',
     sending: 'جارٍ الإرسال',
     sendError: 'تعذر إرسال الطلب حالياً، حاول مرة أخرى',
     mobileError: 'أدخل رقم جوال صحيحاً يبدأ بـ 05 ويتكون من 10 أرقام',
     cookieNotice: 'نستخدم ملفات الارتباط لتحسين تجربتك على موقع RePay',
    cookieAccept: 'موافق',
     footer: 'الدفع المباشر، كما يجب أن يكون',
     rights: '© 2026 ري باي المالية، جميع الحقوق محفوظة',
    privacyPolicy: 'سياسة الخصوصية',
  },
  en: {
    nav: ['Why RePay', 'How it works', 'Features', 'FAQ'],
    start: 'Get started',
    eyebrow: 'Live',
     hero: 'A Financial Experience Without Limits',
      heroSub: 'Choose what works best for you. Pay, send, and receive — simple and easy',
     paymentTitle: 'Every Way to Pay. One Experience.',
     paymentSub: 'Choose what works best for you every time. Pay directly from your bank account or use one of your saved payment methods — all through a fast and simple experience',
    seeHow: 'See how it works',
     talk: 'Contact Us',
    trusted: 'Built for a market that values time',
     trustedSub: 'RePay connects your business to local banks through Open Banking, creating a faster, clearer and more efficient payment experience',
    one: 'Integrated with All Payment Methods',
    oneSub: 'Give your customers the freedom to pay the way they prefer — Apple Pay, Mada, Visa, Mastercard, or direct bank account payments — through a fast and simple experience that complements your existing payment options without replacing them',
    two: 'Lower Costs',
    twoSub: 'Reduce your reliance on card payments and take advantage of direct bank account payments to lower payment processing costs',
    three: 'Instant Settlement',
     threeSub: 'Get instant payment confirmation, faster access to funds, and reduced settlement waiting times — powered by open banking technology',
    flowLabel: 'The payment experience',
     flowTitle: 'From “pay” to “done” — that simple',
    choose: 'Choose a bank',
    approve: 'Approve in your bank app',
    done: 'Payment complete',
    continue: 'Continue payment',
    processing: 'Confirming your payment',
    paid: 'Payment successful',
    amount: 'Amount due',
    seller: 'Payable to',
    bankPayment: 'Payment from your bank account',
    manualEntry: 'No manual entry',
    featureEyebrow: 'More than a payment method',
      featureTitle: 'All Your Bank and Digital Accounts in One Place',
     featureSub: 'Quiet tools in the background. A clear impact on every sale',
     feature1: 'Connect Your Accounts',
     feature1Sub: 'Bring your bank and digital accounts together in one place',
     feature2: 'Save Your Payment Methods',
      feature2Sub: 'Save your preferred payment method and have it ready whenever you need it',
     feature3: 'Track Your Activity',
      feature3Sub: 'Keep your payments, transfers, and activity clear and easy to follow',
    bnpmEyebrow: 'Soon',
     bnpmTitle: 'Pay Now, and You Could Get 100% Back',
     bnpmSub: 'A new experience that brings payments and rewards together, with a chance to get back up to 100% of your transaction value',
    points: 'Point earned',
    earned: 'Reward balance',
    learn: 'Discover BNPM',
     demoTitle: 'From Tap to Confirmed in Seconds',
     demoSub: 'Tap RePay at checkout, choose what works best for you from your connected accounts and saved payment methods, and complete your payment in just a few simple steps.',
     demoButtonTitle: 'Try the Demo',
    faqEyebrow: 'Clear answers',
      faqTitle: 'Frequently Asked Questions',
    finalEyebrow: 'REPAY FOR BUSINESS',
     finalTitle: 'A Better Experience for Your Users. More Growth for Your Business.',
      finalSub: 'Add RePay to your checkout and make it easier for your customers to complete purchases using their accounts and preferred payment methods — with fewer steps and a faster experience',
     request: 'Contact Us',
     nameLabel: 'Name',
     companyLabel: 'Company Name',
     mobileLabel: 'Phone Number',
     send: 'Submit Request',
     sending: 'Sending',
     sendError: 'We could not send your request right now — please try again',
     mobileError: 'Enter a valid mobile number starting with 05 and containing 10 digits',
     cookieNotice: 'We use cookies to improve your experience on the RePay website',
    cookieAccept: 'Accept',
     footer: 'Direct payment, as it should be',
     rights: '© 2026 RePay Financial, all rights reserved',
    privacyPolicy: 'Privacy Policy',
  },
} as const;

const faqData = {
  ar: [
     ['ما هي RePay؟', 'RePay محفظة تجمع حساباتك البنكية والرقمية وطرق دفعك المفضلة في مكان واحد بشكل بسيط وسهل'],
     ['هل بيانات العملاء آمنة؟', 'نعم، نطبق إجراءات أمنية لحماية بيانات التجار والعملاء، ولا يتم استخدامها إلا لتقديم خدمات RePay والالتزام بالأنظمة ذات العلاقة'],
     ['ما هي طرق الدفع المدعومة؟', 'تتيح RePay طرق دفع متعددة، بما فيها طرق الدفع المدعومة والمحفوظة، بالإضافة إلى الدفع المباشر من الحساب البنكي (Pay by Bank)، وستتوفر الخدمة أولًا لعدد محدود من المستخدمين بعد استكمال الموافقات التنظيمية والاعتمادات اللازمة من الجهات المختصة'],
     ['هل لديكم واجهات برمجية (API)؟', 'نعم، توفر RePay واجهات برمجية (API) للتكامل مع الأنظمة التي تدعم ذلك'],
     ['هل أقدر أحوّل وأستقبل عبر RePay مباشرة؟', 'نعمل على إطلاق محفظة RePay للأفراد، والتي تربط حساباتك البنكية والرقمية تحت اسم مستخدم واحد، لتجعل التحويل والاستقبال بينك وبين أصدقائك أبسط وأسهل'],
  ],
  en: [
      ['What is RePay?', 'RePay is a wallet that brings your bank accounts, digital accounts, and preferred payment methods together in one place — simple and easy'],
     ['Is customer data secure?', 'Yes. We apply security measures to protect merchant and customer data. Data is used only to provide RePay services and comply with applicable regulatory requirements'],
      ['Which payment methods are supported?', 'RePay supports multiple payment methods, including supported and saved payment methods, as well as Pay by Bank. Pay by Bank will initially be available to a limited number of users following the completion of the required regulatory approvals and authorizations'],
      ['Do you provide APIs?', 'Yes. RePay provides APIs for integration with supported systems and platforms'],
      ['Can I send and receive money directly through RePay?', 'We’re working on launching the RePay wallet for individuals, bringing your bank and digital accounts together under one username to make sending and receiving money between friends simpler and easier'],
  ],
} as const;

function Logo() {
  return <div className="flex items-center" dir="ltr" aria-label="RePay">
    <img src={repayLogo} alt="RePay" className="h-10 w-10 shrink-0 object-contain" />
  </div>;
}

function Button({ children, onClick, variant = 'dark', testId, type = 'button', className = '', disabled = false, showArrow = true }: { children: ReactNode; onClick?: () => void; variant?: 'dark' | 'aqua' | 'light' | 'white'; testId: string; type?: 'button' | 'submit'; className?: string; disabled?: boolean; showArrow?: boolean }) {
  const styles = variant === 'aqua' ? 'bg-[#63d7d1] text-[#20233c] hover:bg-[#8be5df]' : variant === 'light' ? 'bg-[#f8f3e8] text-[#20233c] hover:bg-white' : variant === 'white' ? 'bg-white text-[#20233c] hover:bg-[#eaf5ff]' : 'bg-[#20233c] text-[#f8f3e8] hover:bg-[#343855]';
  return <button type={type} data-testid={testId} onClick={onClick} disabled={disabled} className={`group relative inline-flex items-center justify-center rounded-full py-3.5 ps-5 ${showArrow ? 'pe-12' : 'pe-5'} text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 ${styles} ${className}`}>
    <span>{children}</span>{showArrow && <ArrowUpLeft className="absolute end-4 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />}
  </button>;
}

function Header({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return <header className="absolute inset-x-0 top-0 z-30">
    <div className="relative mx-auto flex max-w-[1240px] items-center justify-center px-5 py-5 lg:px-8">
      <div className="absolute left-5 top-5">
        <button data-testid="button-language-toggle" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className={`rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-[#63d7d1] hover:text-[#63d7d1] ${lang === 'en' ? "[font-family:'Rubik',sans-serif]" : ''}`}>{lang === 'ar' ? 'EN' : 'عربي'}</button>
      </div>
      <div className="text-[#f8f3e8]"><Logo /></div>
    </div>
  </header>;
}

function Hero({ lang, setLang, onDemo }: { lang: Lang; setLang: (lang: Lang) => void; onDemo: () => void }) {
  const t = copy[lang];
  return <section className="relative min-h-[760px] overflow-hidden bg-[#20233c] text-[#f8f3e8]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(248,243,232,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(248,243,232,.08) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
     <Header lang={lang} setLang={setLang} />
    <div className="relative mx-auto flex min-h-[760px] max-w-[1240px] items-center justify-center px-5 pb-24 pt-28 lg:px-8 lg:pb-28 lg:pt-32">
      <div className="reveal mx-auto max-w-[760px] text-center">
        <div className="mb-7 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#008CFF]/30 bg-[#008CFF]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#008CFF]">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008CFF] opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#008CFF]" /></span>
          <span>{t.eyebrow}</span>
        </div>
        <h1 className="display-font mx-auto max-w-[650px] text-[clamp(3.5rem,8vw,7.7rem)] font-semibold leading-[.95] tracking-[-.075em] text-white">{t.hero}</h1>
        <p className="reveal reveal-1 mx-auto mt-8 max-w-[600px] text-lg leading-8 text-white">{t.heroSub}</p>
        <div className="reveal reveal-2 mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button testId="button-hero-demo" variant="aqua" showArrow={false} onClick={onDemo} className="!bg-[#008CFF] !px-8 !py-4 !text-base !text-white hover:!bg-[#007de6]">{t.talk}</Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.25em] text-white/40 md:flex"><span className="h-8 w-px bg-white/30" />scroll to explore</div>
  </section>;
}

function PaymentGatewaySection({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <section className="bg-white px-5 py-24 lg:px-8 lg:py-32" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
    <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <h2 className="display-font max-w-[560px] text-4xl font-semibold leading-[1.08] tracking-[-.06em] text-[#20233c] md:text-6xl">{t.paymentTitle}</h2>
        <p className="mt-6 max-w-[560px] text-lg leading-8 text-[#54686a]">{t.paymentSub}</p>
      </div>
      <div>
        <img src={paymentImage} alt="طرق الدفع المتاحة" className="mx-auto block w-full max-w-[626px]" />
      </div>
    </div>
  </section>;
}

function Features({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const features = [{ icon: Banknote, title: t.feature1, sub: t.feature1Sub }, { icon: Sparkles, title: t.feature2, sub: t.feature2Sub }, { icon: ShieldCheck, title: t.feature3, sub: t.feature3Sub }];
  return <section id="features" className="bg-white px-5 py-20 sm:py-24 lg:px-8 lg:py-36" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto max-w-[1240px]"><div><h2 className="display-font max-w-[600px] text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-.06em] text-[#20233c]">{t.featureTitle}</h2></div><div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">{features.map(({ icon: Icon, title, sub }) => <div key={title} className="group min-h-[300px] rounded-[2rem] bg-[#f4f4f6] p-6 transition-transform duration-500 hover:-translate-y-2 sm:p-7"><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e5f1ff] text-[#008CFF]"><Icon size={21} /></div></div><h3 className="mt-20 text-lg font-bold leading-7 text-[#20233c] sm:mt-24 sm:text-xl">{title}</h3><p className="mt-3 text-sm font-medium leading-6 text-[#666778]">{sub}</p></div>)}</div></div></section>;
}

function Bnpm({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <section className="overflow-hidden bg-[#20233c] px-5 py-28 text-[#f8f3e8] lg:px-8 lg:py-36" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-2"><RouletteVisual /><div className="max-w-[760px]"><div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#008CFF]/30 bg-[#008CFF]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#008CFF]"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008CFF] opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#008CFF]" /></span><span>{t.bnpmEyebrow}</span></div><h2 className="display-font mt-5 max-w-[680px] text-4xl font-semibold leading-[1.08] tracking-[-.06em] md:text-6xl">{t.bnpmTitle}</h2><p className="mt-6 max-w-[560px] leading-8 text-white/60">{t.bnpmSub}</p></div></div></section>;
}

function RouletteVisual() {
  return <div className="relative mx-auto flex h-[360px] w-full max-w-[480px] items-center justify-center" dir="ltr">
    <div className="relative h-[290px] w-[290px] animate-[spin_12s_linear_infinite] rounded-full border-[10px] border-white/80 bg-[conic-gradient(from_-15deg,#ef4444_0deg_60deg,#7c5cb5_60deg_120deg,#10b981_120deg_180deg,#8bd3f7_180deg_240deg,#f59e0b_240deg_300deg,#0f8b8b_300deg_360deg)] shadow-[0_0_55px_rgba(16,185,129,.22)]">
      <div className="absolute inset-7 rounded-full border border-white/30 bg-[#20233c]/90 shadow-inner" />
    </div>
    <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2"><div className="h-0 w-0 border-x-[11px] border-t-[24px] border-x-transparent border-t-[#f59e0b]" /></div>
    <div className="absolute left-1/2 top-1/2 z-10 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#20233c] bg-black shadow-[0_8px_24px_rgba(0,0,0,.35)]"><img src={repayLogo} alt="RePay" className="h-10 w-10 object-contain" /></div>
  </div>;
}

function LiveDemo({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <section id="live-demo" className="relative overflow-hidden bg-white px-5 py-24 text-[#20233c] sm:py-28 lg:px-8 lg:py-36" style={{ backgroundImage: 'radial-gradient(circle at 8% 20%, rgba(0,140,255,.08), transparent 28%), radial-gradient(circle at 92% 58%, rgba(99,215,209,.07), transparent 30%)' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="relative mx-auto max-w-[1240px]">
        <div className="max-w-[820px]">
          <h2 className="display-font text-[clamp(2.7rem,6vw,5rem)] font-semibold leading-[.98] tracking-[-.07em]">{t.demoTitle}</h2>
          <p className="mt-7 max-w-[610px] text-base leading-8 text-[#666778] sm:text-lg">{t.demoSub}</p>
        </div>
         <a data-testid="link-live-demo" href="http://demo.repay.sa" target="_blank" rel="noreferrer" dir="ltr" className="mt-9 inline-flex h-12 min-w-[160px] items-center justify-center rounded-full bg-[#20233c] px-7 py-2 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#2a2d49] sm:h-14 sm:min-w-[210px]">
           <span className="text-sm font-bold sm:text-base">{t.demoButtonTitle}</span>
        </a>
      </div>
  </section>;
}

function FAQ({ lang }: { lang: Lang }) {
  const t = copy[lang]; const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="bg-white px-5 py-28 lg:px-8 lg:py-36" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto grid max-w-[1000px] gap-14 md:grid-cols-[.75fr_1.25fr]"><div><h2 className="display-font text-4xl font-semibold leading-[1.1] tracking-[-.06em] text-[#20233c] md:text-5xl">{t.faqTitle}</h2></div><div className="border-t border-[#20233c]/15">{faqData[lang].map(([q, a], i) => <div key={q} className="border-b border-[#20233c]/15"><button data-testid={`button-faq-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-6 text-right text-base font-semibold text-[#20233c]"><span>{q}</span>{open === i ? <Minus size={18} className="shrink-0 text-[#248e88]" /> : <Plus size={18} className="shrink-0 text-[#248e88]" />}</button><div className={`grid transition-[grid-template-rows] duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden pb-0 text-sm leading-7 text-[#666778]">{open === i && a}</p></div></div>)}</div></div></section>;
}

function Footer({ lang, onDemo }: { lang: Lang; onDemo: () => void }) {
  const t = copy[lang];
  return <><section className="bg-[#008CFF] px-5 py-20 text-center text-white sm:py-24 lg:px-8 lg:py-32" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-8"><div className="flex w-full flex-col items-center"><div className="mb-7 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-white" /></span><span>{t.finalEyebrow}</span></div><h2 className="display-font max-w-[680px] text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1] tracking-[-.07em]">{t.finalTitle}</h2><p className="mt-5 max-w-[620px] text-sm leading-7 text-white/90 sm:mt-6 sm:text-base">{t.finalSub}</p></div><Button testId="button-final-demo" onClick={onDemo} showArrow={false} variant="white" className="w-full min-w-[220px] !bg-[#f4f4f6] !px-10 !py-4 !text-base !text-[#20233c] hover:!bg-white sm:w-auto">{t.request}</Button></div></section><footer className="bg-[#20233c] px-5 py-8 text-[#f8f3e8] lg:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto flex max-w-[1240px] flex-col items-center justify-center gap-3"><p className="text-center text-xs text-white/50">{t.rights}</p><a href={privacyPolicyPdf} target="_blank" rel="noreferrer" className="text-center text-xs text-white/50 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white">{t.privacyPolicy}</a></div></footer></>;
}

function normalizeMobileDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/\D/g, '')
    .slice(0, 10);
}

type ContactFieldProps = {
  label: string;
  value: string;
  testId: string;
  autoComplete: string;
  type?: 'text' | 'email' | 'tel';
  dir?: 'ltr' | 'rtl';
  inputMode?: 'text' | 'tel' | 'numeric';
  maxLength: number;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function ContactField({ label, value, testId, autoComplete, type = 'text', dir, inputMode, maxLength, placeholder, onChange }: ContactFieldProps) {
  return <label className="block text-sm font-semibold text-[#20233c]"><span className="mb-2 block">{label}</span><span className="block"><input data-testid={testId} required maxLength={maxLength} type={type} inputMode={inputMode} autoComplete={autoComplete} value={value} placeholder={placeholder} onChange={onChange} className="w-full rounded-2xl border border-[#dce6f0] bg-[#f7fbff] px-4 py-4 text-sm font-medium text-[#20233c] shadow-[inset_0_1px_0_rgba(255,255,255,.8)] outline-none transition-all placeholder:text-[#9aa5b5] hover:border-[#b8d8f4] focus:border-[#008CFF] focus:bg-white focus:ring-4 focus:ring-[#008CFF]/10" dir={dir} /></span></label>;
}

function DemoModal({ lang, close }: { lang: Lang; close: () => void }) {
  const t = copy[lang];
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', mobile: '' });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^05\d{8}$/.test(form.mobile)) {
      setErrorMessage(t.mobileError);
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    try {
      const response = await fetch(apiEndpoint('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Lead submission failed: ${response.status}`);
      setStatus('success');
    } catch {
      setErrorMessage(t.sendError);
      setStatus('error');
    }
  }

  return <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#20233c]/75 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={t.request}>
    <div className="relative my-auto w-full max-w-[560px] rounded-[1.75rem] bg-white p-7 text-[#20233c] shadow-2xl md:p-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <button data-testid="button-close-demo" onClick={close} className={`absolute top-6 rounded-full p-2 text-[#737487] transition-colors hover:bg-[#eaf5ff] hover:text-[#20233c] ${lang === 'ar' ? 'left-6' : 'right-6'}`} aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}><X size={18} /></button>
       {status === 'success' ? <div className="py-12 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e4f1ed] text-[#248e88]"><Check size={28} /></div><h3 className="display-font mt-6 text-3xl font-semibold">{lang === 'ar' ? 'وصلنا طلبك' : 'Request received'}</h3><p className="mt-3 text-[#666778]">{lang === 'ar' ? 'سيتواصل معك فريق RePay قريباً' : 'RePay team will be in touch shortly'}</p></div> : <>
        <h3 className="display-font max-w-[390px] text-4xl font-semibold leading-tight tracking-[-.06em]">{t.request}</h3>
        <p className="mt-4 text-sm leading-7 text-[#666778]">{t.finalSub}</p>
        <form className="mt-7 space-y-4" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactField label={t.nameLabel} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} testId="input-demo-name" autoComplete="name" maxLength={120} />
            <ContactField label={t.companyLabel} value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} testId="input-demo-company" autoComplete="organization" maxLength={160} />
            <ContactField label={lang === 'ar' ? 'البريد الإلكتروني' : 'Email'} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} testId="input-demo-email" autoComplete="email" type="email" dir="ltr" maxLength={200} />
            <ContactField label={t.mobileLabel} value={form.mobile} onChange={(event) => setForm({ ...form, mobile: normalizeMobileDigits(event.target.value) })} testId="input-demo-mobile" autoComplete="tel" type="tel" inputMode="numeric" dir="ltr" maxLength={10} placeholder="05XXXXXXXX" />
          </div>
          {status === 'error' && <p role="alert" className="text-sm font-medium text-red-700">{errorMessage}</p>}
          <Button testId="button-submit-demo" type="submit" variant="light" showArrow={false} className="w-full !bg-[#f4f4f6] !px-8 !py-4 !text-base !text-[#20233c] hover:!bg-[#e9e9ed] sm:w-auto" disabled={status === 'submitting'}>{status === 'submitting' ? t.sending : t.send}</Button>
        </form>
      </>}
    </div>
  </div>;
}

const COOKIE_NOTICE_KEY = 'repay-cookie-notice-dismissed';

function CookieNotice({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(COOKIE_NOTICE_KEY) !== 'true');
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      localStorage.setItem(COOKIE_NOTICE_KEY, 'true');
    } finally {
      setVisible(false);
    }
  }

  return <aside data-testid="cookie-notice" className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-[620px] rounded-2xl border border-white/10 bg-[#20233c]/95 p-4 text-white shadow-2xl backdrop-blur-xl sm:p-5" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm leading-6 text-white/75">{t.cookieNotice}</p><button data-testid="button-cookie-accept" type="button" onClick={dismiss} className="shrink-0 rounded-full bg-[#008CFF] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0074D4]">{t.cookieAccept}</button></div></aside>;
}

function Home() {
  const [lang, setLang] = useState<Lang>('ar'); const [demo, setDemo] = useState(false);
  return <main lang={lang} className="noise" dir={lang === 'ar' ? 'rtl' : 'ltr'}><Hero lang={lang} setLang={setLang} onDemo={() => setDemo(true)} /><PaymentGatewaySection lang={lang} /><Features lang={lang} /><Bnpm lang={lang} /><LiveDemo lang={lang} /><FAQ lang={lang} /><Footer lang={lang} onDemo={() => setDemo(true)} />{demo && <DemoModal lang={lang} close={() => setDemo(false)} />}<CookieNotice lang={lang} /></main>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default App;