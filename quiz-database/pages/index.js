import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        callUser();
    }, [])

    async function callUser() {
        let usuario = await axios.get("../api/users/me/route");
        setUser(usuario.data.data);
        console.log(usuario);
    }

    return (
        <main>
            <title>Quiz-DataBase</title>
            <Navbar className="bg-body-primary">
                <Container>
                    <Nav className="m-auto">
                        <Nav.Link href="#">Início</Nav.Link>
                        <Nav.Link href="/questao">Questões</Nav.Link>
                        <NavDropdown title={`Olá, ${user.name}`} id="basic-nav-dropdown">
                            <NavDropdown.Item href='../../user/logout/page'>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div className="d-md-flex justify-content-between align-content-center">
                <Container className="pt-4 ps-md-4 ms-md-4 mt-4">
                    <h1 className="pt-4 mt-4 ms-4">Bem-Vindo ao Quiz-DataBase!</h1>
                    <div className="m-4 pt-4">
                        <h4>Vamos criar um quiz?</h4>
                        <br />
                        <Button>Ir para questões -{'>'}</Button>
                    </div>
                </Container>
                <Container className="text-center">
                    <Image src="/imagem_sem_fundo.png" width={300} height={300} />
                </Container>
            </div>
        </main>
    )
}