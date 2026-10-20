import { RiOpenaiFill, RiGrokAiFill } from 'react-icons/ri';
import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowUpLeft, Banknote, Check, Globe2, MessageCircle, Minus, Plus, ShieldCheck, ShoppingBag, Smartphone, Sparkles, X
} from 'lucide-react';
import repayLogo from '@assets/image_1788211428352.png';
import transferNotification from '@assets/whatsapp-transfer-notification-v2.png';
import { SiWhatsapp, SiClaude, SiGooglegemini, SiDeepseek, SiPerplexity } from 'react-icons/si';
import whatsappPhone from '@assets/whatsapp-phone-private.png';

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
    eyebrow: 'Beta Launch',
    hero: 'محفظة رقمية بلا حدود',
    heroSub: 'دفع، تحويل سريع، أو خلّه ينفّذ عنك. من أي مكان، وبموافقتك',
    paymentTitle: 'من أي مكان وفي أي مكان',
    paymentSub: 'نجعل العمليات المالية جزءًا من أي تجربة — داخل التطبيقات، المواقع والمنصات التي تستخدمها كل يوم',
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
    featureTitle: 'محفظتك بطريقتك',
     featureSub: 'تابع عمليات الدفع والتسوية بسهولة من خلال إشعارات فورية ومطابقة تلقائية للعمليات، لتقليل العمل اليدوي',
    feature1: 'اسم مستخدم واحد لكل حساباتك',
    feature1Sub: 'اربط بياناتك وحساباتك باسم مستخدم واحد، بدون مشاركة بيانات خاصة',
    feature2: 'حوّل، وهو يختار وين يستقبل',
    feature2Sub: 'حوّل من ري باي، والمستفيد يختار الحساب اللي يناسبه',
    feature3: 'تابع عملياتك',
    feature3Sub: 'مدفوعاتك وتحويلاتك وكل عملياتك بشكل واضح وبسيط',
    demoButtonTitle: 'جرّب الديمو',
    faqEyebrow: 'أسئلة واضحة',
    faqTitle: 'الأسئلة الشائعة',
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
    eyebrow: 'Beta Launch',
     hero: 'A wallet without limits',
      heroSub: 'Pay, send money, or let your agent handle it. Wherever you are, you stay in control.',
     paymentTitle: 'From Anywhere, To Anywhere',
     paymentSub: 'We make financial transactions part of any experience — across the apps, websites, and platforms you use every day',
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
      featureTitle: 'Your Wallet, Your Way',
     featureSub: 'Quiet tools in the background. A clear impact on every sale',
     feature1: 'One Username for All Your Accounts',
     feature1Sub: 'One username connects your details and accounts. Send and receive without sharing private information.',
     feature2: 'You send. They choose the account.',
      feature2Sub: 'Send money with RePay. The recipient decides which linked account to receive it in.',
     feature3: 'Track Your Activity',
      feature3Sub: 'See all your payments and transfers in one clear view.',
     demoButtonTitle: 'Try the Demo',
    faqEyebrow: 'Clear answers',
      faqTitle: 'Frequently Asked Questions',
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
     rights: '© 2026 RePay Financials, all rights reserved',
    privacyPolicy: 'Privacy Policy',
  },
} as const;

