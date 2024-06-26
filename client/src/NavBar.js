import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiChefHat, mdiLogout } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" style={componentStyle()}>
            <Container>
                <Navbar.Brand>
                    <Button style={brandStyle()} onClick={() => navigate("/")}>
                        <Icon path={mdiChefHat} size={1} color={"black"} spin={5} />
                        Chef's Diary
                    </Button>
                </Navbar.Brand>
                <Nav>
                    <NavDropdown
                        title={loggedInUser ? loggedInUser.name : "Sign in"}
                        drop={"start"}
                    >
                        {getUserMenuList({ userList, loggedInUser, handlerMap })}
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

function componentStyle() {
    return { backgroundColor: "#d63232" };
}

function brandStyle() {
    return {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "black",
    };
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
    const userMenuItemList = userList.map((user) => (
        <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
            {user.name}
        </NavDropdown.Item>
    ));

    if (loggedInUser) {
        userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
        userMenuItemList.push(
            <NavDropdown.Item
                key={"logout"}
                onClick={() => handlerMap.logout()}
                style={{ color: "red" }}
            >
                <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Sign out"}
            </NavDropdown.Item>
        );
    }

    return userMenuItemList;
}

export default NavBar;