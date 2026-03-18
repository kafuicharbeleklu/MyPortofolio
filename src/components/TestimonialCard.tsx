import React from 'react';

interface TestimonialCardProps {
  imageSrc: string;
  imageAlt: string;
  quote: string;
  author: string;
  role: string;
  eyebrow?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  imageSrc,
  imageAlt,
  quote,
  author,
  role,
  eyebrow,
}) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-avatar-shell">
        <img src={imageSrc} alt={imageAlt} className="testimonial-avatar" />
      </div>
      <div className="testimonial-arrow" aria-hidden="true"></div>
      <div className="testimonial-body">
        <div className="testimonial-quote-mark" aria-hidden="true">
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <path
              d="M0 22V13.4C0 9.93333 0.9 6.96667 2.7 4.5C4.5 2.03333 7.06667 0.333333 10.4 0L11.6 2.2C9.46667 2.73333 7.76667 3.76667 6.5 5.3C5.23333 6.83333 4.53333 8.6 4.4 10.6H8.8V22H0ZM16.4 22V13.4C16.4 9.93333 17.3 6.96667 19.1 4.5C20.9 2.03333 23.4667 0.333333 26.8 0L28 2.2C25.8667 2.73333 24.1667 3.76667 22.9 5.3C21.6333 6.83333 20.9333 8.6 20.8 10.6H25.2V22H16.4Z"
              fill="#B84F22"
            />
          </svg>
        </div>
        <p className="testimonial-quote">{quote}</p>
        <div className="testimonial-meta">
          <span className="testimonial-author">{author}</span>
          <span className="testimonial-role">{role}</span>
          {eyebrow && <span className="testimonial-eyebrow">{eyebrow}</span>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
