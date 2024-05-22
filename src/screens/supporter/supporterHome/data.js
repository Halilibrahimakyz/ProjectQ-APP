const student1 = require("@/assets/images/student1.jpg");
const student2 = require("@/assets/images/student2.jpg");
const student3 = require("@/assets/images/student3.jpg");
const student4 = require("@/assets/images/student4.jpg");
const student5 = require("@/assets/images/student5.jpg");

export const dummyProjects = [
  // Education
  {
    image: student1,
    title: 'Support her book purchases',
    raised: 159,
    goal: 300,
    supporters: 29,
    daysLeft: 9,
    category: 'Education',
    description: 'Help Jane purchase the necessary books for her upcoming semester. She is an excellent student with a passion for learning.',
    student: {
      name: 'Jane',
      surname: 'Doe',
      school: 'ABC University',
      class: '3rd Year',
      gpa: 3.8,
      goals: 'To become a software engineer and contribute to open-source projects.'
    }
  },
  {
    image: student4,
    title: 'Support his online courses',
    raised: 800,
    goal: 3000,
    supporters: 60,
    daysLeft: 20,
    category: 'Education',
    description: 'John needs funds to enroll in advanced online courses to enhance his programming skills.',
    student: {
      name: 'John',
      surname: 'Smith',
      school: 'XYZ Institute',
      class: '2nd Year',
      gpa: 3.5,
      goals: 'To become a data scientist and work on impactful projects.'
    }
  },
  {
    image: student3,
    title: 'Support their scholarship',
    raised: 500,
    goal: 1000,
    supporters: 35,
    daysLeft: 15,
    category: 'Education',
    description: 'Emily is in need of financial assistance to continue her studies under a scholarship program.',
    student: {
      name: 'Emily',
      surname: 'Johnson',
      school: 'LMN College',
      class: '1st Year',
      gpa: 3.9,
      goals: 'To pursue a career in biomedical engineering and innovate in healthcare technology.'
    }
  },
  
  // Technology
  {
    image: student5,
    title: 'Support his open source project',
    raised: 1200,
    goal: 5000,
    supporters: 100,
    daysLeft: 30,
    category: 'Technology',
    description: 'Mike is developing an open-source project to help automate repetitive tasks for developers.',
    student: {
      name: 'Mike',
      surname: 'Brown',
      school: 'DEF University',
      class: '4th Year',
      gpa: 3.7,
      goals: 'To contribute to the open-source community and help other developers.'
    }
  },
  {
    image: student2,
    title: 'Support her tech workshop',
    raised: 450,
    goal: 1500,
    supporters: 50,
    daysLeft: 18,
    category: 'Technology',
    description: 'Anna is organizing a workshop to teach basic coding skills to underprivileged students.',
    student: {
      name: 'Anna',
      surname: 'Williams',
      school: 'GHI Tech',
      class: '3rd Year',
      gpa: 3.6,
      goals: 'To become a tech educator and bridge the digital divide.'
    }
  },
  {
    image: student1,
    title: 'Support their AI research',
    raised: 2200,
    goal: 6000,
    supporters: 75,
    daysLeft: 25,
    category: 'Technology',
    description: 'David is conducting AI research to develop innovative solutions for smart cities.',
    student: {
      name: 'David',
      surname: 'Taylor',
      school: 'JKL Institute',
      class: '4th Year',
      gpa: 4.0,
      goals: 'To advance AI research and contribute to smart city initiatives.'
    }
  },
  
  // Art
  {
    image: student4,
    title: 'Support their art exhibition',
    raised: 700,
    goal: 1500,
    supporters: 30,
    daysLeft: 14,
    category: 'Art',
    description: 'Sophia is organizing an art exhibition to showcase works from various talented students.',
    student: {
      name: 'Sophia',
      surname: 'Anderson',
      school: 'MNO Art School',
      class: '2nd Year',
      gpa: 3.4,
      goals: 'To become a professional artist and support the local art community.'
    }
  },
  {
    image: student5,
    title: 'Support his music production',
    raised: 400,
    goal: 1200,
    supporters: 25,
    daysLeft: 10,
    category: 'Art',
    description: 'Liam needs funds to produce his first music album and reach a wider audience.',
    student: {
      name: 'Liam',
      surname: 'Martinez',
      school: 'PQR Music Academy',
      class: '3rd Year',
      gpa: 3.5,
      goals: 'To become a music producer and create inspiring music.'
    }
  },
  {
    image: student1,
    title: 'Support her theater performance',
    raised: 900,
    goal: 2000,
    supporters: 50,
    daysLeft: 20,
    category: 'Art',
    description: 'Isabella is raising funds to perform a theater play that highlights social issues.',
    student: {
      name: 'Isabella',
      surname: 'Garcia',
      school: 'STU Drama School',
      class: '4th Year',
      gpa: 3.8,
      goals: 'To become a theater director and use drama to advocate for social change.'
    }
  },
  
  // Science
  {
    image: student2,
    title: 'Support her science fair',
    raised: 1200,
    goal: 3000,
    supporters: 60,
    daysLeft: 22,
    category: 'Science',
    description: 'Olivia is organizing a science fair to encourage students to pursue STEM fields.',
    student: {
      name: 'Olivia',
      surname: 'Robinson',
      school: 'VWX Science School',
      class: '1st Year',
      gpa: 3.9,
      goals: 'To inspire young minds to explore and innovate in science and technology.'
    }
  },
  {
    image: student4,
    title: 'Support his biology lab',
    raised: 500,
    goal: 2000,
    supporters: 40,
    daysLeft: 17,
    category: 'Science',
    description: 'James is raising funds to equip his biology lab with advanced research tools.',
    student: {
      name: 'James',
      surname: 'Lee',
      school: 'YZA University',
      class: '2nd Year',
      gpa: 3.7,
      goals: 'To contribute to biological research and discover new scientific breakthroughs.'
    }
  },
  {
    image: student5,
    title: 'Support their physics research',
    raised: 1500,
    goal: 3500,
    supporters: 65,
    daysLeft: 25,
    category: 'Science',
    description: 'Charlotte is working on a physics research project to explore quantum mechanics.',
    student: {
      name: 'Charlotte',
      surname: 'Harris',
      school: 'BCD Institute',
      class: '4th Year',
      gpa: 3.8,
      goals: 'To advance our understanding of quantum physics and contribute to scientific knowledge.'
    }
  },
  
  // Health
  {
    image: student2,
    title: 'Support his health tracker',
    raised: 1500,
    goal: 4000,
    supporters: 80,
    daysLeft: 25,
    category: 'Health',
    description: 'Ethan is developing a health tracker app to help people monitor their wellness.',
    student: {
      name: 'Ethan',
      surname: 'Clark',
      school: 'EFG University',
      class: '3rd Year',
      gpa: 3.6,
      goals: 'To innovate in health technology and improve public health.'
    }
  },
  {
    image: student1,
    title: 'Support their mental health awareness',
    raised: 700,
    goal: 2000,
    supporters: 50,
    daysLeft: 15,
    category: 'Health',
    description: 'Ava is creating a campaign to raise awareness about mental health issues.',
    student: {
      name: 'Ava',
      surname: 'Lewis',
      school: 'HIJ College',
      class: '2nd Year',
      gpa: 3.7,
      goals: 'To advocate for mental health and support those in need.'
    }
  },
  {
    image: student3,
    title: 'Support her fitness program',
    raised: 900,
    goal: 2500,
    supporters: 55,
    daysLeft: 20,
    category: 'Health',
    description: 'Mia is launching a community fitness program to encourage healthy living.',
    student: {
      name: 'Mia',
      surname: 'Walker',
      school: 'KLM University',
      class: '4th Year',
      gpa: 3.9,
      goals: 'To promote fitness and wellness in the community.'
    }
  },
  
  // Sports
  {
    image: student1,
    title: 'Support their soccer tournament',
    raised: 500,
    goal: 1500,
    supporters: 30,
    daysLeft: 10,
    category: 'Sports',
    description: 'Benjamin is organizing a soccer tournament to foster teamwork and sportsmanship among students.',
    student: {
      name: 'Benjamin',
      surname: 'Hall',
      school: 'NOP School',
      class: '3rd Year',
      gpa: 3.5,
      goals: 'To encourage physical activity and teamwork through sports.'
    }
  },
  {
    image: student2,
    title: 'Support his basketball league',
    raised: 800,
    goal: 2000,
    supporters: 45,
    daysLeft: 15,
    category: 'Sports',
    description: 'Lucas is starting a basketball league to provide a structured environment for young athletes.',
    student: {
      name: 'Lucas',
      surname: 'Young',
      school: 'QRS Academy',
      class: '4th Year',
      gpa: 3.6,
      goals: 'To promote basketball and develop young talent.'
    }
  },
  {
    image: student5,
    title: 'Support her swimming competition',
    raised: 600,
    goal: 1800,
    supporters: 35,
    daysLeft: 12,
    category: 'Sports',
    description: 'Grace is organizing a swimming competition to encourage students to take up the sport.',
    student: {
      name: 'Grace',
      surname: 'King',
      school: 'TUV Swim School',
      class: '2nd Year',
      gpa: 3.7,
      goals: 'To inspire a love for swimming and promote physical fitness.'
    }
  },
];
