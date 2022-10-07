import { Alert } from 'antd';

function NothingFound() {
  return (
    <div className="error-message">
      <Alert message="Nothing found" description="Please, try another search" type="warning" showIcon />
    </div>
  );
}

export default NothingFound;
