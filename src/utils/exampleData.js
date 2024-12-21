export const exampleData = {
    personalData: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
      links: [
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/johndoe"
        },
        {
          name: "GitHub",
          url: "https://github.com/johndoe"
        }
      ]
    },
    educationData: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        location: {
          city: "San Francisco",
          country: "USA"
        },
        duration: {
          startYear: "2018-09",
          endYear: "2022-06"
        },
        current: false
      }
    ],
    experienceData: [
      {
        company: "Tech Corp",
        position: "Software Engineer",
        location: {
          city: "San Francisco",
          country: "USA"
        },
        duration: {
          startYear: "2022-07",
          endYear: ""
        },
        current: true,
        responsibilities: [
          "Developed and maintained web applications using React and Node.js",
          "Collaborated with cross-functional teams to deliver high-quality software",
          "Implemented new features and improved existing codebase"
        ]
      }
    ],
    projectData: [
      {
        projectName: "E-commerce Platform",
        role: "Lead Developer",
        date: "2023-03",
        responsibilities: [
          "Built a full-stack e-commerce platform using MERN stack",
          "Implemented payment gateway integration and user authentication",
          "Managed a team of 3 developers"
        ]
      }
    ],
    skillData: [
      {
        category: "Programming",
        skill: "JavaScript, Python, Java"
      },
      {
        category: "Frameworks",
        skill: "React, Node.js, Express"
      },
      {
        category: "Tools",
        skill: "Git, Docker, AWS"
      }
    ]
  };