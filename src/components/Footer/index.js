import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-icons">
      <FaGoogle className="icon-color" />
      <FaTwitter className="icon-color" />
      <FaInstagram className="icon-color" />
      <FaYoutube className="icon-color" />
    </div>
    <p className="footer-head">Contact us</p>
  </div>
)

export default Footer
