import React from 'react';
import moment from 'moment';

import ShowcaseContainer from '../ShowcaseContainer';
import TestForm from './TestForm';
import Row from '../../components/grid/Row';
import Col from '../../components/grid/Col';
import Alert from '../../components/Alert/Alert';

class ShowcaseForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: {
        name: 'mefive',
        birthDate: '1985-12-20',
        age: 32,
        gender: 'male',
        avatar: null,
      },
      alert: false,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Form">
        <Row className="mt-3">
          <Col span={8}>
            <TestForm
              dataSource={this.state.dataSource}
              onChange={(key, value) => {
                const diff = { [key]: value };

                if (key === 'birthDate') {
                  diff.age = Math.floor(moment.duration(moment() - moment(value)).asYears());
                }

                this.setState({
                  dataSource: {
                    ...this.state.dataSource,
                    ...diff,
                  },
                });
              }}
              onSubmit={() => this.setState({ alert: true })}
            />
          </Col>
        </Row>

        <div className="mt-2">
          {JSON.stringify(this.state.dataSource)}
        </div>

        <Alert
          visible={this.state.alert}
          onClose={() => this.setState({ alert: false })}
        >
          成功!
        </Alert>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseForm;
