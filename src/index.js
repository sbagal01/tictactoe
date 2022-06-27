import ReactDOM from 'react-dom';
import React from 'react';
import './index1.css'


function getStatusGame(squares){
    let winCombs=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i=0;i<winCombs.length;i++){
        let winComb=winCombs[i];
        let s1=winComb[0];
        let s2=winComb[1];
        let s3=winComb[2];

        if(squares[s1]!=null && squares[s1]==squares[s2]  && squares[s3]==squares[s2]){
            return squares[s1]+" Wins";
        }
    }
    return null;
}

class Board extends React.Component{
    handleBoxClick(i){
        this.props.handlerForButtonClick(i);
    }
    renderSquares(i){
        return(
            <button onClick={()=>this.handleBoxClick(i)}>{this.props.boxes[i]==null? "":this.props.boxes[i]} </button>
        );

    }
    render(){
        return(
            <div className="board"> 
                <div className="title">
                Tic Tac Toe
                </div>
                <div className="content">
                    <div className='ttt'>
                        <div className='row'>
                        {this.renderSquares(0)}
                        {this.renderSquares(1)}
                        {this.renderSquares(2)}
                        </div>
                        <div className='row'>
                        {this.renderSquares(3)}
                        {this.renderSquares(4)}
                        {this.renderSquares(5)}
                        </div>
                        <div className='row'>
                        {this.renderSquares(6)}
                        {this.renderSquares(7)}
                        {this.renderSquares(8)}
                        </div>
                    </div>
                </div>        
            </div>
        );
    }
}

class Display extends React.Component{
    moveHistory(i){
        this.props.handleForHistory(i);
    }

    render(){
        let gameTitle=null;
        if(this.props.gameStatus!=null){
            gameTitle=this.props.gameStatus;
        }else{
            if(this.props.stepNumber %2==0){
                gameTitle="Next Move for X";
            }else{
                gameTitle="Next Move for O";
            }
        }

            let buttons=[];
            for(let i=0;i<=this.props.stepNumber;i++){
                let button=null;
                if(i==0){
                    button=(<button onClick={()=>this.moveHistory(i)}>Go to Start</button>);
                }else{
                    button=(<button onClick={()=>this.moveHistory(i)}>Go to Step# {i}</button>);
                }
                buttons.push(button);
            }
        
        return(
            <div className="display"> 
                <div className="title">
                    {gameTitle}
                </div>
                <div className="content">
                    <div className="history">
                        {buttons}
                    </div>
                   
                </div>
            </div>
        );
    }
}

class TTT extends React.Component{
    constructor(props){
        super(props);
        this.state={
                history:[
                [null,null,null,null,null,null,null,null,null]
                ],
                stepNumber:0,
                gameStatus:null
        }
    }
    handleSquareClick(i){
        let oldHistory=this.state.history.slice();
        let lastSetOfSquares=oldHistory[oldHistory.length-1].slice();
        if(lastSetOfSquares[i]!=null || this.state.gameStatus!=null){
            return;
        }
        lastSetOfSquares[i]=this.state.stepNumber%2==0 ?'X':'O';
        oldHistory.push(lastSetOfSquares);
         
        let gameStat=getStatusGame(lastSetOfSquares);
        if(this.state.stepNumber==8 && getStatusGame(lastSetOfSquares)==null){
            gameStat="Match Draw";
        }

        this.setState({
            history: oldHistory,
            stepNumber: this.state.stepNumber+1,
            gameStatus: gameStat            
        });
    }
    moveToStep(i){
        let oldhistory=this.state.history.slice(0,i+1);

        let currentSquares=oldhistory[oldhistory.length-1];
        let newGameStatus=getStatusGame(currentSquares);
        this.setState({
            history: oldhistory,
            stepNumber: i,
            gameStatus: newGameStatus 
        });
    }

    render(){
        let squares=this.state.history[this.state.history.length-1];
        return(
            <>
                <Board handlerForButtonClick={(i)=>this.handleSquareClick(i)} boxes={squares}/>
                <Display stepNumber={this.state.stepNumber} handleForHistory={(i)=>this.moveToStep(i)} gameStatus={this.state.gameStatus}/>
            </>
        );
    }

}

ReactDOM.render(<TTT/>,document.getElementById("root"));