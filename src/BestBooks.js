import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerEmail: this.props.auth0.user.email,
      books: [],
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
      const responce = await axios.get(
        `${process.env.REACT_APP_SERVER}/books?email=${this.state.ownerEmail}`
      );
      this.setState({
        books: responce.data[0]?.books || [],
      });
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    return (
      <div>
        <>
          <Carousel>
            {this.state.books.length > 0 &&
              this.state.books.map((value,id) => (
                <Carousel.Item key={id}>
                  <img
                    className='d-block w-30'
                    style={{
                      height: '500px',
                      width: '700px',
                      marginLeft: '29%',
                    }}
                    src={
                      'https://t3.ftcdn.net/jpg/03/13/53/94/360_F_313539495_TIfAx53PwhMQopiuu7J1RiY2lVzSWrep.jpg'
                    }
                    alt='Book'
                  />
                  <Carousel.Caption>
                    <h3
                      style={{
                        fontSize: '25px',
                        backgroundColor: '#fff',
                        color: '#333',
                        width: '38%',
                        textAlign: 'center',
                        marginLeft: '30%',
                      }}
                    >
                      {value.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '18px',
                        width: '34%',
                        textAlign: 'center',
                        marginLeft: '34%',
                      }}
                    >
                      {value.description}
                      {value.status}
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>{' '}
        </>
      </div>
    );
  }
}

export default withAuth0(BestBooks);
