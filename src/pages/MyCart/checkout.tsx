import { Dispatch, useState, SetStateAction } from 'react';
import './MyCart.css';

const Checkout = ({subTotal, setSubTotal, total, setTotal}:{subTotal:number, setSubTotal:Dispatch<SetStateAction<number>>, total:number, setTotal:Dispatch<SetStateAction<number>>}) => {
    const [fee, SetFee] = useState(0);
    const countTotal = () => {
        setTotal((sub) => sub + fee);
    }

    return (
        <>
        <div className="checkout">
            <div className="section">
              <div className="title">Delivery to</div>
              <div className="row-card">
                <div className="row-content">
                  <div className="col">
                    <div className="card-title">University of Queensland</div>
                    <div className="branch">Saint Lucia Campus</div>
                  </div>
                  <div className="col">
                    <p className="purple">Change Address</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="title">Set Time</div>
              <div className="row-card">
                <div className="row-content">
                  <div className="col">
                    <div className="card-title">Wednesday</div>
                    <div className="branch">11:00 PM</div>
                  </div>
                  <div className="col">
                    <p className="purple">Change Time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="title">Payment Summary</div>
              <div className="row-card">
                <div className="col">
                  <div className="row-in-col">
                    <div className="col">Sub Total</div>
                    <div className="col">$100</div>
                  </div>
                  <div className="row-in-col">
                    <div className="col">Fee and Delivery</div>
                    <div className="col">$10</div>
                  </div>
                  <div className="row-in-col">
                    <div className="col">Total Price</div>
                    <div className="col">$110</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default Checkout;