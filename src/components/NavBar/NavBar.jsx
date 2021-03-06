import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withNaming } from "@bem-react/classname";
import "react-sharingbuttons/dist/main.css";
import Typography from "../Typography";
import ImgButton from "../ImgButton";
import arrowImg from "../../common/images/icons/arrow.svg";
import homeImg from "../../common/images/icons/home.svg";
import downloadImg from "../../common/images/icons/file_download.svg";
import shareImg from "../../common/images/icons/share.svg";
import "./NavBar.scss";
import Modal from "../Modal";
import SharingMenu from "../SharingMenu";

const NavBar = ({ className, title = "", id }) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const cn = withNaming({ e: "__", m: "_", v: "_" });
  const style = cn("navBar");
  const location = useLocation();
  const isViewer = location.pathname.includes("/viewer") || false;

  const HomeBtn = () => (
    <ImgButton
      className={style("nav-action")}
      img={homeImg}
      onClick={(e) => {
        history.push("/");
      }}
    />
  );

  const BackBtn = () => (
    <ImgButton
      className={style("nav-action")}
      img={arrowImg}
      appearance={{ mirrorY: true }}
      onClick={(e) => {
        history.goBack();
      }}
    />
  );

  const NextBtn = () => (
    <ImgButton
      className={style("nav-action")}
      img={arrowImg}
      onClick={(e) => {
        history.goForward();
      }}
    />
  );

  const DownloadBtn = () => (
    <ImgButton
      className={style("nav-action")}
      img={downloadImg}
      onClick={(e) => {
        window.open(
          `https://drive.google.com/uc?id=${id}&export=download`,
          "_blank"
        );
      }}
    />
  );

  const ShareBtn = ({ ...props }) => (
    <ImgButton className={style("nav-action")} img={shareImg} {...props} />
  );

  return (
    <div className={style(null, [className])}>
      <div className={style("inner")}>
        <div className={style("nav-actions")}>
          <HomeBtn />
          <BackBtn />
          <NextBtn />
        </div>
        <Typography
          className={style("title")}
          tag="h1"
          appearance={{
            size: "accent",
            color: "gray-blue",
            align: "center",
          }}
        >
          {title || ""}
        </Typography>

        <div className={style("share-actions")}>
          {isViewer && <DownloadBtn />}
          <ShareBtn onClick={() => setShowModal(true)} />
        </div>
      </div>
      <Modal active={showModal} setActive={setShowModal}>
        <SharingMenu />
      </Modal>
    </div>
  );
};

export default NavBar;
