import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {

    state = {
        toggleSidebar: true
    }

    toggleSidebar = () => {
        this.setState({
            toggleSidebar: !this.state.toggleSidebar
        });

        this.props.toggleSidebar(this.state.toggleSidebar);
    }

    render() {
        const { toggleTabelaForm, toggleSidebar, componente, pesquisa, mostrarBotao } = this.props;
        return (
            
            <nav className="navbar navbar-expand-lg">
                <Link to="#" onClick={toggleSidebar}>
                    <i className="fa fa-bars"></i>
                </Link>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                {componente !== "home" && mostrarBotao ? (
                    <button className="btn btn-primary" onClick={toggleTabelaForm}>Novo {componente}</button>
                ) : ( null )}
                    </li>
                </ul>
                <input className="form-control col-md-5" type="text" placeholder="Pesquisar..." onChange={pesquisa} />
            </nav>
        )
    }
}

export default Menu;