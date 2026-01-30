import { PrismaClient, Prisma } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding job offers...');

    // Create sample job offers
    await prisma.jobOffer.create({
        data: {
            title: 'BUSINESS DEVELOPMENT MANAGER',
            location: 'Warsaw, Poland',
            workType: 'Full-time',
            contractType: 'Permanent',
            employmentType: 'Employee',
            companyIntro: `<p>KINT Kafri International is a leading company in the agricultural sector, specializing in innovative solutions for crop protection and nutrition. Our dynamic team is dedicated to advancing sustainable agriculture and supporting farmers worldwide with cutting-edge products and expertise.</p>
<p>We are currently seeking a Business Development Manager to join our team and drive the growth of our business in the Eastern European market.</p>`,
            responsibilities: `<ul>
    <li>Developing and implementing strategic business plans for market expansion</li>
    <li>Identifying and acquiring new clients and distribution partners</li>
    <li>Building and maintaining strong relationships with key stakeholders</li>
    <li>Conducting market research and competitor analysis</li>
    <li>Negotiating and closing business deals</li>
    <li>Meeting and exceeding sales targets</li>
    <li>Collaborating with marketing teams to develop promotional strategies</li>
    <li>Reporting on market trends and business performance</li>
</ul>`,
            benefits: `<ul>
    <li>Competitive salary with performance-based bonuses</li>
    <li>Company car</li>
    <li>Mobile phone and laptop</li>
    <li>Private healthcare</li>
    <li>Multisport card</li>
    <li>Flexible working hours</li>
    <li>Professional development opportunities</li>
    <li>International travel opportunities</li>
</ul>`,
            qualifications: `<ul>
    <li>University degree in Business, Agriculture, or related field</li>
    <li>Minimum 3 years of experience in B2B sales or business development</li>
    <li>Experience in the agricultural sector is an advantage</li>
    <li>Excellent communication and negotiation skills</li>
    <li>Self-motivated with strong entrepreneurial mindset</li>
    <li>Fluent in Polish and English</li>
    <li>Willingness to travel within the region</li>
</ul>`,
            isActive: true,
        },
    });

    await prisma.jobOffer.create({
        data: {
            title: 'AGRONOMIST - TECHNICAL ADVISOR',
            location: 'Wrocław, Poland',
            workType: 'Full-time',
            contractType: 'Permanent',
            employmentType: 'Specialist',
            companyIntro: `<p>Join our technical team as an Agronomist - Technical Advisor and help farmers maximize their crop yields through expert guidance on our innovative product portfolio.</p>`,
            responsibilities: `<ul>
    <li>Providing technical support and advice to farmers and distributors</li>
    <li>Conducting field trials and demonstrations</li>
    <li>Delivering training sessions for sales teams and customers</li>
    <li>Developing crop-specific recommendation protocols</li>
    <li>Supporting product development with field feedback</li>
</ul>`,
            benefits: `<ul>
    <li>Competitive salary</li>
    <li>Company car</li>
    <li>Training and development opportunities</li>
    <li>Dynamic team environment</li>
</ul>`,
            qualifications: `<ul>
    <li>Degree in Agronomy, Plant Science, or related field</li>
    <li>Experience in crop protection or fertilizers industry</li>
    <li>Strong communication skills</li>
    <li>Ability to work independently in the field</li>
</ul>`,
            isActive: true,
        },
    });

    await prisma.jobOffer.create({
        data: {
            title: 'MARKETING SPECIALIST',
            location: 'Warsaw, Poland',
            workType: 'Hybrid',
            contractType: 'Permanent',
            employmentType: 'Employee',
            companyIntro: `<p>We are looking for a creative Marketing Specialist to help us build our brand and engage with our target audience across multiple channels.</p>`,
            responsibilities: `<ul>
    <li>Creating engaging content for digital and print media</li>
    <li>Managing social media presence</li>
    <li>Organizing trade shows and promotional events</li>
    <li>Developing marketing materials and presentations</li>
    <li>Analyzing marketing campaign performance</li>
</ul>`,
            benefits: `<ul>
    <li>Competitive salary</li>
    <li>Flexible working arrangements</li>
    <li>Creative team environment</li>
    <li>Professional growth opportunities</li>
</ul>`,
            qualifications: `<ul>
    <li>Degree in Marketing, Communications, or related field</li>
    <li>2+ years of marketing experience</li>
    <li>Experience in B2B marketing preferred</li>
    <li>Strong writing and creative skills</li>
    <li>Proficiency in digital marketing tools</li>
</ul>`,
            isActive: true,
        },
    });

    console.log('Job offers seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
