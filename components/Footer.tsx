import { FaTiktok, FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="https://www.tiktok.com/@1001tvstream" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="text-4xl hover:text-customGreen" />
          </a>
          <a href="https://x.com/1001Dizi?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-4xl hover:text-customGreen" />
          </a>
          <a href="https://www.instagram.com/1001tv/?hl=en" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-4xl hover:text-customGreen" />
          </a>
          <a href="https://www.youtube.com/@1001-TV" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-4xl hover:text-customGreen" />
          </a>
          <a href="https://www.facebook.com/1001.stream/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-4xl hover:text-customGreen" />
          </a>
        </div>
        <div className="flex flex-col items-end space-y-2 text-xl">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-customGreen">الرئيسية</a>
            <a href="#" className="hover:text-customGreen">اتصل بنا</a>
            <a href="#" className="hover:text-customGreen">سياسة الخصوصية</a>
            <a href="#" className="hover:text-customGreen">الشروط والأحكام</a>
          </div>
          <div>
            &copy; 2024 - 1001 جميع الحقوق محفوظة
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
