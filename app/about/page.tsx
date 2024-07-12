import React from 'react';
import styles from '@/styles/AboutUs.module.scss';
import "@/styles/main.scss"
import "@/styles/mediaQuery.scss"
const page: React.FC = () => {
  return (
    <div className={styles.aboutUsPage}>
      <h1>About Us</h1>
      <div className={styles.content}>
        <p>
          Our platform aims to revolutionize the hostel management experience by providing robust tools for hostel owners and seamless booking experiences for users.
        </p>
        <p>
          Founded in 2024, we have been committed to enhancing the way hostels operate and ensuring travelers have a comfortable and enjoyable stay.
        </p>
        <p>
          At Hostelo, we prioritize innovation, user satisfaction, and reliable service delivery. Our team consists of dedicated professionals with a passion for hospitality and technology.
        </p>
      </div>
    </div>
  );
};

export default page;












