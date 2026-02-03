import prisma from "@/lib/prisma";
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { 
  Lightbulb, 
  Users, 
  ShieldCheck, 
  Leaf, 
  Tractor, 
  Microscope, 
  Wheat, 
  Play, 
  ArrowRight,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

export const revalidate = 300;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHomeNew = await getTranslations('HomeNew');
  const isAr = locale === 'ar';
  const agentLogos: Array<{ src?: string; alt: string }> = [
    { src: "/images/agents/company1.png", alt: "Agent 1" },
    { src: "/images/agents/company2.png", alt: "Agent 2" },
    { src: "/images/agents/company3.png", alt: "Agent 3" },
    { src: "/images/agents/company4.png", alt: "Agent 4" },
    { src: "/images/agents/company5.png", alt: "Agent 5" },
  ];
  const marqueeLogos = [...agentLogos, ...agentLogos];

  let news: any[] = [];
  let categories: Array<{ id: string; name: string; name_ar: string | null; slug: string; image: string | null }> = [];

  try {
    [news, categories] = await Promise.all([
      prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        take: 3
      }),
      prisma.category.findMany({
        where: { isActive: true, parentId: null },
        select: { id: true, name: true, name_ar: true, slug: true, image: true },
        orderBy: { order: 'asc' }
      })
    ]);
  } catch (error) {
    console.error("Homepage data load failed:", error);
  }

  return (
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? 'inherit' : 'inherit', overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .home-section-pad {
            padding: 3.5rem 0 !important;
          }
          .home-features {
            margin-top: 0 !important;
            padding: 3.5rem 0 !important;
          }
          .home-mission-video {
            height: 340px !important;
          }
          .home-articles-grid {
            grid-template-columns: 1fr !important;
          }
          .home-why-image {
            height: 360px !important;
          }
          .agents-card {
            width: 160px !important;
            height: 80px !important;
          }
          .agents-marquee {
            gap: 1.25rem !important;
            animation-duration: 18s !important;
          }
        }
      `}</style>
      
      {/* 1. Hero Section */}
      <section style={{
        position: 'relative',
        height: '90vh',
        minHeight: 'clamp(560px, 90vh, 800px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
           <Image
            src="/images/hero.png"
            alt="Hero"
            fill
            priority
            style={{ objectFit: 'cover' }}
            className="animate-pulse-slow" 
          />
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
          zIndex: 0
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
          <div className="animate-fade-in-up" style={{ maxWidth: '800px' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              marginBottom: '1.5rem', 
              lineHeight: '1.1', 
              fontWeight: 800,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              {tHomeNew('heroTitle')}
            </h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '1.5rem', color: 'var(--primary-light)', fontWeight: 600 }}>
               {tHomeNew('heroSubtitle')}
            </h2>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', marginBottom: '3rem', opacity: 0.9, lineHeight: '1.6', maxWidth: '600px' }}>
              {tHomeNew('heroDesc')}
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href={`/contact`} className="btn btn-primary hover-card" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px' }}>
                {tHomeNew('heroCta')}
              </Link>
              <Link href={`/about`} className="btn" style={{ 
                padding: '1.2rem 2.5rem', 
                fontSize: '1.1rem', 
                backgroundColor: 'transparent', 
                border: '2px solid white', 
                color: 'white',
                borderRadius: '50px'
              }}>
                {tHomeNew('discoverMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section (Innovation, Experts, Quality) */}
      <section className="section home-features" style={{ padding: '6rem 0', backgroundColor: '#fff', position: 'relative', marginTop: '-4rem', zIndex: 2 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Feature 1 */}
            <div className="card hover-card" style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', borderRadius: '1rem', borderTop: '5px solid var(--primary)' }}>
               <div style={{ 
                 width: '80px', height: '80px', backgroundColor: 'rgba(233, 73, 108, 0.1)', 
                 borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                 margin: '0 auto 1.5rem', color: 'var(--primary)'
               }}>
                 <Lightbulb size={40} strokeWidth={1.5} />
               </div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>{tHomeNew('innovation')}</h3>
               <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{tHomeNew('innovationDesc')}</p>
            </div>
            {/* Feature 2 */}
             <div className="card hover-card" style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', borderRadius: '1rem', borderTop: '5px solid var(--secondary)' }}>
               <div style={{ 
                 width: '80px', height: '80px', backgroundColor: 'rgba(20, 35, 70, 0.1)', 
                 borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                 margin: '0 auto 1.5rem', color: 'var(--secondary)'
               }}>
                 <Users size={40} strokeWidth={1.5} />
               </div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>{tHomeNew('experts')}</h3>
               <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{tHomeNew('expertsDesc')}</p>
            </div>
            {/* Feature 3 */}
             <div className="card hover-card" style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', borderRadius: '1rem', borderTop: '5px solid var(--accent)' }}>
               <div style={{ 
                 width: '80px', height: '80px', backgroundColor: 'rgba(245, 158, 11, 0.1)', 
                 borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                 margin: '0 auto 1.5rem', color: 'var(--accent)'
               }}>
                 <ShieldCheck size={40} strokeWidth={1.5} />
               </div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>{tHomeNew('quality')}</h3>
               <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{tHomeNew('qualityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section className="section home-section-pad" style={{ backgroundColor: '#f8fafc', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
             <div className="animate-fade-in-up">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ height: '2px', width: '50px', backgroundColor: 'var(--primary)' }}></span>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{tHomeNew('aboutUs')}</span>
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
                  {tHomeNew('companyName')}
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--muted-foreground)', marginBottom: '2.5rem' }}>
                  {tHomeNew('aboutDesc')}
                </p>
                <Link href={`/about`} className="btn btn-outline hover-card" style={{ 
                  padding: '1rem 2.5rem', 
                  borderRadius: '50px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}>
                  {tHomeNew('discoverMore')}
                  <ArrowRight size={18} />
                </Link>
             </div>
             <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-20px', right: isAr ? 'auto' : '-20px', left: isAr ? '-20px' : 'auto', zIndex: 0 }}>
                   <div style={{ width: '200px', height: '200px', backgroundColor: 'rgba(233, 73, 108, 0.05)', borderRadius: '50%' }}></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', position: 'relative', zIndex: 1 }}>
                   <div className="card hover-card" style={{ padding: '2.5rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--primary)', padding: '10px', backgroundColor: '#fff0f3', borderRadius: '10px' }}>
                        <Leaf size={32} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 700 }}>{tHomeNew('sellAgri')}</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{tHomeNew('sellAgriDesc')}</p>
                      </div>
                   </div>
                   <div className="card hover-card" style={{ padding: '2.5rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--secondary)', padding: '10px', backgroundColor: '#eef2ff', borderRadius: '10px' }}>
                        <Tractor size={32} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 700 }}>{tHomeNew('sellVet')}</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{tHomeNew('sellVetDesc')}</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Products Categories */}
      <section className="section home-section-pad" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{tHomeNew('ourProducts')}</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.5rem', fontWeight: 800 }}>{tHomeNew('whatWeOffer')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
             {categories.map((category, idx) => {
               const title = isAr ? (category.name_ar || category.name) : category.name;
               const slugLower = category.slug.toLowerCase();
               const fallbackImages = [
                 '/images/cat-organic.png',
                 '/images/animals-hero.png',
                 '/images/cat-biostimulants.png',
                 '/images/cat-fertilizers.png',
               ];

               const safeCategoryImage =
                 category.image &&
                 (category.image.startsWith('/') || category.image.startsWith('https://images.unsplash.com/'))
                   ? category.image
                   : null;

               const computedImage =
                 safeCategoryImage ||
                 (slugLower.includes('animal') || slugLower.includes('vet')
                   ? '/images/animals-hero.png'
                   : slugLower.includes('bio') || slugLower.includes('vital')
                     ? '/images/cat-biostimulants.png'
                     : slugLower.includes('feed') || slugLower.includes('fert')
                       ? '/images/cat-fertilizers.png'
                       : fallbackImages[idx % fallbackImages.length]);

               const icon =
                 slugLower.includes('animal') || slugLower.includes('vet')
                   ? <Tractor />
                   : slugLower.includes('bio') || slugLower.includes('vital')
                     ? <Microscope />
                     : slugLower.includes('feed') || slugLower.includes('fert')
                       ? <Wheat />
                       : <Leaf />;

               return (
               <div key={category.id} className="card hover-card" style={{ 
                 overflow: 'hidden', borderRadius: '1.5rem', backgroundColor: 'white', 
                 boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' 
               }}>
                  <div style={{ position: 'relative', height: '280px', backgroundColor: '#f8fafc' }}>
                    <Image src={computedImage} alt={title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ 
                      position: 'absolute', top: '1rem', left: isAr ? 'auto' : '1rem', right: isAr ? '1rem' : 'auto',
                      backgroundColor: 'white', padding: '0.5rem', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      color: 'var(--primary)'
                    }}>
                      {icon}
                    </div>
                  </div>
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 700 }}>{title}</h3>
                    <Link href={`/product-category/${category.slug}`} style={{ 
                      color: 'var(--primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      textDecoration: 'none'
                    }}>
                      {tHomeNew('viewProducts')} <ArrowRight size={16} />
                    </Link>
                  </div>
               </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* 5. Stats Section */}
      <section style={{ 
        backgroundColor: 'var(--secondary)', 
        color: 'white', 
        padding: '5rem 0',
        position: 'relative',
        backgroundImage: 'url(/images/banners/laboratory-research.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}>
         <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
               {[
                 { num: '100', label: tHomeNew('statsProduct'), icon: <Briefcase size={32} /> },
                 { num: '1,000', label: tHomeNew('statsClient'), icon: <Users size={32} /> },
                 { num: '100', label: tHomeNew('statsAgency'), icon: <ShieldCheck size={32} /> },
                 { num: '100', label: tHomeNew('statsDistributor'), icon: <Leaf size={32} /> },
               ].map((stat, idx) => (
                 <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                      {stat.icon}
                    </div>
                    <div style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1 }}>{stat.num}</div>
                    <div style={{ fontSize: '1.2rem', opacity: 0.9, fontWeight: 500 }}>{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. Mission / Video */}
      <section className="section home-section-pad" style={{ padding: '6rem 0' }}>
         <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
               <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem', fontWeight: 800 }}>{tHomeNew('ourMission')}</h2>
               <p style={{ fontSize: '1.5rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{tHomeNew('missionDesc')}</p>
            </div>
            <div className="home-mission-video" style={{ 
              position: 'relative', height: '500px', borderRadius: '2rem', overflow: 'hidden', 
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)', backgroundColor: 'var(--secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
               {/* Professional Animated Identity */}
               <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                  {/* Background animated gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
                    zIndex: 0
                  }} />
                  
                  {/* Animated Rings */}
                  <div className="animate-pulse-ring" style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '300px', height: '300px', border: '1px solid rgba(233, 73, 108, 0.3)', borderRadius: '50%',
                    zIndex: 1
                  }} />
                  <div className="animate-pulse-ring" style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '450px', height: '450px', border: '1px solid rgba(233, 73, 108, 0.1)', borderRadius: '50%',
                    zIndex: 1, animationDelay: '1s'
                  }} />

                  {/* Central Hub */}
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 10, textAlign: 'center'
                  }}>
                     <div className="animate-float" style={{
                       width: '120px', height: '120px', backgroundColor: 'white', borderRadius: '50%',
                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                       boxShadow: '0 0 40px rgba(233, 73, 108, 0.4)',
                       margin: '0 auto 1.5rem'
                     }}>
                        <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                           <Image src="/images/logo.png" alt="KINT Logo" fill style={{ objectFit: 'contain' }} />
                        </div>
                     </div>
                     <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px' }}>KINT</h3>
                     <p style={{ color: 'var(--primary)', fontSize: '0.9rem', letterSpacing: '1px' }}>INTERNATIONAL</p>
                  </div>

                  {/* Orbiting Elements */}
                  <div className="animate-spin-slow" style={{
                    position: 'absolute', top: '50%', left: '50%', width: '300px', height: '300px',
                    marginLeft: '-150px', marginTop: '-150px', zIndex: 5
                  }}>
                     {/* Satellite 1: Plant */}
                     <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                           <Leaf color="var(--primary)" size={24} />
                        </div>
                     </div>
                     {/* Satellite 2: Animal */}
                     <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                           <Tractor color="var(--secondary)" size={24} />
                        </div>
                     </div>
                     {/* Satellite 3: Science */}
                     <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                           <Microscope color="var(--accent)" size={24} />
                        </div>
                     </div>
                     {/* Satellite 4: Quality */}
                     <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translate(50%, -50%)' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                           <ShieldCheck color="#10b981" size={24} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 7. Articles Section */}
      <section className="section home-section-pad" style={{ backgroundColor: '#f8fafc', padding: '6rem 0' }}>
        <div className="container">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
             <div>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{tHomeNew('articlesSubtitle')}</span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.5rem', fontWeight: 800 }}>{tHomeNew('ourArticles')}</h2>
             </div>
             <Link href={`/blog`} className="btn btn-outline" style={{ borderRadius: '50px', padding: '0.8rem 2rem' }}>
                {tHomeNew('discoverMore')}
             </Link>
           </div>
           <div className="home-articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {news.map((post: any) => {
                 const postTitle = (isAr && post.title_ar) ? post.title_ar : post.title;
                 const postExcerpt = (isAr && post.excerpt_ar) ? post.excerpt_ar : post.excerpt;
                 return (
                   <Link key={post.id} href={`/blog/${post.slug}`} className="card hover-card" style={{ 
                     backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                     display: 'flex', flexDirection: 'column', height: '100%'
                   }}>
                     <div style={{ position: 'relative', height: '240px' }}>
                        <Image src={post.image || '/images/hero.png'} alt={postTitle} fill style={{ objectFit: 'cover' }} />
                     </div>
                     <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 700, lineHeight: 1.4 }}>{postTitle}</h3>
                        <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                          {postExcerpt?.substring(0, 100)}...
                        </p>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {tHomeNew('discoverMore')} <ArrowRight size={16} />
                        </span>
                     </div>
                   </Link>
                 );
              })}
              {news.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--muted-foreground)', backgroundColor: 'white', borderRadius: '1rem' }}>
                  <p>{tHomeNew('ourArticles')}</p>
                </div>
              )}
           </div>
        </div>
      </section>

      {/* 8. Why Us Section */}
      <section className="section home-section-pad" style={{ padding: '6rem 0' }}>
         <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
               <div>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{tHomeNew('whyUs')}</span>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>{tHomeNew('whyUsSubtitle')}</h2>
                  <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.8', color: 'var(--muted-foreground)' }}>
                     {tHomeNew('whyUsDesc')}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                     {[
                       tHomeNew('whyUsPoint1'),
                       tHomeNew('whyUsPoint2'),
                       tHomeNew('whyUsPoint3')
                     ].map((point, idx) => (
                       <li key={idx} style={{ 
                         marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem',
                         padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '1rem',
                         border: '1px solid #f1f5f9'
                       }}>
                          <div style={{ 
                            minWidth: '30px', height: '30px', backgroundColor: 'var(--primary)', borderRadius: '50%', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                          }}>
                            <CheckCircle2 size={18} />
                          </div>
                          <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{point}</span>
                       </li>
                     ))}
                  </ul>
               </div>
              <div className="home-why-image" style={{ position: 'relative', height: '600px', borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                  <Image src="/images/banners/field-check.jpg" alt="Why Us" fill style={{ objectFit: 'cover' }} />
               </div>
            </div>
         </div>
      </section>

      {/* 9. Team Section */}
      <section className="section" style={{ backgroundColor: '#f8fafc', padding: '6rem 0' }}>
         <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
               <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', fontWeight: 800 }}>{tHomeNew('ourTeam')}</h2>
               <p style={{ color: 'var(--muted-foreground)', fontSize: '1.2rem' }}>{tHomeNew('teamSubtitle')}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
               {[
                 { name: 'أيمن كفري', title: tHomeNew('agriEng'), img: '/images/hero.png' },
                 { name: 'ايمان أبو الرب', title: tHomeNew('agriEng'), img: '/images/hero.png' },
                 { name: 'عدين الظاهر', title: tHomeNew('agriEng'), img: '/images/hero.png' },
               ].map((member, idx) => (
                 <div key={idx} className="card hover-card" style={{ 
                   textAlign: 'center', padding: '3rem 2rem', backgroundColor: 'white', 
                   borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
                 }}>
                    <div style={{ 
                      width: '140px', height: '140px', borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto 1.5rem',
                      overflow: 'hidden', position: 'relative', border: '5px solid #f8fafc'
                    }}>
                       <Image src={member.img} alt={member.name} fill style={{ objectFit: 'cover' }} /> 
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>{member.name}</h3>
                    <p style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 600 }}>{member.title}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 10. Agents Section */}
      <section className="section home-section-pad" style={{ padding: '6rem 0' }}>
         <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', fontWeight: 800 }}>{tHomeNew('ourAgents')}</h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '4rem', fontSize: '1.2rem' }}>{tHomeNew('agentsSubtitle')}</p>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1.5rem', padding: '1.5rem 0' }}>
              <div
                className="agents-marquee"
                style={{
                  display: 'flex',
                  width: 'max-content',
                  gap: '2.5rem',
                  animation: `${isAr ? 'agentsMarqueeRtl' : 'agentsMarqueeLtr'} 22s linear infinite`,
                  willChange: 'transform',
                }}
              >
                {marqueeLogos.map((logo, idx) => (
                  <div
                    key={`${logo.alt}-${idx}`}
                    className="hover-card agents-card"
                    style={{
                      width: '200px',
                      height: '96px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.85,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {logo.src ? (
                      <Image src={logo.src} alt={logo.alt} fill style={{ objectFit: 'contain', padding: '1.25rem' }} />
                    ) : (
                      <Briefcase size={32} color="#94a3b8" />
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 12%, rgba(255,255,255,0) 88%, rgba(255,255,255,1) 100%)',
                }}
              />

              <style>{`
                @keyframes agentsMarqueeLtr {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes agentsMarqueeRtl {
                  0% { transform: translateX(-50%); }
                  100% { transform: translateX(0); }
                }
              `}</style>
            </div>
         </div>
      </section>
    </div>
  );
}
