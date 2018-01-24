import React from 'react'
import { render } from 'react-dom'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      asks: props.orders.asks,
      bids: props.orders.bids
    }
    this.topBid = props.orders.bids[0].price
    this.bottomAsk = props.orders.asks[props.orders.asks.length - 1].price
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.update(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getRandomQuantity(){
    let min = 10
    let max = 50000
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand)
    return rand
  }
  addOrder(where){
    if(where === 'asks'){
      this.topBid -= 1
      this.setState({
        bids: this.state.bids.slice(1),
        asks: [...this.state.asks, {price: this.bottomAsk-=1, count: this.getRandomQuantity()}]
      })

    } else {
      this.bottomAsk += 1
      this.setState({
        asks: this.state.asks.slice(0, -1),
        bids: [{price: this.topBid+=1, count: this.getRandomQuantity()}, ...this.state.bids]
      })
    }
  }
  update(){
    let where = Math.round(Math.random()) ? 'asks' : 'bids'
    let opposite = where === 'asks' ? 'bids' : 'asks'
    if(this.state[opposite].length<=3){
      this.addOrder(opposite)
    } else {
      this.addOrder(where)
    }
    
  }

  render(){
    const {asks, bids} = this.state
    const askElements = asks.map((order, i)=>{
      return(
        <tr key={i}>
          <td></td>
          <td>{order.price}</td>
          <td>{order.count}</td>
        </tr>
      )
    })
    const spread = <tr>
                      <td></td>
                      <td>{asks[asks.length - 1].price - bids[0].price + bids[0].price - 1}</td>
                      <td></td>
                    </tr>
    const bidElements = bids.map((order, i)=>{
      return(
        <tr key={i+6}>
          <td>{order.count}</td>
          <td>{order.price}</td>
          <td></td>
        </tr>
      )
    })
    return (
      <div className='wrapper'>
        <table>
        <tbody>
          <tr>
            <th>Bid</th>
            <th>Цена</th>
            <th>Ask</th>
          </tr>
          {askElements}
          {spread}
          {bidElements}
        </tbody>
      </table>
      </div>
      
    )
  }
}
export default App