import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export default function CustomAvatar({
  url = "https://res.cloudinary.com/dev-ninja/image/upload/v1591254816/user_owjmx2.png",
  onChangeAvatar,
  hide,
  edit,
}) {
  const [avatar, setAvatar] = React.useState(url);
  React.useEffect(() => {
    setAvatar(url);
  }, [url, setAvatar]);
  const classes = useStyles();

  const uploadWidget = () => {
    const $this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "dnevwxinm", upload_preset: "onfjtj7b", tags: ["xmas"] },
      function (error, result) {
        if (error) {
          return console.log(error);
        }
        addImages(result[0].url);
      }
    );
  };

  const addImages = (url) => {
    onChangeAvatar(url);
    setAvatar(url);
  };

  return (
    <div className={classes.root}>
      <Avatar
        onClick={edit ? uploadWidget : () => {}}
        alt="Profile"
        src={avatar}
        className={"company-logo"}
      />
    </div>
  );
}

const IconContainer = styled.div`
  position: absolute;
  margin-top: 70px;
  margin-left: 90px;
  color: #fafafa;
`;
