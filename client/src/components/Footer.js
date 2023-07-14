const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="border-t border-gray-200"></div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()}
            &nbsp;또박또박 —
            <a
              href="https://github.com/iot-sdcard/ttbttb"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @iot-SDcard
            </a>
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
            IoT와 Web을 결합한 STT 서비스
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
