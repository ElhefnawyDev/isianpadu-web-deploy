export interface Project {
    name: string;
    date: string;
    description: string;
  }
  
  export interface Company {
    name: string;
    logo: string;
    startDate: string;
    projects: Project[];
  }
  
  export interface Category {
    name: string;
    companies: Company[];
  }
  
  export const experiences: Category[] = [
    {
      name: "Government Ministry",
      companies: [
        {
          name: "TechCorp",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Jan 2022",
          projects: [
            {
              name: "E-commerce Platform Redesign",
              date: "Mar 2022 - Jul 2022",
              description: "Led the redesign of the company's flagship e-commerce platform, improving conversion rates by 25%. Implemented new features such as personalized product recommendations and a streamlined checkout process."
            },
            {
              name: "Customer Dashboard",
              date: "Aug 2022 - Dec 2022",
              description: "Developed a comprehensive customer dashboard with real-time analytics and personalized recommendations. Integrated data from multiple sources to provide a 360-degree view of customer interactions and preferences."
            },
            {
              name: "API Gateway Implementation",
              date: "Jan 2023 - Apr 2023",
              description: "Designed and implemented an API gateway to streamline communication between microservices. This resulted in improved system reliability and a 30% reduction in inter-service latency."
            },
            {
              name: "Progressive Web App Conversion",
              date: "May 2023 - Aug 2023",
              description: "Led the effort to convert the main web application into a Progressive Web App (PWA). This project improved offline functionality and mobile user experience, resulting in a 20% increase in mobile user engagement."
            },
            {
              name: "Performance Optimization Initiative",
              date: "Sep 2023 - Nov 2023",
              description: "Spearheaded a company-wide performance optimization initiative. Implemented lazy loading, code splitting, and caching strategies, which led to a 40% improvement in page load times across all web properties."
            },
            {
              name: "Accessibility Compliance Project",
              date: "Dec 2023 - Present",
              description: "Currently leading a project to ensure all web applications comply with WCAG 2.1 AA standards. This involves auditing existing applications, implementing necessary changes, and establishing guidelines for future development."
            }
          ]
        },
         {
          name: "TechCorp",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Jan 2022",
          projects: [
            {
              name: "E-commerce Platform Redesign",
              date: "Mar 2022 - Jul 2022",
              description: "Led the redesign of the company's flagship e-commerce platform, improving conversion rates by 25%. Implemented new features such as personalized product recommendations and a streamlined checkout process."
            },
            {
              name: "Customer Dashboard",
              date: "Aug 2022 - Dec 2022",
              description: "Developed a comprehensive customer dashboard with real-time analytics and personalized recommendations. Integrated data from multiple sources to provide a 360-degree view of customer interactions and preferences."
            },
            {
              name: "API Gateway Implementation",
              date: "Jan 2023 - Apr 2023",
              description: "Designed and implemented an API gateway to streamline communication between microservices. This resulted in improved system reliability and a 30% reduction in inter-service latency."
            },
            {
              name: "Progressive Web App Conversion",
              date: "May 2023 - Aug 2023",
              description: "Led the effort to convert the main web application into a Progressive Web App (PWA). This project improved offline functionality and mobile user experience, resulting in a 20% increase in mobile user engagement."
            },
            {
              name: "Performance Optimization Initiative",
              date: "Sep 2023 - Nov 2023",
              description: "Spearheaded a company-wide performance optimization initiative. Implemented lazy loading, code splitting, and caching strategies, which led to a 40% improvement in page load times across all web properties."
            },
            {
              name: "Accessibility Compliance Project",
              date: "Dec 2023 - Present",
              description: "Currently leading a project to ensure all web applications comply with WCAG 2.1 AA standards. This involves auditing existing applications, implementing necessary changes, and establishing guidelines for future development."
            }
          ]
        },
        
        {
          name: "WebSolutions",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Mar 2020",
          projects: [
            {
              name: "Content Management System",
              date: "Apr 2020 - Nov 2020",
              description: "Built a custom CMS that reduced content update times by 40% for our clients. Implemented features such as version control, workflow management, and a WYSIWYG editor."
            },
            {
              name: "Online Booking System",
              date: "Dec 2020 - Jun 2021",
              description: "Developed a scalable online booking system for a chain of hotels, handling over 10,000 bookings per day. Integrated with multiple third-party services for payment processing and inventory management."
            },
            {
              name: "Real-time Collaboration Tool",
              date: "Jul 2021 - Feb 2022",
              description: "Created a real-time collaboration tool for remote teams, featuring document editing, video conferencing, and task management. Utilized WebSocket technology for instant updates across all connected clients."
            }
          ]
        }
      ]
    },
    {
      name: "GLC",
      companies: [
        {
          name: "AppInnovate",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Jun 2019",
          projects: [
            {
              name: "Fitness Tracking App",
              date: "Jul 2019 - Nov 2019",
              description: "Created a cross-platform fitness app that synced with various wearable devices, reaching 100,000 downloads in the first month. Implemented features such as personalized workout plans and social sharing."
            },
            {
              name: "Social Media Integration SDK",
              date: "Dec 2019 - Feb 2020",
              description: "Developed a SDK for easy integration of major social media platforms into mobile apps. This toolkit reduced social media integration time for client projects by 60%."
            }
          ]
        },
        {
          name: "MobileTech",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Jan 2018",
          projects: [
            {
              name: "Augmented Reality Shopping App",
              date: "Feb 2018 - Aug 2018",
              description: "Built an iOS app using ARKit that allowed users to visualize furniture in their homes before purchasing. This innovative feature led to a 35% increase in customer engagement for our client."
            },
            {
              name: "Smart Home Control App",
              date: "Sep 2018 - Mar 2019",
              description: "Developed a universal smart home control app that integrated with multiple IoT protocols. The app allowed users to control various smart home devices from different manufacturers through a single interface."
            }
          ]
        }
      ]
    },
    {
      name: "Private",
      companies: [
        {
          name: "DataInsights",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Jul 2017",
          projects: [
            {
              name: "Customer Churn Prediction Model",
              date: "Aug 2017 - Oct 2017",
              description: "Developed a machine learning model that predicted customer churn with 85% accuracy, allowing for targeted retention efforts. The model integrated data from multiple sources including purchase history, customer support interactions, and website behavior."
            },
            {
              name: "Sentiment Analysis Tool",
              date: "Nov 2017 - Dec 2017",
              description: "Created a sentiment analysis tool for product reviews, improving product development decisions. The tool was capable of analyzing text in multiple languages and identifying specific product features mentioned in reviews."
            }
          ]
        },
        {
          name: "AILabs",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Feb 2016",
          projects: [
            {
              name: "Natural Language Processing Engine",
              date: "Mar 2016 - Sep 2016",
              description: "Contributed to the development of a NLP engine that improved chatbot response accuracy by 30%. The engine was capable of understanding context and maintaining conversation coherence across multiple turns."
            },
            {
              name: "Multilingual Speech Recognition",
              date: "Oct 2016 - May 2017",
              description: "Worked on improving speech recognition accuracy for various accents and languages, achieving a 20% error reduction. The system was trained on a diverse dataset of speakers from different regions and age groups."
            }
          ]
        }
      ]
    },
    {
      name: "FSIs",
      companies: [
        {
          name: "CloudOps",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Aug 2015",
          projects: [
            {
              name: "CI/CD Pipeline Automation",
              date: "Sep 2015 - Nov 2015",
              description: "Implemented automated CI/CD pipelines that reduced deployment times by 60% and improved code quality. The pipeline included automated testing, security scanning, and performance benchmarking."
            },
            {
              name: "Cloud Cost Optimization",
              date: "Dec 2015 - Jan 2016",
              description: "Optimized cloud resource utilization, resulting in a 30% reduction in operational costs for clients. This involved implementing auto-scaling policies, rightsizing instances, and utilizing spot instances where appropriate."
            }
          ]
        },
        {
          name: "InfraTeam",
          logo: "/clients/Coat_of_arms_of_Malaysia.png",
          startDate: "Mar 2014",
          projects: [
            {
              name: "Microservices Architecture Implementation",
              date: "Apr 2014 - Oct 2014",
              description: "Designed and implemented a microservices architecture that improved scalability and reduced downtime by 50%. This involved breaking down a monolithic application into smaller, independently deployable services."
            },
            {
              name: "Kubernetes Cluster Management",
              date: "Nov 2014 - Jun 2015",
              description: "Set up and managed Kubernetes clusters for containerized applications, improving resource efficiency by 40%. Implemented advanced features such as auto-scaling, rolling updates, and self-healing capabilities."
            }
          ]
      }
  ]
   }
  ];