import { developers } from "./developers"
import github from "../assets/github.png"
import linkedin from "../assets/linkedin.png"
import "./Footer.css"
const Footer = () => {
    return(
    <footer className="footer">
        <div className="container">
            <div className="row">
                {developers.map((el, key) => {
                    return(
                        <div className="footer-col" key={key}>
                            <h4>{el.name}</h4>
                            <ul>
                                <li><a href={el.github}><img src={github} alt="github" width="35px"/>github</a></li>
                                <li><a href={el.linkedin}><img src={linkedin} alt="linkedin" width="30px"/>linkedin</a></li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
  </footer>
    )
}

export default Footer;