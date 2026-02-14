const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // 90+ ATS Optimized Data from Prasad_BinodCV.pdf
    const resumeData = {
        personalInfo: {
            fullName: "Binod Prasad",
            title: "Senior Full Stack Engineer | Angular & .NET Consultant",
            email: "prasadbinod490@gmail.com",
            phone: "+91-8868898356",
            location: "Mysore, Karnataka",
            zipCode: "570001",
            summary: "Versatile Senior Full Stack Engineer with 6+ years of experience specializing in Angular 17+, Node.js, and .NET 8. Core expertise in architecting scalable enterprise-grade web applications, optimizing front-end performance, and implementing Data Science workflows. Proven record of delivering high-impact solutions for fortune 500 clients like Deloitte and IBM.",
            linkedin: "linkedin.com/in/binod-prasad-0aa73714a",
            website: ""
        },
        education: [
            {
                institution: "Indian Institute of Technology (IIT), Roorkee",
                degree: "PG Certificate in Advanced Data Science & Machine Learning",
                year: "Dec 2021 – Dec 2022",
                description: "Focused on Statistical Modeling, Deep Learning, and Big Data Analytics."
            },
            {
                institution: "THDC Institute of Hydropower Engineering and Technology",
                degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
                year: "July 2014 – Aug 2018",
                description: ""
            }
        ],
        experience: [
            {
                company: "Deloitte",
                role: "Technology Consultant (Senior Developer)",
                duration: "Nov 2025 – Present",
                description: "• Engineered high-performance, scalable Angular components for large-scale enterprise applications, resulting in a 30% improvement in load times.\n• Spearheaded Agile transformation initiatives, optimizing sprint velocity and project delivery timelines.\n• Architected and deployed production-ready full-stack solutions using Angular and Cloud Services."
            },
            {
                company: "IBM",
                role: "Senior Application Developer",
                duration: "July 2024 – Oct 2025",
                description: "• Designed and implemented reactive mentor-matching algorithms using RxJS and NgRx, reducing search latency by 45%.\n• Integrated complex Angular ecosystems with IBM Cloud (Watson) services for intelligent data processing.\n• Built and maintained scalable Node.js microservices for high-traffic employee management modules."
            },
            {
                company: "Freelance / Independent Consultant",
                role: "Full Stack Software Engineer",
                duration: "Nov 2023 – June 2024",
                description: "• Developed an end-to-end multi-service booking platform using Angular and .NET Core, featuring secure multi-gateway payment integration.\n• Engineered a specialized maintenance tracking system for the British Railway infrastructure using reactive programming patterns.\n• Executed comprehensive SEO strategies and automated accessibility audits, increasing organic traffic by 50%."
            },
            {
                company: "Anicca Data Science Solutions",
                role: "Software Engineer (Full Stack & Data)",
                duration: "Nov 2022 – Oct 2023",
                description: "• Developed real-time inventory intelligence dashboards using Angular and D3.js.\n• Automated complex data engineering pipelines using Python (Airflow DAGs) for predictive supply chain analytics.\n• Conducted deep exploratory data analysis (EDA) using Pandas and NumPy to inform strategic decision-making."
            },
            {
                company: "Gloify",
                role: "Associate Software Engineer",
                duration: "May 2022 – Oct 2022",
                description: "• Built cloud-integrated Angular web solutions with Python-based RESTful API backends.\n• Enhanced technical SEO and performance metrics for high-visibility public-facing applications.\n• Implemented modular code architectures and led cross-functional code reviews."
            },
            {
                company: "Vidhikara",
                role: "Junior Software Developer",
                duration: "Feb 2020 – April 2022",
                description: "• Designed and implemented intuitive UI/UX components using Angular Material.\n• Developed robust CRUD APIs using .NET Core and SQL Server.\n• Collaborated on Python automation scripts for internal process optimization."
            }
        ],
        skills: ["Angular 17+", "TypeScript", "Node.js", "Python (FastAPI/Flask)", "C#", ".NET 8 Core", "RxJS", "NgRx", "SQL Server", "PostgreSQL", "IBM Cloud", "Cypress E2E", "Unit Testing (Jest)", "SEO Optimization", "Agile/Scrum", "Machine Learning", "Pandas/NumPy", "Git/GitHub", "HTML5/CSS3 (SASS)"],
        projects: [
            {
                name: "Intelligent Employee Resource Manager (IBM)",
                description: "Architected a comprehensive web ecosystem for high-integrity internal employee data management and role-based access control.",
                technologies: "Angular, Node.js, IBM Cloud, RxJS",
                link: ""
            },
            {
                name: "Instinct: Railway Infrastructure Monitor",
                description: "Developed a mission-critical reporting and scheduling tool for the British Railway system to digitize maintenance workflows.",
                technologies: "Angular, .NET Core, SQL Server, SignalR",
                link: ""
            },
            {
                name: "Flexfier: Global Booking Engine",
                description: "Built a highly responsive travel booking platform focusing on SEO performance and seamless mobile user experience.",
                technologies: "Angular, Firebase, Technical SEO",
                link: ""
            },
            {
                name: "AI-Driven Inventory Forecaster",
                description: "Developed a predictive inventory management tool using Machine Learning to optimize stock levels based on seasonal trends.",
                technologies: "Angular, Python, Scikit-learn, MLflow",
                link: ""
            },
            {
                name: "RFM McDonald’s Analytics Dashboard",
                description: "Engineered a store management system for McDonald’s that integrates HR, POS, and operational data into real-time visualizations.",
                technologies: "Angular, Cypress, D3.js",
                link: ""
            },
            {
                name: "Koshex: FinTech Portfolio Tracker",
                description: "An intuitive investment platform for mutual fund tracking and goal-based financial planning with real-time data flows.",
                technologies: "Angular, Python, PostgreSQL, SEO",
                link: ""
            },
            {
                name: "Televisory: Global Equity Platform",
                description: "Developed a large-scale stock market analysis platform featuring advanced trend analysis and customizable user alerts.",
                technologies: "Angular, WebSockets, Git",
                link: ""
            },
            {
                name: "Aikone & GPS: Fleet Intelligence",
                description: "Sophisticated GPS fleet tracking solution providing real-time safe-driving metrics and route optimization analytics.",
                technologies: "Angular, .NET Core, SQL Port, Git",
                link: ""
            }
        ]
    };

    try {
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

        console.log('Navigating to Resume Maker...');
        await page.goto('http://localhost:4200', { timeout: 60000 });

        console.log('Clearing existing data...');
        await page.evaluate(() => localStorage.clear());
        await page.reload({ waitUntil: 'networkidle0' });

        console.log('Waiting for app-root...');
        await page.waitForSelector('app-root', { timeout: 10000 });

        const clearAndType = async (selector, text) => {
            const input = await page.$(selector);
            if (input) {
                await input.click({ clickCount: 3 });
                await page.keyboard.press('Backspace');
                await input.type(text);
            }
        };

        // 1. Personal Info
        console.log('Filling Personal Info...');
        await clearAndType('input[formControlName="fullName"]', resumeData.personalInfo.fullName);
        await clearAndType('input[formControlName="title"]', resumeData.personalInfo.title);
        await clearAndType('input[formControlName="email"]', resumeData.personalInfo.email);
        await clearAndType('input[formControlName="phone"]', resumeData.personalInfo.phone);
        await clearAndType('input[formControlName="location"]', resumeData.personalInfo.location);
        await clearAndType('input[formControlName="zipCode"]', resumeData.personalInfo.zipCode);
        await clearAndType('textarea[formControlName="summary"]', resumeData.personalInfo.summary);
        await clearAndType('input[formControlName="linkedin"]', resumeData.personalInfo.linkedin);

        // 2. Education
        console.log('Filling Education...');
        await page.waitForSelector('.mat-mdc-tab-labels');
        const tabs = await page.$$('.mat-mdc-tab-labels .mat-mdc-tab');
        if (tabs[1]) await tabs[1].click();
        await new Promise(r => setTimeout(r, 800));

        for (let i = 0; i < resumeData.education.length; i++) {
            const addBtn = await page.$('app-education button[color="primary"]');
            if (addBtn) await addBtn.click();
            await new Promise(r => setTimeout(r, 300));

            const edu = resumeData.education[i];
            const items = await page.$$('app-education .education-item');
            const lastItem = items[items.length - 1];

            const instInput = await lastItem.$('input[formControlName="institution"]');
            await instInput.type(edu.institution);
            const degreeInput = await lastItem.$('input[formControlName="degree"]');
            await degreeInput.type(edu.degree);
            const yearInput = await lastItem.$('input[formControlName="year"]');
            await yearInput.type(edu.year);
            const descInput = await lastItem.$('textarea[formControlName="description"]');
            await descInput.type(edu.description);
        }

        // 3. Experience
        console.log('Filling Experience...');
        if (tabs[2]) await tabs[2].click();
        await new Promise(r => setTimeout(r, 800));

        for (let i = 0; i < resumeData.experience.length; i++) {
            const addBtn = await page.$('app-experience button[color="primary"]');
            if (addBtn) await addBtn.click();
            await new Promise(r => setTimeout(r, 300));

            const exp = resumeData.experience[i];
            const items = await page.$$('app-experience .experience-item');
            const lastItem = items[items.length - 1];

            const compInput = await lastItem.$('input[formControlName="company"]');
            await compInput.type(exp.company);
            const roleInput = await lastItem.$('input[formControlName="role"]');
            await roleInput.type(exp.role);
            const durInput = await lastItem.$('input[formControlName="duration"]');
            await durInput.type(exp.duration);
            const descInput = await lastItem.$('textarea[formControlName="description"]');
            await descInput.type(exp.description);
        }

        // 4. Skills
        console.log('Filling Skills...');
        if (tabs[3]) await tabs[3].click();
        await new Promise(r => setTimeout(r, 800));
        const skillInput = await page.$('app-skills input');
        for (const skill of resumeData.skills) {
            await skillInput.type(skill);
            await skillInput.press('Enter');
            await new Promise(r => setTimeout(r, 100));
        }

        // 5. Projects
        console.log('Filling Projects...');
        if (tabs[4]) await tabs[4].click();
        await new Promise(r => setTimeout(r, 800));
        for (let i = 0; i < resumeData.projects.length; i++) {
            const addBtn = await page.$('app-projects button[color="primary"]');
            if (addBtn) await addBtn.click();
            await new Promise(r => setTimeout(r, 300));

            const proj = resumeData.projects[i];
            const items = await page.$$('app-projects .project-item');
            const lastItem = items[items.length - 1];

            const nameInput = await lastItem.$('input[formControlName="name"]');
            await nameInput.type(proj.name);
            const techInput = await lastItem.$('input[formControlName="technologies"]');
            await techInput.type(proj.technologies);
            const descInput = await lastItem.$('textarea[formControlName="description"]');
            await descInput.type(proj.description);
        }

        console.log('Resume pre-filled successfully (90+ ATS OPTIMIZED)!');
        await page.screenshot({ path: 'ats_optimized_verification.png' });

    } catch (error) {
        console.error('Automation error:', error);
    } finally {
        console.log('Browser left open for user review. Press Ctrl+C in terminal if you want to stop.');
        await new Promise(() => { }); // Wait forever
    }
})();
