import React from "react";
import Title from "../components/Title";
import assets from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            delectus incidunt explicabo commodi quae voluptate odit non
            molestias officiis, eveniet praesentium tempora labore odio! Vero
            ducimus ratione consectetur quod rerum?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio
            repudiandae, explicabo vitae asperiores optio placeat temporibus
            cumque ducimus provident amet exercitationem id aliquam animi
            blanditiis corrupti ad sit consectetur!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convencience, .....
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Aspernatur, omnis neque? Quaerat libero nisi vitae, architecto
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convencience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Aspernatur, omnis neque? Quaerat libero nisi vitae, architecto
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Aspernatur, omnis neque? Quaerat libero nisi vitae, architecto
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
