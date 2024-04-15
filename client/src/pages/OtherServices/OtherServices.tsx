import { Helmet } from "react-helmet";

const OtherServices = () => {
  return (
    <>
      <Helmet>
        <title>Other Services | MetaBlog</title>
      </Helmet>
      <h1>Other services</h1>

      <section className="flex justify-between mt-10">
        <div>
          <h2>Change the Banner Image</h2>
          <p>Change the banner image of the website</p>
        </div>
        <div>
          <h2>Change the Slider Images</h2>
          <p>Change the slider images of the website</p>
        </div>
      </section>
    </>
  );
};

export default OtherServices;
