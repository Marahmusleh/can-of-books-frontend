import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './Components/BookFormModal';
import Button from 'react-bootstrap/Button';




class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerEmail: this.props.auth0.user.email,
      books: [],
      displayAddModal:false,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  handelDisplayModal = () => {
    this.setState({ displayAddModal:true });
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

  addBook=(e)=>{
    e.preventDefault();

        const body = {
            ownerEmail: this.props.auth0.user.email, // we are getting the email of the user from auth0
            title: e.target.bookName.value,
            description: e.target.description.value,
            status: e.target.status.value,
          };
      
          axios.post(`${process.env.REACT_APP_SERVER}/book`, body).then(axiosResponse => {
            // console.log(axiosResponse.data);
            this.state.books.push(axiosResponse.data.books[0]);
            this.setState({
              books: this.state.books
            
            });
            console.log(this.state.books);
        
          }).catch(error => alert(error));
          this.setState({ displayAddModal:false });        
        }


        deleteBook=(index)=>{
          const { user } = this.props.auth0;
        
          const Data={
            email:user.email,
          }
          axios
          .delete(`${process.env.REACT_APP_SERVER}/book/${index}`,{params:Data})
          .then((dataResult)=>{
            this.setState({ 
              books:dataResult.data
                })
                console.log('hello inside delete func',this.state.books);
          })
          .catch((err)=>{
            console.log(err);
            alert(err);
            <h1>error happened</h1>
        
        
          })
        }



  render() {
    return (
      <div>
        <>
        <Button variant="secondary" onClick={() => this.handelDisplayModal()}>Add a Book</Button>

        <BookFormModal 
                 show={this.state.displayAddModal}
                 handelDisplayModal={this.handelDisplayModal}
                 addBook={this.addBook}
                /> 

          <Carousel>
            {this.state.books.length > 0 &&
              this.state.books.map((book,i) => (
                <Carousel.Item >
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
                      {book.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '18px',
                        width: '34%',
                        textAlign: 'center',
                        marginLeft: '34%',
                      }}
                    >
                      {book.description}
                      {book.status}
                    </p>
                    <div key={i}>
                    <Button variant="outline-danger" onClick={() => this.deleteBook(i)}>Delete Book</Button>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </>
      </div>
    );
  }
}

export default withAuth0(BestBooks);
