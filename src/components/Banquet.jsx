import "./Banquet.css";

import banquetImage from "../assets/images/banquet-hall.jpg";

function Banquet() {
  const facilities = [
    {
      icon: "💍",
      title: "Wedding Celebrations",
      text: "A beautiful space for weddings, engagements and memorable family celebrations.",
    },
    {
      icon: "🎉",
      title: "Parties & Events",
      text: "Perfect venue for birthday parties, anniversaries and special occasions.",
    },
    {
      icon: "👥",
      title: "Corporate Events",
      text: "A comfortable venue for meetings, conferences and corporate gatherings.",
    },
  ];

  const handleEnquire = () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
      });

      setTimeout(() => {
        const enquiryType = document.querySelector(
          ".contact-form select"
        );

        if (enquiryType) {
          enquiryType.value = "banquet";

          enquiryType.dispatchEvent(
            new Event("change", {
              bubbles: true,
            })
          );
        }
      }, 700);
    }
  };

  return (
    <section
      id="banquet"
      className="banquet-section"
    >

      {/* ================= HEADING ================= */}

      <div className="banquet-heading">

        <p className="section-small-title">
          CELEBRATE WITH US
        </p>

        <h2>
          Banquet Hall
        </h2>

        <p>
          Create beautiful memories in an elegant and comfortable
          venue designed for celebrations, gatherings and special events.
        </p>

      </div>


      {/* ================= MAIN ================= */}

      <div className="banquet-main">

        {/* ================= IMAGE ================= */}

        <div className="banquet-visual">

          <img
            src={banquetImage}
            alt="IKOR Paradise Banquet Hall"
          />

          <div className="banquet-overlay">

            <span>
              IKOR
            </span>

            <strong>
              PARADISE
            </strong>

            <p>
              BANQUET HALL
            </p>

          </div>

        </div>


        {/* ================= INFORMATION ================= */}

        <div className="banquet-info">

          <p className="banquet-small-title">
            YOUR SPECIAL DAY
          </p>

          <h3>
            Make Every Celebration
            <br />
            Truly Unforgettable
          </h3>

          <p className="banquet-description">
            At IKOR Paradise, we understand that every celebration
            is special. Our banquet hall provides an elegant setting
            where you can celebrate your most important moments with
            your family, friends and guests.
          </p>

          <p className="banquet-description">
            Whether it is a wedding, birthday, anniversary, corporate
            event or family gathering, our team is here to help make
            your occasion comfortable and memorable.
          </p>


          {/* ================= FACILITIES ================= */}

          <div className="banquet-facilities">

            {facilities.map((facility, index) => (

              <div
                className="banquet-facility"
                key={index}
              >

                <div className="facility-icon">
                  {facility.icon}
                </div>

                <div>

                  <h4>
                    {facility.title}
                  </h4>

                  <p>
                    {facility.text}
                  </p>

                </div>

              </div>

            ))}

          </div>


          {/* ================= ENQUIRE BUTTON ================= */}

          <button
            type="button"
            className="banquet-btn"
            onClick={handleEnquire}
          >
            ENQUIRE NOW
          </button>

        </div>

      </div>


      {/* ================= HIGHLIGHTS ================= */}

      <div className="banquet-highlights">

        <div className="highlight-item">

          <strong>
            Elegant
          </strong>

          <span>
            Ambience
          </span>

        </div>


        <div className="highlight-item">

          <strong>
            Spacious
          </strong>

          <span>
            Venue
          </span>

        </div>


        <div className="highlight-item">

          <strong>
            Memorable
          </strong>

          <span>
            Celebrations
          </span>

        </div>


        <div className="highlight-item">

          <strong>
            Great
          </strong>

          <span>
            Hospitality
          </span>

        </div>

      </div>

    </section>
  );
}

export default Banquet;
