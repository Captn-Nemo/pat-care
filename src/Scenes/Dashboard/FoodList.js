import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { DIET_DETAILS, FOOD_ITEMS } from "../../configs/apiRoutes";
import axios from "axios";
import "./style.css";
import RetryButton from "../../App/components/RetryButton";

const dosa = require("../../assets/images/dosa.png");
const FoodList = ({ diet = { dietId: 0 }, addItem, fromAdmin = false }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getApiData = () => {
    setLoading(true);
    setError(null);
    if (fromAdmin) {
      axios
        .get(FOOD_ITEMS)
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError("An error occurred. Awkward..");
        });
    } else {
      axios
        .get(`${DIET_DETAILS}/${diet.dietId}/HeaderId`)
        .then((res) => {
          console.log(res);
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  function renderList() {
    if (loading) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />;
        </div>
      );
    } else if (error) {
      return <RetryButton retryFn={getApiData} />;
    } else if (data?.length == 0) {
      return <div>No Data</div>;
    } else {
      return (
        <div>
          {data.length > 0 ? (
            data.map((food, i) => {
              return (
                <>
                  <Card key={i}>
                    <Card.Body className="p-2">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div>
                          <Card.Img src={dosa} className="food-thumb" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-black text-center">
                            {fromAdmin ? food.Name : food.ItemName}
                          </h4>
                        </div>

                        <div className="ml-3">
                          <Button
                            variant="success"
                            onClick={() => addItem(1, food)}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      );
    }
  }

  return <div>{renderList()}</div>;
};

export default FoodList;
