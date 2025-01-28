// components/AnnouncementCard.tsx
import React from 'react';
import styles from './AnnouncementCard.module.css';

interface Announcement {
  uid: string;
  title: string;
  description: string;
  datetime: string;
}

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  return (
    <div className={styles.announcementCard}>
      <div className={styles.announcementContent}>
        <h2 className={styles.announcementTitle}>{announcement.title}</h2>
        <p className={styles.announcementDescription}>{announcement.description}</p>
        <p className={styles.announcementDate}>{announcement.datetime.slice(0, 11)}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;