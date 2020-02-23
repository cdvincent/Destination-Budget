import React from "react";
import { FormBtn } from "../../components/Form/Form";

function Search({logout}) {
  return (
    <div>
        <FormBtn
                text="Logout"
                onClick={logout}
                classes="btn-primary logoutBtn"
              />
    </div>
    );
}

export default Search;