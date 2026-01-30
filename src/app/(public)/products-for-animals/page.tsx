import Image from 'next/image';
import Link from 'next/link';

export default function ProductsForAnimalsPage() {
  return (
    <div>
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--primary)', lineHeight: '1.1' }}>Products for Animals</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--muted-foreground)', lineHeight: '1.8' }}>
              Solutions designed to support animal health, productivity, and wellbeing across poultry, ruminants, and swine.
            </p>
          </div>
          <div style={{ position: 'relative', height: '420px', borderRadius: '2rem', overflow: 'hidden' }}>
            <Image src="/images/animals-hero.png" alt="Products for animals" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ position: 'relative', height: '320px', borderRadius: '1.5rem', overflow: 'hidden' }}>
            <Image src="/images/animals-feature.bmp" alt="Animal nutrition" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <Link href="/products-for-animals/poultry" className="card" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '72px', height: '72px', marginBottom: '1.25rem', position: 'relative', borderRadius: '1rem', overflow: 'hidden' }}>
                <Image src="/images/chk.jpg" alt="Poultry" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Poultry</h3>
              <p style={{ color: 'var(--muted-foreground)' }}>Targeted solutions for poultry production.</p>
            </Link>

            <Link href="/products-for-animals/ruminants" className="card" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '72px', height: '72px', marginBottom: '1.25rem', position: 'relative', borderRadius: '1rem', overflow: 'hidden' }}>
                <Image src="/images/caow.jpg" alt="Ruminants" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Ruminants</h3>
              <p style={{ color: 'var(--muted-foreground)' }}>Support for cattle and dairy performance.</p>
            </Link>

            <Link href="/products-for-animals/swine" className="card" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '72px', height: '72px', marginBottom: '1.25rem', position: 'relative', borderRadius: '1rem', overflow: 'hidden' }}>
                <Image src="/images/pig.jpg" alt="Swine" fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Swine</h3>
              <p style={{ color: 'var(--muted-foreground)' }}>Solutions for swine growth and resilience.</p>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundImage: "url('/images/about-bottom.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', padding: '3rem', backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: '1.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>About KINT</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Learn more about our research-driven approach and commitment to delivering reliable animal production solutions worldwide.
            </p>
            <Link href="/about" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              About Company
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>MOST COMMON ISSUES</h2>

          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Poultry</h3>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>COCCIDIOSIS</h4>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7' }}>
              Coccidiosis is one of the most serious poultry diseases worldwide. For many years, the problem of coccidiosis has been solved by the use of chemoprophylaxis.
            </p>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7', marginTop: '1rem' }}>
              Due to the increasing resistance of these parasites to existing solutions, it is reasonable to use plant-extract-based products with proven anti-coccidial effect as a preventative measure. KOKCIDIN® is a composition of carefully selected natural plant extracts demonstrating prophylactic anti-coccidial activity.
            </p>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7', marginTop: '1rem' }}>
              The composition of KOKCIDIN® was developed and analysed by a team of experts in poultry nutrition. Its formulation demonstrates bacteriostatic and immunostimulatory activity. It may also be implemented as a solution to the problem of increased protozoal resistance to standard pharmaceuticals and consumer expectations regarding the quality of poultry meat and eggs. The positive effect of KOKCIDIN® is not only due to its direct effects on the parasites, but also results from the complex, broad activity of the compounds it contains. Among others effects, the stabilisation of bacterial flora (bacteriostatic activity), the stimulation of intestinal villi regeneration, the alleviation of intestinal inflammation, and the activation of immune processes have been confirmed.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Link href="/products-for-animals/poultry" className="btn btn-primary">More</Link>
              <Link href="/contact" className="btn btn-outline">countact us</Link>
            </div>
          </div>

          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Ruminants</h3>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>KETOSIS</h4>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7' }}>
              Ketosis is a common metabolic disease mainly occurring in cows with a high-yield milk production potential as a result of a negative energy balance and abnormal metabolism associated with energy shortages.
            </p>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7', marginTop: '1rem' }}>
              On farms with an average milk yield of 6000 kg per 305 days of lactation, ketosis occurs in 20% of cows. The highest risk of ketosis occurs between days 10 and 50 of lactation.
            </p>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7', marginTop: '1rem' }}>
              The ideal solution is the administration of glucoplastic substances which increase blood glucose content and reduce the concentration of ketone bodies, supplementation with vitamins (niacin and choline) which regulate fat metabolism pathways and prevent fatty liver syndrome, as well as supplementation with vitamin E, zinc, and selenium, which stimulate the cow’s resistance to infections.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Link href="/products-for-animals/ruminants" className="btn btn-primary">More</Link>
              <Link href="/contact" className="btn btn-outline">countact us</Link>
            </div>
          </div>

          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Swine</h3>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>A QUICK START</h4>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7' }}>
              One of the most important phases in pig breeding is weaning time. During this period, piglets begin a stage of intensive growth and it is necessary to stimulate the development of the digestive system.
            </p>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.7', marginTop: '1rem' }}>
              Research on sodium butyrate show its capability to accelerate the development of the intestinal villi and inhibit the growth of bacteria from the Enterobacteriaceae family. Moreover, young animals are very sensitive to deficiencies of fat-soluble vitamins. Therefore, it is necessary to provide them with products which are rich in amino acids, fatty acid salts and ADEK vitamins. This accelerates the development of the animals and decreases future fattening time.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Link href="/products-for-animals/swine" className="btn btn-primary">More</Link>
              <Link href="/contact" className="btn btn-outline">countact us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
