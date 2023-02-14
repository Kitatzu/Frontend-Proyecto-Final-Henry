import { developers } from "./developers";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";
import "./Footer.css";
import footer from "../assets/footer.png";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <Box display={"flex"} flexWrap="wrap" justifyContent={"center"}>
        <Box width={"100%"} padding="20px">
          <img src={footer} alt="hello" width={"100%"} />
        </Box>
        <div className="container">
          <div className="row">
            {developers.map((el, key) => {
              return (
                <div className="footer-col" key={key}>
                  <h4>{el.name}</h4>
                  <ul>
                    <li>
                      <a href={el.github}>
                        <img src={github} alt="github" width="35px" />
                        github
                      </a>
                    </li>
                    <li>
                      <a href={el.linkedin}>
                        <img src={linkedin} alt="linkedin" width="30px" />
                        linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <Box width="100%" padding="20px">
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            flexWrap={"wrap"}
          >
            <IconButton
              sx={{ width: "200px", height: "200px", fontSize: "200px" }}
            >
              <Icon icon="ri:android-fill" color="white" />
            </IconButton>
            <Typography sx={{ color: "white", fontSize: "24px" }}>
              Descarga nuestra app para android.
              <Link to="https://www.mediafire.com/file/vwkucwrbkain9f0/com.novatech.apk/file">
                aqui
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
