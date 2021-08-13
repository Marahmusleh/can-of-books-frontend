import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './Components/BookFormModal';
import Button from 'react-bootstrap/Button';
import UpdatedBook from './Components/UpdatedBook';




class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerEmail: this.props.auth0.user.email,
      books: [],
      displayAddModal:false,
      showUpdateModal:false,
      updatebookObj:{} // i need a new obj for the updated data
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  handelDisplayModal = () => {
    this.setState({ displayAddModal:true });
  }

  handelUpdatedModal = (item) => {
    this.setState({ showUpdateModal:true , updatebookObj:item });
  }

 
  fetchBooks = async () => {
        await axios.get(
        `${process.env.REACT_APP_SERVER}/books?email=${this.state.ownerEmail}`
      ).then(axiosResponse=>{this.setState({
        books: axiosResponse.data
      });
    }).catch(error => alert(error));
  };

  addBook=(e)=>{
    e.preventDefault();

        const body = {
            ownerEmail: this.props.auth0.user.email, // we are getting the email of the user from auth0
            title: e.target.title.value,
            description: e.target.description.value,
            status: e.target.status.value,
          };
      
          axios.post(`${process.env.REACT_APP_SERVER}/book`, body).then(axiosResponse => {
            // console.log(axiosResponse.data);
            this.state.books.push(axiosResponse.data);
            this.setState({
              books: this.state.books
            
            });
            console.log(this.state.books);
        
          }).catch(error => alert(error));
          this.setState({ displayAddModal:false });        
        }


        deleteBook=(index)=>{
          axios.delete(
            `${process.env.REACT_APP_SERVER}/book/${index}`
          ).then(axiosResponse=>{
            if(axiosResponse){
              const deletedBook =this.state.books.filter(book => book._id !== index);
              this.setState({
                books: deletedBook });
          }
        }).catch(error => alert(error));
        }

        UpdateBook=((e)=>{
          e.preventDefault();
      const bookId = this.state.updatebookObj._id;
              const body = {
                  title: e.target.title.value,
                  description: e.target.description.value,
                  status: e.target.status.value,
                };
            
                axios.put(`${process.env.REACT_APP_SERVER}/book/${bookId}`, body).then((axiosResponse) => {
                  console.log('updated Cat Data:  ', axiosResponse.data);


                  const updatedBookArr = this.state.books.map(book => {

                    if (book._id === bookId) {
                      book.title= axiosResponse.data.title;
                      book.description= axiosResponse.data.description;
                      book.status = axiosResponse.data.status;
            
                      return book;
                    }
                    return book;
            
                  });
                  this.setState({books:updatedBookArr})
                  this.handelUpdatedModal({})
                  this.setState({ showUpdateModal:false });        

                  
                }).catch(error => alert(error));
        });
        
        
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

          {this.state.showUpdateModal &&      
          <UpdatedBook
            show={this.state.showUpdateModal}
            close={this.handelUpdatedModal}
            UpdateBook={this.UpdateBook}
            updatebookObj={this.state.updatebookObj}
            />
          }
          <Carousel>
            {this.state.books.length > 0 &&
              this.state.books.map((book,id) => (
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
                    <Button variant="outline-danger" onClick={() => this.deleteBook(book._id)}>Delete Book</Button>
                    <Button variant="outline-danger" onClick={() => this.handelUpdatedModal(book)}>Update Book</Button>
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
