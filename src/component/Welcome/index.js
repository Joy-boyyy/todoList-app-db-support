import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="w-screen p-10 bg-sky-900  h-screen">
      <div className="w-100 bg-slate-900  h-full rounded-lg p-5 flex flex-col items-center">
        <div>
          <img
            className="w-40 h-40 object-cover"
            src="https://shanture.com/wp-content/uploads/2024/06/cropped-2-300x218.png"
            alt="shanture logo"
          />
        </div>

        <div className="w-1/2 ">
          <p className="text-white text-center">
            Shanture is the one-stop solution for all your IT needs; we are
            architects of possibilities, navigating the ever-evolving landscape
            of technology and business with unwavering commitment and passion.
            We specialize in providing comprehensive service & expertise to
            navigate your business. We offer businesses the opportunity to
            streamline operations, improve efficiency, enhance security,
            Business Continuity, Disaster Recovery, foster collaboration, and
            drive innovation. Founded with a vision to revolutionize the digital
            realm, we bring a comprehensive suite of services to the table,
            designed to elevate your brand, expand your reach, and drive
            sustainable growth. We help you empower businesses to focus on their
            core competencies while leveraging scalable and cost-effective
            computing resources to meet their specific needs. We ensure that our
            services are delivered on time, within budget, and up to the highest
            standards.
          </p>
        </div>

        <div className="mt-10">
         
        <Link to='/todoapp'>
        
          <button
            type="button"
            className=" p-4 text-white  bg-indigo-600 rounded-md"
          >
            Start Todo
          </button>
          </Link>
        
        </div>
      </div>
    </div>
  );
};

export default Welcome;
