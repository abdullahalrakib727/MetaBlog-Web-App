const Footer = () => {
  return (
    <div className=" bg-[#F6F6F7] dark:bg-[#141624] ">
      <footer className="footer p-10 text-base-content max-w-[1216px] mx-auto">
        <div className="grid grid-cols-3 gap-20">
          <nav className="flex flex-col">
            <header className="text-[#181A2A] text-lg font-semibold">
              About
            </header>
            <p className="mt-2 mb-6 text-[#696A75]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
            <p className="text-[#3B3C4A]">
              <span className="text-[#181A2A] font-normal text-base">
                Email:{" "}
              </span>
              info@jstemplate.net
            </p>
            <p className="text-[#3B3C4A]">
              <span className="text-[#181A2A] font-normal text-base">
                Phone :{" "}
              </span>
              880 123 456 789
            </p>
          </nav>
          <nav className="flex flex-col">
            <header className="footer-title">Quick Link</header>
            <a className="link link-hover">Home</a>
            <a className="link link-hover">About</a>
            <a className="link link-hover">Archived</a>
            <a className="link link-hover">Author</a>
            <a className="link link-hover">Contact</a>
          </nav>
          <nav className="flex flex-col">
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
        {/* <form>
      <header className="footer-title">Newsletter</header> 
      <fieldset className="form-control w-80">
        <label className="label">
          <span className="label-text">Enter your email address</span>
        </label> 
        <div className="join">
          <input type="text" placeholder="username@site.com" className="input input-bordered join-item" /> 
          <button className="btn btn-primary join-item">Subscribe</button>
        </div>
      </fieldset>
    </form> */}
      </footer>
      <footer className="footer px-10 py-4 border-t bg-[#F6F6F7] max-w-[1216px] mx-auto text-base-content border-base-300">
        <aside className="items-center grid-flow-col">
          {/* logo */}
          <p>
            ACME Industries Ltd. <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4 text-base font-normal text-[#3B3C4A]">
            <a>Terms of Use</a>
            <a>Privacy Policy</a>
            <a>Cookie Policy</a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
