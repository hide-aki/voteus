import React, { useContext, Fragment } from "react";

import UserNameContext from '../../context/UserNameContext';

import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";

const UserAuthComplete = props => {
  const username = useContext(UserNameContext);

  const url = "/user-vote/" + props.userinfocode + "/" + username;

  return (
    <Fragment>
      <h1>모든인증완료</h1>
      <p>투표를 해주세요</p>
      <Link href={url}>
        <Button variant="contained" color="primary">
          투표 시작
        </Button>
      </Link>
    </Fragment>
  );
};

export default UserAuthComplete;
