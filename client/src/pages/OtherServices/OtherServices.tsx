import { Helmet } from "react-helmet";

const OtherServices = () => {
  return (
    <>
      <Helmet>
        <title>Other Services | MetaBlog</title>
      </Helmet>

      <section>
        <h1>Other services</h1>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col p-2 md:flex-row gap-12 justify-between mt-10 border-orange-950 border-4">
            <h2>Change the Banner Image</h2>
            <p>Change the banner image of the website</p>
          </div>
          <div className="p-2 border-4 border-cyan-950">
            <h2>Change the Slider Images</h2>
            <p>Change the slider images of the website</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtherServices;
