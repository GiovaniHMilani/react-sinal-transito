class Luz extends React.Component {
    constructor(props){
        super(props);
        this.style = {
            backgroundColor:'#00FFFF'
        }
    }

    render() {
        if (this.props.cor == 'vermelho') {this.style = {backgroundColor: '#c8153f'}}
        else if (this.props.cor == 'amarelo') {this.style = {backgroundColor: '#f9c64a'}} 
        else if (this.props.cor == 'verde') {this.style = {backgroundColor: '#72b54e'}}
        else {this.style = {backgroundColor: '#afafaf'}}

        return(
            <div className="box" style={this.style}></div>
        );
    }
}

class Sinal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempo: 0,
            ativo: 1,
            timer: 1
        }
        this.intervalo = '';
        this.desativar = this.desativar.bind(this);
        this.ativar = this.ativar.bind(this);
        this.timer = this.timer.bind(this);
    }

    timer() {
        if(this.state.timer == 1) {
            this.setState({timer:0})
            let tempo = this.state.tempo;
            this.intervalo = setInterval(() => {
                if(tempo <= 4){
                    this.setState({
                        ativo: 1
                    })
                    console.log(tempo);
                    tempo++
                }else if(tempo <= 10) {
                    this.setState({
                        ativo: 2
                    })
                    console.log(tempo);
                    tempo++
                }else if(tempo <= 15) {
                    this.setState({
                        ativo: 3
                    })
                    console.log(tempo);
                    tempo++
                    if(tempo == 15) {
                        tempo = 0;
                    }
                }
            },1000)
        } else {
            this.setState({timer:1, ativo:1});
            clearInterval(this.intervalo);
        }
        
    }

    desativar() {
        clearInterval(this.intervalo);
        this.setState({ativo:1});
        if(this.state.ativo == 1){
            clearInterval(this.intervalo);
            this.setState({
                ativo:2
            });

            setTimeout(() => {
                this.setState({
                    ativo:3
                })
            }, 2000);
        }
    }
    
    ativar() {
        clearInterval(this.intervalo);
        if(this.state.ativo != 1) {
            this.setState({
                ativo:1
            });
        }
    }

    render() {
        return(
            <div className="App">
                <button type="button" onClick={this.timer} style={{marginLeft:'70px', marginTop:'10px'}} className="btn btn-primary">Timer</button>
                <div className="fundo">
                    {(this.state.ativo == 3 ? <Luz cor="vermelho"/>: <Luz cor="preto"/>)}
                    {(this.state.ativo == 2 ? <Luz cor="amarelo"/>: <Luz cor="preto"/>)}
                    {(this.state.ativo == 1 ? <Luz cor="verde"/> : <Luz cor="preto"/> )}
                </div>
                <button onClick={this.desativar} type="button" style={{marginLeft: '7px', marginTop:'20px'}} className="btn btn-danger">Desativar</button>
                <button onClick={this.ativar} type="button" style={{marginLeft: '20px', marginTop:'20px'}} className="btn btn-success">Ativar</button>
            </div>
        );
    }
}

let elemento = (
    <div>
        <Sinal />
    </div> 
);

ReactDOM.render(
    elemento,
    document.getElementById('app')
);