const faqData = {
  ar: [
    ['ما هي RePay؟', 'محفظة رقمية تنفّذ عنك عملياتك، وتتيح لك الدفع والتحويل السريع من أي مكان'],
    ['كيف يتم الحفاظ على بياناتي؟', 'نطبّق إجراءات أمنية ونشفّر بياناتك لحمايتها، ولا نستخدمها إلا لتقديم خدمات RePay والالتزام بالأنظمة ذات العلاقة. تبقى بيانات الدفع والبطاقات مشفّرة، ولا تُعرض لوكيل الذكاء الاصطناعي أثناء تنفيذ العمليات'],
    ['كيف يدفع وكيل الذكاء الاصطناعي بالنيابة عني؟', 'بعد موافقتك على المبلغ، يستخدم الوكيل بطاقة تُستخدم لمرة واحدة لإتمام الدفع، بدون الاطلاع على بياناتك الخاصة'],
    ['كيف أؤكد عمليات الدفع والتحويل؟', 'يوصلك إشعار من تطبيق ري باي لمراجعة تفاصيل العملية والموافقة عليها. ولا تُنفّذ العملية إلا بعد موافقتك'],
    ['هل أقدر أستقبل الأموال في أيٍّ من حساباتي؟', 'نعم، عندما تصلك حوالة عبر ري باي، تقدر تختار أي حساب من حساباتك المرتبطة وتحول المبلغ إليه لحظيًا'],
  ],
  en: [
    ['What is RePay?', 'RePay is a digital wallet for payments and fast transfers, wherever you are. It can act on your behalf, with your approval.'],
    ['How is my data protected?', 'We apply security measures and encrypt your data to protect it. We only use it to provide RePay services and comply with applicable regulations. Payment and card details remain encrypted and are never shown to the AI agent during transactions'],
    ['How does an AI agent pay on my behalf?', 'After you approve the amount, the agent uses a single-use card to complete the payment without accessing your private information'],
    ['How do I confirm payments and transfers?', 'You receive a notification from the RePay app to review the transaction details and approve them. No transaction is processed without your approval'],
    ['Can I receive money in any of my accounts?', 'Yes. When you receive a transfer through RePay, you can choose any of your linked accounts and move the money to it instantly'],
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
      <div className="reveal mx-auto w-full min-w-0 max-w-[760px] text-center">
        <div className="mb-7 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#FFB347]/30 bg-[#FFB347]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#FFB347]">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFB347] opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFB347]" /></span>
          <span>{t.eyebrow}</span>
        </div>
        <h1 className="hero-title display-font mx-auto max-w-[650px] text-[clamp(3.5rem,8vw,7.7rem)] font-semibold leading-[.95] tracking-[-.075em] text-white">{t.hero}</h1>
        <p className="reveal reveal-1 mx-auto mt-8 max-w-[600px] text-lg leading-8 text-white">{t.heroSub}</p>
        <div className="reveal reveal-2 mt-9 flex justify-center">
          <button type="button" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-[#30344f] px-9 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#3b405e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{lang === 'ar' ? 'ابدأ الآن' : 'Start now'}</button>
        </div>

      </div>
    </div>
    <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[10px] uppercase tracking-[.25em] text-white/40 md:flex"><span className="h-8 w-px bg-white/30" />scroll to explore</div>
  </section>;
}

function FittedDescription({ children }: { children: string }) {
  const container = useRef<HTMLParagraphElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const fit = () => {
      if (!container.current || !text.current) return;
      text.current.style.fontSize = '16px';
      const width = text.current.getBoundingClientRect().width;
      const available = container.current.clientWidth;
      if (width > available && available > 0) {
        text.current.style.fontSize = `${16 * available / width}px`;
      }
    };
    const observer = new ResizeObserver(fit);
    if (container.current) observer.observe(container.current);
    fit();
    let active = true;
    void document.fonts.ready.then(() => { if (active) fit(); });
    return () => { active = false; observer.disconnect(); };
  }, [children]);
  return <p ref={container} style={{ fontFamily: "'Rubik', sans-serif" }} className="mx-auto mt-4 w-full leading-8 text-[#A6A6A6]"><span ref={text} className="inline-block whitespace-nowrap align-top">{children}</span></p>;
}

