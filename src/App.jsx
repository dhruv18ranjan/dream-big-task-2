import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [counters, setCounters] = useState([
    { name: "C1", customers: [{ name: "Customer 1", items: 2 }, { name: "Customer 2", items: 3 }] },
    { name: "C2", customers: [{ name: "Customer 3", items: 5 }] },
    { name: "C3", customers: [{ name: "Customer 4", items: 2 }, { name: "Customer 5", items: 1 }, { name: "Customer 6", items: 1 }] },
    { name: "C4", customers: [{ name: "Customer 7", items: 3 }] },
    { name: "C5", customers: [{ name: "Customer 8", items: 4 }] },
  ]);

  const [waitingLine, setWaitingLine] = useState([
    { name: "Customer 9", items: 3 },
    { name: "Customer 10", items: 4 },
  ]);

  const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleTick();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleTick = () => {
    const updatedCounters = [...counters];

    updatedCounters.forEach((counter) => {
      if (counter.customers.length > currentCustomerIndex) {
        const customer = counter.customers[currentCustomerIndex];
        if (customer.items > 0) {
          customer.items -= 1;
        }
        if (customer.items === 0) {
          counter.customers.splice(currentCustomerIndex, 1);
        }
      }
    });

    if (waitingLine.length > 0) {
      updatedCounters.forEach((counter) => {
        if (counter.customers.length <= currentCustomerIndex && waitingLine.length > 0) {
          counter.customers.push(waitingLine.shift());
        }
      });
    }

    setCurrentCustomerIndex((currentCustomerIndex + 1) % 10);

    setCounters(updatedCounters);
  };

  return (
    <div className="app-container">
      <h1>Billing Counters</h1>
      <div className="counters-container">
        {counters.map((counter, index) => (
          <div className="counter" key={index}>
            <div className="counterDiv">
              <h2>{counter.name}</h2>
            </div>
            <ul>
              {counter.customers.map((customer, i) => (
                <li style={{ marginBottom: "30px", width: "30px", height: "30px", listStyle: "none" }} key={i}>
                  <div className="customer">
                    <div className="customerDiv">
                      {customer.items}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="waiting-line-container">
        <h2>Waiting Line</h2>
        <ul>
          {waitingLine.map((customer, i) => (
            <li style={{ marginBottom: "30px", width: "30px", height: "30px", listStyle: "none" }} key={i}>
              <div className="customer">
                <div className="customerDiv">
                  {customer.items}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
