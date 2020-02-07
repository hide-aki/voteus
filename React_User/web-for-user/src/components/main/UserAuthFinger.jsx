import React, { useState, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import UserAuthFingerPicture from "../main/UserAuthFingerPicture";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

//image
import fingerprint from "../../images/fingerprint.png";
import Fingerprint_true from "../../images/Fingerprint_true.png";
import Fingerprint_false1 from "../../images/Fingerprint_false1.png";
import Fingerprint_false2 from "../../images/Fingerprint_false2.png";

const useStyles = makeStyles(theme => ({
  bold: {
    fontWeight: "bold"
  },
  vh_80: {
    height: "80vh"
  },
  alignCenter: {
    textAlign: "center"
  }
}));

const UserAuthFinger = props => {
  const classes = useStyles();
  const [finger, setFinger] = useState(null);
  const [result, setResult] = useState("finger");
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nextPage = () => {
    // console.log(props.userinfocode)

    // vote 페이지에서 axios하도록 만들예정
    // // 지문인증까지 완료하면 votelist를 받아온다.
    // axios.get('http://54.180.134.217:8080/api/vote/getVoteList/'+props.userinfocode)
    // // axios.get('dummy/vote_list.json')
    // .then(res => {
    //     // res 값 확인
    //     console.log('res', res)
    //     props.setVoteList(voteList => res)
    // })
    // .catch(error => console.log(error))

    // // axios를 받아오는데 걸리는 시간이 필요하다 그 것을 어떤식으로 해결할지 고민중
    // setTimeout(()=>{props.setNumber(number => number + 1)},2000)

    props.setNumber(number => number + 1);
  };

  const returnPage = () => {
    setResult(result => "finger");
  };

  if (result === "set") {
    return (
      <Fragment>
        <h2>지문을 인식하는 중입니다.</h2>
        <h2>잠시만 기다려주세요.</h2>
      </Fragment>
    );
  } else if (result === "getimage") {
    return (
      <Fragment>
        <div>
          <Image
              src={`data:image/bmp;base64,${finger}`}
              alt="finger-print"
              // disableSpinner="true"
              disableTransition="true"
              style={{ height: "200px", paddingTop: 0 }}
              imageStyle={{ width: "auto", position: "static" }}
            />
          <h2>지문이 인식되었습니다.</h2>
          <h2>인증 또는 재촬영을 진행해주세요.</h2>
          {/* 수정필요함 (2020/02/07) */}
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth="true"
            onClick={nextPage}
            autoFocus
          >
            다음
          </Button>
        </div>
      </Fragment>
    );
  } else if (result === "true") {
    return (
      <Fragment>
        <div>
          인증이 완료되었습니다.
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth="true"
            onClick={nextPage}
            autoFocus
          >
            다음
          </Button>
        </div>
      </Fragment>
    );
  } else if (result === "false") {
    return (
      <Fragment>
        <div>
          인증이 실패되었습니다. 다시 인증하세요.
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth="true"
            onClick={returnPage}
            autoFocus
          >
            다시하기
          </Button>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <IconButton
          color="secondary"
          aria-label="도움말"
          onClick={handleClickOpen}
        >
          <HelpIcon fontSize="large" />
          도움말
        </IconButton>
        <h1>지문 인증을 진행합니다.</h1>
        <h2>아래의 버튼을 누른 후 지문인식기에 손가락을 올려주세요.</h2>
        <UserAuthFingerPicture result={result} setResult={setResult} setFinger={setFinger} />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth="true"
          PaperProps={{ className: [classes.vh_80] }}
        >
          <DialogTitle id="alert-dialog-title">
            지문인식 전 확인사항
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h2 className={classes.alignCenter}>올바른 지문인식</h2>
            </DialogContentText>
            <Grid container spacing={1}>
              <Grid container item xs={12} alignItems="center" justify="center">
                <Grid item xs={"auto"}>
                  <img src={Fingerprint_true} height="200" alt="지문" />
                </Grid>
              </Grid>
              <Grid container item xs={12} alignItems="center" justify="center">
                <Grid item xs={"auto"} justify="center">
                  <CheckCircleOutlineIcon fontSize="large" color="primary" />
                </Grid>
              </Grid>
            </Grid>

            <h2 className={classes.alignCenter}>잘못된 지문인식</h2>
            <Grid container spacing={1}>
              <Grid container item xs={6} alignItems="center" justify="center">
                <Grid item xs={"auto"}>
                  <img src={Fingerprint_false1} height="200" alt="지문" />
                </Grid>
              </Grid>
              <Grid container item xs={6} alignItems="center" justify="center">
                <Grid item xs={"auto"}>
                  <img src={Fingerprint_false2} height="200" alt="지문" />
                </Grid>
              </Grid>
              <Grid container item xs={6} alignItems="center" justify="center">
                <Grid item xs={"auto"} justify="center">
                  <HighlightOffIcon fontSize="large" color="secondary" />
                </Grid>
              </Grid>
              <Grid container item xs={6} alignItems="center" justify="center">
                <Grid item xs={"auto"} justify="center">
                  <HighlightOffIcon fontSize="large" color="secondary" />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth="true"
              onClick={handleClose}
              autoFocus
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
};

export default UserAuthFinger;