function WhatsAppSection({ lang }: { lang: Lang }) {
  const ar = lang === 'ar';
  return <section id="experience" className="overflow-hidden bg-white px-6 pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:pb-24" dir={ar ? 'rtl' : 'ltr'}>
    <div className={`mx-auto max-w-[1240px] ${ar ? 'text-right' : 'text-left'}`}>
      <h2 style={{ fontFamily: "'Rubik', sans-serif" }} className="display-font max-w-[720px] text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.45] tracking-[-.025em] text-[#191D24]">{ar ? 'تحويل الأموال صار بسهولة إرسال رسالة' : 'Sending money is as easy as sending a message'}</h2>
      {ar ? <FittedDescription>اكتب «حوّل لمحمد ٢٠ ريال» أو شارك جهة اتصاله عبر واتساب. التحويل بموافقتك</FittedDescription> : <p className="mt-4 max-w-[720px] text-base leading-8 text-[#A6A6A6]">Send “Transfer SAR 20 to Mohammed” or share a contact on WhatsApp. You review and approve the transfer.</p>}
    </div>
    <div className="relative mx-auto mt-10 max-w-[760px] sm:mt-12">
      <img src={whatsappPhone} alt={ar ? 'محادثة RePay على واتساب لمراجعة تفاصيل الحوالة وتأكيدها' : 'RePay WhatsApp conversation showing transfer review and confirmation'} className="mx-auto block h-auto w-[72%] max-w-[310px] drop-shadow-[0_24px_35px_rgba(32,35,60,.12)]" />
      <div className="absolute -right-2 bottom-[4%] z-10 flex w-[88%] max-w-[420px] items-center gap-1 sm:right-0 sm:w-[58%] sm:gap-2">
        <img src={transferNotification} alt={ar ? 'إشعار RePay: تأكيد طلب تحويل، راجع تفاصيل العملية' : 'RePay notification: review your transfer request'} className="block h-auto min-w-0 flex-1" />
        <span aria-hidden="true" className="shrink-0 text-2xl drop-shadow-sm sm:text-3xl">🔔</span>
      </div>
      <div aria-hidden="true" className="absolute right-[3%] top-[12%] grid h-14 w-14 rotate-12 place-items-center rounded-[18px] bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,.22)] sm:right-[10%] sm:h-[72px] sm:w-[72px] sm:rounded-[22px]">
        <SiWhatsapp className="h-8 w-8 sm:h-10 sm:w-10" />
      </div>
    </div>
  </section>;
}

function Features({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const features = [{ icon: Banknote, title: t.feature1, sub: t.feature1Sub }, { icon: Sparkles, title: t.feature2, sub: t.feature2Sub }, { icon: ShieldCheck, title: t.feature3, sub: t.feature3Sub }];
  return <section id="features" className="bg-white px-5 py-20 sm:py-24 lg:px-8 lg:py-36" dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="mx-auto max-w-[1240px]"><div><h2 className="display-font max-w-[600px] text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-.06em] text-[#191D24]">{t.featureTitle}</h2></div><div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">{features.map(({ icon: Icon, title, sub }) => <div key={title} className="group relative isolate min-h-[300px] overflow-hidden rounded-[2rem] bg-[#fafafd] p-6 transition-transform duration-500 hover:-translate-y-2 sm:p-7"><div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/2 -z-10 h-[340px] w-[340px] -translate-y-1/2 rounded-full opacity-30 blur-[38px]" style={{ background: 'conic-gradient(from 20deg, #008CFF, #FFB347, #FF9B50, #008CFF)' }} /><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e5f1ff] text-[#008CFF]"><Icon size={21} /></div></div><h3 className="mt-20 text-lg font-bold leading-7 text-[#20233c] sm:mt-24 sm:text-xl">{title}</h3><p className="mt-3 text-sm font-medium leading-6 text-[#666778]">{sub}</p></div>)}</div></div></section>;
}

function AgentWalletSection({ lang }: { lang: Lang }) {
  const ar = lang === 'ar';
  return <section id="agent-wallet" className="relative isolate overflow-hidden bg-[#20233c] px-6 py-20 text-white lg:px-8 lg:py-28" dir={ar ? 'rtl' : 'ltr'}>
    <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[400px] w-[450px] rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,.025),transparent_65%)] blur-3xl" />
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#FFB347]/30 bg-[#FFB347]/10 px-3 py-2 text-[10px] font-semibold tracking-[.16em] text-[#FFB347]">
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFB347] opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFB347]" /></span>
        {ar ? 'قريبًا' : 'COMING SOON'}
      </div>
      <h2 className="display-font max-w-[760px] text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.35] tracking-[-.035em]">{ar ? 'محفظة لوكيل الذكاء الاصطناعي' : 'A wallet for your AI agent'}</h2>
      <p className="mt-6 max-w-[760px] text-base leading-8 text-white/80">{ar ? 'محفظة تدفع بالنيابة عنك ببطاقة تُستخدم لمرة واحدة لكل عملية. أنت توافق على المبلغ قبل الدفع، بدون مشاركة بياناتك وتتابع كل العمليات من تطبيق ري باي' : 'Let your AI agent pay with a fresh, single-use card for every purchase. You approve the amount first, your private details stay protected, and you can track everything in the RePay app.'}</p>
      <div className="mt-10 flex items-center" aria-label={ar ? 'برامج الذكاء الاصطناعي' : 'AI apps'}>
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#20233c] bg-[#343942] sm:h-14 sm:w-14  " style={{ zIndex: 6 }}><SiClaude role="img" aria-label="Claude" title="Claude" size={34} color="#D97757" /></span>
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#20233c] bg-[#343942] sm:h-14 sm:w-14 -ms-3 -translate-y-1" style={{ zIndex: 5 }}><RiOpenaiFill role="img" aria-label="ChatGPT" title="ChatGPT" size={36} color="#10A37F" /></span>
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#20233c] bg-[#343942] sm:h-14 sm:w-14 -ms-3 " style={{ zIndex: 4 }}><SiGooglegemini role="img" aria-label="Gemini" title="Gemini" size={34} style={{ fill: 'url(#agent-gemini-gradient)' }} /></span>
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#20233c] bg-[#343942] sm:h-14 sm:w-14 -ms-3 -translate-y-1" style={{ zIndex: 3 }}><RiGrokAiFill role="img" aria-label="Grok" title="Grok" size={36} color="#FFFFFF" /></span>
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#20233c] bg-[#343942] sm:h-14 sm:w-14 -ms-3 " style={{ zIndex: 2 }}><SiDeepseek role="img" aria-label="DeepSeek" title="DeepSeek" size={38} color="#4D6BFE" /></span>
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#20233c] bg-[#343942] sm:h-14 sm:w-14 -ms-3 -translate-y-1" style={{ zIndex: 1 }}><SiPerplexity role="img" aria-label="Perplexity" title="Perplexity" size={34} color="#20B8CD" /></span>
      </div>
      <svg aria-hidden="true" width="0" height="0" className="absolute"><defs><linearGradient id="agent-gemini-gradient" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#4285F4" /><stop offset=".5" stopColor="#9B72CB" /><stop offset="1" stopColor="#D96570" /></linearGradient></defs></svg>
    </div>
  </section>;
}

