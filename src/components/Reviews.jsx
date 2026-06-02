import React from 'react';

const Reviews = () => {
  const reviewsData = [
    {
      stars: "★★★★★",
      text: "Excellent service by Dr. Sandeep. The laparoscopic surgery for gall bladder went very smoothly. Recovered very fast compared to what I expected. Highly recommended hospital in Eluru.",
      initials: "RK",
      name: "Ravi Kumar",
      location: "Eluru, Andhra Pradesh"
    },
    {
      stars: "★★★★★",
      text: "My mother had a hernia operation here. The staff was very caring and attentive. Dr. Sandeep explained everything clearly before the surgery. Very professional team and clean hospital.",
      initials: "SL",
      name: "Sunitha Lakshmi",
      location: "Bhimavaram"
    },
    {
      stars: "★★★★★",
      text: "Treated for piles with laser surgery. The procedure was painless and recovery was quick. Dr. Sandeep is very experienced and the hospital atmosphere is calm and supportive. Thank you!",
      initials: "VP",
      name: "Venkata Prasad",
      location: "Eluru"
    },
    {
      stars: "★★★★★",
      text: "Emergency appendix case at 2 AM — the hospital staff responded immediately and the surgery was done within hours. Saved my son's life. Forever grateful to Dr. Sandeep and his team.",
      initials: "MR",
      name: "Madhuri Reddy",
      location: "Tanuku"
    },
    {
      stars: "★★★★★",
      text: "Had varicose vein treatment done here. Doctor explained the laser procedure in simple terms. The results are great and there were no complications. Clean and well-maintained hospital.",
      initials: "KN",
      name: "Krishna Naidu",
      location: "Eluru"
    },
    {
      stars: "★★★★★",
      text: "My father's diabetic foot wound was serious but Dr. Sandeep's treatment helped him recover well without amputation. The care given at every stage was outstanding. Best surgical hospital in this region.",
      initials: "AT",
      name: "Anitha Teja",
      location: "Nidadavole"
    }
  ];

  return (
    <section className="reviews" id="reviews">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-tag">Patient Testimonials</div>
          <h2 className="section-title">What Our <span>Patients Say</span></h2>
          <div className="divider"></div>
        </div>
        <div className="reviews-grid">
          {reviewsData.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-stars">{review.stars}</div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div className="avatar">{review.initials}</div>
                <div><span>{review.name}</span><span>{review.location}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
