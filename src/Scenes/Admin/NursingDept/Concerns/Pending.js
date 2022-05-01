import React from "react";
import RetryButton from "../../../../App/components/RetryButton";

const Completed = ({ data }) => {
  if (error) {
    return <RetryButton retryFn={getApiData} />;
  }
  if (data?.length > 0) {
    return (
      <Row>
        <Col>
          <TableGenerator
            columns={FOOD_ITEMS_TABLE}
            data={data}
            url={FOOD_ITEMS}
            onDeleteClick={() => alert("Delete")}
            onEditClick={changeToEditMode}
            onRefresh={getApiData}
            title="Available Designations"
          />
        </Col>
      </Row>
    );
  } else {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="info" />;
      </div>
    );
  }
};

export default Completed;
