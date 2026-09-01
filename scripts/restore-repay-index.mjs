import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.resolve(scriptsDir, "..");
const outputPath = path.join(workspaceDir, "artifacts", "repay-business", "index.html");
const templateDir = path.join(scriptsDir, "templates");
const partNames = [
  "repay-business-index.part1.b64",
  "repay-business-index.part2.b64",
  "repay-business-index.part3.b64",
];
const encodedParts = await Promise.all(
  partNames.map((name) => readFile(path.join(templateDir, name), "utf8")),
);
const seoDescription = "وسيلة جديدة للدفع مباشرة من الحساب البنكي، بدون تعقيد";
const seoJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://repay.sa/#organization",
      name: "RePay",
      url: "https://repay.sa/",
      logo: "https://repay.sa/favicon.png",
      description: seoDescription,
    },
    {
      "@type": "WebSite",
      "@id": "https://repay.sa/#website",
      url: "https://repay.sa/",
      name: "RePay",
      description: seoDescription,
      inLanguage: "ar-SA",
      publisher: { "@id": "https://repay.sa/#organization" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://repay.sa/#application",
      name: "RePay",
      url: "https://repay.sa/",
      description: seoDescription,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "ar-SA",
    },
  ],
});
const jsonLdScript = `<${"script"} type="application/ld+json">${seoJsonLd}<${"/script"}>`;
const html = encodedParts
  .map((encoded) => Buffer.from(encoded.trim(), "base64"))
  .join("")
  .replace('<html lang="en">', '<html lang="ar" dir="rtl">')
  .replace("<title>RePay for Business</title>", "<title>RePay</title>")
  .replaceAll('content="RePay for Business"', 'content="RePay"')
  .replaceAll(
    'content="RePay for Business — built on Replit. Update this description to reflect the app."',
    `content="${seoDescription}"`,
  )
  .replace('content="summary_large_image"', 'content="summary"')
  .replace(
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:url" content="https://repay.sa/" />
    <meta property="og:locale" content="ar_SA" />
    <meta property="og:site_name" content="RePay" />
    <meta property="og:type" content="website" />`,
  )
  .replace(
    '    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    `    <link rel="canonical" href="https://repay.sa/" />
    ${jsonLdScript}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />`,
  )
  .replace(
    'type="image/svg+xml" href="/favicon.svg"',
    'type="image/png" href="/favicon.png"',
  )
  .replace(
    '    <div id="root"></div>',
    `    <div id="root">
      <main dir="rtl" style="min-height:100vh;background:#20233c;color:#fff;padding:8rem 1.5rem;text-align:center;font-family:Arial,sans-serif">
        <h1 style="font-size:clamp(2.5rem,8vw,5rem);margin:0">مباشرة من حسابك البنكي</h1>
        <p style="font-size:1.125rem;line-height:2;margin:2rem auto 0;max-width:42rem">${seoDescription}</p>
      </main>
    </div>`,
  );

await writeFile(outputPath, html);