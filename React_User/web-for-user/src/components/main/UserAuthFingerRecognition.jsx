import React, { Fragment } from "react";

import axios from "axios";

import Image from "material-ui-image";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import finger from "../../images/finger.png";

const UserAuthFingerRecognition = props => {
  const send = React.useCallback(() => {
    props.setResult("set");
    setTimeout(() => {
      sendFinger();
    }, 500);
  }, []);

  const sendFinger = React.useCallback(() => {
    console.log("지문");

    axios
      .post("주소")
      // .post('http://192.168.100.121:5000/compareFinger', {name: 600})
      .then(res => {
        console.log(res.data)
        if (res.data === "00") {
          props.setResult("true")
        } else if (res.data === "01") {
          props.setResult("false")
        } else {
          props.setResult("problem")
        }
      })
      .catch(error => console.log(error))

    setTimeout(() => {
      props.setResult("true")
    }, 1000)

    // props.setResult("true") // 삭제 필요
  }, []);

  const reset = React.useCallback(() => {
    props.setFingerPrint("");
    props.setWait(null);

    const down = () => {
      console.log(props.countdown)
      props.setCountDown(countdown => countdown - 1)
    }
    let timer = setInterval(down, 1000);

    setTimeout(function(){
      clearInterval(timer)
      props.setWait("wait")
    }, 15001)

    const takePicture = async () => {
      try {
        const res = await axios.post(
          '주소'
          // 'http://192.168.100.121:5000/getFinger'
        )
        console.log(res.data)
        if (res.data.code === "00") {
          clearInterval(timer)
          props.setCountDown(15)
          props.setWait(null)
          props.setFingerPrint(res.data.img)
          // clearInterval(timer)
        } else {
          clearInterval(timer)
          props.setCountDown(15)
          props.setWait(null)
          props.setResult("problem")
        }
      } catch (error) {
        console.log(error)
      }
    }
    takePicture()

    // test용도
    setTimeout(() => {
      clearInterval(timer)
      props.setCountDown(15)
      props.setWait(null)
      props.setFingerPrint("image")
    }, 6000)
  }, []);

  return (
    <Fragment>
      {props.fingerprint ? (
        <div>
          <h2>지문이 인식되었습니다.</h2>
          <h2>인증 또는 재촬영을 진행해주세요.</h2>
        </div>
      ) : (
        <div>
          <h2>지문 인증을 진행합니다.</h2>
          <h2>지문인식기에 손가락을 올려주세요.</h2>
        </div>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {props.fingerprint ? (
            <Image
              src={`data:image/bmp;base64,${props.fingerprint}`}
              alt="finger-print"
              // disableSpinner="true"
              disableTransition={true}
              style={{ height: "200px", paddingTop: 0 }}
              imageStyle={{ width: "auto", position: "static" }}
            />
          ) : (
            <img src={finger} alt="finger-print" height="200" />
          )}
        </Grid>
        {props.fingerprint ? (
          <>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth={true}
                onClick={send}
              >
                인증
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth={true}
                onClick={reset}
              >
                재촬영
              </Button>
            </Grid>
          </>
        ) : ( props.wait === "wait" ? (
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth={true}
              disabled
              // onClick={picture}
            >
              잠시만 기다려주세요.
            </Button>
          </Grid>
          ) : (
            <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth={true}
              disabled
              // onClick={picture}
            >
              {props.countdown}초 남았습니다.
            </Button>
          </Grid>
          )
          // <Grid item xs={12}>
          //   <Button
          //     variant="contained"
          //     size="large"
          //     color="primary"
          //     fullWidth={true}
          //     disabled
          //     // onClick={picture}
          //   >
          //     {props.countdown}초 남았습니다.
          //     "손가락을 올려주세요."
          //   </Button>
          // </Grid>
        )}
      </Grid>

      {/* 지문을 인증하세요 */}
    </Fragment>
  );
};

export default UserAuthFingerRecognition;
