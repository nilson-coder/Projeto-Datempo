import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
import apiFormData from '../../services/apiFormData';
import { parseJwt } from '../../services/auth';

class Perfilusuario extends Component {
    constructor() {
        super()
        this.state = {
            usuario: [],

            updateUsuario:{
                idUsuario: parseJwt().idUsuario,
                nome:"",
                identificador:"",
                email:"",
                senha:"",
                idTipoUsuario:"",
                // 01 - Colocamos o createRef
                imgusuario: React.createRef(),
                
            },

            isEdit: true,

            successMsg: "",

        }
    }

    componentDidMount() {
        this.getUsuario();
    }

    getUsuario = () => {
        //pegando id do usuario
        api.get('/usuario/' + parseJwt().id)

        .then(response => {
            if (response.status === 200) {
                this.setState({ usuario: response.data })
            }
        })
    }

    alterarStateUsuario = event => {
        this.setState({
            usuario: {
                ...this.state.usuario, [event.target.name]: event.target.value
            }
        });
    }

     // 02 - Adicionamos um setState específico
     alterarSetStateFile = (input) =>{
        this.setState({
            updateUsuario : {
                ...this.state.updateUsuario, [input.target.name] : input.target.files[0]
            }   
        })
    }


    updateUsuario = (event) =>{

        event.preventDefault();

        // let usuario_alterado = this.state.usuario;

        // 03 - Criamos nosso formData
        let usuarioFormData = new FormData();
        usuarioFormData.set("idUsuario", this.state.usuario.idUsuario);
        usuarioFormData.set("idTipoUsuario", this.state.usuario.idTipoUsuario);
        usuarioFormData.set("nome", this.state.usuario.nome);
        usuarioFormData.set("identificador", this.state.usuario.identificador);
        usuarioFormData.set("email", this.state.usuario.email);
        usuarioFormData.set("senha", this.state.usuario.senha);
        
        // 04 - Nesta parte está o segredo, precisamos de 3 parâmetros
        usuarioFormData.set('imgusuario', this.state.updateUsuario.imgusuario.current.files[0] ,
         this.state.updateUsuario.imgusuario.value);

        // 05 - Não esqueçam de passar o formData
            apiFormData.put('/usuario/'+ parseJwt().id ,usuarioFormData)
            
            .then(() => {
                
                this.setState({ successMsg : "Perfil alterado com sucesso!" });
                this.setState({ isEdit: true })
            })
            .catch(error => {
                
                console.log(error);
            })

            setTimeout(() => {
                this.getUsuario();
            }, 1500);
        }

    habilitaInput = () => {
        this.setState({
            isEdit: false,
        })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <main>
                    <div className="container">
                        <div className="cont_branco">
                            <h2>MEU PERFIL</h2>
                            <hr />
                            <div className="container_perfil">
                                <div className="imgperfil" >
                                    <img src={"http://localhost:5000/imgPerfil/" + this.state.usuario.imgusuario} alt="Imagem de perfil do usuário" />
                                    <div className="custom-file">
                                        <input
                                            accept="image/*"
                                            type="file" 
                                            class="custom-file-input" 
                                            id="customFileLang" 
                                            lang="pt-br"
                                            name="imgusuario"
                                            onChange={this.alterarSetStateFile}
                                            ref={this.state.updateUsuario.imgusuario} />
                                        <label class="custom-file-label" for="customFileLang">escolha Imagem </label>
                                    </div>
                                </div>

                                

                                <div className="form_perfil">
                                    
                                    <form onSubmit={this.updateUsuario} id="form_perfil">

                                        <div>
                                            <label>
                                                Nome completo
                                            <input type="text" 
                                                name="nome"
                                                value={this.state.usuario.nome}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                />
                                            </label>
                                            <label>
                                                CPF/CNPJ
                                            <input type="text"
                                                name="identificador" 
                                                value={this.state.usuario.identificador}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                />
                                            </label>
                                            <label>
                                                E-mail
                                            <input type="text" 
                                                name="email" 
                                                value={this.state.usuario.email}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                required
                                                />
                                            </label>
                                            <label>
                                                Senha
                                            <input type="text"  
                                                name="senha" 
                                                value={this.state.usuario.senha}
                                                onChange={this.alterarStateUsuario}
                                                disabled={this.state.isEdit}
                                                required
                                                />
                                            </label>
                                        </div>

                                        <label>
                                            <div className="btnperfil">
                                                <button className="btn_perfil" type="button" onClick={this.habilitaInput} ><span>Editar</span> </button>
                                                <button className="btn_perfil" type="submit" ><span>Salvar</span></button>
                                            </div>
                                        </label>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}
export default Perfilusuario;