function FAQ({ lang }: { lang: Lang }) {
  const t = copy[lang]; const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="bg-white px-5 py-28 lg:px-8 lg:py-36" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
    <div className="mx-auto grid max-w-[1000px] gap-14 md:grid-cols-[.75fr_1.25fr]">
      <div><h2 className="display-font text-4xl font-semibold leading-[1.1] tracking-[-.06em] text-[#20233c] md:text-5xl">{t.faqTitle}</h2></div>
      <div className="border-t border-[#20233c]/15">
        {faqData[lang].map(([q, a], i) => <div key={q} className="border-b border-[#20233c]/15">
          <button data-testid={`button-faq-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-6 text-start text-base font-semibold text-[#20233c]">
            <span className="min-w-0 flex-1">{q}</span>
            {open === i ? <Minus size={18} className="shrink-0 text-[#248e88]" /> : <Plus size={18} className="shrink-0 text-[#248e88]" />}
          </button>
          <div className={`grid transition-[grid-template-rows] duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <p className="overflow-hidden pb-0 text-sm leading-7 text-[#666778]">{open === i && a}</p>
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <footer className="bg-[#20233c] px-5 py-8 lg:px-8" dir="ltr" style={{ fontFamily: "'Rubik', sans-serif" }}>
    <div className="mx-auto flex max-w-[1240px] items-start justify-between gap-6 text-xs font-normal leading-6 text-white/60">
      <p>© 2026 RePay Financials</p>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <a href={`${import.meta.env.BASE_URL}privacy-policy/document.pdf`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">{t.privacyPolicy}</a>
      </div>
    </div>
  </footer>;
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
  return <main lang={lang} className="noise" dir={lang === 'ar' ? 'rtl' : 'ltr'}><Hero lang={lang} setLang={setLang} onDemo={() => setDemo(true)} /><WhatsAppSection lang={lang} /><Features lang={lang} /><AgentWalletSection lang={lang} /><FAQ lang={lang} /><Footer lang={lang} />{demo && <DemoModal lang={lang} close={() => setDemo(false)} />}<CookieNotice lang={lang} /></main>;
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