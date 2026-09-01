import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowUpLeft, Banknote, Building2, Check, Mail, Minus, Phone, Plus, ShieldCheck,
  Sparkles, X
  , UserRound, type LucideIcon
} from 'lucide-react';
import repayLogo from '@assets/image_1788211428352.png';
import paymentImage from '@assets/Screenshot_2026-08-30_at_11.34.13_PM_1_1788123445642.png';
import sarIcon from '@assets/SAR_1788214215635.svg';
import privacyPolicyPdf from '@assets/سياسة_الخصوصية_ري_باي_المالية_1788215944892.pdf';

const queryClient = new QueryClient();

type Lang = 'ar' | 'en';
const copy = {
  ar: {
    nav: ['حلول الدفع', 'كيف تعمل', 'المزايا', 'الأسئلة الشائعة'],
    start: 'تسجيل',
    eyebrow: 'REPAY FOR BUSINESS',
    hero: 'مباشرة من حسابك البنكي',
    heroSub: 'وسيلة جديدة للدفع مباشرة من الحساب البنكي، بدون تعقيد',
    paymentTitle: 'كل طرق الدفع في تجربة واحدة',
    paymentSub: 'امنح عملاءك حرية الدفع بالطريقة التي تناسبهم — ابل باي، مدى، فيزا، ماستركارد والدفع المباشر من الحساب البنكي، بتجربة سريعة وبسيطة، ومكمّلة لخيارات الدفع المتاحة لديك دون الحاجة إلى استبدالها.',
    seeHow: 'تجربة الديمو',
    talk: 'تواصل معنا',
    trusted: 'كل ما تحتاجه لتجربة دفع أفضل',
    trustedSub: 'امنح عملاءك حرية الدفع بالطريقة التي تناسبهم — ابل باي، مدى، فيزا، ماستركارد والدفع المباشر من الحساب البنكي، بتجربة سريعة وبسيطة، ومكمّلة لخيارات الدفع المتاحة لديك.',
    one: 'متكامل مع كل المدفوعات',
    oneSub: 'امنح عملاءك حرية الدفع بالطريقة التي تناسبهم — ابل باي، مدى، فيزا، ماستركارد والدفع المباشر من الحساب البنكي، بتجربة سريعة وبسيطة، ومكمّلة لخيارات الدفع المتاحة لديك.',
    two: 'تكاليف أقل',
    twoSub: 'قلّل اعتمادك على البطاقات، واستفد من الدفع المباشر من الحسابات البنكية لتقليل تكاليف معالجة المدفوعات.',
    three: 'تسوية فورية',
    threeSub: 'احصل على تأكيد فوري للمدفوعات، مع وصول أسرع للأموال وتقليل فترات الانتظار والتسوية، بدعم من تقنيات المصرفية المفتوحة.',
    flowLabel: 'تجربة الدفع',
    flowTitle: 'من الدفع إلى التأكيد في ثوانٍ',
    choose: 'اختر البنك',
    approve: 'أكد من تطبيق البنك',
    done: 'اكتمل الدفع',
    continue: 'متابعة الدفع',
    processing: 'جارٍ تأكيد العملية',
    paid: 'تم الدفع بنجاح',
    amount: 'المبلغ المستحق',
    seller: 'مستحق لـ',
    bankPayment: 'الدفع من حسابك البنكي',
    manualEntry: 'بدون إدخال يدوي',
    featureEyebrow: 'حلول دفع مصممة لأعمالك',
    featureTitle: 'إدارة أسهل للمدفوعات',
    featureSub: 'تابع عمليات الدفع والتسوية بسهولة من خلال إشعارات فورية ومطابقة تلقائية للعمليات، لتقليل العمل اليدوي.',
    feature1: 'متكامل مع كل المدفوعات',
    feature1Sub: 'امنح عملاءك حرية الدفع بالطريقة التي تناسبهم — ابل باي، مدى، فيزا، ماستركارد والدفع المباشر من الحساب البنكي، بتجربة سريعة وبسيطة، ومكمّلة لخيارات الدفع المتاحة لديك دون الحاجة إلى استبدالها.',
    feature2: 'تكاليف أقل',
    feature2Sub: 'قلّل اعتمادك على البطاقات، واستفد من الدفع المباشر من الحسابات البنكية لتقليل تكاليف معالجة المدفوعات.',
    feature3: 'تسوية فورية',
    feature3Sub: 'احصل على تأكيد فوري للمدفوعات، مع وصول أسرع للأموال وتقليل فترات الانتظار والتسوية، بدعم من تقنيات المصرفية المفتوحة.',
    bnpmEyebrow: 'BNPM — Buy Now, Pay Maybe',
    bnpmTitle: 'ادفع الآن، وقد تسترد 100% من قيمة مشترياتك.',
    bnpmSub: 'تجربة دفع ومكافآت تحفّز عملاءك على الشراء والعودة لمتجرك، مع فرصة لاسترداد قيمة مشترياتهم بالكامل.',
    points: 'نقطة مكتسبة',
    earned: 'رصيد المكافآت',
    learn: 'اكتشف BNPM',
    faqEyebrow: 'أسئلة واضحة',
    faqTitle: 'الأسئلة الشائعة',
    finalTitle: 'جاهز تبدأ؟',
    finalSub: 'فعّل جميع طرق الدفع التي يحتاجها عملاؤك، من مكان واحد وبأبسط تجربة',
    request: 'تواصل معنا',
    nameLabel: 'الاسم',
    companyLabel: 'اسم الشركة',
    mobileLabel: 'رقم الجوال',
     send: 'إرسال الطلب',
     sending: 'جارٍ فتح البريد...',
     sendError: 'تعذر فتح البريد الإلكتروني. حاول مرة أخرى.',
    cookieNotice: 'نستخدم ملفات الارتباط لتحسين تجربتك على موقع RePay.',
    cookieAccept: 'موافق',
    footer: 'الدفع المباشر، كما يجب أن يكون.',
    rights: '© 2026 ري باي المالية. جميع الحقوق محفوظة.',
    privacyPolicy: 'سياسة الخصوصية',
  },
  en: {
    nav: ['Why RePay', 'How it works', 'Features', 'FAQ'],
    start: 'Get started',
    eyebrow: 'REPAY FOR BUSINESS',
    hero: 'Direct from your bank account',
    heroSub: 'A new way to pay directly from your bank account, without the complexity.',
    paymentTitle: 'Every payment way in one experience',
    paymentSub: 'Give your customers the freedom to pay their way — Apple Pay, mada, Visa, Mastercard, and direct bank account payments in one fast, simple experience that complements your existing payment options.',
    seeHow: 'See how it works',
    talk: 'Contact us',
    trusted: 'Built for a market that values time',
    trustedSub: 'RePay connects your business to local banks through Open Banking, creating a faster, clearer and more efficient payment experience.',
    one: 'Integrated with All Payment Methods',
    oneSub: 'Give your customers the freedom to pay the way they prefer — Apple Pay, Mada, Visa, Mastercard, or direct bank account payments — through a fast and simple experience that complements your existing payment options without replacing them.',
    two: 'Lower Costs',
    twoSub: 'Reduce your reliance on card payments and take advantage of direct bank account payments to lower payment processing costs.',
    three: 'Instant Settlement',
    threeSub: 'Get instant payment confirmation, faster access to funds, and reduced settlement waiting times — powered by open banking technology.',
    flowLabel: 'The payment experience',
    flowTitle: 'From “pay” to “done”. That simple.',
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
    featureTitle: 'This is where the real difference starts.',
    featureSub: 'Quiet tools in the background. A clear impact on every sale.',
    feature1: 'Integrated with All Payment Methods',
    feature1Sub: 'Give your customers the freedom to pay the way they prefer — Apple Pay, Mada, Visa, Mastercard, or direct bank account payments — through a fast and simple experience that complements your existing payment options without replacing them.',
    feature2: 'Lower Costs',
    feature2Sub: 'Reduce your reliance on card payments and take advantage of direct bank account payments to lower payment processing costs.',
    feature3: 'Instant Settlement',
    feature3Sub: 'Get instant payment confirmation, faster access to funds, and reduced settlement waiting times — powered by open banking technology.',
    bnpmEyebrow: 'BNPM by RePay',
    bnpmTitle: 'Every payment brings your customer closer to a reward.',
    bnpmSub: 'A payment and rewards experience that encourages customers to shop and return to your store, with a chance to get the full value of their purchase back.',
    points: 'Point earned',
    earned: 'Reward balance',
    learn: 'Discover BNPM',
    faqEyebrow: 'Clear answers',
    faqTitle: 'What you need to know, before you begin.',
    finalTitle: 'Ready to start?',
    finalSub: 'Enable every payment method your customers need, from one place with the simplest experience.',
    request: 'Contact us',
    nameLabel: 'Name',
    companyLabel: 'Company name',
    mobileLabel: 'Mobile number',
     send: 'Send request',
     sending: 'Opening email...',
     sendError: 'We could not open your email app. Please try again.',
    cookieNotice: 'We use cookies to improve your experience on the RePay website.',
    cookieAccept: 'Accept',
    footer: 'Direct payment, as it should be.',
    rights: '© 2026 RePay Financial. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
  },
} as const;

