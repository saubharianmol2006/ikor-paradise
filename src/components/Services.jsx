import "./Services.css";

function Services() {
  const services = [
    {
      icon: "🏨",
      title: "Comfortable Rooms",
      text: "Relax and enjoy a comfortable stay with clean and well-maintained rooms.",
    },
    {
      icon: "🍽️",
      title: "Restaurant",
      text: "Enjoy delicious food and a great dining experience with family and friends.",
    },
    {
      icon: "🎉",
      title: "Banquet Hall",
      text: "A perfect venue for weddings, parties, birthdays, meetings and special events.",
    },
    {
      icon: "🚗",
      title: "Parking",
      text: "Convenient parking facility available for our guests and visitors.",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">

        <div className="services-heading">
          <span className="section-subtitle">OUR FACILITIES</span>

          <h2>
            Everything You Need
            <br />
            Under One Roof
          </h2>

          <p>
            At IKOR PARADISE, we make your stay and celebrations
            comfortable, convenient and memorable.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;
