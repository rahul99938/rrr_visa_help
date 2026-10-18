# RRR Visa Help - Global Recruitment & Application Platform

আধুনিক ও রেসপনসিভ ইউরোপিয়ান জব অ্যাপ্লিকেশন ও ভিসা কনসালটেন্সি প্ল্যাটফর্ম।

## 🚀 গিটহাব (GitHub) এর মাধ্যমে লাইভ পাবলিশ করার নিয়ম

### অপশন ১: GitHub Pages (সম্পূর্ণ ফ্রি এবং সহজ)
১. গিটহাবে একটি নতুন রিপোজিটরি (Repository) তৈরি করুন (যেমন: `rrr-visa-help`)।
২. আপনার কোড গিটহাবে পুশ করুন:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/আপনার-ইউজারনেম/rrr-visa-help.git
   git push -u origin main
   ```
৩. গিটহাব রিপোজিটরির **Settings** > **Pages** ট্যাবে যান।
৪. **Build and deployment** সেকশনের **Source** ড্রপডাউন থেকে **GitHub Actions** নির্বাচন করুন।
৫. আমাদের যোগ করা `.github/workflows/deploy.yml` অটোমেটিক প্রজেক্ট বিল্ড করে লাইভ সাইট তৈরি করে দেবে! কয়েক সেকেন্ডের মধ্যে আপনার ফ্রি ওয়েবসাইট লিংক পেয়ে যাবেন (যেমন: `https://username.github.io/rrr-visa-help/`)।

---

### অপশন ২: Vercel বা Netlify (GitHub কানেক্ট করে ১ ক্লিকে ডিপ্লয়)
১. [Vercel](https://vercel.com) অথবা [Netlify](https://netlify.com)-এ যান এবং GitHub অ্যাকাউন্ট দিয়ে লগইন করুন।
২. **Add New Project** এ ক্লিক করে আপনার GitHub রিপোজিটরিটি সিলেক্ট করুন।
৩. ফ্রেমওয়ার্ক হিসেবে **Vite** স্বয়ংক্রিয়ভাবে ডিটেক্ট হবে।
৪. **Deploy** বাটনে ক্লিক করুন। ১ মিনিটের মধ্যে আপনার সাইট কাস্টম ডোমেইন সহ পাবলিকলি লাইভ হয়ে যাবে!

---

## 🛠️ লোকাল মেশিনে রান করার নিয়ম (Local Development)

```bash
# ডিপেন্ডেন্সি ইন্সটল করুন
npm install

# ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev

# প্রোডাকশন বিল্ড তৈরি করুন
npm run build
```
