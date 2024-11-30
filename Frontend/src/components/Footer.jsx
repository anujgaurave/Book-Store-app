const Footer = () => {
  return (
    <div>
      <hr />
      <footer className="footer footer-center text-base-content rounded p-10 dark:bg-slate-900 dark:text-white">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover" href="https://github.com/anujgaurave">
            About me
          </a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/anujgaurave" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.256c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.204.083 1.837 1.237 1.837 1.237 1.07 1.835 2.807 1.305 3.493.997.11-.774.42-1.305.763-1.606-2.665-.302-5.467-1.333-5.467-5.93 0-1.31.468-2.383 1.236-3.222-.123-.303-.536-1.523.117-3.176 0 0 1.007-.322 3.3 1.23a11.523 11.523 0 0 1 3.006-.403c1.02.005 2.046.137 3.006.403 2.293-1.552 3.3-1.23 3.3-1.23.653 1.653.24 2.873.117 3.176.768.839 1.236 1.912 1.236 3.222 0 4.61-2.807 5.625-5.478 5.92.429.372.815 1.103.815 2.222v3.293c0 .317.192.694.801.577C20.565 21.795 24 17.294 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>          
            <a href="https://www.linkedin.com/in/anuj-gaurave/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M20.447 20.452H16.89v-5.646c0-1.347-.027-3.084-1.88-3.084-1.881 0-2.171 1.466-2.171 2.981v5.749H9.293V9h3.317v1.561h.046c.463-.875 1.597-1.797 3.287-1.797 3.513 0 4.162 2.311 4.162 5.319v6.369zM5.337 7.433a1.933 1.933 0 1 1 0-3.866 1.933 1.933 0 0 1 0 3.866zm1.713 13.019H3.623V9h3.427v11.452zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.207 24 24 23.226 24 22.271V1.729C24 .774 23.207 0 22.225 0z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/anujgaurave/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M7.75 2h8.5C19.097 2 21 3.903 21 6.25v8.5C21 19.097 19.097 21 16.25 21h-8.5C4.903 21 3 19.097 3 16.25v-8.5C3 3.903 4.903 2 7.75 2zm0 1.5C5.68 3.5 4.5 4.68 4.5 6.25v8.5c0 1.57 1.18 2.75 2.75 2.75h8.5c1.57 0 2.75-1.18 2.75-2.75v-8.5c0-1.57-1.18-2.75-2.75-2.75h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            <a href="https://www.instagram.com/anujgaurave/">Anuj Gaurave</a>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
