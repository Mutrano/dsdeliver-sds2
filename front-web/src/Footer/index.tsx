import "./styles.css";
import {ReactComponent as InstagramIcon} from "./Instagram.svg"
import {ReactComponent as LinkedInIcon} from "./Linkedin.svg"
import {ReactComponent as YoutubeIcon} from "./Youtube.svg"


function Footer(){
    return(
        <footer className="main-footer">
            App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
            <div className="footer-icons">
                <a href="https://www.youtube.com/c/DevSuperior" target="_new">
                    <YoutubeIcon/>
                </a>
                <a href="https://www.linkedin.com/school/devsuperior/" target="_new">
                    <LinkedInIcon/>
                </a>
                <a href="https://www.instagram.com/devsuperior.ig/" target="_new">
                    <InstagramIcon/>
                </a>
            </div>
            <div> favicon were made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
    );
}
export default Footer;