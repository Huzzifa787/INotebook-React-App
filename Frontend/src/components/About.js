import React from "react";

export default function About(props) {
  return (
    <div className="container">
      <h2 className="my-3">About Us</h2>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              About Us
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Welcome to our note-taking application, where organization and
              creativity collide! We're a passionate team of developers,
              designers, and thinkers dedicated to simplifying your life through
              the power of efficient note-taking. Our mission is to provide you
              with a seamless platform that helps you capture ideas, organize
              thoughts, and fuel your productivity.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Our Vision
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              In a world overflowing with information, the ability to capture
              and retain valuable insights is paramount. Our vision is to
              empower individuals, students, professionals, and creatives alike
              to harness the potential of their thoughts. We believe that great
              ideas can strike at any moment, and our application is designed to
              ensure you never miss a beat. We envision a world where everyone
              can effortlessly translate inspiration into action.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Our Commitments
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              We're committed to continually refining and expanding our
              application to meet your evolving needs. Your feedback is
              invaluable to us, and we're constantly listening to ensure that
              we're delivering a product that genuinely enhances your
              productivity and creativity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
