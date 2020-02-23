import React from "react";
import { FormBtn } from "../../components/Form/Form";

function User({logout}) {
  return (
    <div>
        <FormBtn
            text="Logout"
            onClick={logout}
            classes="btn-primary logoutBtn"
        />
        <h3>You have no trips yet!</h3>
    </div>
    );
}

export default User;