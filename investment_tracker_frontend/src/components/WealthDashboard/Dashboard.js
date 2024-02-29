import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

import investment_url from "../../APIs/Investment-api";
import { useUser } from "../../context/UserContext";

import NavBar from "../NavBar/NavBar";
import image from "../../assets/images/noInvestment.jpg";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const { userData } = useUser();

  const [users, setUsers] = useState([]);

  const [stockDetails, setstockDetails] = useState({
    totalBuyPrice: "",
    totalInvestment: "",
    totalReturns: "",
  });

  useEffect(() => {
    axios
      .get(`${investment_url}/investments/user/${userData.id}/investments`)
      .then((response) => {
        const usersa = response.data;
        const totalBuyPricea = usersa.reduce(
          (total, user) => total + user.buy_price,
          0
        );
        const totalInvestmenta = usersa.reduce(
          (total, user) => total + user.buy_price * user.quantity,
          0
        );
        console.log(userData.currentBalance);
        const totalReturnsa = usersa.reduce(
          (total, user) =>
            total +
            (-user.buy_price * user.quantity +
              user.current_price * user.quantity),
          0
        );

        setUsers(usersa);
        setstockDetails({
          totalBuyPrice: totalBuyPricea,
          totalInvestment: totalInvestmenta,
          totalReturns: totalReturnsa,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <NavBar heding="Dashboard" />
      <div className="dashboard-container">
        <div className="investment-container">
          <h2>Dashboard</h2>
          <span>Markets & your Investments</span>
        </div>
        <div className="assets-container">
          <h3>Total Investment</h3>
          <span>
            $
            {isNaN(parseFloat(stockDetails.totalInvestment))
              ? "0.00"
              : parseFloat(stockDetails.totalInvestment).toFixed(2)}
          </span>
        </div>
        <div className="liabilities-container">
          <h3>Total Returns</h3>
          <span>
            $
            {isNaN(parseFloat(stockDetails.totalReturns))
              ? "0.00"
              : parseFloat(stockDetails.totalReturns).toFixed(2)}
          </span>
        </div>
        <div className="net-worth-container">
          <h3>Total Portfolio Value</h3>
          <span>
            $
            {isNaN(
              parseFloat(
                stockDetails.totalInvestment + stockDetails.totalReturns
              )
            )
              ? "0.00"
              : parseFloat(
                  stockDetails.totalInvestment + stockDetails.totalReturns
                ).toFixed(2)}
          </span>
        </div>
      </div>
      {users.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <img
            src={image}
            alt="noInvestment"
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      ) : (
        <div className="Card-container">
          <div className="container mt-5">
            <div className="row">
              {users.map((user) => (
                <div
                  key={user.investment_id}
                  className="col-lg-4 col-md-6 mb-4"
                >
                  <Card className="stock-card">
                    {" "}
                    {}
                    <Card.Body className="text-center">
                      <Card.Title className="stock-card-title">
                        {user.company_name} ({user.stock_symbol})
                      </Card.Title>{" "}
                      <Card.Text className="stock-card-text">
                        Buy Price: ${user.buy_price.toFixed(2)}
                        <br />
                        Current Price: ${user.current_price.toFixed(2)}
                        <br />
                        Quantity: {user.quantity}
                        <br />
                        Return:
                        <span
                          className={`${
                            user.current_price >= user.buy_price
                              ? "positive-return"
                              : "negative-return"
                          }`}
                        >
                          $
                          {(
                            (user.current_price - user.buy_price) *
                            user.quantity
                          ).toFixed(2)}
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