const faqData = {
  ar: [
    ['ما هي RePay؟', 'RePay هي محفظة تقدم وسيلة دفع سهلة وسريعة باستخدام تقنيات المصرفية المفتوحة، وتسمح لك بالدفع مباشرة من حسابك البنكي.'],
    ['هل بيانات العملاء آمنة؟', 'نعم، نطبق إجراءات أمنية لحماية بيانات التجار والعملاء، ولا يتم استخدامها إلا لتقديم خدمات RePay والالتزام بالأنظمة ذات العلاقة.'],
    ['هل لديكم واجهات برمجية (API)؟', 'نعم، توفر RePay واجهات برمجية (API) للتكامل مع الأنظمة التي تدعم ذلك.'],
    ['هل تدعم تفعيل الدفع المباشر من الحساب البنكي (Pay by Bank)؟', 'تعمل RePay على إطلاق خدمة الدفع المباشر من الحساب البنكي (Pay by Bank). وستتوفر الخدمة أولًا لعدد محدود من المستخدمين بعد استكمال الموافقات التنظيمية والاعتمادات اللازمة من الجهات المختصة.'],
    ['ما هي المصرفية المفتوحة؟', 'هي نظام يتيح للعميل، بموافقته، مشاركة بياناته البنكية أو تنفيذ عمليات الدفع من حسابه مباشرة مع شركات مالية وتقنية مرخّصة، عبر واجهات برمجية آمنة (APIs).'],
  ],
  en: [
    ['What is RePay?', 'RePay is a wallet that offers a fast and easy payment method powered by Open Banking, allowing you to pay directly from your bank account.'],
    ['Is users data secure?', 'Yes. We apply security measures to protect merchant and customer data, and only use it to provide RePay services and comply with relevant regulations.'],
    ['Do you provide APIs?', 'Yes. RePay provides APIs for integration with systems that support them.'],
    ['Do you support Pay by Bank?', 'RePay is preparing to launch Pay by Bank. The service will first be available to a limited number of users after the required regulatory approvals and accreditations are completed.'],
    ['What is Open Banking?', 'Open Banking allows customers, with their consent, to share banking data or make payments directly from their accounts with licensed financial and technology companies through secure APIs.'],
  ],
} as const;

