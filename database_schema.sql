-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary VARCHAR(100) NOT NULL,
  experience VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  apply_link VARCHAR(500) NOT NULL,
  company_logo VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_featured ON jobs(featured);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
CREATE INDEX idx_jobs_title ON jobs(title);

-- Insert sample job data
INSERT INTO jobs (title, company, location, salary, experience, category, description, apply_link, company_logo, featured, created_at)
VALUES 
(
  'Senior React Developer',
  'Google',
  'San Francisco, USA',
  '$120,000 - $150,000',
  'Senior',
  'Frontend',
  'We are looking for an experienced React developer to join our team. You will work on building scalable web applications using React, Redux, and TypeScript. Requirements: 5+ years of experience with React, strong JavaScript fundamentals, experience with modern web development tools and practices.',
  'https://google.com/careers',
  'https://via.placeholder.com/150?text=Google',
  TRUE,
  NOW()
),
(
  'Full Stack Node.js Developer',
  'Microsoft',
  'New York, USA',
  '$100,000 - $130,000',
  'Mid Level',
  'Full Stack',
  'Join our dynamic team as a Full Stack Developer. Work with Node.js, Express, and React to build innovative solutions. You will collaborate with product managers and designers to bring new features to life. Requirements: 3+ years of full stack development experience, strong knowledge of Node.js and React.',
  'https://microsoft.com/careers',
  'https://via.placeholder.com/150?text=Microsoft',
  TRUE,
  NOW() - INTERVAL '1 day'
),
(
  'DevOps Engineer',
  'Amazon',
  'Seattle, USA',
  '$130,000 - $160,000',
  'Senior',
  'DevOps',
  'We are hiring a DevOps Engineer to manage and improve our cloud infrastructure. Work with AWS, Docker, Kubernetes, and CI/CD pipelines. Requirements: 5+ years of DevOps experience, strong AWS knowledge, Docker and Kubernetes expertise.',
  'https://amazon.com/careers',
  'https://via.placeholder.com/150?text=Amazon',
  TRUE,
  NOW() - INTERVAL '2 days'
),
(
  'Data Scientist',
  'Meta',
  'Menlo Park, USA',
  '$140,000 - $180,000',
  'Mid Level',
  'Data Science',
  'Help us build the future of data science. Work on machine learning models and data analysis at scale. Requirements: Advanced degree in Computer Science or related field, 3+ years of ML/data science experience, proficiency in Python and SQL.',
  'https://meta.com/careers',
  'https://via.placeholder.com/150?text=Meta',
  FALSE,
  NOW() - INTERVAL '3 days'
),
(
  'UI/UX Designer',
  'Apple',
  'Cupertino, USA',
  '$90,000 - $120,000',
  'Mid Level',
  'UI/UX',
  'Design beautiful and intuitive interfaces for our flagship products. Collaborate with product and engineering teams. Requirements: 3+ years of UI/UX design experience, proficiency in design tools like Figma or Sketch, strong portfolio.',
  'https://apple.com/careers',
  'https://via.placeholder.com/150?text=Apple',
  FALSE,
  NOW() - INTERVAL '4 days'
),
(
  'Backend Engineer - Java',
  'Netflix',
  'Los Gatos, USA',
  '$110,000 - $140,000',
  'Mid Level',
  'Backend',
  'Build scalable backend systems that serve millions of users. Work with Java, Spring Boot, and microservices architecture. Requirements: 3+ years of backend development, strong Java knowledge, experience with microservices.',
  'https://netflix.com/careers',
  'https://via.placeholder.com/150?text=Netflix',
  FALSE,
  NOW() - INTERVAL '5 days'
),
(
  'Mobile Developer - iOS',
  'Uber',
  'San Francisco, USA',
  '$100,000 - $140,000',
  'Entry Level',
  'Mobile',
  'Build amazing mobile experiences for our users. Work with Swift, iOS SDK, and modern development practices. Requirements: 1+ years of iOS development experience, knowledge of Swift and Objective-C.',
  'https://uber.com/careers',
  'https://via.placeholder.com/150?text=Uber',
  FALSE,
  NOW() - INTERVAL '6 days'
),
(
  'Frontend Engineer - React',
  'Spotify',
  'Stockholm, Sweden',
  '$95,000 - $125,000',
  'Entry Level',
  'Frontend',
  'Join our frontend team and help millions of users discover music. Work with React, TypeScript, and modern CSS. Requirements: 1+ years of React experience, knowledge of JavaScript/TypeScript fundamentals.',
  'https://spotify.com/careers',
  'https://via.placeholder.com/150?text=Spotify',
  FALSE,
  NOW() - INTERVAL '7 days'
);