function Logo() {
  return <div className="flex items-center" dir="ltr" aria-label="RePay">
    <img src={repayLogo} alt="RePay for Business" className="h-10 w-10 shrink-0 object-contain" />
  </div>;
}

function Button({ children, onClick, variant = 'dark', testId, type = 'button', className = '', disabled = false }: { children: ReactNode; onClick?: () => void; variant?: 'dark' | 'aqua' | 'light' | 'white'; testId: string; type?: 'button' | 'submit'; className?: string; disabled?: boolean }) {
  const styles = variant === 'aqua' ? 'bg-[#63d7d1] text-[#20233c] hover:bg-[#8be5df]' : variant === 'light' ? 'bg-[#f8f3e8] text-[#20233c] hover:bg-white' : variant === 'white' ? 'bg-white text-[#20233c] hover:bg-[#eaf5ff]' : 'bg-[#20233c] text-[#f8f3e8] hover:bg-[#343855]';
  return <button type={type} data-testid={testId} onClick={onClick} disabled={disabled} className={`group relative inline-flex items-center justify-center rounded-full py-3.5 ps-5 pe-12 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 ${styles} ${className}`}>
    <span>{children}</span><ArrowUpLeft className="absolute end-4 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
  </button>;
}

function Header({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return <header className="absolute inset-x-0 top-0 z-30">
    <div className="relative mx-auto flex max-w-[1240px] items-center justify-center px-5 py-5 lg:px-8">
      <div className="absolute left-5 top-5">
        <button data-testid="button-language-toggle" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-[#63d7d1] hover:text-[#63d7d1]">{lang === 'ar' ? 'EN' : 'عربي'}</button>
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
    <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 px-5 pb-24 pt-36 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:pb-32 lg:pt-48">
      <div className="reveal max-w-[660px]">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#008CFF]/30 bg-[#008CFF]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#008CFF]">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008CFF] opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#008CFF]" /></span>
          <span>{t.eyebrow}</span>
        </div>
        <h1 className="display-font max-w-[650px] text-[clamp(3.5rem,8vw,7.7rem)] font-semibold leading-[.95] tracking-[-.075em] text-white">{t.hero}</h1>
        <p className="reveal reveal-1 mt-8 max-w-[530px] text-lg leading-8 text-white/62">{t.heroSub}</p>
        <div className="reveal reveal-2 mt-9 flex flex-wrap items-center gap-3">
          <Button testId="button-hero-demo" variant="aqua" onClick={onDemo}>{t.talk}</Button>
        </div>
      </div>
      <PaymentVisual lang={lang} />
    </div>
    <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.25em] text-white/40 md:flex"><span className="h-8 w-px bg-white/30" />scroll to explore</div>
  </section>;
}

function PaymentVisual({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <div className="reveal reveal-2 relative mx-auto h-[430px] w-full max-w-[490px]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
    <div className="absolute left-0 top-2 h-[360px] w-[360px] rounded-full border border-[#63d7d1]/20" />
    <div className="absolute left-8 top-10 h-[290px] w-[290px] rounded-full border border-[#63d7d1]/10" />
    <div className="absolute left-[38%] top-[46%] h-2 w-2 rounded-full bg-[#63d7d1] shadow-[0_0_0_7px_rgba(99,215,209,.12)]" />
    <div className="absolute right-0 top-16 w-[330px] rounded-3xl border border-white/15 bg-[#2b2e4b]/90 p-5 shadow-2xl backdrop-blur-xl md:right-4">
      <div className="flex items-center justify-between text-xs text-white/45"><span className="display-font">REPAY / CHECKOUT</span><span className="h-2 w-2 rounded-full bg-[#63d7d1]" /></div>
      <div className="mt-12"><div className="text-xs text-white/45">{t.amount}</div><div className="display-font mt-1 text-4xl tracking-[-.06em]">1,250.00 <img src={sarIcon} alt="SAR" className="inline-block h-5 w-4 align-[-.15em] opacity-50 invert" /></div></div>
      <div className="mt-7 rounded-2xl bg-white p-4 text-[#20233c]">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e5f1ed] text-[#248e88]"><Banknote size={18} /></span><div><div className="text-xs font-semibold">{t.bankPayment}</div><div className="mt-0.5 text-[10px] text-[#737487]">{t.manualEntry}</div></div><ArrowUpLeft className="mr-auto h-4 w-4" /></div>
      </div>
       <div className="mt-3 flex justify-end text-[10px] text-white/40"><span>powered by RePay</span></div>
    </div>
  </div>;
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
  const features = [{ icon: Banknote, title: t.feature1, sub: t.feature1Sub, accent: 'bg-[#212540]' }, { icon: Sparkles, title: t.feature2, sub: t.feature2Sub, accent: 'bg-[#212540]' }, { icon: ShieldCheck, title: t.feature3, sub: t.feature3Sub, accent: 'bg-[#212540]' }];
  return <section id="features" className="bg-white px-5 py-20 sm:py-24 lg:px-8 lg:py-36" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto max-w-[1240px]"><div className="flex flex-col gap-6"><div><h2 className="display-font max-w-[600px] text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-.06em] text-[#20233c]">{t.featureTitle}</h2></div><p className="w-full max-w-[620px] text-sm leading-7 text-[#666778] sm:text-base">{t.featureSub}</p></div><div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">{features.map(({ icon: Icon, title, sub, accent }, i) => <div key={title} className={`group min-h-[300px] rounded-[1.5rem] p-6 transition-transform duration-500 hover:-translate-y-2 sm:p-7 ${accent}`}><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#008CFF] text-white"><Icon size={21} /></div><span className="display-font text-xs text-white/50">0{i + 1}</span></div><h3 className="mt-20 text-lg font-bold leading-7 text-white sm:mt-24 sm:text-xl">{title}</h3><p className="mt-3 text-sm font-medium leading-6 text-white/75">{sub}</p></div>)}</div></div></section>;
}

function Bnpm({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <section className="overflow-hidden bg-[#20233c] px-5 py-28 text-[#f8f3e8] lg:px-8 lg:py-36" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto max-w-[1240px]"><div className="max-w-[760px]"><div className="flex items-center text-sm font-bold text-[#63d7d1]">{t.bnpmEyebrow}</div><h2 className="display-font mt-5 max-w-[560px] text-4xl font-semibold leading-[1.08] tracking-[-.06em] md:text-6xl">{t.bnpmTitle}</h2><p className="mt-6 max-w-[500px] leading-8 text-white/60">{t.bnpmSub}</p></div></div></section>;
}

function FAQ({ lang }: { lang: Lang }) {
  const t = copy[lang]; const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="bg-white px-5 py-28 lg:px-8 lg:py-36" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto grid max-w-[1000px] gap-14 md:grid-cols-[.75fr_1.25fr]"><div><h2 className="display-font text-4xl font-semibold leading-[1.1] tracking-[-.06em] text-[#20233c] md:text-5xl">{t.faqTitle}</h2></div><div className="border-t border-[#20233c]/15">{faqData[lang].map(([q, a], i) => <div key={q} className="border-b border-[#20233c]/15"><button data-testid={`button-faq-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-6 text-right text-base font-semibold text-[#20233c]"><span>{q}</span>{open === i ? <Minus size={18} className="shrink-0 text-[#248e88]" /> : <Plus size={18} className="shrink-0 text-[#248e88]" />}</button><div className={`grid transition-[grid-template-rows] duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden pb-0 text-sm leading-7 text-[#666778]">{open === i && a}</p></div></div>)}</div></div></section>;
}

function Footer({ lang, onDemo }: { lang: Lang; onDemo: () => void }) {
  const t = copy[lang];
  return <><section className="bg-[#008CFF] px-5 py-20 text-center text-white sm:py-24 lg:px-8 lg:py-32" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-8"><div className="flex w-full flex-col items-center"><h2 className="display-font max-w-[680px] text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1] tracking-[-.07em]">{t.finalTitle}</h2><p className="mt-5 max-w-[520px] text-sm leading-7 text-white/80 sm:mt-6 sm:text-base">{t.finalSub}</p></div><Button testId="button-final-demo" onClick={onDemo} variant="dark" className="w-full min-w-[220px] !py-4 !text-base sm:w-[240px]">{t.request}</Button></div></section><footer className="bg-[#20233c] px-5 py-8 text-[#f8f3e8] lg:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto flex max-w-[1240px] flex-col items-center justify-center gap-3"><p className="text-center text-xs text-white/50">{t.rights}</p><a href={privacyPolicyPdf} target="_blank" rel="noreferrer" className="text-center text-xs text-white/50 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white">{t.privacyPolicy}</a></div></footer></>;
}

function normalizeMobileDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[^\d+()\s-]/g, '');
}

type ContactFieldProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  testId: string;
  autoComplete: string;
  type?: 'text' | 'email' | 'tel';
  dir?: 'ltr' | 'rtl';
  inputMode?: 'text' | 'tel';
  maxLength: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function ContactField({ icon: Icon, label, value, testId, autoComplete, type = 'text', dir, inputMode, maxLength, onChange }: ContactFieldProps) {
  return <label className="block text-sm font-semibold text-[#20233c]"><span className="mb-2 block">{label}</span><span className="relative block"><Icon aria-hidden="true" size={18} strokeWidth={1.8} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[#008CFF]" /><input data-testid={testId} required maxLength={maxLength} type={type} inputMode={inputMode} autoComplete={autoComplete} value={value} onChange={onChange} className="w-full rounded-2xl border border-[#dce6f0] bg-[#f7fbff] px-4 py-4 ps-12 text-sm font-medium text-[#20233c] shadow-[inset_0_1px_0_rgba(255,255,255,.8)] outline-none transition-all hover:border-[#b8d8f4] focus:border-[#008CFF] focus:bg-white focus:ring-4 focus:ring-[#008CFF]/10" dir={dir} /></span></label>;
}

function DemoModal({ lang, close }: { lang: Lang; close: () => void }) {
  const t = copy[lang];
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', company: '', email: '', mobile: '' });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    const subject = lang === 'ar'
      ? `طلب تواصل جديد من ${form.company || form.name}`
      : `New contact request from ${form.company || form.name}`;
    const body = lang === 'ar'
      ? [
          `الاسم: ${form.name}`,
          `الشركة: ${form.company}`,
          `البريد الإلكتروني: ${form.email}`,
          `رقم الجوال: ${form.mobile}`,
        ].join('\n')
      : [
          `Name: ${form.name}`,
          `Company: ${form.company}`,
          `Email: ${form.email}`,
          `Mobile: ${form.mobile}`,
        ].join('\n');

    window.location.href = `mailto:malsayed9@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('success');
  }

  return <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#20233c]/75 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={t.request}>
    <div className="relative my-auto w-full max-w-[560px] rounded-[1.75rem] bg-white p-7 text-[#20233c] shadow-2xl md:p-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <button data-testid="button-close-demo" onClick={close} className="absolute left-6 top-6 rounded-full p-2 text-[#737487] transition-colors hover:bg-[#eaf5ff] hover:text-[#20233c]" aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}><X size={18} /></button>
       {status === 'success' ? <div className="py-12 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e4f1ed] text-[#248e88]"><Check size={28} /></div><h3 className="display-font mt-6 text-3xl font-semibold">{lang === 'ar' ? 'تم تجهيز رسالة البريد.' : 'Your email is ready.'}</h3><p className="mt-3 text-[#666778]">{lang === 'ar' ? 'اضغط «إرسال» من تطبيق البريد لإكمال طلبك.' : 'Press “Send” in your email app to complete your request.'}</p></div> : <>
        <h3 className="display-font max-w-[390px] text-4xl font-semibold leading-tight tracking-[-.06em]">{t.request}</h3>
        <p className="mt-4 text-sm leading-7 text-[#666778]">{t.finalSub}</p>
        <form className="mt-7 space-y-4" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactField icon={UserRound} label={t.nameLabel} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} testId="input-demo-name" autoComplete="name" maxLength={120} />
            <ContactField icon={Building2} label={t.companyLabel} value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} testId="input-demo-company" autoComplete="organization" maxLength={160} />
            <ContactField icon={Mail} label={lang === 'ar' ? 'البريد الإلكتروني' : 'Email'} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} testId="input-demo-email" autoComplete="email" type="email" dir="ltr" maxLength={200} />
            <ContactField icon={Phone} label={t.mobileLabel} value={form.mobile} onChange={(event) => setForm({ ...form, mobile: normalizeMobileDigits(event.target.value) })} testId="input-demo-mobile" autoComplete="tel" type="tel" inputMode="tel" dir="ltr" maxLength={30} />
          </div>
          {status === 'error' && <p role="alert" className="text-sm font-medium text-red-700">{t.sendError}</p>}
          <Button testId="button-submit-demo" type="submit" variant="aqua" className="w-full" disabled={status === 'submitting'}>{status === 'submitting' ? t.sending : t.send}</Button>
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
  return <main lang={lang} className="noise" dir={lang === 'ar' ? 'rtl' : 'ltr'}><Hero lang={lang} setLang={setLang} onDemo={() => setDemo(true)} /><PaymentGatewaySection lang={lang} /><Features lang={lang} /><Bnpm lang={lang} /><FAQ lang={lang} /><Footer lang={lang} onDemo={() => setDemo(true)} />{demo && <DemoModal lang={lang} close={() => setDemo(false)} />}<CookieNotice lang={lang} /></main>;
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